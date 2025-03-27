import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const IndexHome: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Travelogram
      </Typography>
      <Typography variant="h6" gutterBottom>
        Manage your Travel & expenses effortlessly!
      </Typography>
      <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
        <Button variant="contained" color="primary" component={Link} to="/login">
          Login
        </Button>
        <Button variant="outlined" color="secondary" component={Link} to="/register">
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default IndexHome;
