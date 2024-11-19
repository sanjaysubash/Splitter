import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Paper,
} from "@mui/material";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: "English",
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
    // Add API call to save settings if needed.
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F4F6F8",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "#4A90E2",
            fontWeight: "bold",
          }}
        >
          Settings
        </Typography>

        {/* Dark Mode Setting */}
        <FormControlLabel
          control={
            <Switch
              checked={settings.darkMode}
              onChange={() => handleToggle("darkMode")}
              color="primary"
            />
          }
          label="Dark Mode"
          sx={{ display: "block", mb: 3 }}
        />

        {/* Notifications Setting */}
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications}
              onChange={() => handleToggle("notifications")}
              color="primary"
            />
          }
          label="Enable Notifications"
          sx={{ display: "block", mb: 3 }}
        />

        {/* Language Setting */}
        <Typography variant="body1" sx={{ mb: 1, color: "#333" }}>
          Language
        </Typography>
        <TextField
          select
          SelectProps={{ native: true }}
          value={settings.language}
          onChange={(e) => setSettings({ ...settings, language: e.target.value })}
          fullWidth
          sx={{ mb: 4 }}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </TextField>

        {/* Save Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#4A90E2",
              "&:hover": { backgroundColor: "#357ABD" },
              borderRadius: 2,
            }}
          >
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
