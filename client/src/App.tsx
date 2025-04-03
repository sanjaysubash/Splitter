import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";

// Import Pages
import IndexHome from "./pages/indexhome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ExpenseSplitter from "./pages/ExpenseSplitter";
import GroupManagement from "./pages/GroupManagement";
import Upload from "./pages/Upload";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Logout from "./pages/Login_";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

// Dark and Light Mode Themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#f5f5f5" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    background: { default: "#121212" },
  },
});

// Layout Component
const Layout: React.FC<{ children: React.ReactNode; toggleTheme: () => void }> = ({ children, toggleTheme }) => {
  const location = useLocation();
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  // Navbar Links
  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Profile", path: "/profile" },
    { label: "Expense Splitter", path: "/expense-splitter" },
    { label: "Groups", path: "/groups" },
    { label: "Community", path: "/community" },
    { label: "Analytics", path: "/analytics" },
    { label: "Settings", path: "/settings" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "rgba(20, 20, 20, 0.8)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              transition: "0.3s",
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Travelogram
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map(({ label, path }) => (
              <Button
                key={path}
                component={Link}
                to={path}
                color="inherit"
                sx={{
                  fontWeight: location.pathname === path ? "bold" : "normal",
                  borderBottom:
                    location.pathname === path ? `2px solid ${theme.palette.primary.main}` : "none",
                  "&:hover": {
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    transform: "scale(1.05)",
                  },
                  transition: "0.3s",
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Theme Toggle */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Mobile Menu */}
          <IconButton edge="end" color="inherit" sx={{ display: { xs: "block", md: "none" } }} onClick={(e) => setMenuAnchor(e.currentTarget)}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)} sx={{ mt: 1 }}>
            {navLinks.map(({ label, path }) => (
              <MenuItem key={path} component={Link} to={path} onClick={() => setMenuAnchor(null)}>
                {label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ flex: 1, padding: { xs: 2, sm: 3 }, maxWidth: "1200px", margin: "auto", width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
};

// Main App Component
const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<IndexHome />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes with Layout */}
          <Route path="/home" element={<Layout toggleTheme={toggleTheme}><Home /></Layout>} />
          <Route path="/profile" element={<Layout toggleTheme={toggleTheme}><Profile /></Layout>} />
          <Route path="/expense-splitter" element={<Layout toggleTheme={toggleTheme}><ExpenseSplitter /></Layout>} />
          <Route path="/groups" element={<Layout toggleTheme={toggleTheme}><GroupManagement /></Layout>} />
          <Route path="/upload" element={<Layout toggleTheme={toggleTheme}><Upload /></Layout>} />
          <Route path="/community" element={<Layout toggleTheme={toggleTheme}><Community /></Layout>} />
          <Route path="/analytics" element={<Layout toggleTheme={toggleTheme}><Analytics /></Layout>} />
          <Route path="/settings" element={<Layout toggleTheme={toggleTheme}><Settings /></Layout>} />
          <Route path="/about" element={<Layout toggleTheme={toggleTheme}><About /></Layout>} />
          <Route path="/logout" element={<Layout toggleTheme={toggleTheme}><Logout /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
