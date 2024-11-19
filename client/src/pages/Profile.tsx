import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    dob: "",
    bio: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  useEffect(() => {
    // Fetch user details from API
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("dob", user.dob);
      formData.append("bio", user.bio);
      if (selectedAvatar) {
        formData.append("avatar", selectedAvatar);
      }

      await axios.put("http://localhost:5001/api/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
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
          Profile
        </Typography>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : user.avatar}
            alt={user.name}
            sx={{ width: 120, height: 120, margin: "0 auto", mb: 2, boxShadow: 3 }}
          />
          {editMode && (
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderColor: "#4A90E2",
                color: "#4A90E2",
                "&:hover": { borderColor: "#357ABD", color: "#357ABD" },
                borderRadius: 2,
              }}
            >
              Change Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setSelectedAvatar(e.target.files[0]);
                  }
                }}
              />
            </Button>
          )}
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={user.email}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              type="date"
              value={user.dob}
              onChange={(e) => setUser({ ...user, dob: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bio"
              multiline
              rows={3}
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              fullWidth
              disabled={!editMode}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          {editMode ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                sx={{ borderRadius: 2 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditMode(false)}
                sx={{ borderRadius: 2 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => setEditMode(true)}
              sx={{
                backgroundColor: "#4A90E2",
                "&:hover": { backgroundColor: "#357ABD" },
                borderRadius: 2,
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
