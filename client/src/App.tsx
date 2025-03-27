import React, { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import IndexHome from "./pages/indexhome";  // <-- Default landing page
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

interface LayoutProps {
  children: ReactNode;
}

// Layout Component
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem" },
              textAlign: { xs: "center", sm: "left" },
              flexGrow: 1,
            }}
          >
            Travelogram
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" component={Link} to="/expense-splitter">
              Expense Splitter
            </Button>
            <Button color="inherit" component={Link} to="/groups">
              Groups
            </Button>
            <Button color="inherit" component={Link} to="/community">
              Community
            </Button>
            <Button color="inherit" component={Link} to="/analytics">
              Analytics
            </Button>
            <Button color="inherit" component={Link} to="/settings">
              Settings
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flex: 1,
          padding: { xs: 2, sm: 3 },
          overflow: "auto",
          maxWidth: "1200px",
          margin: "auto",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route to IndexHome */}
        <Route path="/" element={<IndexHome />} />  

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with Header Layout */}
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/expense-splitter"
          element={
            <Layout>
              <ExpenseSplitter />
            </Layout>
          }
        />
        <Route
          path="/groups"
          element={
            <Layout>
              <GroupManagement />
            </Layout>
          }
        />
        <Route
          path="/upload"
          element={
            <Layout>
              <Upload />
            </Layout>
          }
        />
        <Route
          path="/community"
          element={
            <Layout>
              <Community />
            </Layout>
          }
        />
        <Route
          path="/analytics"
          element={
            <Layout>
              <Analytics />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/logout"
          element={
            <Layout>
              <Logout />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
