import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to log out?"
    );
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F4F6F8",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          textAlign: "center",
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#E74C3C" }}>
          Logout
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#34495E" }}>
          Are you sure you want to log out?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#E74C3C",
              "&:hover": { backgroundColor: "#C0392B" },
              borderRadius: 2,
            }}
          >
            Yes, Log Out
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              borderColor: "#34495E",
              color: "#34495E",
              "&:hover": { borderColor: "#2C3E50", color: "#2C3E50" },
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Logout;
