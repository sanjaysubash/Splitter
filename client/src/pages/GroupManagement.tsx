import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Card,
  CardContent,
} from "@mui/material";

interface Group {
  id: number;
  name: string;
  members: string[];
}

const GroupManagement = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const createGroup = () => {
    if (groupName.trim()) {
      const newGroup: Group = {
        id: groups.length + 1,
        name: groupName,
        members: [],
      };
      setGroups([...groups, newGroup]);
      setGroupName("");
    }
  };

  const inviteMember = () => {
    if (selectedGroupId !== null && memberName.trim()) {
      setGroups(
        groups.map((group) =>
          group.id === selectedGroupId
            ? { ...group, members: [...group.members, memberName] }
            : group
        )
      );
      setMemberName("");
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "#2D9CDB" }}
      >
        Group Management
      </Typography>
      <Paper
        sx={{
          padding: 3,
          maxWidth: 600,
          margin: "0 auto",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
        }}
      >
        {/* Create Group Section */}
        <Typography variant="h6" sx={{ color: "#2D9CDB" }}>
          Create a Group
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={createGroup}
            sx={{
              borderRadius: 2,
              backgroundColor: "#2D9CDB",
              "&:hover": {
                backgroundColor: "#1565C0",
              },
            }}
          >
            Create
          </Button>
        </Box>
      </Paper>

      {/* Groups List Section */}
      <Box
        sx={{
          mt: 5,
          maxWidth: 600,
          margin: "0 auto",
          padding: 3,
          backgroundColor: "#F9F9F9",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#27AE60" }}>
          Groups
        </Typography>
        {groups.length === 0 && (
          <Typography variant="body1" sx={{ textAlign: "center", color: "#7F8C8D" }}>
            No groups created yet. Start by creating a group.
          </Typography>
        )}
        <Grid container spacing={2}>
          {groups.map((group) => (
            <Grid item xs={12} key={group.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "all 0.3s",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#2D9CDB", mb: 1 }}
                  >
                    {group.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Members: {group.members.join(", ") || "No members yet"}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      borderColor: "#E74C3C",
                      color: "#E74C3C",
                      "&:hover": {
                        borderColor: "#C0392B",
                        color: "#C0392B",
                      },
                    }}
                    onClick={() => setSelectedGroupId(group.id)}
                  >
                    Invite Members
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Invite Members Section */}
      {selectedGroupId && (
        <Paper
          sx={{
            padding: 3,
            maxWidth: 600,
            margin: "30px auto 0",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "#E74C3C", mb: 2 }}>
            Invite Members to Group
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Member Name or Email"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={inviteMember}
              sx={{
                borderRadius: 2,
                backgroundColor: "#E74C3C",
                "&:hover": {
                  backgroundColor: "#C0392B",
                },
              }}
            >
              Invite
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default GroupManagement;
