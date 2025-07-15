import React, { useContext, useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { appContext } from "../../App.jsx";
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
  Tabs,
  Tab,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import AlertBar from "../AlertBar.jsx";

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

const requiredFields = [
  "title",
  "surname",
  "firstName",
  "idPassportNumber",
  "gender",
  "dateOfBirth",
  "race",
  "contactNumber",
  "email",
  "Address",
  "postalCode",
  "membershipNo",
  "medicalAid",
  "medicalAidPlan",
];

const sections = [
  { label: "Main Applicant", id: "main" },
  { label: "Spouse/Partner", id: "spouse" },
  { label: "Dependants", id: "dependants" },
  { label: "Financial Adviser", id: "adviser" },
  { label: "Health Plan", id: "health" },
  { label: "KeyCare Plan", id: "keycare" },
  { label: "Employment", id: "employment" },
  { label: "Banking", id: "banking" },
  { label: "Previous Schemes", id: "previous" },
  { label: "Moving Schemes", id: "moving" },
  { label: "Medical History", id: "medical" },
];

const NewForm = ({ currentCustomer, setCurrentCustomer }) => {
  const { customers, setCustomers } = useContext(appContext);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  //const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isMainSectionValid, setIsMainSectionValid] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const custId = 111;
  if (isEdit) {
    const customer = customers.find((e) => e.id === custId);
    setCurrentCustomer(customer);
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: currentCustomer?.id || "",
      // Main Applicant
      title: currentCustomer?.title ?? "",
      initials: currentCustomer?.initials ?? "",
      surname: currentCustomer?.surname ?? "",
      firstName: currentCustomer?.firstName ?? "",
      idPassportNumber: currentCustomer?.idPassportNumber ?? "",
      gender: currentCustomer?.gender ?? "",
      dateOfBirth: currentCustomer?.dateOfBirth ?? "",
      race: currentCustomer?.race ?? "",
      contactNumber: currentCustomer?.contactNumber ?? "",
      altNumber: currentCustomer?.altNumber ?? "",
      email: currentCustomer?.email ?? "",
      Address: currentCustomer?.Address ?? "",
      postalCode: currentCustomer?.postalCode ?? "",
      medicalAid: currentCustomer?.medicalAid ?? "",
      medicalAidPlan: currentCustomer?.medicalAidPlan ?? "",
      membershipNo: currentCustomer?.membershipNo ?? "",

      // Spouse/Partner
      spouseTitle: currentCustomer?.spouseTitle ?? "",
      spouseInitials: currentCustomer?.spouseInitials ?? "",
      spouseSurname: currentCustomer?.spouseSurname ?? "",
      spousefirstName: currentCustomer?.spousefirstName ?? "",
      spouseIdPassportNumber: currentCustomer?.spouseIdPassportNumber ?? "",
      spouseGender: currentCustomer?.spouseGender ?? "",
      spouseDateOfBirth: currentCustomer?.spouseDateOfBirth ?? "",
      spouseRace: currentCustomer?.spouseRace ?? "",
      maritalStatus: currentCustomer?.maritalStatus ?? "",

      // Dependants
      dependant1Title: currentCustomer?.dependant1Title ?? "",
      dependant1Initials: currentCustomer?.dependant1Initials ?? "",
      dependant1Surname: currentCustomer?.dependant1Surname ?? "",
      dependant1firstName: currentCustomer?.dependant1firstName ?? "",
      dependant1IdPassportNumber:
        currentCustomer?.dependant1IdPassportNumber ?? "",
      dependant1Gender: currentCustomer?.dependant1Gender ?? "",
      dependant1DateOfBirth: currentCustomer?.dependant1DateOfBirth ?? "",
      dependant1Race: currentCustomer?.dependant1Race ?? "",
      dependant1Relationship: currentCustomer?.dependant1Relationship ?? "",
      dependant1medicalAid: currentCustomer?.dependent1medicalAid ?? "",
      dependant1medicalAidPlan: currentCustomer?.dependent1medicalAidPlan ?? "",
      dependant1membershipNo: currentCustomer?.dependent1membershipNo ?? "",

      dependant2Title: currentCustomer?.dependant2Title ?? "",
      dependant2Initials: currentCustomer?.dependant2Initials ?? "",
      dependant2Surname: currentCustomer?.dependant2Surname ?? "",
      dependant2firstName: currentCustomer?.dependant2firstName ?? "",
      dependant2IdPassportNumber:
        currentCustomer?.dependant2IdPassportNumber ?? "",
      dependant2Gender: currentCustomer?.dependant2Gender ?? "",
      dependant2DateOfBirth: currentCustomer?.dependant2DateOfBirth ?? "",
      dependant2Race: currentCustomer?.dependant2Race ?? "",
      dependant2Relationship: currentCustomer?.dependant2Relationship ?? "",
      dependant2medicalAid: currentCustomer?.dependent2medicalAid ?? "",
      dependant2medicalAidPlan: currentCustomer?.dependent2medicalAidPlan ?? "",
      dependant2membershipNo: currentCustomer?.dependent2membershipNo ?? "",

      dependant3Title: currentCustomer?.dependant3Title ?? "",
      dependant3Initials: currentCustomer?.dependant3Initials ?? "",
      dependant3Surname: currentCustomer?.dependant3Surname ?? "",
      dependant3firstName: currentCustomer?.dependant3firstName ?? "",
      dependant3IdPassportNumber:
        currentCustomer?.dependant3IdPassportNumber ?? "",
      dependant3Gender: currentCustomer?.dependant3Gender ?? "",
      dependant3DateOfBirth: currentCustomer?.dependant3DateOfBirth ?? "",
      dependant3Race: currentCustomer?.dependant3Race ?? "",
      dependant3Relationship: currentCustomer?.dependant3Relationship ?? "",
      dependant3medicalAid: currentCustomer?.dependent3medicalAid ?? "",
      dependant3medicalAidPlan: currentCustomer?.dependent3medicalAidPlan ?? "",
      dependant3membershipNo: currentCustomer?.dependent3membershipNo ?? "",

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

  const mainApplicantValues = watch(requiredFields);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateMainSection = useCallback(async () => {
    const isValid = await trigger(requiredFields);
    setIsMainSectionValid(isValid);
    return isValid;
  }, [trigger]);

  const handleNext = async () => {
    if (activeSection === 0) {
      const isValid = await validateMainSection();
      if (!isValid) return;
    }
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
      handleScrollToTop();
    }
  };

  const handlePrev = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      handleScrollToTop();
    }
  };

  const handleTabChange = async (event, newValue) => {
    if (newValue > 0) {
      const isValid = await validateMainSection();
      if (!isValid) {
        return;
      }
    }
    setActiveSection(newValue);
    handleScrollToTop();
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    handleScrollToTop();
    setCustomers((prevCustomers) => {
      const updatedCustomers = [...prevCustomers];
      const customerIndex = updatedCustomers.findIndex(
        (customer) => customer.id === currentCustomer?.id
      );
      if (customerIndex !== -1) {
        updatedCustomers[customerIndex] = data;
      } else {
        const nextId =
          updatedCustomers.length > 0
            ? updatedCustomers[updatedCustomers.length - 1].id + 1
            : 1;
        updatedCustomers.push({ ...data, id: nextId });
      }
      return updatedCustomers;
    });
    reset();
    setOpenAlert(true);
    setTimeout(() => {
      navigate("/");
    }, 3000); // Alert disappears after 1 second
  };

  // useEffect(() => {
  //   if (activeSection === 0) {
  //     const timer = setTimeout(() => {
  //       validateMainSection();
  //     }, 300); // Small debounce to prevent excessive validation

  //     return () => clearTimeout(timer);
  //   }
  // }, [mainApplicantValues, activeSection, validateMainSection]);

  return (
    <Box>
      <Tabs
        value={activeSection}
        //onChange={(e, newValue) => setActiveSection(newValue)}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 1 }}
      >
        {sections.map((section, index) => (
          <Tab
            key={section.id}
            label={section.label}
            value={index}
            disabled={index > 0 && !watch(requiredFields)}
          />
        ))}
      </Tabs>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Section 1: Main Applicant */}
        {activeSection === 0 && (
          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              1. About yourself (main applicant)
            </Typography>
            <Grid container spacing={2}>
              {/* ... (Main Applicant fields remain the same) ... */}
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
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "First names are required" }}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      {...field}
                      required
                      fullWidth
                      label="First names (as per ID)"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <FormControl fullWidth required error={!!errors.gender}>
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
                            label={
                              <span style={{ fontSize: "14px" }}>{g}</span>
                            }
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
              <Grid size={{ xs: 12, sm: 4 }}>
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
              <Grid size={{ xs: 12, sm: 4 }}>
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
              <Grid size={{ xs: 12, sm: 4 }}>
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
              <Grid size={{ xs: 12, sm: 4 }}>
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
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="medicalAid"
                  control={control}
                  rules={{ required: "Medical Aid is required" }}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      {...field}
                      required
                      label="Medical Aid"
                      fullWidth
                      error={!!errors.medicalAid}
                      helperText={errors.medicalAid?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="medicalAidPlan"
                  control={control}
                  rules={{ required: "Medical Aid Plan is required" }}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      {...field}
                      required
                      label="Medical Aid Plan"
                      fullWidth
                      error={!!errors.medicalAidPlan}
                      helperText={errors.medicalAidPlan?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="membershipNo"
                  control={control}
                  rules={{ required: "Membership Number is required" }}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      {...field}
                      required
                      label="Membership No."
                      fullWidth
                      error={!!errors.membershipNo}
                      helperText={errors.membershipNo?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="postalCode"
                  control={control}
                  rules={{ required: "Postal code is required" }}
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
                  rules={{ required: "Address is required" }}
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
        )}

        {/* Section 2: Spouse or Partner */}
        {activeSection === 1 && (
          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              2. About your spouse or partner
            </Typography>
            <Grid container spacing={2}>
              {/* ... (Spouse/Partner fields remain the same) ... */}
              <Grid size={{ xs: 6, sm: 2 }}>
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
              <Grid size={{ xs: 6, sm: 2 }}>
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
              <Grid size={{ xs: 12, sm: 4 }}>
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
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="spousefirstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      {...field}
                      fullWidth
                      label="First names (as per ID)"
                      error={!!errors.spousefirstName}
                      helperText={errors.spousefirstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
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
                            label={
                              <span style={{ fontSize: "14px" }}>{g}</span>
                            }
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors.spouseGender && (
                    <FormHelperText>
                      {errors.spouseGender.message}
                    </FormHelperText>
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
              <Grid size={{ xs: 12, sm: 4 }}>
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
        )}

        {/* Section 3: Dependants */}
        {activeSection === 2 && (
          <Box my={2}>
            {/* ... (Dependants fields remain the same) ... */}
            <Typography variant="h6" gutterBottom>
              3. About your dependants (only complete if they are also applying
              for cover)
            </Typography>

            {[1, 2, 3].map((depIndex) => (
              <Box key={depIndex} mb={4}>
                <Typography variant="subtitle1" mb={1}>
                  Dependant {depIndex}
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 2 }}>
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
                  <Grid size={{ xs: 6, sm: 2 }}>
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
                  <Grid size={{ xs: 12, sm: 4 }}>
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
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller
                      name={`dependant${depIndex}firstName`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          fullWidth
                          label="First names (as per ID)"
                          error={!!errors[`dependant${depIndex}firstName`]}
                          helperText={
                            errors[`dependant${depIndex}firstName`]?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller
                      name={`dependant${depIndex}IdPassportNumber`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          fullWidth
                          label="ID or Passport Number"
                          error={
                            !!errors[`dependant${depIndex}IdPassportNumber`]
                          }
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
                          helperText={
                            errors[`dependant${depIndex}Race`]?.message
                          }
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
                  <Grid size={{ xs: 12, sm: 4 }}>
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
        )}

        {/* Section 4: Financial adviser's details */}
        {activeSection === 3 && (
          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              4. Your financial adviser's details
            </Typography>
            {/* ... (Financial Adviser fields remain the same) ... */}
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
                    <FormHelperText>
                      {errors.wantAdviser.message}
                    </FormHelperText>
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
        )}

        {/* Section 5: Health Plan Selection */}
        {activeSection === 4 && (
          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              5. Please select your health plan
            </Typography>
            {/* ... (Health Plan fields remain the same) ... */}
            <Controller
              name="healthPlanOption"
              control={control}
              rules={{ required: "Health plan option is required" }}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  required
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
        )}

        {/* Section 6: KeyCare Plan */}
        {activeSection === 5 && (
          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              6. If you choose a KeyCare plan
            </Typography>
            {/* ... (KeyCare Plan fields remain the same) ... */}
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
        )}

        {/* Section 7: Employment Details */}
        {activeSection === 6 && (
          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              7. Your employment details
            </Typography>
            {/* ... (Employment fields remain the same) ... */}
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
                      required
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
        )}

        {/* Section 8: Banking Details */}
        {activeSection === 7 && (
          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              8. Your banking details
            </Typography>
            {/* ... (Banking fields remain the same) ... */}
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
                      required
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
                      required
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
                      required
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
                      required
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
                        label={
                          <span style={{ fontSize: "14px" }}>{option}</span>
                        }
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
        )}

        {/* Section 9: Previous Medical Scheme Details */}
        {activeSection === 8 && (
          <Box my={2}>
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
                        label={
                          <span style={{ fontSize: "14px" }}>{option}</span>
                        }
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
                          helperText={
                            errors[`scheme${i}ReasonLeaving`]?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        )}

        {/* Section 10: Moving from another scheme */}
        {activeSection === 9 && (
          <Box my={2}>
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
        )}

        {/* Section 11: Medical History Summary */}
        {activeSection === 10 && (
          <Box my={2}>
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
        )}

        {/* Navigation buttons */}
        <Box
          mt={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Button
            variant="outlined"
            onClick={handlePrev}
            disabled={activeSection === 0}
          >
            Previous
          </Button>

          {activeSection === sections.length - 1 && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isMainSectionValid}
            >
              {currentCustomer ? "Update" : "Save"}
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={
              activeSection === sections.length - 1 && !isMainSectionValid
            }
          >
            Next
          </Button>
        </Box>
        <AlertBar
          message={currentCustomer ? "Customer Updated Successfully" :"Customer created successfully"}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
        />
      </form>
    </Box>
  );
};

export default NewForm;
