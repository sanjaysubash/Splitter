import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#4A90E2",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* App Logo */}
        <Typography
          variant="h6"
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "#fff",
          }}
          onClick={() => navigate("/home")}
        >
          Travel App
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate("/home")}
            sx={{ fontWeight: "bold" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/community")}
            sx={{ fontWeight: "bold" }}
          >
            Community
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/groups")}
            sx={{ fontWeight: "bold" }}
          >
            Groups
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/profile")}
            sx={{ fontWeight: "bold" }}
          >
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/settings")}
            sx={{ fontWeight: "bold" }}
          >
            Settings
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/logout")}
            sx={{ fontWeight: "bold" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
