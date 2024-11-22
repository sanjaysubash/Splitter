const express = require("express"); // Express framework for building APIs
const mongoose = require("mongoose"); // Mongoose for MongoDB connection and schemas
const cors = require("cors"); // CORS middleware for cross-origin requests
const bcrypt = require("bcrypt"); // Bcrypt for password hashing
const jwt = require("jsonwebtoken"); // JWT for authentication
const path = require("path"); // Node.js path module
require("dotenv").config(); // Load environment variables from a .env file

// Initialize Express
const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:3000", // Development frontend
    "https://splitter-8fih.onrender.com", // Production frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Make sure OPTIONS is allowed
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions)); // Enable CORS for the specified origins

// Middleware to handle preflight OPTIONS request
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret"; // Default JWT secret


// Schemas & Models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" }, // Optional field for profile images
});
const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema);

const expenseSchema = new mongoose.Schema({
  members: [{ type: String, required: true }],
  expenses: [{ type: Number, required: true }],
  total: { type: Number, required: true },
});
const Expense = mongoose.model("Expense", expenseSchema);

// Middleware to Verify JWT
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

// Routes

// 1. Register User
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    const errorMessage =
      err.code === 11000 ? "Email already exists" : "Error registering user";
    res.status(400).json({ error: errorMessage, details: err.message });
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

// 3. Get User Profile
app.get("/api/users/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Error fetching profile", details: err.message });
  }
});

// 4. Update User Profile
app.put("/api/users/profile", authenticate, async (req, res) => {
  const { name, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
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
    const expenseGroup = await Expense.create({ members, expenses, total });
    res.status(201).json(expenseGroup);
  } catch (err) {
    res.status(400).json({ error: "Error creating expense group", details: err.message });
  }
});

// 8. Get Expense Groups
app.get("/api/expenses", authenticate, async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Error fetching expense groups", details: err.message });
  }
});

// 9. Get Travel Places
app.get("/api/places", (req, res) => {
  const places = process.env.PLACES || JSON.stringify([
    { name: "Paris", description: "The city of lights and love." },
    { name: "New York", description: "The Big Apple." },
    { name: "Tokyo", description: "A bustling metropolis in Japan." },
  ]);
  res.json(JSON.parse(places));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to the API! Use endpoints under /api.");
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
