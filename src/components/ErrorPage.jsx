import { Box, Button, Container, Typography } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 0 } }}>
      <Box
        sx={{
          height: "86vh",
          backgroundColor: "whitesmoke",
          backdropFilter: "blur(8px)",
          boxShadow: 1,
          borderRadius: 2,
          margin: "calc(var(--template-frame-height, 0px) + 8px) 0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            pr: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#0c3948", fontWeight: "bold" }}
          >
            404 - Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: "#555" }}>
            The page you are looking for does not exist or has been moved.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              bgcolor: "#0c3948",
              color: "#fff",
              "&:hover": { bgcolor: "#0c3948" },
              textTransform: "capitalize",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorPage;
