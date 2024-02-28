import React, { useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../StateContext";

const Home = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useStateContext();

  const handleDraftRoute = () => {
    navigate("/drafts");
  };

  const handleFormRoute = () => {
    navigate("/form");
  };

  const handleRequestRoute = () => {
    navigate("/requests");
  };

  const fetchFormData = () => {
    const token = localStorage.getItem("auth_token");
    axios
      .get("http://localhost:3000/api/formdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        // Handle success

        dispatch({ type: "SET_RESPONSE_DATA", payload: response.data });
      })
      .catch((error: any) => {
        // Handle error
      });
  };

  const fetchRequiredFieldsData = () => {
    const token = localStorage.getItem("auth_token");
    axios
      .get("http://localhost:3000/api/required_field_data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        // Handle success
        dispatch({ type: "SET_REQUEST_DATA", payload: response.data });
      })
      .catch((error: any) => {
        // Handle error
      });
  };

  useEffect(() => {
    fetchFormData();
    fetchRequiredFieldsData();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: "10" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            onClick={handleDraftRoute}
            sx={{
              maxWidth: 345,
              border: "1px solid #f0f0f0",
              cursor: "pointer",
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Drafts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clcik here to view your drafts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            onClick={handleFormRoute}
            sx={{
              maxWidth: 345,
              border: "1px solid #f0f0f0",
              cursor: "pointer",
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Create User
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click here to start creating a new user
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            onClick={handleRequestRoute}
            sx={{
              maxWidth: 345,
              border: "1px solid #f0f0f0",
              cursor: "pointer",
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                User Approval Request
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click here to view request
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
