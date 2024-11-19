import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

interface Post {
  id: number;
  author: string;
  content: string;
  image?: string;
  video?: string;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Jane Doe",
      content: "Just visited an amazing place today!",
      image: "https://source.unsplash.com/random/400x200?nature",
    },
    {
      id: 2,
      author: "John Smith",
      content: "Check out my latest travel vlog!",
      video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    },
  ]);
  const [newPost, setNewPost] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handlePost = () => {
    if (newPost.trim() || file) {
      const newPostData: Post = {
        id: posts.length + 1,
        author: "You",
        content: newPost,
        image: file ? URL.createObjectURL(file) : undefined,
      };
      setPosts([newPostData, ...posts]);
      setNewPost("");
      setFile(null);
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#2D9CDB" }}>
        Community
      </Typography>

      {/* Post Creation Section */}
      <Box
        sx={{
          mb: 4,
          padding: 2,
          border: "1px solid #E0E0E0",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <TextField
          label="Share something with the community..."
          multiline
          rows={3}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              transition: "all 0.3s",
              "&:hover": {
                borderColor: "#2D9CDB",
              },
            },
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button variant="contained" component="label" sx={{ borderRadius: 2 }}>
            Upload Image/Video
            <input
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </Button>
          {file && (
            <Typography variant="body2" sx={{ color: "#555" }}>
              {file.name}
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2D9CDB",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#1565C0",
              },
            }}
            onClick={handlePost}
          >
            Post
          </Button>
        </Box>
      </Box>

      {/* Posts Display Section */}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "#2D9CDB", mb: 1 }}>
                  {post.author}
                </Typography>
                <Typography variant="body1" sx={{ color: "#4F4F4F", mb: 2 }}>
                  {post.content}
                </Typography>
                {/* Display image if available */}
                {post.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt="Post media"
                    sx={{ borderRadius: 2, mb: 2 }}
                  />
                )}
                {/* Display video if available */}
                {post.video && (
                  <CardMedia
                    component="video"
                    controls
                    src={post.video}
                    height="200"
                    sx={{ borderRadius: 2 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Community;
