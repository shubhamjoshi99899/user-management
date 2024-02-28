import React from "react";
import axios from "axios";
import { Container, Typography, Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();
  const getDrafts = () => {
    const token = localStorage.getItem("auth_token");

    axios
      .get("http://localhost:3000/api/fetch-all-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDrafts(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getDrafts();
  }, []);

  const handleNavigation = (id: string) => {
    navigate(`/form/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Drafts
      </Typography>
      <Grid container spacing={2}>
        {drafts.map((draft: any) => (
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                border: "1px solid #f0f0f0",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation(draft?._id)}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {draft?.data?.first_name} <br />(
                  {draft?.data?.service_provider_name},{" "}
                  {draft?.data?.division_name})
                </Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Clcik here to view your drafts
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Drafts;
