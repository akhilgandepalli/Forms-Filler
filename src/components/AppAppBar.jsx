import React, { useContext, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Container,
  Menu,
  Typography,
  MenuItem,
  IconButton,
  Button,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router";
import { appContext } from "../App";
import { AccountCircle } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  padding: "4px 16px",
}));

export default function AppAppBar() {
  const { setCurrentCustomer, loginStatus, setLoginStatus } =
    useContext(appContext);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [menuAnchors, setMenuAnchors] = useState({});

  const menuOptions = ["Customer", "Forms", "Reports", "Admin"];
  const entryOptions = [
    "Create Customer",
    "Modify Customer",
    "Delete Customer",
    "View Customers",
  ];
  const formsOptions = ["Generate Form"];
  const adminOptions = ["Add Form", "Default Mapping"];

  const handleMenuOpen = (event, menuKey) => {
    setMenuAnchors((prev) => ({ ...prev, [menuKey]: event.currentTarget }));
  };

  const handleMenuClose = (menuKey) => {
    setMenuAnchors((prev) => ({ ...prev, [menuKey]: null }));
  };

  const handleAccountClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };
  const handleLogoutClick = () => {
    setLoginStatus(false);
    handleAccountClose();
    navigate("/login");
  };
  const handleLoginClick = () => {
    handleAccountClose();
    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        top: 0,
        p: "8px",
        backdropFilter: "blur(2px)",
      }}
    >
      <Container maxWidth="xl" sx={{ padding: { xs: 0, md: 0 } }}>
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ display: "flex", alignItems: "center", px: 0 }}
            onClick={() => {
              navigate("/");
              setCurrentCustomer(null);
            }}
          >
            <img
              src="/images/c-logo.jpg"
              style={{ width: "34px", padding: "0", borderRadius: "50%" }}
            />
            <Typography
              variant="h5"
              sx={{
                paddingLeft: 1,
                color: "#00204a",
                fontFamily: "revert-layer",
                fontWeight: 600,
                //textTransform: "uppercase",
              }}
            >
              Clockwise
            </Typography>
          </Box>
          {/* Menu Buttons */}
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="standard"
              size="small"
              sx={{
                color: "#00204a",
                fontWeight: 600,
                //bgcolor: alpha("#00204a", 0.05),
                fontSize: "0.9rem",
                "&:hover": { bgcolor: alpha("#00204a", 0.2) },
                textTransform: "capitalize",
              }}
              onClick={(e) => navigate("/")}
            >
              Home
            </Button>
            {menuOptions.map((num) => (
              <Box
                key={`menu${num}`}
                sx={{
                  display:
                    num === "Admin" ? (loginStatus ? "flex" : "none") : "flex",
                }}
                onMouseEnter={(e) => handleMenuOpen(e, `menu${num}`)}
                onMouseLeave={() => handleMenuClose(`menu${num}`)}
              >
                <Button
                  variant="standard"
                  size="small"
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    color: "#00204a",
                    fontWeight: 600,
                    //bgcolor: alpha("#00204a", 0.05),
                    fontSize: "0.9rem",
                    "&:hover": { bgcolor: alpha("#00204a", 0.2) },
                    textTransform: "capitalize",
                  }}
                  //onClick={(e) => handleMenuOpen(e, `menu${num}`)}
                >
                  {num}
                </Button>
                <Menu
                  anchorEl={menuAnchors[`menu${num}`]}
                  open={Boolean(menuAnchors[`menu${num}`])}
                  onClose={() => handleMenuClose(`menu${num}`)}
                  MenuListProps={{
                    onMouseLeave: () => handleMenuClose(`menu${num}`),
                  }}
                  sx={{ marginTop: "16px", zIndex: 1 }}
                >
                  {num === "Customer" &&
                    entryOptions.map((option) => (
                      <MenuItem
                        key={option}
                        onClick={() => {
                          handleMenuClose(`menu${num}`);
                          setCurrentCustomer(null);
                          if (
                            option == "Modify Customer" ||
                            option == "Delete Customer"
                          ) {
                            navigate(
                              `/customer/${option
                                .toLowerCase()
                                .replace(" ", "")}`
                            );
                          } else {
                            navigate(
                              `/customer/${option
                                .toLowerCase()
                                .replace(" ", "")}`
                            );
                          }
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  {num === "Forms" &&
                    formsOptions.map((option) => (
                      <MenuItem
                        key={option}
                        onClick={() => {
                          setCurrentCustomer(null);
                          handleMenuClose(`menu${num}`);
                          navigate("/forms/generateform");
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  {num === "Admin" &&
                    adminOptions.map((option) => (
                      <MenuItem
                        key={option}
                        onClick={() => {
                          handleMenuClose(`menu${num}`);
                          //navigate(`/admin/${option.toLowerCase().replace(" ", "")}`);
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  {num === "Reports" && (
                    <MenuItem
                      onClick={() => {
                        handleMenuClose(`menu${num}`);
                        //navigate("/reports");
                      }}
                    >
                      Generate Report
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            ))}
          </Box>

          {/*Account Button */}
          <Box
            onMouseEnter={handleAccountClick}
            onMouseLeave={handleAccountClose}
          >
            <IconButton
              //onClick={handleAccountClick}

              sx={{
                color: "#00204a",
                "&:hover": { bgcolor: alpha("#00204a", 0.1) },
              }}
            >
              <AccountCircle sx={{ fontSize: "28px" }} />
            </IconButton>
            <Menu
              anchorEl={accountAnchorEl}
              open={Boolean(accountAnchorEl)}
              onClose={handleAccountClose}
              sx={{ marginTop: "12px", zIndex: 1 }}
              MenuListProps={{
                onMouseLeave: () => handleAccountClose(),
              }}
            >
              {loginStatus ? (
                <Box>
                  <MenuItem onClick={handleAccountClose}>Profile</MenuItem>
                  <MenuItem onClick={handleAccountClose}>
                    Change Password
                  </MenuItem>
                  <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem onClick={handleLoginClick}>Login</MenuItem>
                  <MenuItem onClick={handleAccountClose}> Register</MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
