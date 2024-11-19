import React from "react";
import { Box, Container, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Navigation Bar */}
      <AppBar position="static" color="primary" sx={{ mb: 2 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}>
            Splitter App
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
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
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ flex: 1, py: 3 }}>
        {title && (
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 2, textAlign: "center", bgcolor: "background.paper" }}>
        <Typography variant="caption" color="textSecondary">
          © {new Date().getFullYear()} Splitter App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AppLayout;
