import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { appContext } from "../../../App.jsx"; // Adjust the import path as necessary
import { usePDF } from "react-to-pdf";

import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormControl,
  FormLabel,
  Divider,
  Button,
  FormHelperText,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";

const titleOptions = ["Mr.", "Ms.", "Mrs.", "Dr."];
const raceOptions = [
  "African",
  "Coloured",
  "Indian/Asian",
  "White",
  "Other",
  "Do not want to disclose",
];
const maritalStatusOptions = ["Married", "Single", "Divorced", "Widowed"]; // Added from PDF Section 1
const accountTypeOptions = ["Cheque", "Savings"]; // Added from PDF Section 5

const yesNoOptions = ["Yes", "No"];
const genderOptions = ["Male", "Female"]; // Changed to M/F as per PDF

const DiscoveryMainMemberChangeForm = () => {
  const { customers, setCustomers, currentCustomer, setCurrentCustomer } =
    useContext(appContext);
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({
    filename:
      "Discovery Main Member Change Form " +
      currentCustomer?.firstName +
      " " +
      currentCustomer?.id +
      ".pdf",
    page: {
      margin: 10, // margin in mm
      format: "a4", // or 'letter', etc.
      orientation: "portrait", // or 'portrait'
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      id: currentCustomer?.id || "",
      // Section 1: About the new main member
      effectiveDateNewMainMember:
        currentCustomer?.effectiveDateNewMainMember ?? "",
      membershipNumber: currentCustomer?.membershipNo ?? "",
      newMainMemberTitle: currentCustomer?.title ?? "",
      newMainMemberInitials: currentCustomer?.initials ?? "",
      newMainMemberSurname: currentCustomer?.surname ?? "",
      newMainMemberFirstName: currentCustomer?.firstName ?? "",
      newMainMemberIdPassportNumber: currentCustomer?.idPassportNumber ?? "",
      newMainMemberGender: currentCustomer?.gender ?? "",
      newMainMemberDateOfBirth: currentCustomer?.dateOfBirth ?? "",
      newMainMemberRace: currentCustomer?.race ?? "",
      newMainMemberMaritalStatus:
        currentCustomer?.newMainMemberMaritalStatus ?? "",
      newMainMemberTelephoneH: currentCustomer?.newMainMemberTelephoneH ?? "",
      newMainMemberTelephoneW: currentCustomer?.newMainMemberTelephoneW ?? "",
      newMainMemberCellphone: currentCustomer?.contactNumber ?? "",
      newMainMemberEmail: currentCustomer?.email ?? "",
      newMainMemberPOBox: currentCustomer?.newMainMemberPOBox ?? "",
      newMainMemberSuite: currentCustomer?.newMainMemberSuite ?? "",
      newMainMemberPostnetSuite:
        currentCustomer?.newMainMemberPostnetSuite ?? "",
      newMainMemberPrivateBag: currentCustomer?.newMainMemberPrivateBag ?? "",
      newMainMemberBoxNumber: currentCustomer?.newMainMemberBoxNumber ?? "",
      newMainMemberPostalSuburb:
        currentCustomer?.newMainMemberPostalSuburb ?? "",
      newMainMemberPostalCode: currentCustomer?.newMainMemberPostalCode ?? "",
      newMainMemberUnitSuiteNumber:
        currentCustomer?.newMainMemberUnitSuiteNumber ?? "",
      newMainMemberComplexName: currentCustomer?.newMainMemberComplexName ?? "",
      newMainMemberStreetNumber:
        currentCustomer?.newMainMemberStreetNumber ?? "",
      newMainMemberStreetName: currentCustomer?.newMainMemberStreetName ?? "",
      newMainMemberPhysicalSuburb:
        currentCustomer?.newMainMemberPhysicalSuburb ?? "",
      newMainMemberPhysicalCity:
        currentCustomer?.newMainMemberPhysicalCity ?? "",
      newMainMemberPhysicalPostalCode: currentCustomer?.postalCode ?? "",

      // Section 2: Details of previous main member
      previousMainMemberTitle: currentCustomer?.previousMainMemberTitle ?? "",
      previousMainMemberInitials:
        currentCustomer?.previousMainMemberInitials ?? "",
      previousMainMemberSurname:
        currentCustomer?.previousMainMemberSurname ?? "",
      previousMainMemberFirstName:
        currentCustomer?.previousMainMemberFirstName ?? "",
      previousMainMemberIdPassportNumber:
        currentCustomer?.previousMainMemberIdPassportNumber ?? "",
      previousMainMemberGender: currentCustomer?.previousMainMemberGender ?? "",
      previousMainMemberDateOfBirth:
        currentCustomer?.previousMainMemberDateOfBirth ?? "",
      previousMainMemberRace: currentCustomer?.previousMainMemberRace ?? "",
      previousMainMemberMaritalStatus:
        currentCustomer?.previousMainMemberMaritalStatus ?? "",
      previousMainMemberTelephoneH:
        currentCustomer?.previousMainMemberTelephoneH ?? "",
      previousMainMemberTelephoneW:
        currentCustomer?.previousMainMemberTelephoneW ?? "",
      previousMainMemberCellphone:
        currentCustomer?.previousMainMemberCellphone ?? "",
      previousMainMemberEmail: currentCustomer?.previousMainMemberEmail ?? "",
      financiallyDependent: currentCustomer?.financiallyDependent ?? "",
      nettIncome: currentCustomer?.nettIncome ?? "",
      disabled: currentCustomer?.disabled ?? "",
      fullTimeStudent: currentCustomer?.fullTimeStudent ?? "",

      // Section 3: About your employer (applicable to new main member)
      employerName: currentCustomer?.employerName ?? "",
      employeeNumber: currentCustomer?.employeeNumber ?? "",
      dateOfEmployment: currentCustomer?.dateOfEmployment ?? "",
      branchName: currentCustomer?.branchName ?? "",
      branchNumber: currentCustomer?.branchNumber ?? "",

      // Section 4: If you have a KeyCare Plan
      mainMemberTotalEarnings: currentCustomer?.mainMemberTotalEarnings ?? "",
      spousePartnerTotalEarnings:
        currentCustomer?.spousePartnerTotalEarnings ?? "",
      mainMemberOccupation: currentCustomer?.mainMemberOccupation ?? "",
      spousePartnerOccupation: currentCustomer?.spousePartnerOccupation ?? "",

      // Section 5: Your banking details - 5.1 Contributions
      bankNameContributions: currentCustomer?.bankNameContributions ?? "",
      branchNameContributions: currentCustomer?.branchNameContributions ?? "",
      branchCodeContributions: currentCustomer?.branchCodeContributions ?? "",
      accountNumberContributions:
        currentCustomer?.accountNumberContributions ?? "",
      accountTypeContributions: currentCustomer?.accountTypeContributions ?? "",
      accountHolderContributions:
        currentCustomer?.accountHolderContributions ?? "",
      accountHolderPhysicalAddressContributionsUnit:
        currentCustomer?.accountHolderPhysicalAddressContributionsUnit ?? "",
      accountHolderPhysicalAddressContributionsComplex:
        currentCustomer?.accountHolderPhysicalAddressContributionsComplex ?? "",
      accountHolderPhysicalAddressContributionsStreetNo:
        currentCustomer?.accountHolderPhysicalAddressContributionsStreetNo ??
        "",
      accountHolderPhysicalAddressContributionsStreetName:
        currentCustomer?.accountHolderPhysicalAddressContributionsStreetName ??
        "",
      accountHolderPhysicalAddressContributionsCity:
        currentCustomer?.accountHolderPhysicalAddressContributionsCity ?? "",
      accountHolderPhysicalAddressContributionsPostalCode:
        currentCustomer?.accountHolderPhysicalAddressContributionsPostalCode ??
        "",
      accountHolderContactDetailsContributions:
        currentCustomer?.accountHolderContactDetailsContributions ?? "",
      accountHolderEmailContributions:
        currentCustomer?.accountHolderEmailContributions ?? "",
      thirdPartyIDPassportContributions:
        currentCustomer?.thirdPartyIDPassportContributions ?? "",
      jointAccountContributions:
        currentCustomer?.jointAccountContributions ?? false,
      companyAccountContributions:
        currentCustomer?.companyAccountContributions ?? false,
      trustAccountContributions:
        currentCustomer?.trustAccountContributions ?? false,

      // Section 5: Your banking details - 5.2 Claims and Medical Savings Account Refund
      sameAccountForRefund: currentCustomer?.sameAccountForRefund ?? "",
      bankNameRefund: currentCustomer?.bankNameRefund ?? "",
      branchNameRefund: currentCustomer?.branchNameRefund ?? "",
      branchCodeRefund: currentCustomer?.branchCodeRefund ?? "",
      accountNumberRefund: currentCustomer?.accountNumberRefund ?? "",
      accountTypeRefund: currentCustomer?.accountTypeRefund ?? "",
      accountHolderRefund: currentCustomer?.accountHolderRefund ?? "",
      thirdPartyIDPassportRefund:
        currentCustomer?.thirdPartyIDPassportRefund ?? "",
      jointAccountRefund: currentCustomer?.jointAccountRefund ?? false,
      companyAccountRefund: currentCustomer?.companyAccountRefund ?? false,
      trustAccountRefund: currentCustomer?.trustAccountRefund ?? false,

      // Section 6: Your financial adviser's details
      financialAdviserOption: currentCustomer?.financialAdviserOption ?? "", // "current", "new", "waiver"
      financialAdviserName: currentCustomer?.financialAdviserName ?? "",
      financialAdviserCode: currentCustomer?.financialAdviserCode ?? "",
      intermediaryHouse: currentCustomer?.intermediaryHouse ?? "",
      intermediaryHouseCode: currentCustomer?.intermediaryHouseCode ?? "",
      financialAdviserTelephoneW:
        currentCustomer?.financialAdviserTelephoneW ?? "",
      leadNumber: currentCustomer?.leadNumber ?? "",
      financialAdviserEmail: currentCustomer?.financialAdviserEmail ?? "",
      bankReferenceNumber: currentCustomer?.bankReferenceNumber ?? "",
    },
  });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // You would typically send this data to a backend or update global state
    // setCustomers(prevCustomers => {
    //   const updatedCustomers = prevCustomers.map(cust =>
    //     cust.id === data.id ? { ...cust, ...data } : cust
    //   );
    //   return updatedCustomers;
    // });
    // setCurrentCustomer(data);
    handleScrollToTop();
    toPDF();
    // navigate("/"); // Uncomment if you want to navigate after submission
  };

  const watchSameAccountForRefund = watch("sameAccountForRefund");
  const watchFinancialAdviserOption = watch("financialAdviserOption");

  return (
    <Box
      ref={targetRef}
      sx={{ maxWidth: 1200, mx: "auto", padding: 3, boxShadow: 1 }}
    >
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
        gutterBottom
        textAlign="center"
        sx={{
          background: "linear-gradient(90deg, #03d3b7ff, #03a5c5ff, #0330c5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
        }}
      >
        Discovery Health Medical Scheme Applicant Change Form 2025
      </Typography>
      <Alert severity="warning" sx={{ mb: 1 }}>
        Please complete all required fields based on the type of update you're
        requesting.
      </Alert>
      <Divider sx={{ mb: 1 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Section 1: About the new main member */}
        <Box my={4}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ bgcolor: "#03a5c525", padding: "2px 4px", mb: 3 }}
          >
            1. About the new main member
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="effectiveDateNewMainMember"
                control={control}
                rules={{ required: "Effective date is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    required
                    label="Effective date of the new main member"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.effectiveDateNewMainMember}
                    helperText={errors.effectiveDateNewMainMember?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="membershipNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Membership number"
                    error={!!errors.membershipNumber}
                    helperText={errors.membershipNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberTitle"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    select
                    fullWidth
                    label="Title"
                    error={!!errors.newMainMemberTitle}
                    helperText={errors.newMainMemberTitle?.message}
                  >
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
                name="newMainMemberInitials"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Initials"
                    error={!!errors.newMainMemberInitials}
                    helperText={errors.newMainMemberInitials?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberSurname"
                control={control}
                rules={{ required: "Surname is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    fullWidth
                    label="Surname"
                    error={!!errors.newMainMemberSurname}
                    helperText={errors.newMainMemberSurname?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberFirstName"
                control={control}
                rules={{ required: "First name(s) are required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    fullWidth
                    label="First name(s)"
                    error={!!errors.newMainMemberFirstName}
                    helperText={errors.newMainMemberFirstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberIdPassportNumber"
                control={control}
                rules={{ required: "ID or passport number is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    fullWidth
                    label="ID or passport number"
                    error={!!errors.newMainMemberIdPassportNumber}
                    helperText={errors.newMainMemberIdPassportNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControl
                fullWidth
                required
                error={!!errors.newMainMemberGender}
              >
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="newMainMemberGender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {genderOptions.map((g) => (
                        <FormControlLabel
                          key={g}
                          value={g}
                          control={<Radio size="small" />}
                          label={<span style={{ fontSize: "14px" }}>{g}</span>}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.newMainMemberGender && (
                  <FormHelperText>
                    {errors.newMainMemberGender.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberDateOfBirth"
                control={control}
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    required
                    label="Date of birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.newMainMemberDateOfBirth}
                    helperText={errors.newMainMemberDateOfBirth?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberRace"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    label="Race"
                    error={!!errors.newMainMemberRace}
                    helperText={errors.newMainMemberRace?.message}
                  >
                    {raceOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberMaritalStatus"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    label="Marital status"
                    error={!!errors.newMainMemberMaritalStatus}
                    helperText={errors.newMainMemberMaritalStatus?.message}
                  >
                    {maritalStatusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberTelephoneH"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Telephone (H)"
                    error={!!errors.newMainMemberTelephoneH}
                    helperText={errors.newMainMemberTelephoneH?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberTelephoneW"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Telephone (W)"
                    error={!!errors.newMainMemberTelephoneW}
                    helperText={errors.newMainMemberTelephoneW?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberCellphone"
                control={control}
                rules={{
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Cellphone number must be 10 digits",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Cellphone"
                    error={!!errors.newMainMemberCellphone}
                    helperText={errors.newMainMemberCellphone?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="newMainMemberEmail"
                control={control}
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Email"
                    error={!!errors.newMainMemberEmail}
                    helperText={errors.newMainMemberEmail?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Postal address (Post collected from post box, suite or private
                bag)
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControlLabel
                control={
                  <Controller
                    name="newMainMemberPOBox"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={!!field.value} />
                    )}
                  />
                }
                label="PO Box"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControlLabel
                control={
                  <Controller
                    name="newMainMemberSuite"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={!!field.value} />
                    )}
                  />
                }
                label="Suite"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControlLabel
                control={
                  <Controller
                    name="newMainMemberPostnetSuite"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={!!field.value} />
                    )}
                  />
                }
                label="Postnet Suite"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControlLabel
                control={
                  <Controller
                    name="newMainMemberPrivateBag"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={!!field.value} />
                    )}
                  />
                }
                label="Private Bag"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberBoxNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Box number"
                    error={!!errors.newMainMemberBoxNumber}
                    helperText={errors.newMainMemberBoxNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberPostalSuburb"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Suburb"
                    error={!!errors.newMainMemberPostalSuburb}
                    helperText={errors.newMainMemberPostalSuburb?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberPostalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Postal code"
                    error={!!errors.newMainMemberPostalCode}
                    helperText={errors.newMainMemberPostalCode?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Physical address (If your post is delivered to your street
                address, please complete these details under physical address)
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberUnitSuiteNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Unit/Suite number"
                    error={!!errors.newMainMemberUnitSuiteNumber}
                    helperText={errors.newMainMemberUnitSuiteNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberComplexName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Complex name"
                    error={!!errors.newMainMemberComplexName}
                    helperText={errors.newMainMemberComplexName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberStreetNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Street number"
                    error={!!errors.newMainMemberStreetNumber}
                    helperText={errors.newMainMemberStreetNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberStreetName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Street name"
                    error={!!errors.newMainMemberStreetName}
                    helperText={errors.newMainMemberStreetName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberPhysicalSuburb"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Suburb"
                    error={!!errors.newMainMemberPhysicalSuburb}
                    helperText={errors.newMainMemberPhysicalSuburb?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberPhysicalCity"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="City"
                    error={!!errors.newMainMemberPhysicalCity}
                    helperText={errors.newMainMemberPhysicalCity?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="newMainMemberPhysicalPostalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Postal code"
                    error={!!errors.newMainMemberPhysicalPostalCode}
                    helperText={errors.newMainMemberPhysicalPostalCode?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* Section 2: Details of previous main member */}
        <Box my={4}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ bgcolor: "#03a5c525", padding: "2px 4px", mb: 3 }}
          >
            2. Details of previous main member
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            If you need to change the main member due to the death of the
            previous main member, please attach a certified copy of the death
            certificate.
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberTitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    label="Title"
                    error={!!errors.previousMainMemberTitle}
                    helperText={errors.previousMainMemberTitle?.message}
                  >
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
                name="previousMainMemberInitials"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Initials"
                    error={!!errors.previousMainMemberInitials}
                    helperText={errors.previousMainMemberInitials?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberSurname"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Surname"
                    error={!!errors.previousMainMemberSurname}
                    helperText={errors.previousMainMemberSurname?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberFirstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="First name(s)"
                    error={!!errors.previousMainMemberFirstName}
                    helperText={errors.previousMainMemberFirstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberIdPassportNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="ID or passport number"
                    error={!!errors.previousMainMemberIdPassportNumber}
                    helperText={
                      errors.previousMainMemberIdPassportNumber?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControl fullWidth error={!!errors.previousMainMemberGender}>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="previousMainMemberGender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {genderOptions.map((g) => (
                        <FormControlLabel
                          key={g}
                          value={g}
                          control={<Radio size="small" />}
                          label={<span style={{ fontSize: "14px" }}>{g}</span>}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.previousMainMemberGender && (
                  <FormHelperText>
                    {errors.previousMainMemberGender.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberDateOfBirth"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Date of birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.previousMainMemberDateOfBirth}
                    helperText={errors.previousMainMemberDateOfBirth?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberRace"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    label="Race"
                    error={!!errors.previousMainMemberRace}
                    helperText={errors.previousMainMemberRace?.message}
                  >
                    {raceOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberMaritalStatus"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    label="Marital status"
                    error={!!errors.previousMainMemberMaritalStatus}
                    helperText={errors.previousMainMemberMaritalStatus?.message}
                  >
                    {maritalStatusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberTelephoneH"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Telephone (H)"
                    error={!!errors.previousMainMemberTelephoneH}
                    helperText={errors.previousMainMemberTelephoneH?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberTelephoneW"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Telephone (W)"
                    error={!!errors.previousMainMemberTelephoneW}
                    helperText={errors.previousMainMemberTelephoneW?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="previousMainMemberCellphone"
                control={control}
                rules={{
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Cellphone number must be 10 digits",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Cellphone"
                    error={!!errors.previousMainMemberCellphone}
                    helperText={errors.previousMainMemberCellphone?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="previousMainMemberEmail"
                control={control}
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Email"
                    error={!!errors.previousMainMemberEmail}
                    helperText={errors.previousMainMemberEmail?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 2, mb: 1 }}
              >
                We need to get the following information according to Section 18
                of the Income Tax Act 1962: [cite: 105]
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControl fullWidth error={!!errors.financiallyDependent}>
                <FormLabel>
                  Are you financially dependent on the new main member? [cite:
                  106]
                </FormLabel>
                <Controller
                  name="financiallyDependent"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {yesNoOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio size="small" />}
                          label={
                            <span style={{ fontSize: "14px" }}>{option}</span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.financiallyDependent && (
                  <FormHelperText>
                    {errors.financiallyDependent.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="nettIncome"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Please specify your nett income"
                    InputProps={{ startAdornment: "R" }}
                    error={!!errors.nettIncome}
                    helperText={errors.nettIncome?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControl fullWidth error={!!errors.disabled}>
                <FormLabel>Are you disabled? [cite: 112]</FormLabel>
                <Controller
                  name="disabled"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {yesNoOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio size="small" />}
                          label={
                            <span style={{ fontSize: "14px" }}>{option}</span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.disabled && (
                  <FormHelperText>{errors.disabled.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControl fullWidth error={!!errors.fullTimeStudent}>
                <FormLabel>Are you a full-time student? [cite: 114]</FormLabel>
                <Controller
                  name="fullTimeStudent"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {yesNoOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio size="small" />}
                          label={
                            <span style={{ fontSize: "14px" }}>{option}</span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.fullTimeStudent && (
                  <FormHelperText>
                    {errors.fullTimeStudent.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* Section 3: About your employer (applicable to new main member) */}
        <Box my={4}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ bgcolor: "#03a5c525", padding: "2px 4px", mb: 3 }}
          >
            3. About your employer (applicable to new main member)
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="employerName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Employer name"
                    error={!!errors.employerName}
                    helperText={errors.employerName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="employeeNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Employee number"
                    error={!!errors.employeeNumber}
                    helperText={errors.employeeNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="dateOfEmployment"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Date of employment"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOfEmployment}
                    helperText={errors.dateOfEmployment?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="branchName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Branch name"
                    error={!!errors.branchName}
                    helperText={errors.branchName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="branchNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Branch number"
                    error={!!errors.branchNumber}
                    helperText={errors.branchNumber?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* Section 4: If you have a KeyCare Plan */}
        <Box my={4}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ bgcolor: "#03a5c525", padding: "2px 4px", mb: 3 }}
          >
            4. If you have a KeyCare Plan
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Income verification will be conducted for the lower income bands.
            [cite: 129] Income is considered as: The higher of the main member's
            or registered spouse or partner's earnings, commission and rewards
            from employment; interest from investments; income from leasing of
            assets or property; distributions received from a trust, pension
            and/or provident fund; receipt of any financial assistance in terms
            of any statutory social assistance programme. [cite: 130, 131, 132]
          </Typography>
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            IMPORTANT NOTICE: [cite: 133] Declaring income lower than your
            actual income constitutes fraud. This will lead to the immediate
            termination of your membership and criminal charges may be brought
            against you. [cite: 134] If your income is not declared, your income
            verification status will default to the highest income band. [cite:
            135] It is your responsibility to provide accurate income
            information otherwise the Scheme may not be in a position to refund
            the excess amount paid by you. [cite: 136] By signing this
            application form, you give your permission for us to verify your
            declared income using all relevant internal and external sources.
            [cite: 137]
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="mainMemberTotalEarnings"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Main member - Total earning over the last 12 months (R)"
                    error={!!errors.mainMemberTotalEarnings}
                    helperText={errors.mainMemberTotalEarnings?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="spousePartnerTotalEarnings"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Spouse or partner - Total earning over the last 12 months (R)"
                    error={!!errors.spousePartnerTotalEarnings}
                    helperText={errors.spousePartnerTotalEarnings?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="mainMemberOccupation"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Main member - Occupation"
                    error={!!errors.mainMemberOccupation}
                    helperText={errors.mainMemberOccupation?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="spousePartnerOccupation"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Spouse or partner - Occupation"
                    error={!!errors.spousePartnerOccupation}
                    helperText={errors.spousePartnerOccupation?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" sx={{ mt: 2 }}>
                I declare that this income declaration is true and accurate.
                [cite: 139]
              </Typography>
            </Grid>
            {/* Signature of new main member - implied from rule to sign section 4 */}
          </Grid>
        </Box>
        <Divider />

        {/* Section 5: Your banking details */}
        <Box my={4}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ bgcolor: "#03a5c525", padding: "2px 4px", mb: 3 }}
          >
            5. Your banking details
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            5.1. Your contributions
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            If you will be paying your contributions in full, please complete
            this section:
            <br />
            Please note: We cannot accept credit card account details and only
            South African banking details are accepted. [cite: 157] If we are
            debiting a third party account, the main member must sign next to
            the account holder.
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="bankNameContributions"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Bank name"
                    error={!!errors.bankNameContributions}
                    helperText={errors.bankNameContributions?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="branchNameContributions"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Branch name"
                    error={!!errors.branchNameContributions}
                    helperText={errors.branchNameContributions?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="branchCodeContributions"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Branch code"
                    error={!!errors.branchCodeContributions}
                    helperText={errors.branchCodeContributions?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="accountNumberContributions"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Account number"
                    error={!!errors.accountNumberContributions}
                    helperText={errors.accountNumberContributions?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControl fullWidth error={!!errors.accountTypeContributions}>
                <FormLabel>Type of account</FormLabel>
                <Controller
                  name="accountTypeContributions"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {accountTypeOptions.map((type) => (
                        <FormControlLabel
                          key={type}
                          value={type}
                          control={<Radio size="small" />}
                          label={
                            <span style={{ fontSize: "14px" }}>{type}</span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.accountTypeContributions && (
                  <FormHelperText>
                    {errors.accountTypeContributions.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="accountHolderContributions"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Account holder"
                    error={!!errors.accountHolderContributions}
                    helperText={errors.accountHolderContributions?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Account holder's physical address (own/3rd party/trust/company)
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="accountHolderPhysicalAddressContributionsUnit"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Unit/Suite number"
                    error={
                      !!errors.accountHolderPhysicalAddressContributionsUnit
                    }
                    helperText={
                      errors.accountHolderPhysicalAddressContributionsUnit
                        ?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="accountHolderPhysicalAddressContributionsComplex"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Complex name"
                    error={
                      !!errors.accountHolderPhysicalAddressContributionsComplex
                    }
                    helperText={
                      errors.accountHolderPhysicalAddressContributionsComplex
                        ?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="accountHolderPhysicalAddressContributionsStreetNo"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Street number"
                    error={
                      !!errors.accountHolderPhysicalAddressContributionsStreetNo
                    }
                    helperText={
                      errors.accountHolderPhysicalAddressContributionsStreetNo
                        ?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="accountHolderPhysicalAddressContributionsStreetName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Street name"
                    error={
                      !!errors.accountHolderPhysicalAddressContributionsStreetName
                    }
                    helperText={
                      errors.accountHolderPhysicalAddressContributionsStreetName
                        ?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="accountHolderPhysicalAddressContributionsCity"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="City"
                    error={
                      !!errors.accountHolderPhysicalAddressContributionsCity
                    }
                    helperText={
                      errors.accountHolderPhysicalAddressContributionsCity
                        ?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="accountHolderPhysicalAddressContributionsPostalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Postal code"
                    error={
                      !!errors.accountHolderPhysicalAddressContributionsPostalCode
                    }
                    helperText={
                      errors.accountHolderPhysicalAddressContributionsPostalCode
                        ?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="accountHolderContactDetailsContributions"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Account holder contact details"
                    error={!!errors.accountHolderContactDetailsContributions}
                    helperText={
                      errors.accountHolderContactDetailsContributions?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="accountHolderEmailContributions"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Account holder email address"
                    error={!!errors.accountHolderEmailContributions}
                    helperText={errors.accountHolderEmailContributions?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 2, mb: 1 }}
              >
                If we are debiting from a third party bank account, the main
                member must insert the ID or passport number of the third party.
                [cite: 176]
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="thirdPartyIDPassportContributions"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="ID or passport number (Third party)"
                    error={!!errors.thirdPartyIDPassportContributions}
                    helperText={
                      errors.thirdPartyIDPassportContributions?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormLabel sx={{ mb: 1 }}>
                If the third party bank account is a [cite: 178]
              </FormLabel>
              <Grid container>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Controller
                        name="jointAccountContributions"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} checked={!!field.value} />
                        )}
                      />
                    }
                    label="Joint account"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Controller
                        name="companyAccountContributions"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} checked={!!field.value} />
                        )}
                      />
                    }
                    label="Company account"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Controller
                        name="trustAccountContributions"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} checked={!!field.value} />
                        )}
                      />
                    }
                    label="Trust account"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
            5.2. Your claims and claims and medical savings account refund
          </Typography>
          <FormControl fullWidth error={!!errors.sameAccountForRefund}>
            <FormLabel>
              Can we use the same account we deduct contributions from to refund
              your claims and medical savings account?
            </FormLabel>
            <Controller
              name="sameAccountForRefund"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  {yesNoOptions.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio size="small" />}
                      label={<span style={{ fontSize: "14px" }}>{option}</span>}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.sameAccountForRefund && (
              <FormHelperText>
                {errors.sameAccountForRefund.message}
              </FormHelperText>
            )}
          </FormControl>

          {watchSameAccountForRefund === "No" && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                If you do not want to use the same banking details for your
                contributions and claims refunds, please give us the details you
                would like to use.
                <br />
                Please note: We cannot accept credit card account details. We no
                longer issue cheques. [cite: 198] If no details are provided it
                will impact your claims payment. [cite: 199]
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="bankNameRefund"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Bank name"
                        error={!!errors.bankNameRefund}
                        helperText={errors.bankNameRefund?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="branchNameRefund"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Branch name"
                        error={!!errors.branchNameRefund}
                        helperText={errors.branchNameRefund?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="branchCodeRefund"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Branch code"
                        error={!!errors.branchCodeRefund}
                        helperText={errors.branchCodeRefund?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="accountNumberRefund"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Account number"
                        error={!!errors.accountNumberRefund}
                        helperText={errors.accountNumberRefund?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <FormControl fullWidth error={!!errors.accountTypeRefund}>
                    <FormLabel>Type of account</FormLabel>
                    <Controller
                      name="accountTypeRefund"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          {accountTypeOptions.map((type) => (
                            <FormControlLabel
                              key={type}
                              value={type}
                              control={<Radio size="small" />}
                              label={
                                <span style={{ fontSize: "14px" }}>{type}</span>
                              }
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                    {errors.accountTypeRefund && (
                      <FormHelperText>
                        {errors.accountTypeRefund.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Controller
                    name="accountHolderRefund"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Account holder"
                        error={!!errors.accountHolderRefund}
                        helperText={errors.accountHolderRefund?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 2, mb: 1 }}
                  >
                    If we are paying a third party bank account, the main member
                    must insert the ID or passport number of the third party.
                    [cite: 200]
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="thirdPartyIDPassportRefund"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="ID or passport number (Third party)"
                        error={!!errors.thirdPartyIDPassportRefund}
                        helperText={errors.thirdPartyIDPassportRefund?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <FormLabel sx={{ mb: 1 }}>
                    If the third party bank account is a [cite: 211]
                  </FormLabel>
                  <Grid container>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Controller
                            name="jointAccountRefund"
                            control={control}
                            render={({ field }) => (
                              <Checkbox {...field} checked={!!field.value} />
                            )}
                          />
                        }
                        label="Joint account"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Controller
                            name="companyAccountRefund"
                            control={control}
                            render={({ field }) => (
                              <Checkbox {...field} checked={!!field.value} />
                            )}
                          />
                        }
                        label="Company account"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Controller
                            name="trustAccountRefund"
                            control={control}
                            render={({ field }) => (
                              <Checkbox {...field} checked={!!field.value} />
                            )}
                          />
                        }
                        label="Trust account"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
          {/* Signatures for Section 5 - Account holder signature and new main member signature */}
          <Typography variant="body2" sx={{ mt: 2 }}>
            By signing this application, you agree that once claims have been
            refunded into the bank account you have chosen, the Scheme will not
            be responsible in any way for the amounts refunded. [cite: 247]
          </Typography>
        </Box>
        <Divider />

        {/* Section 6: Your financial adviser's details */}
        <Box my={4}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ bgcolor: "#03a5c525", padding: "2px 4px", mb: 3 }}
          >
            6. Your financial adviser's details
          </Typography>
          <FormControl fullWidth error={!!errors.financialAdviserOption}>
            <FormLabel>Please choose one of the following options: </FormLabel>
            <Controller
              name="financialAdviserOption"
              control={control}
              rules={{ required: "Please select an option" }}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="current"
                    control={<Radio size="small" />}
                    label={
                      <span style={{ fontSize: "14px" }}>
                        I choose to remain with the current intermediary from
                        the employer of previous main member [cite: 257]
                      </span>
                    }
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio size="small" />}
                    label={
                      <span style={{ fontSize: "14px" }}>
                        I would like to choose a new intermediary [cite: 258]
                      </span>
                    }
                  />
                  <FormControlLabel
                    value="waiver"
                    control={<Radio size="small" />}
                    label={
                      <span style={{ fontSize: "14px" }}>
                        Accept intermediary waiver [cite: 261] (I select to
                        continue without financial advice from any financial
                        adviser and understand that this decision will have no
                        impact on my monthly contribution [cite: 260])
                      </span>
                    }
                  />
                </RadioGroup>
              )}
            />
            {errors.financialAdviserOption && (
              <FormHelperText>
                {errors.financialAdviserOption.message}
              </FormHelperText>
            )}
          </FormControl>

          {watchFinancialAdviserOption === "new" && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Please complete the section below with the new intermediary
                details, if the second option is selected above
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="financialAdviserName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Financial adviser's name"
                        error={!!errors.financialAdviserName}
                        helperText={errors.financialAdviserName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="financialAdviserCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Code"
                        error={!!errors.financialAdviserCode}
                        helperText={errors.financialAdviserCode?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="intermediaryHouse"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Intermediary house"
                        error={!!errors.intermediaryHouse}
                        helperText={errors.intermediaryHouse?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="intermediaryHouseCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Code"
                        error={!!errors.intermediaryHouseCode}
                        helperText={errors.intermediaryHouseCode?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="financialAdviserTelephoneW"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Financial adviser's telephone number (W)"
                        error={!!errors.financialAdviserTelephoneW}
                        helperText={errors.financialAdviserTelephoneW?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="leadNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Lead number"
                        error={!!errors.leadNumber}
                        helperText={errors.leadNumber?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="financialAdviserEmail"
                    control={control}
                    rules={{
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Email"
                        error={!!errors.financialAdviserEmail}
                        helperText={errors.financialAdviserEmail?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name="bankReferenceNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Bank reference number (if applicable)"
                        error={!!errors.bankReferenceNumber}
                        helperText={errors.bankReferenceNumber?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        <Divider />

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

export default DiscoveryMainMemberChangeForm;
