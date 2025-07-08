import { Box, Container } from "@mui/material";
import React from "react";
import DiscoveryHMSForm from "./Forms/DiscoveryHMSForm";
import DiscoveryForm2 from "./Forms/DiscoveryForm2";
import StartumGapCoverClaimForm from "./Forms/StartumGapCoverClaimForm";
import StartumGapCoverApplicationForm from "./Forms/StartumGapCoverApplicationForm";
import NewForm from "./Forms/NewForm";

const MainPage = () => {
  return (
    <Container maxWidth="md" sx={{padding:{xs:0}}} >
      <Box
        sx={{
          //height: "100vh",
          backgroundColor: "whitesmoke",
          backdropFilter: "blur(8px)",
          boxShadow: 1,
          borderRadius: 2,
          margin: "calc(var(--template-frame-height, 0px) + 8px) 0px",
        }}
      >
        {/* <DiscoveryHMSForm/> */}
        <DiscoveryForm2 />
        {/* <StartumGapCoverClaimForm /> */}
        {/* <StartumGapCoverApplicationForm /> */}
        {/* <NewForm /> */}
        </Box>
    </Container>
  );
};

export default MainPage;
