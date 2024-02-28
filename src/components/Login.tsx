import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    // Add your login logic here, e.g., call an API to authenticate the user
    axios
      .post("http://localhost:3000/login", credentials)
      .then((response: any) => {
        localStorage.setItem("auth_token", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={credentials.username}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: "1rem" }}
        >
          Login
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
