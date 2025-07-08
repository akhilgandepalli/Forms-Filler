import React, { use, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { appContext } from "../../App.jsx"; // Adjust the import path as necessary

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

const yesNoOptions = ["Yes", "No"];

const genderOptions = ["Male", "Female"];

const DiscoveryForm2 = () => {
  const { customers, setCustomers, currentCustomer, setCurrentCustomer } =
    useContext(appContext);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      id: currentCustomer?.id || "", // Ensure id is included for updates
      // Main Applicant
      title: currentCustomer?.title ?? "",
      initials: currentCustomer?.initials ?? "",
      surname: currentCustomer?.surname ?? "",
      firstNames: currentCustomer?.firstNames ?? "",
      idPassportNumber: currentCustomer?.idPassportNumber ?? "",
      gender: currentCustomer?.gender ?? "",
      dateOfBirth: currentCustomer?.dateOfBirth ?? "",
      race: currentCustomer?.race ?? "",
      contactNumber: currentCustomer?.contactNumber ?? "",
      altNumber: currentCustomer?.altNumber ?? "",
      email: currentCustomer?.email ?? "",
      Address: currentCustomer?.Address ?? "",
      postalCode: currentCustomer?.postalCode ?? "",

      // Spouse/Partner
      spouseTitle: currentCustomer?.spouseTitle ?? "",
      spouseInitials: currentCustomer?.spouseInitials ?? "",
      spouseSurname: currentCustomer?.spouseSurname ?? "",
      spouseFirstNames: currentCustomer?.spouseFirstNames ?? "",
      spouseIdPassportNumber: currentCustomer?.spouseIdPassportNumber ?? "",
      spouseGender: currentCustomer?.spouseGender ?? "",
      spouseDateOfBirth: currentCustomer?.spouseDateOfBirth ?? "",
      spouseRace: currentCustomer?.spouseRace ?? "",
      maritalStatus: currentCustomer?.maritalStatus ?? "",

      // Dependant 1
      dependant1Title: currentCustomer?.dependant1Title ?? "",
      dependant1Initials: currentCustomer?.dependant1Initials ?? "",
      dependant1Surname: currentCustomer?.dependant1Surname ?? "",
      dependant1FirstNames: currentCustomer?.dependant1FirstNames ?? "",
      dependant1IdPassportNumber:
        currentCustomer?.dependant1IdPassportNumber ?? "",
      dependant1Gender: currentCustomer?.dependant1Gender ?? "",
      dependant1DateOfBirth: currentCustomer?.dependant1DateOfBirth ?? "",
      dependant1Race: currentCustomer?.dependant1Race ?? "",
      dependant1Relationship: currentCustomer?.dependant1Relationship ?? "",

      // Dependant 2
      dependant2Title: currentCustomer?.dependant2Title ?? "",
      dependant2Initials: currentCustomer?.dependant2Initials ?? "",
      dependant2Surname: currentCustomer?.dependant2Surname ?? "",
      dependant2FirstNames: currentCustomer?.dependant2FirstNames ?? "",
      dependant2IdPassportNumber:
        currentCustomer?.dependant2IdPassportNumber ?? "",
      dependant2Gender: currentCustomer?.dependant2Gender ?? "",
      dependant2DateOfBirth: currentCustomer?.dependant2DateOfBirth ?? "",
      dependant2Race: currentCustomer?.dependant2Race ?? "",
      dependant2Relationship: currentCustomer?.dependant2Relationship ?? "",

      // Dependant 3
      dependant3Title: currentCustomer?.dependant3Title ?? "",
      dependant3Initials: currentCustomer?.dependant3Initials ?? "",
      dependant3Surname: currentCustomer?.dependant3Surname ?? "",
      dependant3FirstNames: currentCustomer?.dependant3FirstNames ?? "",
      dependant3IdPassportNumber:
        currentCustomer?.dependant3IdPassportNumber ?? "",
      dependant3Gender: currentCustomer?.dependant3Gender ?? "",
      dependant3DateOfBirth: currentCustomer?.dependant3DateOfBirth ?? "",
      dependant3Race: currentCustomer?.dependant3Race ?? "",
      dependant3Relationship: currentCustomer?.dependant3Relationship ?? "",

      // Financial Adviser
      wantAdviser: currentCustomer?.wantAdviser ?? "",
      adviserName: currentCustomer?.adviserName ?? "",
      adviserCode: currentCustomer?.adviserCode ?? "",
      intermediaryHouse: currentCustomer?.intermediaryHouse ?? "",
      houseCode: currentCustomer?.houseCode ?? "",
      workTelephone: currentCustomer?.workTelephone ?? "",
      leadNumber: currentCustomer?.leadNumber ?? "",
      adviserEmail: currentCustomer?.adviserEmail ?? "",
      bankReferenceNumber: currentCustomer?.bankReferenceNumber ?? "",

      // Health Plan
      healthPlanOption: currentCustomer?.healthPlanOption ?? "",
      shariahCompliant: currentCustomer?.shariahCompliant ?? false,
      msaClaimPayment: currentCustomer?.msaClaimPayment ?? "",

      // KeyCare Plan
      grossEarningsMain: currentCustomer?.grossEarningsMain ?? "",
      grossEarningsSpouse: currentCustomer?.grossEarningsSpouse ?? "",
      keyCareGPMain: currentCustomer?.keyCareGPMain ?? "",
      keyCareGPSpouse: currentCustomer?.keyCareGPSpouse ?? "",

      // Employment
      employerName: currentCustomer?.employerName ?? "",
      employeeNumber: currentCustomer?.employeeNumber ?? "",
      dateOfEmployment: currentCustomer?.dateOfEmployment ?? "",
      branchName: currentCustomer?.branchName ?? "",
      branchNumber: currentCustomer?.branchNumber ?? "",

      // Banking - Contributions
      bankName: currentCustomer?.bankName ?? "",
      branchNameBank: currentCustomer?.branchNameBank ?? "",
      branchCode: currentCustomer?.branchCode ?? "",
      accountNumber: currentCustomer?.accountNumber ?? "",
      accountType: currentCustomer?.accountType ?? "",

      // Banking - Claims
      sameAccountForClaims: currentCustomer?.sameAccountForClaims ?? "",
      alternativeClaimsAccount: currentCustomer?.alternativeClaimsAccount ?? "",

      // Previous Medical Schemes
      allDependantsSameScheme: currentCustomer?.allDependantsSameScheme ?? "",
      scheme1Name: currentCustomer?.scheme1Name ?? "",
      scheme1StartDate: currentCustomer?.scheme1StartDate ?? "",
      scheme1EndDate: currentCustomer?.scheme1EndDate ?? "",
      scheme1StillMember: currentCustomer?.scheme1StillMember ?? "",
      scheme1ReasonLeaving: currentCustomer?.scheme1ReasonLeaving ?? "",
      scheme2Name: currentCustomer?.scheme2Name ?? "",
      scheme2StartDate: currentCustomer?.scheme2StartDate ?? "",
      scheme2EndDate: currentCustomer?.scheme2EndDate ?? "",
      scheme2StillMember: currentCustomer?.scheme2StillMember ?? "",
      scheme2ReasonLeaving: currentCustomer?.scheme2ReasonLeaving ?? "",
      scheme3Name: currentCustomer?.scheme3Name ?? "",
      scheme3StartDate: currentCustomer?.scheme3StartDate ?? "",
      scheme3EndDate: currentCustomer?.scheme3EndDate ?? "",
      scheme3StillMember: currentCustomer?.scheme3StillMember ?? "",
      scheme3ReasonLeaving: currentCustomer?.scheme3ReasonLeaving ?? "",

      // Moving from another scheme
      breakInMembership: currentCustomer?.breakInMembership ?? "",
      memberFor24Months: currentCustomer?.memberFor24Months ?? "",
      hospitalAdmission: currentCustomer?.hospitalAdmission ?? "",
      ongoingMedication: currentCustomer?.ongoingMedication ?? "",
      plannedExpenses: currentCustomer?.plannedExpenses ?? "",

      // Medical History
      condition1Diagnosis: currentCustomer?.condition1Diagnosis ?? "",
      condition1PatientName: currentCustomer?.condition1PatientName ?? "",
      condition1DateDiagnosed: currentCustomer?.condition1DateDiagnosed ?? "",
      condition1LastConsultation:
        currentCustomer?.condition1LastConsultation ?? "",
      condition1Medicine: currentCustomer?.condition1Medicine ?? "",
      condition2Diagnosis: currentCustomer?.condition2Diagnosis ?? "",
      condition2PatientName: currentCustomer?.condition2PatientName ?? "",
      condition2DateDiagnosed: currentCustomer?.condition2DateDiagnosed ?? "",
      condition2LastConsultation:
        currentCustomer?.condition2LastConsultation ?? "",
      condition2Medicine: currentCustomer?.condition2Medicine ?? "",
      condition3Diagnosis: currentCustomer?.condition3Diagnosis ?? "",
      condition3PatientName: currentCustomer?.condition3PatientName ?? "",
      condition3DateDiagnosed: currentCustomer?.condition3DateDiagnosed ?? "",
      condition3LastConsultation:
        currentCustomer?.condition3LastConsultation ?? "",
      condition3Medicine: currentCustomer?.condition3Medicine ?? "",

      // Privacy and Terms
      privacyDate: currentCustomer?.privacyDate ?? "",
      privacySignature: currentCustomer?.privacySignature ?? "",
      directMarketing: currentCustomer?.directMarketing ?? "",
      finalSignature: currentCustomer?.finalSignature ?? "",
      finalDate: currentCustomer?.finalDate ?? "",
    },
  });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    handleScrollToTop;
    // Update currentCustomer in context
    //setCurrentCustomer(data);
    // Update customers in context
    setCustomers((prevCustomers) => {
      const updatedCustomers = [...prevCustomers];
      const customerIndex = updatedCustomers.findIndex(
        (customer) => customer.id === currentCustomer?.id
      );
      if (customerIndex !== -1) {
        updatedCustomers[customerIndex] = data; // Update existing customer
      } else {
        // Determine the next id based on the last customer's id, or start at 1
        const nextId =
          updatedCustomers.length > 0
            ? updatedCustomers[updatedCustomers.length - 1].id + 1
            : 1;
        updatedCustomers.push({ ...data, id: nextId }); // Add new customer with incremented id
      }
      return updatedCustomers;
    });
    // Optionally, you can reset the form after submission
    reset(); // if you want to reset the form after submission
    navigate("/"); // Navigate to the form section page
    // Handle form submission here
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Discovery Health Medical Scheme Application (2025)
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Section 1: Main Applicant */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            1. About yourself (main applicant)
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="title"
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
                    error={!!errors.title}
                    helperText={errors.title?.message}
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
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="initials"
                control={control}
                // rules={{ required: "Initials are required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Initials"
                    error={!!errors.initials}
                    helperText={errors.initials?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="surname"
                control={control}
                rules={{ required: "Surname is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    fullWidth
                    label="Surname"
                    error={!!errors.surname}
                    helperText={errors.surname?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="firstNames"
                control={control}
                rules={{ required: "First names are required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    fullWidth
                    label="First names (as per ID)"
                    error={!!errors.firstNames}
                    helperText={errors.firstNames?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="idPassportNumber"
                control={control}
                rules={{ required: "ID or Passport Number is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    fullWidth
                    label="ID or Passport Number"
                    error={!!errors.idPassportNumber}
                    helperText={errors.idPassportNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControl fullWidth error={!!errors.gender}>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="gender"
                  size="small"
                  required
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {genderOptions.map((g) => (
                        <FormControlLabel
                          size="small"
                          key={g}
                          value={g}
                          control={<Radio size="small" />}
                          label={<span style={{ fontSize: "14px" }}>{g}</span>}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <FormHelperText>{errors.gender.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    required
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="race"
                control={control}
                rules={{ required: "Race is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    select
                    fullWidth
                    label="Race"
                    error={!!errors.race}
                    helperText={errors.race?.message}
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="contactNumber"
                control={control}
                rules={{
                  required: "Contact Number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Number must be exactly 10 digits",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    label="Contact Number"
                    variant="outlined"
                    required
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="altNumber"
                control={control}
                rules={{
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Number must be exactly 10 digits",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    label="Alternate Number"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    label="Email"
                    variant="outlined"
                    required
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="postalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    type="number"
                    fullWidth
                    label="Postal Code"
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="Address"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    required
                    fullWidth
                    label="Address"
                    multiline
                    rows={2}
                    error={!!errors.Address}
                    helperText={errors.Address?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* Section 2: Spouse or Partner */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            2. About your spouse or partner (only complete if applying for
            cover)
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="spouseTitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    label="Title"
                    error={!!errors.spouseTitle}
                    helperText={errors.spouseTitle?.message}
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
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="spouseInitials"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Initials"
                    error={!!errors.spouseInitials}
                    helperText={errors.spouseInitials?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="spouseSurname"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Surname"
                    error={!!errors.spouseSurname}
                    helperText={errors.spouseSurname?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="spouseFirstNames"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="First names (as per ID)"
                    error={!!errors.spouseFirstNames}
                    helperText={errors.spouseFirstNames?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="spouseIdPassportNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="ID or Passport Number"
                    error={!!errors.spouseIdPassportNumber}
                    helperText={errors.spouseIdPassportNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControl fullWidth error={!!errors.spouseGender}>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="spouseGender"
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
                {errors.spouseGender && (
                  <FormHelperText>{errors.spouseGender.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Controller
                name="spouseDateOfBirth"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.spouseDateOfBirth}
                    helperText={errors.spouseDateOfBirth?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="spouseRace"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    label="Race"
                    error={!!errors.spouseRace}
                    helperText={errors.spouseRace?.message}
                    sx={{ minWidth: "120px" }}
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Marital Status"
                    error={!!errors.maritalStatus}
                    helperText={errors.maritalStatus?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* Section 3: Dependants */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            3. About your dependants (only complete if they are also applying
            for cover)
          </Typography>

          {[1, 2, 3].map((depIndex) => (
            <Box key={depIndex} mb={4}>
              <Typography variant="subtitle1">Dependant {depIndex}</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Controller
                    name={`dependant${depIndex}Title`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        select
                        fullWidth
                        label="Title"
                        error={!!errors[`dependant${depIndex}Title`]}
                        helperText={
                          errors[`dependant${depIndex}Title`]?.message
                        }
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
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Controller
                    name={`dependant${depIndex}Initials`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Initials"
                        error={!!errors[`dependant${depIndex}Initials`]}
                        helperText={
                          errors[`dependant${depIndex}Initials`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name={`dependant${depIndex}Surname`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Surname"
                        error={!!errors[`dependant${depIndex}Surname`]}
                        helperText={
                          errors[`dependant${depIndex}Surname`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name={`dependant${depIndex}FirstNames`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="First names (as per ID)"
                        error={!!errors[`dependant${depIndex}FirstNames`]}
                        helperText={
                          errors[`dependant${depIndex}FirstNames`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name={`dependant${depIndex}IdPassportNumber`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="ID or Passport Number"
                        error={!!errors[`dependant${depIndex}IdPassportNumber`]}
                        helperText={
                          errors[`dependant${depIndex}IdPassportNumber`]
                            ?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <FormControl
                    fullWidth
                    error={!!errors[`dependant${depIndex}Gender`]}
                  >
                    <FormLabel>Gender</FormLabel>
                    <Controller
                      name={`dependant${depIndex}Gender`}
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          {genderOptions.map((g) => (
                            <FormControlLabel
                              key={g}
                              value={g}
                              control={<Radio size="small" />}
                              label={
                                <span style={{ fontSize: "14px" }}>{g}</span>
                              }
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                    {errors[`dependant${depIndex}Gender`] && (
                      <FormHelperText>
                        {errors[`dependant${depIndex}Gender`].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name={`dependant${depIndex}DateOfBirth`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors[`dependant${depIndex}DateOfBirth`]}
                        helperText={
                          errors[`dependant${depIndex}DateOfBirth`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Controller
                    name={`dependant${depIndex}Race`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        select
                        fullWidth
                        label="Race"
                        error={!!errors[`dependant${depIndex}Race`]}
                        helperText={errors[`dependant${depIndex}Race`]?.message}
                        sx={{ minWidth: "120px" }}
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
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name={`dependant${depIndex}Relationship`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Relationship to main member"
                        error={!!errors[`dependant${depIndex}Relationship`]}
                        helperText={
                          errors[`dependant${depIndex}Relationship`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
        <Divider />

        {/* Section 4: Financial adviser's details */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            4. Your financial adviser's details
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.wantAdviser}>
                <FormLabel>Do you want an adviser?</FormLabel>
                <Controller
                  name="wantAdviser"
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
                {errors.wantAdviser && (
                  <FormHelperText>{errors.wantAdviser.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="adviserName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Adviser's Name"
                    error={!!errors.adviserName}
                    helperText={errors.adviserName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="adviserCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Adviser Code"
                    error={!!errors.adviserCode}
                    helperText={errors.adviserCode?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="intermediaryHouse"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Intermediary House"
                    error={!!errors.intermediaryHouse}
                    helperText={errors.intermediaryHouse?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="houseCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="House Code"
                    error={!!errors.houseCode}
                    helperText={errors.houseCode?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="workTelephone"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Telephone Number (Work)"
                    error={!!errors.workTelephone}
                    helperText={errors.workTelephone?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="leadNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Lead Number"
                    error={!!errors.leadNumber}
                    helperText={errors.leadNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="adviserEmail"
                control={control}
                rules={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Email"
                    type="email"
                    error={!!errors.adviserEmail}
                    helperText={errors.adviserEmail?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="bankReferenceNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Bank Reference Number (ABSA/FNB only)"
                    error={!!errors.bankReferenceNumber}
                    helperText={errors.bankReferenceNumber?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* Section 5: Health Plan Selection */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            5. Please select your health plan
          </Typography>
          <Controller
            name="healthPlanOption"
            control={control}
            rules={{ required: "Health plan option is required" }}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                fullWidth
                label="Health Plan Option"
                placeholder="e.g., Executive, KeyCare Plus, etc."
                error={!!errors.healthPlanOption}
                helperText={errors.healthPlanOption?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="shariahCompliant"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Shariah-compliant plan"
              />
            )}
          />
          <Controller
            name="msaClaimPayment"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                fullWidth
                label="Medical Savings Account claim payment preference"
                placeholder="Discovery Health Rate or Cost"
                error={!!errors.msaClaimPayment}
                helperText={errors.msaClaimPayment?.message}
                sx={{ mt: 2 }}
              />
            )}
          />
        </Box>
        <Divider />

        {/* Section 6: KeyCare Plan */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            6. If you choose a KeyCare plan
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="grossEarningsMain"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Gross Earnings (Main Member)"
                    error={!!errors.grossEarningsMain}
                    helperText={errors.grossEarningsMain?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="grossEarningsSpouse"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Gross Earnings (Spouse/Partner)"
                    error={!!errors.grossEarningsSpouse}
                    helperText={errors.grossEarningsSpouse?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="keyCareGPMain"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="KeyCare GP (Main Member)"
                    error={!!errors.keyCareGPMain}
                    helperText={errors.keyCareGPMain?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="keyCareGPSpouse"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="KeyCare GP (Spouse/Partner)"
                    error={!!errors.keyCareGPSpouse}
                    helperText={errors.keyCareGPSpouse?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* Section 7: Employment Details */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            7. Your employment details
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="employerName"
                control={control}
                rules={{ required: "Employer name is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Employer Name"
                    error={!!errors.employerName}
                    helperText={errors.employerName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="employeeNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Employee Number"
                    error={!!errors.employeeNumber}
                    helperText={errors.employeeNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="dateOfEmployment"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Date of Employment"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOfEmployment}
                    helperText={errors.dateOfEmployment?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="branchName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Branch Name"
                    error={!!errors.branchName}
                    helperText={errors.branchName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="branchNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Branch Number"
                    error={!!errors.branchNumber}
                    helperText={errors.branchNumber?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* Section 8: Banking Details */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            8. Your banking details
          </Typography>
          <Typography variant="subtitle2">8.1 Contributions</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="bankName"
                control={control}
                rules={{ required: "Bank name is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Bank Name"
                    error={!!errors.bankName}
                    helperText={errors.bankName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="branchNameBank"
                control={control}
                rules={{ required: "Branch name is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Branch Name"
                    error={!!errors.branchNameBank}
                    helperText={errors.branchNameBank?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Controller
                name="branchCode"
                control={control}
                rules={{ required: "Branch code is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Branch Code"
                    error={!!errors.branchCode}
                    helperText={errors.branchCode?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="accountNumber"
                control={control}
                rules={{ required: "Account number is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Account Number"
                    error={!!errors.accountNumber}
                    helperText={errors.accountNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="accountType"
                control={control}
                rules={{ required: "Account type is required" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Account Type"
                    error={!!errors.accountType}
                    helperText={errors.accountType?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle2" sx={{ pt: 2 }}>
            8.2 Claims Refund
          </Typography>
          <FormControl
            fullWidth
            error={!!errors.sameAccountForClaims}
            sx={{ mb: 2 }}
          >
            <FormLabel>Use same account for claims refund?</FormLabel>
            <Controller
              name="sameAccountForClaims"
              control={control}
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
            {errors.sameAccountForClaims && (
              <FormHelperText>
                {errors.sameAccountForClaims.message}
              </FormHelperText>
            )}
          </FormControl>
          <Controller
            name="alternativeClaimsAccount"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                fullWidth
                label="Alternative Claims Account (if different)"
                error={!!errors.alternativeClaimsAccount}
                helperText={errors.alternativeClaimsAccount?.message}
              />
            )}
          />{" "}
        </Box>
        <Divider />

        {/* Section 9: Previous Medical Scheme Details */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            9. Previous medical scheme details
          </Typography>
          <FormControl
            fullWidth
            error={!!errors.allDependantsSameScheme}
            sx={{ mb: 1 }}
          >
            <FormLabel>Were all dependants on the same scheme?</FormLabel>
            <Controller
              name="allDependantsSameScheme"
              control={control}
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
            {errors.allDependantsSameScheme && (
              <FormHelperText>
                {errors.allDependantsSameScheme.message}
              </FormHelperText>
            )}
          </FormControl>
          {/* <Divider /> */}
          {[1, 2, 3].map((i) => (
            <Box key={i}>
              <Typography variant="subtitle2">Scheme {i}</Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name={`scheme${i}Name`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Name"
                        error={!!errors[`scheme${i}Name`]}
                        helperText={errors[`scheme${i}Name`]?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name={`scheme${i}StartDate`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors[`scheme${i}StartDate`]}
                        helperText={errors[`scheme${i}StartDate`]?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name={`scheme${i}EndDate`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors[`scheme${i}EndDate`]}
                        helperText={errors[`scheme${i}EndDate`]?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl
                    fullWidth
                    error={!!errors[`scheme${i}StillMember`]}
                  >
                    <FormLabel>Are they still a member?</FormLabel>
                    <Controller
                      name={`scheme${i}StillMember`}
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          {yesNoOptions.map((option) => (
                            <FormControlLabel
                              key={option}
                              value={option}
                              control={<Radio size="small" />}
                              label={
                                <span style={{ fontSize: "14px" }}>
                                  {option}
                                </span>
                              }
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                    {errors[`scheme${i}StillMember`] && (
                      <FormHelperText>
                        {errors[`scheme${i}StillMember`].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name={`scheme${i}ReasonLeaving`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Reason for leaving"
                        error={!!errors[`scheme${i}ReasonLeaving`]}
                        helperText={errors[`scheme${i}ReasonLeaving`]?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
        <Divider />

        {/* Section 10: Moving from another scheme */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            10. Moving from another medical scheme
          </Typography>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.breakInMembership}>
                <FormLabel>Break in membership &gt; 90 days?</FormLabel>
                <Controller
                  name="breakInMembership"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {yesNoOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={
                            <span style={{ fontSize: "14px" }}>{option}</span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.breakInMembership && (
                  <FormHelperText>
                    {errors.breakInMembership.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.memberFor24Months}>
                <FormLabel>Member for 24+ months?</FormLabel>
                <Controller
                  name="memberFor24Months"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {yesNoOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={
                            <span style={{ fontSize: "14px" }}>{option}</span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.memberFor24Months && (
                  <FormHelperText>
                    {errors.memberFor24Months.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.hospitalAdmission}>
                <FormLabel>Admitted to hospital in past 12 months?</FormLabel>
                <Controller
                  name="hospitalAdmission"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {yesNoOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={
                            <span style={{ fontSize: "14px" }}>{option}</span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.hospitalAdmission && (
                  <FormHelperText>
                    {errors.hospitalAdmission.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.ongoingMedication}>
                <FormLabel>Ongoing medication/treatment?</FormLabel>
                <Controller
                  name="ongoingMedication"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {yesNoOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={
                            <span style={{ fontSize: "14px" }}>{option}</span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.ongoingMedication && (
                  <FormHelperText>
                    {errors.ongoingMedication.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth error={!!errors.plannedExpenses}>
                <FormLabel>
                  Planned hospital/dental/medical expenses &gt; R2,000 in next
                  12 months?
                </FormLabel>
                <Controller
                  name="plannedExpenses"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {yesNoOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={
                            <span style={{ fontSize: "14px" }}>{option}</span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.plannedExpenses && (
                  <FormHelperText>
                    {errors.plannedExpenses.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* Section 11: Medical History Summary */}
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            11. Health questions summary
          </Typography>
          {[1, 2, 3].map((index) => (
            <Box key={index} mb={4}>
              <Typography variant="subtitle2">Condition {index}</Typography>
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Controller
                    name={`condition${index}Diagnosis`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label={`Diagnosis or Symptoms`}
                        error={!!errors[`condition${index}Diagnosis`]}
                        helperText={
                          errors[`condition${index}Diagnosis`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name={`condition${index}PatientName`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Patient Name"
                        error={!!errors[`condition${index}PatientName`]}
                        helperText={
                          errors[`condition${index}PatientName`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name={`condition${index}DateDiagnosed`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Date First Diagnosed"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors[`condition${index}DateDiagnosed`]}
                        helperText={
                          errors[`condition${index}DateDiagnosed`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller
                    name={`condition${index}LastConsultation`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Last Consultation or Symptoms Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors[`condition${index}LastConsultation`]}
                        helperText={
                          errors[`condition${index}LastConsultation`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 6 }}>
                  <Controller
                    name={`condition${index}Medicine`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="Medicine and Dosage"
                        error={!!errors[`condition${index}Medicine`]}
                        helperText={
                          errors[`condition${index}Medicine`]?.message
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
        <Divider />

        {/* Section 14: Final Declaration */}

        <Box mt={5} sx={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default DiscoveryForm2;
