import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { appContext } from "../App";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setLoginStatus } = useContext(appContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    //alert("Login Successful");
    console.log("Form Data:", data);
    // Here you can handle the login logic, e.g., API call
    // For now, we will just navigate to the main page
    setLoginStatus(true); // Set login status to true
    navigate("/");
    reset(); // Reset the form after submission
  };

  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 0 } }}>
      <Box
        sx={{
          height: "87.5vh",
          backgroundColor: "#f3f3f3",
          backdropFilter: "blur(8px)",
          boxShadow: 1,
          borderRadius: 2,
          margin: "calc(var(--template-frame-height, 0px) + 8px) 0 0 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <h2>Welcome to the Login Page !</h2> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "40px 20px", md: "80px 120px" },
            gap: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              //display: { xs: "block", md: "none" },
              textAlign: "center",
              mb: 2,
              fontWeight: 600,
            }}
          >
            Login
          </Typography>
          <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: { xs: "100%", md: "400px" },
              //height: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Controller
              name="username"
              control={control}
              //rules={{ required: "User Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="User Name"
                  //required
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              //   rules={{
              //     required: "Password is required",
              //     pattern: {
              //       value:
              //         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/,
              //       message:
              //         "Contain atleast one lowercase, uppercase, number and a special symbol, Length between 6-20 characters",
              //     },
              //  }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  //required
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                padding: "10px 0",
                fontSize: "1rem",
                fontWeight: 500,
                mt: 2,
                bgcolor: "#0c3948",
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
