import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Divider,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";

import { usePDF } from "react-to-pdf";
import { appContext } from "../../../App";

const titleOptions = ["Mr.", "Ms.", "Mrs.", "Dr."];

const paymentOptions = [
  { value: "direct_debit", label: "Direct debit" },
  { value: "direct_deposit", label: "Direct deposit" },
];
const accountTypes = ["Cheque", "Transmission", "Savings"];

const AcknowledgementOfDebtForm = () => {
  const { customers, setCustomers, currentCustomer, setCurrentCustomer } =
    useContext(appContext);
  const navigate = useNavigate();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      memberNames: currentCustomer?.firstName ?? "",
      memberSurname: currentCustomer?.surname ?? "",
      memberTitle: currentCustomer?.title ?? "",
      memberInitials: currentCustomer?.initials ?? "",
      membershipNumber: currentCustomer?.membershipNo ?? "",
      idNumber: currentCustomer?.idPassportNumber ?? "",
      phoneH: "",
      phoneW: "",
      cellphone: currentCustomer?.contactNumber ?? "",
      fax: "",
      email: currentCustomer?.email ?? "",
      paymentMethod: "direct_debit",
      amountOwing: "",
      accHolderName: currentCustomer?.firstName ?? "",
      accountNumber: currentCustomer?.accountNumber ?? "",
      bankName: currentCustomer?.bankName ?? "",
      branchName: currentCustomer?.branchNameBank ?? "",
      branchNumber: currentCustomer?.branchCode ?? "",
      accountType: currentCustomer?.accountType ?? "Cheque",
      amountToBeDebited: "",
      debitDate: "",
    },
  });

  const { toPDF, targetRef } = usePDF({
    filename:
      "Discovery Claim Form " +
      currentCustomer?.firstName +
      " " +
      currentCustomer?.id +
      ".pdf",
    page: {
      margin: 10, // margin in mm
      format: "a4", // or 'letter', etc.
      orientation: "landscape", // or 'portrait'
    },
    canvas: {
      scale: 2, // higher scale improves quality
    },
    overrides: {
      pdf: {
        compress: true, // compress PDF
      },
      canvas: {
        useCORS: true, // enable cross-origin images
      },
    },
  });
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data) => {
    console.log(data);
    handleScrollToTop();
    toPDF();
    navigate("/");
    // Submit logic or PDF generation here
  };
  const paymentMethod = watch("paymentMethod");

  return (
    <Box ref={targetRef} p={3} maxWidth={1200} mx="auto">
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{ position: "relative", top: 35, left: 5 }}
      >
        Id:&nbsp;
        {currentCustomer?.id ?? ""}
      </Typography>
      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        sx={{
          background: "linear-gradient(90deg, #03d3b7ff, #03a5c5ff, #0330c5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
        }}
      >
        Discovery Acknowledgement of Claim Settlement Form 2025
      </Typography>
      <Alert severity="warning" sx={{ mb: 1 }}>
        Please complete all required fields based on the type of Claim you're
        requesting.
      </Alert>
      <Divider sx={{ mb: 2 }} />

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Main member details */}
        <Typography
          variant="subtitle1"
          sx={{ bgcolor: "#03a5c525", padding: "2px 4px", mb: 3 }}
        >
          1. Main Member Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="memberTitle"
              control={control}
              render={({ field }) => (
                <TextField {...field} select fullWidth label="Title">
                  {titleOptions.map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="memberInitials"
              control={control}
              // rules={{ required: "Initials are required" }}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Initials" />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="memberNames"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Member name(s)" fullWidth />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="memberSurname"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Member surname" fullWidth />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="membershipNumber"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Membership number" fullWidth />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="idNumber"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="ID number" fullWidth />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="phoneH"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Telephone (H)" fullWidth />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="phoneW"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Telephone (W)" fullWidth />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="cellphone"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Cellphone" fullWidth />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="fax"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Fax" fullWidth />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email address"
                  type="email"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Payment method */}
        <Typography
          variant="subtitle1"
          sx={{ bgcolor: "#03a5c525", padding: "2px 4px", mb: 3 }}
        >
          2. Method of Payment
        </Typography>
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              {paymentOptions.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio />}
                  label={opt.label}
                />
              ))}
            </RadioGroup>
          )}
        />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="amountOwing"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount owing (R)"
                  type="number"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Show extra fields if direct debit */}
        {paymentMethod === "direct_debit" && (
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ bgcolor: "#03a5c525", padding: "2px 4px", mb: 3 }}
            >
              3. Your banking details if you are paying by direct debit
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Controller
                  name="accHolderName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name of accountholder"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Controller
                  name="accountNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Account number" fullWidth />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Controller
                  name="bankName"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Bank name" fullWidth />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Controller
                  name="branchName"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Branch name" fullWidth />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Controller
                  name="branchNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Branch number" fullWidth />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Controller
                  name="accountType"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Type of account"
                      fullWidth
                    >
                      {accountTypes.map((type) => (
                        <MenuItem value={type} key={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Controller
                  name="amountToBeDebited"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full amount owing (R)"
                      type="number"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Controller
                  name="debitDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="To be debited on"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={5} sx={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Generate
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AcknowledgementOfDebtForm;
