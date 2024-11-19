import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesResponse = await axios.get("http://localhost:5001/api/places");
        const newsResponse = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        setPlaces(placesResponse.data);
        setNews(newsResponse.data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 0 }}>
      {/* Header Section */}
      <AppBar position="static" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: "0.1em" }}
          >
            Travel & News
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        {/* Travel Destinations Section */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#4A90E2",
            fontWeight: "bold",
            marginBottom: 4,
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Top Travel Destinations
        </Typography>
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          {places.map((place: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={`https://source.unsplash.com/400x300/?${place.name}`}
                  alt={place.name}
                  sx={{ borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#34495E", fontWeight: "bold" }}
                  >
                    {place.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#7F8C8D" }}>
                    {place.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Latest News Section */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#E74C3C",
            fontWeight: "bold",
            marginBottom: 4,
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Latest News
        </Typography>
        <Grid container spacing={3}>
          {news.map((article: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={article.urlToImage || "https://via.placeholder.com/400"}
                  alt={article.title}
                  sx={{ borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#34495E", fontWeight: "bold" }}
                  >
                    {article.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#7F8C8D" }}>
                    {article.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
