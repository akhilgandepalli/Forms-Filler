import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 0 } }}>
      <Box
        sx={{
          height: "86vh",
          backgroundColor: "whitesmoke",
          boxShadow: 1,
          borderRadius: 2,
          margin: "calc(var(--template-frame-height, 0px) + 8px) 0 0 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Welcome to the Home Page !</h2>
      </Box>
    </Container>
  );
};

export default Home;
