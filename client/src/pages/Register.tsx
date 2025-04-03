import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Registration successful!");
      console.log("Server response:", response.data);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error:", err.response.data);
        setError(err.response.data.error || "Registration failed.");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #667eea, #764ba2)",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
          borderRadius: 3,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
          Create Account
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Sign up to start using the app.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                bgcolor: "#764ba2",
                "&:hover": { bgcolor: "#5a3d8a" },
                fontWeight: "bold",
                mt: 1,
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
            </Button>

            <Typography variant="body2" color="textSecondary">
              Already have an account?
            </Typography>

            <Button
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              sx={{
                borderColor: "#764ba2",
                color: "#764ba2",
                "&:hover": { borderColor: "#5a3d8a", color: "#5a3d8a" },
              }}
              onClick={() => navigate("/")}
            >
              Back to Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
