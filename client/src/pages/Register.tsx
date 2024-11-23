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
} from "@mui/material";

const Register = () => {
  const [name, setName] = useState(""); // State for the name field
  const [email, setEmail] = useState(""); // State for the email field
  const [password, setPassword] = useState(""); // State for the password field
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple frontend validation
    if (!name || !email || !password) {
      alert("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Making a POST request to the server
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success feedback
      alert("Registration successful!");
      console.log("Server response:", response.data);

      // Navigate to the login page
      navigate("/");
    } catch (err) {
      // Error handling with backend feedback
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error:", err.response.data);
        alert(err.response.data.message || "Registration failed.");
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Register
            </Button>
            <Button
              variant="text"
              color="secondary"
              size="large"
              fullWidth
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
