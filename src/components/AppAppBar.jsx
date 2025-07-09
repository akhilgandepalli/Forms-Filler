import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { appContext } from "../App";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(8px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 24px",
}));

export default function AppAppBar() {
  const { setCurrentCustomer } = React.useContext(appContext);
  const navigate= useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 8px)",
      }}
    >
      <Container maxWidth="md" sx={{ padding: { xs: 0 } }}>
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
            onClick={() => {
              navigate("/");
              setCurrentCustomer(null);
            }}
          >
            <img
              src="/images/logo-4.png"
              style={{ width: "34px", padding: "0", borderRadius: "50%" }}
            />
            <Typography
              variant="h5"
              sx={{
                paddingLeft: 1,
                color: "#00204a",
                fontFamily: "revert-layer",
                fontWeight: 600,
              }}
            >
              Forms Filler
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, pr: 1 }}>
            <Button
              variant="outlined"
              onClick={()=>{navigate('/commonform/new');setCurrentCustomer(null)}}
              sx={{
                bgcolor: "#0c3948",
                color: "#fff",
                "&:hover": { bgcolor: "#0c3948" },
                textTransform: "capitalize",
              }}
            >
              Common Form
            </Button>
            <Button
              variant="outlined"
              onClick={()=>navigate('/formsection')}
              sx={{
                bgcolor: "#0c3948",
                color: "#fff",
                "&:hover": { bgcolor: "#0c3948" },
                textTransform: "capitalize",
              }}
            >
              Forms Section
            </Button>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
