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
} from "@mui/material";
import { appContext } from "../../App";

const StartumGapCoverApplicationForm = () => {
  const { currentCustomer } = useContext(appContext);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Section 1: Application Type
      applicationType: "",

      // Section 2: Current Policyholder Details (if applicable)
      currentPolicyholderName: "",
      currentPolicyholderSurname: "",
      currentPolicyholderId: "",
      currentPolicyholderPolicyNo: "",

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
      policyholderEmployer: currentCustomer?.employerName ?? "",

      // Section 4: Dependant Details (3 dependants by default)
      dependants: [
        {
          title: currentCustomer?.dependant1Title ?? "",
          name: currentCustomer?.dependant1firstName ?? "",
          surname: currentCustomer?.dependant1Surname ?? "",
          relationship: currentCustomer?.dependant1Relationship ?? "",
          idPassport: currentCustomer?.dependant1IdPassportNumber ?? "",
          medicalAid: currentCustomer?.dependent1medicalAid ?? "",
          medicalAidPlan: currentCustomer?.dependent1medicalAidPlan ?? "",
          membershipNo: currentCustomer?.dependent1membershipNo ?? "",
          dob: currentCustomer?.dependant1DateOfBirth ?? "",
        },
        {
          title: currentCustomer?.dependant2Title ?? "",
          name: currentCustomer?.dependant2firstName ?? "",
          surname: currentCustomer?.dependant2Surname ?? "",
          relationship: currentCustomer?.dependant2Relationship ?? "",
          idPassport: currentCustomer?.dependant2IdPassportNumber ?? "",
          medicalAid: currentCustomer?.dependent2medicalAid ?? "",
          medicalAidPlan: currentCustomer?.dependent2medicalAidPlan ?? "",
          membershipNo: currentCustomer?.dependent2membershipNo ?? "",
          dob: currentCustomer?.dependant2DateOfBirth ?? "",
        },
        {
          title: currentCustomer?.dependant3Title ?? "",
          name: currentCustomer?.dependant3firstName ?? "",
          surname: currentCustomer?.dependant3Surname ?? "",
          relationship: currentCustomer?.dependant3Relationship ?? "",
          idPassport: currentCustomer?.dependant3IdPassportNumber ?? "",
          medicalAid: currentCustomer?.dependent3medicalAid ?? "",
          medicalAidPlan: currentCustomer?.dependent3medicalAidPlan ?? "",
          membershipNo: currentCustomer?.dependent3membershipNo ?? "",
          dob: currentCustomer?.dependant3DateOfBirth ?? "",
        },
      ],

      // Section 5: Brokerage & Financial Advisor Details
      brokerageName: "",
      financialAdvisorName: currentCustomer?.adviserName ?? "",
      brokerageCode: "",
      advisorCode: currentCustomer?.adviserCode ?? "",

      // Section 8: Waiting Periods & Limited Payout Benefit
      acceptWaitingPeriods: false,

      // Section 12: Debit Order Details
      bankAccountType: "cheque",
      bankName: currentCustomer?.bankName ?? "",
      bankAccountNo: currentCustomer?.accountNumber ?? "",
      accountHolder: "",
      debitOrderDate: "1st",
      paymentTerm: "monthly",
      professionalFee: 0,
      totalPremium: 0,

      // Section 13: Policyholder Acceptance
      acceptTerms: false,
      acceptPOPI: false,
    },
  });

  const applicationType = watch("applicationType");
  const acceptWaitingPeriods = watch("acceptWaitingPeriods");
  const bankAccountType = watch("bankAccountType");
  const selectedOptions = watch("selectedOptions");

  const handlePrint = () => {
      const element = document.getElementById("applicationForm");
      const formTitle = "Stratum Gap Cover Application Form";
      const customerName = `${currentCustomer.firstName} ${currentCustomer.id}`;
      const fileName = `${formTitle} - ${customerName}.pdf`;
      //console.log(element);
      html2pdf(element, {
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
    };
  
    const onSubmit = (data) => {
      console.log("Form Data:", data);
      handlePrint();
    };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: "2px" }}>
      <Paper id={'applicationForm'} elevation={3} sx={{ p: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: "bold", textAlign: "center" }}
        >
          2025 GAP COVER CLIENT APPLICATION FORM
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Please complete all required fields. Sections 5 and 7 are for your
          appointed financial advisor to complete.
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Section 1: Application Type */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
              >
                1. APPLICATION TYPE
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Please select the type of application relevant to your profile,
                which will form the basis of your contract with us.
              </Typography>

              <FormControl fullWidth>
                <Controller
                  name="applicationType"
                  control={control}
                  rules={{ required: "Application type is required" }}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="firstTime"
                        control={<Radio />}
                        label="First-time applicant who isn't already covered by a Gap Cover policy (Complete Sections 3, 4, 6, 8 and 10 - 13)"
                      />
                      <FormControlLabel
                        value="transfer"
                        control={<Radio />}
                        label="Transfer applicant switching cover from another Gap Cover provider (Complete Sections 3, 4, 6 and 8 - 13)"
                      />
                      <FormControlLabel
                        value="existingDependant"
                        control={<Radio />}
                        label="Existing dependant applying for continuation of cover on your own Gap Cover policy (Complete Sections 2 - 4, 6, 8, 12 and 13)"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.applicationType && (
                  <Typography color="error" variant="caption">
                    {errors.applicationType.message}
                  </Typography>
                )}
              </FormControl>
            </CardContent>
          </Card>

          {/* Section 2: Current Policyholder Details (shown only for existing dependants) */}
          {applicationType === "existingDependant" && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
                >
                  2. CURRENT POLICYHOLDER DETAILS
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Complete this section if you're a dependant covered on an
                  existing Stratum Benefits policy applying for your own policy.
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
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
                  <Grid size={{ xs: 12, sm: 6 }}>
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
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="currentPolicyholderId"
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
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="currentPolicyholderPolicyNo"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          label="Policy No."
                          fullWidth
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

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 2 }}>
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
                <Grid size={{ xs: 12, sm: 5 }}>
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
                <Grid size={{ xs: 12, sm: 5 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 8 }}>
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
                <Grid size={{ xs: 12, sm: 4 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="policyholderEmployer"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Employer Name"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Section 4: Dependant Details (3 dependants) */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
              >
                4. DEPENDANT DETAILS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                We'll cover you and your spouse on one Gap Cover policy, even if
                you belong to different medical aids or medical aid plans,
                including the dependants registered on either medical aid plan.
              </Typography>

              {[0, 1, 2].map((index) => (
                <React.Fragment key={index}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", my: 2 }}
                  >
                    Dependant {index + 1}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 2 }}>
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
                    <Grid size={{ xs: 12, sm: 5 }}>
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
                    <Grid size={{ xs: 12, sm: 5 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
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
                  </Grid>
                  {index < 2 && <Divider sx={{ my: 3 }} />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>

          {/* Section 5: Brokerage & Financial Advisor Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
              >
                5. BROKERAGE & FINANCIAL ADVISOR DETAILS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                For your financial advisor to complete
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
            </CardContent>
          </Card>

          {/* Section 8: Waiting Periods & Limited Payout Benefit */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1, mb: 2 }}
              >
                6. WAITING PERIODS & LIMITED PAYOUT BENEFIT
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Waiting periods apply from your and your dependants' cover start
                dates, but never to accidental events that occur after your
                start dates.
              </Typography>

              <Controller
                name="acceptWaitingPeriods"
                control={control}
                rules={{ required: "You must accept the waiting periods" }}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: errors.acceptWaitingPeriods
                            ? "error.main"
                            : "primary.main",
                        }}
                      />
                    }
                    label="I accept that my policy may be subject to waiting periods and the Limited Payout Benefit"
                  />
                )}
              />
              {errors.acceptWaitingPeriods && (
                <Typography color="error" variant="caption" display="block">
                  {errors.acceptWaitingPeriods.message}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Section 12: Debit Order Details */}
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="professionalFee"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Professional Fee (Increments of R 10.00)"
                        type="number"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="totalPremium"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Total Premium"
                        type="number"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Section 13: Policyholder Acceptance */}
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
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ px: 2, py: 1 }}
            >
              Print
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

export default StartumGapCoverApplicationForm; // Export the component as default
