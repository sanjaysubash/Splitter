const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://splitter-8fih.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve image uploads

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// ✅ JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

// ✅ Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ Schemas & Models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  dob: { type: String, default: "" },
  bio: { type: String, default: "" },
  currency: { type: String, default: "INR" },
});

const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: String, required: true }],
  expenses: [{ type: Number, required: true }],
  total: { type: Number, required: true },
  currency: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);

// ✅ Middleware to Verify JWT
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access Denied: No token provided" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

// ✅ Routes

// 1. Register User
// 1. Register User
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Error in Registration:", err);
    res.status(500).json({ error: "Error registering user", details: err.message });
  }
});


// 2. Login User
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
// ✅ Save Expense
app.post("/api/expenses", authenticate, async (req, res) => {
  const { members, expenses, currency } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const total = expenses.reduce((sum, expense) => sum + expense, 0);
    const expenseGroup = await Expense.create({
      user: user._id,
      members,
      expenses,
      total,
      currency: currency || user.currency,
    });
    res.status(201).json(expenseGroup);
  } catch (err) {
    res.status(400).json({ error: "Error creating expense", details: err.message });
  }
});

// ✅ Update User Currency
app.put("/api/users/currency", authenticate, async (req, res) => {
  const { currency } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { currency }, { new: true });
    res.json({ message: "Currency updated successfully", currency: user.currency });
  } catch (err) {
    res.status(400).json({ error: "Error updating currency", details: err.message });
  }
});
// 3. Get User Profile
app.get("/api/users/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Error fetching profile", details: err.message });
  }
});

// 4. Update User Profile with Avatar Upload
app.put("/api/users/profile", authenticate, upload.single("avatar"), async (req, res) => {
  const { name, dob, bio } = req.body;
  const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updateData = {
      name,
      dob,
      bio,
    };

    if (avatar) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Error updating profile", details: err.message });
  }
});

// 5. Add Community Post
app.post("/api/posts", authenticate, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const post = await Post.create({ author: req.user._id, content });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: "Error creating post", details: err.message });
  }
});

// 6. Get All Community Posts with Pagination
app.get("/api/posts", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name")
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts", details: err.message });
  }
});

// 7. Add Expense Group
app.post("/api/expenses", authenticate, async (req, res) => {
  const { members, expenses } = req.body;
  if (!members || !expenses || !Array.isArray(members) || !Array.isArray(expenses))
    return res.status(400).json({ error: "Invalid members or expenses format" });

  try {
    const total = expenses.reduce((sum, expense) => sum + expense, 0);
    const expenseGroup = await Expense.create({
      user: req.user._id,
      members,
      expenses,
      total,
    });

    res.status(201).json(expenseGroup);
  } catch (err) {
    res.status(400).json({ error: "Error creating expense group", details: err.message });
  }
});

// ✅ Static File Serving (Production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// ✅ Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
