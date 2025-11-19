import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import html2pdf from "html2pdf.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Divider,
  Alert,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { appContext } from "../../../App";
import { useNavigate } from "react-router";

const GapCoverProfileUpdateForm = () => {
  const { currentCustomer } = useContext(appContext);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Section 1: Update Type
      updateType: "",

      // Section 2: Current Policyholder Details
      currentPolicyholderName: "",
      currentPolicyholderSurname: "",
      currentPolicyholderId: "",
      currentPolicyholderPolicyNo: "",
      statusChangeReason: "",

      // Section 3: Policyholder Details
      policyholderTitle: currentCustomer?.title ?? "",
      policyholderName: currentCustomer?.firstName ?? "",
      policyholderSurname: currentCustomer?.surname ?? "",
      policyholderIdPassport: currentCustomer?.idPassportNumber ?? "",
      policyholderDob: currentCustomer?.dateOfBirth ?? "",
      policyholderCellphone: currentCustomer?.contactNumber ?? "",
      policyholderAltContact: currentCustomer?.altNumber ?? "",
      policyholderAddress: currentCustomer?.Address ?? "",
      policyholderPostalCode: currentCustomer?.postalCode ?? "",
      policyholderEmail: currentCustomer?.email ?? "",
      policyholderMedicalAid: currentCustomer?.medicalAid ?? "",
      policyholderMedicalAidPlan: currentCustomer?.medicalAidPlan ?? "",
      policyholderMembershipNo: currentCustomer?.membershipNo ?? "",

      // Section 4: Dependant Details
      dependants: [
        {
          title: "",
          name: "",
          surname: "",
          relationship: "",
          idPassport: "",
          medicalAid: "",
          medicalAidPlan: "",
          membershipNo: "",
          dob: "",
          coverStartDate: "",
          isTransferApplicant: false,
          preExistingConditions: [],
          plannedProcedures: [],
        },
        {
          title: "",
          name: "",
          surname: "",
          relationship: "",
          idPassport: "",
          medicalAid: "",
          medicalAidPlan: "",
          membershipNo: "",
          dob: "",
          coverStartDate: "",
          isTransferApplicant: false,
          preExistingConditions: [],
          plannedProcedures: [],
        },
      ],

      // Section 5: Option Change
      selectedOption: "",
      effectiveDate: "",
      acceptOptionTerms: false,

      // Section 6: Financial Advisor
      brokerageName: "",
      financialAdvisorName: currentCustomer?.adviserName ?? "",
      brokerageCode: "",
      advisorCode: currentCustomer?.adviserCode ?? "",
      professionalFee: 0,
      policyPremium: 0,
      totalPremium: 0,
      acceptFeeTerms: false,

      // Section 7: Debit Order
      bankAccountType: "cheque",
      bankName: currentCustomer?.bankName ?? "",
      bankAccountNo: currentCustomer?.accountNumber ?? "",
      accountHolder: "",
      debitOrderDate: "1st",
      paymentTerm: "monthly",

      // Section 8: Acceptance
      acceptTerms: false,
      acceptPOPI: false,
      signature: "",
      signatureDate: "",
    },
  });

  const updateType = watch("updateType");
  const isTransferApplicant = watch(`dependants.0.isTransferApplicant`);
  const acceptOptionTerms = watch("acceptOptionTerms");
  const acceptFeeTerms = watch("acceptFeeTerms");
  const acceptTerms = watch("acceptTerms");
  const acceptPOPI = watch("acceptPOPI");

  const handlePrint = () => {
    const element = document.getElementById("profileUpdateForm");
    const formTitle = "2025 Gap Cover Profile Update Form";
    const customerName = `${currentCustomer?.firstName} ${currentCustomer?.id}`;
    const fileName = `${formTitle} - ${customerName}.pdf`;
    html2pdf(element, {
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    });
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    handlePrint();
    navigate("/");
  };

  const addPreExistingCondition = (dependantIndex) => {
    // Implementation to add new condition row
  };

  const addPlannedProcedure = (dependantIndex) => {
    // Implementation to add new procedure row
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: "2px" }}>
      <Paper id={"profileUpdateForm"} elevation={3} sx={{ p: 2 }}>
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
          sx={{ color: "#1976d2", fontWeight: "bold", textAlign: "center" }}
        >
          2025 GAP COVER PROFILE UPDATE FORM
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Please complete all required fields based on the type of update you're
          requesting.
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Section 1: Update Type */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
              >
                1. UPDATE YOUR PROFILE
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Please select the change to be made to your profile.
              </Typography>

              <FormControl fullWidth>
                <Controller
                  name="updateType"
                  control={control}
                  rules={{ required: "Update type is required" }}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="appointAdvisor"
                        control={<Radio />}
                        label="Appoint a financial advisor (Complete Sections 3, 6 and 8.)"
                      />
                      <FormControlLabel
                        value="addDependant"
                        control={<Radio />}
                        label="Add my dependant (Complete Sections 3, 4, 7 and 8. Please submit supporting documents for underwriting purposes when adding dependants.)"
                      />
                      <FormControlLabel
                        value="changeOption"
                        control={<Radio />}
                        label="Change my option (Complete Sections 3, 5, 7 and 8.)"
                      />
                      <FormControlLabel
                        value="corporateToPrivate"
                        control={<Radio />}
                        label="Change my corporate policy to private capacity (Complete Sections 3, 5, 7 and 8. Complete Section 6 if you're appointing a financial advisor.)"
                      />
                      <FormControlLabel
                        value="changeDebitOrder"
                        control={<Radio />}
                        label="Change my debit order details (Complete Sections 3, 7 and 8.)"
                      />
                      <FormControlLabel
                        value="statusSwap"
                        control={<Radio />}
                        label="Do a status swop to note someone else as the policyholder (Complete Sections 2, 3, 7 and 8.)"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.updateType && (
                  <Typography color="error" variant="caption">
                    {errors.updateType.message}
                  </Typography>
                )}
              </FormControl>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                For other profile changes not listed here, like removing a
                dependant, email your request to us at:
                yoursupport@stratumbenefits.co.za
              </Typography>
            </CardContent>
          </Card>

          {/* Section 2: Current Policyholder Details (shown only for status swap) */}
          {updateType === "statusSwap" && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    color: "#fff",
                    bgcolor: "#f36c23",
                    pl: 1,
                    ml: -1,
                    mb: 2,
                  }}
                >
                  2. CURRENT POLICYHOLDER DETAILS
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Complete this section if a new policyholder must be noted on
                  the policy, as indicated in Section 1 - Update Your Profile.
                </Typography>

                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel component="legend">
                    Reason for status change:
                  </FormLabel>
                  <Controller
                    name="statusChangeReason"
                    control={control}
                    rules={{ required: "Reason is required" }}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="deceased"
                          control={<Radio />}
                          label="Policyholder has passed away (Attach a copy of the death certificate.)"
                        />
                        <FormControlLabel
                          value="alignMedicalAid"
                          control={<Radio />}
                          label="Policyholder and main member of the medical aid membership to align (Attach a copy of the medical aid membership certificate.)"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.statusChangeReason && (
                    <Typography color="error" variant="caption">
                      {errors.statusChangeReason.message}
                    </Typography>
                  )}
                </FormControl>

                <Grid container spacing={2}>
                  <Grid size={{xs:12, sm:6}}>
                    <Controller
                      name="currentPolicyholderName"
                      control={control}
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          label="Name"
                          fullWidth
                          error={!!errors.currentPolicyholderName}
                          helperText={errors.currentPolicyholderName?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <Controller
                      name="currentPolicyholderSurname"
                      control={control}
                      rules={{ required: "Surname is required" }}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          label="Surname"
                          fullWidth
                          error={!!errors.currentPolicyholderSurname}
                          helperText={
                            errors.currentPolicyholderSurname?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <Controller
                      name="currentPolicyholderPolicyNo"
                      control={control}
                      rules={{ required: "Policy number is required" }}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          label="Policy No."
                          fullWidth
                          error={!!errors.currentPolicyholderPolicyNo}
                          helperText={
                            errors.currentPolicyholderPolicyNo?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <Controller
                      name="currentPolicyholderId"
                      control={control}
                      rules={{ required: "ID/Passport is required" }}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          label="ID/Passport No."
                          fullWidth
                          error={!!errors.currentPolicyholderId}
                          helperText={errors.currentPolicyholderId?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Section 3: Policyholder Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
              >
                3. POLICYHOLDER DETAILS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Please complete this section to ensure we have your most
                up-to-date details.
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{xs:12, sm:2}}>
                  <Controller
                    name="policyholderTitle"
                    control={control}
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        select
                        fullWidth
                        label="Title"
                        error={!!errors.policyholderTitle}
                        helperText={errors.policyholderTitle?.message}
                      >
                        {["Mr.", "Ms.", "Mrs.", "Dr."].map((title) => (
                          <MenuItem key={title} value={title}>
                            {title}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm: 5}}>
                  <Controller
                    name="policyholderName"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Name"
                        fullWidth
                        error={!!errors.policyholderName}
                        helperText={errors.policyholderName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm: 5}}>
                  <Controller
                    name="policyholderSurname"
                    control={control}
                    rules={{ required: "Surname is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Surname"
                        fullWidth
                        error={!!errors.policyholderSurname}
                        helperText={errors.policyholderSurname?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="policyholderIdPassport"
                    control={control}
                    rules={{ required: "ID/Passport is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="ID/Passport No."
                        fullWidth
                        error={!!errors.policyholderIdPassport}
                        helperText={errors.policyholderIdPassport?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="policyholderDob"
                    control={control}
                    rules={{ required: "Date of birth is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Date of Birth"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.policyholderDob}
                        helperText={errors.policyholderDob?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="policyholderCellphone"
                    control={control}
                    rules={{ required: "Cellphone is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Cellphone No."
                        fullWidth
                        error={!!errors.policyholderCellphone}
                        helperText={errors.policyholderCellphone?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="policyholderAltContact"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Alternative Contact No."
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:8}}>
                  <Controller
                    name="policyholderAddress"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Physical/Postal Address"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:4}}>
                  <Controller
                    name="policyholderPostalCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Postal Code"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="policyholderEmail"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Email Address"
                        fullWidth
                        error={!!errors.policyholderEmail}
                        helperText={errors.policyholderEmail?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="policyholderMedicalAid"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Medical Aid"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="policyholderMedicalAidPlan"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Medical Aid Plan"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="policyholderMembershipNo"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Membership No."
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Section 4: Addition of Dependant (shown only for addDependant) */}
          {(updateType === "addDependant" ||
            updateType === "corporateToPrivate") && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    color: "#fff",
                    bgcolor: "#f36c23",
                    pl: 1,
                    ml: -1,
                    mb: 2,
                  }}
                >
                  4. ADDITION OF DEPENDANT
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Your policy covers you and your spouse, even if you belong to
                  different medical aids or medical aid plans, including the
                  dependants registered on either medical aid plan.
                </Typography>

                {[0, 1].map((index) => (
                  <React.Fragment key={index}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", my: 2 }}
                    >
                      Dependant {index + 1}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{xs:12, sm:2}}>
                        <Controller
                          name={`dependants.${index}.title`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              select
                              fullWidth
                              label="Title"
                            >
                              {["Mr.", "Ms.", "Mrs.", "Dr."].map((title) => (
                                <MenuItem key={title} value={title}>
                                  {title}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm: 5}}>
                        <Controller
                          name={`dependants.${index}.name`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              label="Name"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm: 5}}>
                        <Controller
                          name={`dependants.${index}.surname`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              label="Surname"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <Controller
                          name={`dependants.${index}.relationship`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              label="Relationship"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <Controller
                          name={`dependants.${index}.idPassport`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              label="ID/Passport No."
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <Controller
                          name={`dependants.${index}.medicalAid`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              label="Medical Aid"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <Controller
                          name={`dependants.${index}.medicalAidPlan`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              label="Medical Aid Plan"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <Controller
                          name={`dependants.${index}.membershipNo`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              label="Membership No."
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <Controller
                          name={`dependants.${index}.dob`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              label="Date of Birth"
                              type="date"
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <Controller
                          name={`dependants.${index}.coverStartDate`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              {...field}
                              label="Cover Start Date"
                              type="date"
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <Controller
                          name={`dependants.${index}.isTransferApplicant`}
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox {...field} checked={field.value} />
                              }
                              label="Is your dependant a transfer applicant switching cover from another Gap Cover provider?"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>

                    {/* Pre-Existing Medical Condition Disclosure */}
                    <Typography
                      variant="subtitle2"
                      sx={{ mt: 3, fontWeight: "bold" }}
                    >
                      PRE-EXISTING MEDICAL CONDITION DISCLOSURE
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      As the policyholder, you accept the responsibility of
                      answering this section for your dependants.
                    </Typography>

                    <TableContainer component={Paper} sx={{ mb: 3 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>NAME</TableCell>
                            <TableCell>
                              PRE-EXISTING MEDICAL CONDITION
                            </TableCell>
                            <TableCell>LAST TREATMENT DATE</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Render existing conditions */}
                          {watch(
                            `dependants.${index}.preExistingConditions`
                          )?.map((condition, conditionIndex) => (
                            <TableRow key={conditionIndex}>
                              <TableCell>
                                <Controller
                                  name={`dependants.${index}.preExistingConditions.${conditionIndex}.name`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      fullWidth
                                      size="small"
                                    />
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Controller
                                  name={`dependants.${index}.preExistingConditions.${conditionIndex}.condition`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      fullWidth
                                      size="small"
                                    />
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Controller
                                  name={`dependants.${index}.preExistingConditions.${conditionIndex}.lastTreatmentDate`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      type="date"
                                      fullWidth
                                      size="small"
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() =>
                                    removePreExistingCondition(
                                      index,
                                      conditionIndex
                                    )
                                  }
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button
                        variant="outlined"
                        onClick={() => addPreExistingCondition(index)}
                        sx={{ mt: 1, ml: 1 }}
                      >
                        Add Condition
                      </Button>
                    </TableContainer>

                    {/* Planned Medical Procedure Disclosure (shown only for transfer applicants) */}
                    {watch(`dependants.${index}.isTransferApplicant`) && (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ mt: 3, fontWeight: "bold" }}
                        >
                          PLANNED MEDICAL PROCEDURE DISCLOSURE FOR DEPENDANTS
                          TRANSFERRING COVER
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          Please indicate if any pre-existing medical condition
                          stated in the Pre-Existing Medical Condition
                          Disclosure section will require an investigation,
                          medical procedure, surgery or treatment within the
                          first 10 months of your dependants' cover start dates.
                        </Typography>

                        <TableContainer component={Paper} sx={{ mb: 3 }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>NAME</TableCell>
                                <TableCell>PLANNED MEDICAL PROCEDURE</TableCell>
                                <TableCell>MEDICAL PROCEDURE DATE</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {/* Render existing procedures */}
                              {watch(
                                `dependants.${index}.plannedProcedures`
                              )?.map((procedure, procedureIndex) => (
                                <TableRow key={procedureIndex}>
                                  <TableCell>
                                    <Controller
                                      name={`dependants.${index}.plannedProcedures.${procedureIndex}.name`}
                                      control={control}
                                      render={({ field }) => (
                                        <TextField
                                          {...field}
                                          fullWidth
                                          size="small"
                                        />
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Controller
                                      name={`dependants.${index}.plannedProcedures.${procedureIndex}.procedure`}
                                      control={control}
                                      render={({ field }) => (
                                        <TextField
                                          {...field}
                                          fullWidth
                                          size="small"
                                        />
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Controller
                                      name={`dependants.${index}.plannedProcedures.${procedureIndex}.procedureDate`}
                                      control={control}
                                      render={({ field }) => (
                                        <TextField
                                          {...field}
                                          type="date"
                                          fullWidth
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                        />
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      size="small"
                                      onClick={() =>
                                        removePlannedProcedure(
                                          index,
                                          procedureIndex
                                        )
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Button
                            variant="outlined"
                            onClick={() => addPlannedProcedure(index)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Add Procedure
                          </Button>
                        </TableContainer>
                      </>
                    )}

                    {index < 1 && <Divider sx={{ my: 3 }} />}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Section 5: Option Change (shown only for changeOption or corporateToPrivate) */}
          {(updateType === "changeOption" ||
            updateType === "corporateToPrivate") && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    color: "#fff",
                    bgcolor: "#f36c23",
                    pl: 1,
                    ml: -1,
                    mb: 2,
                  }}
                >
                  5. CONTINUATION OF COVER/OPTION CHANGE
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  If your Stratum Benefits Gap Cover policy started before age
                  65, you'll pay a 64 or younger premium when continuing cover
                  in a private capacity or changing your option.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Select your Gap Cover option:
                    </Typography>
                    <TableContainer component={Paper} sx={{ mb: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>AGES</TableCell>
                            <TableCell>
                              COMPACT<sup>200</sup>
                            </TableCell>
                            <TableCell>
                              MERIDIAN<sup>100</sup>
                            </TableCell>
                            <TableCell>
                              ELITE<sup>200</sup>
                            </TableCell>
                            <TableCell>ACCESS OPTIMISER</TableCell>
                            <TableCell>
                              ACCESS CO-PAY PLUS<sup>200</sup>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Individual 35 or Younger</TableCell>
                            <TableCell></TableCell>
                            <TableCell>R 250</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Individual between 36 and 64</TableCell>
                            <TableCell></TableCell>
                            <TableCell>R 320</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Individual 64 or Younger</TableCell>
                            <TableCell>R 330</TableCell>
                            <TableCell></TableCell>
                            <TableCell>R 481</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Family 64 or Younger</TableCell>
                            <TableCell>R 399</TableCell>
                            <TableCell>R 320</TableCell>
                            <TableCell>R 591</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Individual or Family 64 or Younger
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>R 197</TableCell>
                            <TableCell>R 404</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Individual 65 or Older</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>R 780</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Family 65 or Older</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>R 954</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Individual or Family 65 or Older
                            </TableCell>
                            <TableCell>R 629</TableCell>
                            <TableCell>R 698</TableCell>
                            <TableCell></TableCell>
                            <TableCell>R 262</TableCell>
                            <TableCell>R 537</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Controller
                      name="selectedOption"
                      control={control}
                      rules={{ required: "Option selection is required" }}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          select
                          fullWidth
                          label="Select Option"
                          error={!!errors.selectedOption}
                          helperText={errors.selectedOption?.message}
                        >
                          {[
                            "COMPACT200",
                            "MERIDIAN100",
                            "ELITE200",
                            "ACCESS OPTIMISER",
                            "ACCESS CO-PAY PLUS200",
                          ].map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <Controller
                      name="effectiveDate"
                      control={control}
                      rules={{ required: "Effective date is required" }}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          label="Effective Continuation / Option Change Date"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.effectiveDate}
                          helperText={errors.effectiveDate?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="acceptOptionTerms"
                      control={control}
                      rules={{ required: "You must accept the terms" }}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              checked={field.value}
                              sx={{
                                color: errors.acceptOptionTerms
                                  ? "error.main"
                                  : "primary.main",
                              }}
                            />
                          }
                          label="I understand the benefits my chosen Gap Cover option offers and accept the terms and conditions of cover."
                        />
                      )}
                    />
                    {errors.acceptOptionTerms && (
                      <Typography
                        color="error"
                        variant="caption"
                        display="block"
                      >
                        {errors.acceptOptionTerms.message}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
          {/* Section 6: Appoint Financial Advisor */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
              >
                6. APPOINT A FINANCIAL ADVISOR
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                If a financial advisor is currently noted on your Gap Cover
                policy, we'll inform them of the new appointment.
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="brokerageName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Brokerage"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="financialAdvisorName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Financial Advisor"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="brokerageCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Brokerage Code"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="advisorCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Advisor Code"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="subtitle2"
                sx={{ mt: 3, fontWeight: "bold" }}
              >
                FINANCIAL ADVISOR PROFESSIONAL FEES
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                You may pay your appointed financial advisor a professional fee
                in addition to the monthly commission payable. If you agree to
                pay a fee, your advisor must explain the additional services you
                can expect.
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{xs:12, sm:4}}>
                  <Controller
                    name="professionalFee"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Professional Fee (R)"
                        type="number"
                        fullWidth
                        inputProps={{ step: 10 }}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:4}}>
                  <Controller
                    name="policyPremium"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Policy Premium (R)"
                        type="number"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:4}}>
                  <Controller
                    name="totalPremium"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Total Monthly Premium (R)"
                        type="number"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Controller
                name="acceptFeeTerms"
                control={control}
                rules={{ required: "You must accept the fee terms" }}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: errors.acceptFeeTerms
                            ? "error.main"
                            : "primary.main",
                        }}
                      />
                    }
                    label="I acknowledge that the purpose of charging a professional fee and the additional services I can expect has been explained to me by my appointed financial advisor."
                    sx={{ mt: 2 }}
                  />
                )}
              />
              {errors.acceptFeeTerms && (
                <Typography color="error" variant="caption" display="block">
                  {errors.acceptFeeTerms.message}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Section 7: Debit Order Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
              >
                7. DEBIT ORDER DETAILS
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{xs:12, sm:6}}>
                  <FormControl fullWidth>
                    <FormLabel>Account Type</FormLabel>
                    <Controller
                      name="bankAccountType"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            value="cheque"
                            control={<Radio />}
                            label="Cheque"
                          />
                          <FormControlLabel
                            value="savings"
                            control={<Radio />}
                            label="Savings"
                          />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="bankName"
                    control={control}
                    rules={{ required: "Bank name is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Bank"
                        fullWidth
                        error={!!errors.bankName}
                        helperText={errors.bankName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="bankAccountNo"
                    control={control}
                    rules={{ required: "Account number is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Account No."
                        fullWidth
                        error={!!errors.bankAccountNo}
                        helperText={errors.bankAccountNo?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="accountHolder"
                    control={control}
                    rules={{ required: "Account holder is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Account Holder"
                        fullWidth
                        error={!!errors.accountHolder}
                        helperText={errors.accountHolder?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="debitOrderDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        select
                        fullWidth
                        label="Debit Order Date"
                      >
                        {[
                          "1st",
                          "4th",
                          "7th",
                          "15th",
                          "20th",
                          "25th",
                          "28th",
                          "Last Day",
                        ].map((date) => (
                          <MenuItem key={date} value={date}>
                            {date}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="paymentTerm"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        select
                        fullWidth
                        label="Term"
                      >
                        {["Monthly", "Annual"].map((term) => (
                          <MenuItem key={term} value={term.toLowerCase()}>
                            {term}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                By signing this section, you authorize Stratum Benefits to debit
                your account for monthly policy premiums payable in advance on
                the selected debit order date.
              </Typography>
            </CardContent>
          </Card>

          {/* Section 8: Policyholder Acceptance */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
              >
                8. POLICYHOLDER ACCEPTANCE
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                As the policyholder, you understand and acknowledge that Gap
                Cover isn't a medical aid, doesn't provide similar cover as
                medical aid and can't be substituted for a medical aid
                membership.
              </Typography>

              <Controller
                name="acceptTerms"
                control={control}
                rules={{ required: "You must accept the terms" }}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: errors.acceptTerms
                            ? "error.main"
                            : "primary.main",
                        }}
                      />
                    }
                    label="I accept the terms and conditions set out in the Pre-Inception Disclosure Notice"
                  />
                )}
              />
              {errors.acceptTerms && (
                <Typography color="error" variant="caption" display="block">
                  {errors.acceptTerms.message}
                </Typography>
              )}

              <Controller
                name="acceptPOPI"
                control={control}
                rules={{ required: "You must accept the POPI terms" }}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: errors.acceptPOPI
                            ? "error.main"
                            : "primary.main",
                        }}
                      />
                    }
                    label="I accept the Protection of Personal Information terms"
                  />
                )}
              />
              {errors.acceptPOPI && (
                <Typography color="error" variant="caption" display="block">
                  {errors.acceptPOPI.message}
                </Typography>
              )}

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="signature"
                    control={control}
                    rules={{ required: "Signature is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Policyholder Signature"
                        fullWidth
                        error={!!errors.signature}
                        helperText={errors.signature?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <Controller
                    name="signatureDate"
                    control={control}
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.signatureDate}
                        helperText={errors.signatureDate?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button type="submit" variant="contained" sx={{ px: 2, py: 1 }}>
              Generate
            </Button>
          </Box>
        </form>

        {/* Contact Information */}
        <Box sx={{ mt: 4, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Contact Information:</strong>
            <br />
            Email: yourapplication@stratumbenefits.co.za
            <br />
            Phone: +27 10 593 0981 | 086 633 3761
            <br />
            Stratum Benefits (Pty) Ltd, an authorised FSP 2111
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default GapCoverProfileUpdateForm;
