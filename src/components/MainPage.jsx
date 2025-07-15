import { Alert, Box, Container, Typography } from "@mui/material";
import React from "react";
import DiscoveryHMSForm from "./Forms/DiscoveryHMSForm";
import DiscoveryForm2 from "./Forms/DiscoveryForm2";
import StartumGapCoverClaimForm from "./Forms/StartumGapCoverClaimForm";
import StartumGapCoverApplicationForm from "./Forms/StartumGapCoverApplicationForm";
import NewForm from "./Forms/NewForm";

const MainPage = () => {
  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 0 } }}>
      <Box
        sx={{
          //height: "100vh",
          backgroundColor: "whitesmoke",
          backdropFilter: "blur(8px)",
          boxShadow: 1,
          borderRadius: 2,
          margin: "calc(var(--template-frame-height, 0px) + 8px) 0px",
          padding: "16px 0",
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            minHeight: "80vh",
            mx: "auto",
            padding: "8px 24px",
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" gutterBottom textAlign="center">
            Customer Form
          </Typography>
          <Alert severity="info" sx={{ mb: 1 }}>
            Please fill main applicant section completely to save customer
            details
          </Alert>
          <NewForm />
        </Box>
      </Box>
    </Container>
  );
};

export default MainPage;
