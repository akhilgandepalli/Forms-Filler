import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export const StartingPage = () => {
    const navigate = useNavigate()
    const onLoginClick=()=>{
        navigate('/login')
    }
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
        <Typography
          variant="h3"
          component="h3"
          gutterBottom
          sx={{ color: "#00204a" }}
        >
          Welcome!
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ mb: 3, color: "text.secondary" }}
        >
          Please log in to access the full features of the application.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={onLoginClick}
          sx={{ mt: 2, bgcolor:'#00204a' }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};
