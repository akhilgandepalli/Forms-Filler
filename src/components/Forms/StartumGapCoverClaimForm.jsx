import React, { useState, useContext } from "react";
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

const StartumGapCoverClaimForm = () => {
  const { customers, currentCustomer, setCurrentCustomer } =
    useContext(appContext);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Policyholder details
      policyholderTitle: currentCustomer?.title ?? "",
      policyholderName: currentCustomer?.firstNames ?? "",
      policyholderSurname: currentCustomer?.surname ?? "",
      policyholderIdPassport: currentCustomer?.idPassportNumber ?? "",
      policyholderDob: currentCustomer?.dateOfBirth ?? "",
      policyholderCellphone: currentCustomer?.contactNumber ?? "",
      policyholderAltContact: currentCustomer?.altNumber ?? "",
      policyholderEmail: currentCustomer?.email ?? "",

      // Patient details
      patientIsPolicyholder: false,
      patientTitle: "",
      patientName: "",
      patientSurname: "",
      patientIdPassport: "",
      patientDob: "",
      patientRelationship: "",
      patientMedicalAid: "",
      patientMedicalAidPlan: "",
      patientMembershipNo: "",

      // Medical event details
      medicalEventDescription: "",
      medicalEventLocation: "",
      medicalEventDate: "",
      dischargeDate: "",
      healthcareProvider: "",
      healthcareProviderContact: "",
      amountBeingClaimed: "",
      discountGranted: "",
      furtherPaymentsDue: "",

      // Supporting documents
      dayClinicInvoice: false,
      hospitalInvoice: false,
      healthcareProviderInvoice: false,
      medicalAidStatement: false,
      otherDocuments: false,

      // Healthcare provider contact details
      generalPractitioner: "",
      gpContactNo: "",
      referringProvider: "",
      referringProviderContact: "",

      // Reimbursement details
      bankName: currentCustomer?.bankName ?? "",
      bankAccountType: "debitOrder",
      bankAccountNo: currentCustomer?.accountNumber ?? "",
      accountHolder: "",
      accountType: currentCustomer?.accountType ?? "",

      // Declaration
      declarationAccepted: false,
    },
  });

  const patientIsPolicyholder = watch("patientIsPolicyholder");
  const bankAccountType = watch("bankAccountType");

  const handlePrint = () => {
    const element = document.getElementById("claimForm");
    const formTitle = "Stratum Gap Cover Claim";
    const customerName = `${currentCustomer.firstNames} ${currentCustomer.id}`;
    const fileName = `${formTitle} - ${customerName}.pdf`;
    //console.log(element);
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
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: "2px" }}>
      <Paper id={"claimForm"} elevation={3} sx={{ p: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: "bold", textAlign: "center" }}
        >
          2025 GAP COVER CLAIM FORM
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Claims must be submitted within 6 months from the date of a claimable
          event. Please complete all required fields.
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Section 1: Standard Requirements */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1 }}
              >
                1. STANDARD REQUIREMENTS
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Submit the following documents when claiming: • Completed and
                signed claim form • Service and healthcare providers' invoices
                with ICD-10 codes • Medical aid statement • Bank statement or
                verification letter (not older than 3 months)
              </Typography>
            </CardContent>
          </Card>

          {/* Section 2: Policyholder & Patient Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1 }}
              >
                2. POLICYHOLDER & PATIENT DETAILS
              </Typography>

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                POLICYHOLDER DETAILS
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 2 }}>
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

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Controller
                    name="policyholderIdPassport"
                    control={control}
                    rules={{ required: "ID/Passport number is required" }}
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

                <Grid size={{ xs: 12, sm: 4 }}>
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

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Controller
                    name="policyholderCellphone"
                    control={control}
                    rules={{ required: "Cellphone number is required" }}
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

                <Grid size={{ xs: 12, sm: 4 }}>
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

                <Grid size={{ xs: 12, sm: 4 }}>
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
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                PATIENT DETAILS
              </Typography>

              <Controller
                name="patientIsPolicyholder"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="The patient is also the policyholder"
                    sx={{ mb: 2 }}
                  />
                )}
              />

              {!patientIsPolicyholder && (
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 2 }}>
                    <Controller
                      name="patientTitle"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          select
                          fullWidth
                          label="Title"
                          error={!!errors.patientTitle}
                          helperText={errors.patientTitle?.message}
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
                      name="patientName"
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
                      name="patientSurname"
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
                      name="patientIdPassport"
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
                      name="patientDob"
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

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="patientRelationship"
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
                      name="patientMedicalAid"
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
                      name="patientMedicalAidPlan"
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
                      name="patientMembershipNo"
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
              )}
            </CardContent>
          </Card>

          {/* Section 3: Claim Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1 }}
              >
                3. CLAIM DETAILS
              </Typography>

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                MEDICAL EVENT DETAILS
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="medicalEventDescription"
                    control={control}
                    rules={{
                      required: "Medical event description is required",
                    }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Provide details of the investigation, medical procedure or surgery, or treatment provided"
                        multiline
                        fullWidth
                        rows={3}
                        error={!!errors.medicalEventDescription}
                        helperText={errors.medicalEventDescription?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <FormLabel>
                      Where did your medical event take place?
                    </FormLabel>
                    <Controller
                      name="medicalEventLocation"
                      control={control}
                      rules={{ required: "Medical event location is required" }}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            value="dayClinic"
                            control={<Radio />}
                            label="Day Clinic"
                          />
                          <FormControlLabel
                            value="hospital"
                            control={<Radio />}
                            label="Hospital"
                          />
                          <FormControlLabel
                            value="healthcareRoom"
                            control={<Radio />}
                            label="Healthcare Provider's Room"
                          />
                          <FormControlLabel
                            value="casualty"
                            control={<Radio />}
                            label="Casualty Ward"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                          />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="medicalEventDate"
                    control={control}
                    rules={{ required: "Medical event date is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Medical Event / Admission Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.medicalEventDate}
                        helperText={errors.medicalEventDate?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="dischargeDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Discharge Date (if hospitalised)"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="healthcareProvider"
                    control={control}
                    rules={{ required: "Healthcare provider is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Healthcare / Service Provider"
                        fullWidth
                        error={!!errors.healthcareProvider}
                        helperText={errors.healthcareProvider?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="healthcareProviderContact"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Healthcare / Service Provider Contact Details"
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Controller
                    name="amountBeingClaimed"
                    control={control}
                    rules={{ required: "Amount being claimed is required" }}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Amount Being Claimed"
                        fullWidth
                        type="number"
                        error={!!errors.amountBeingClaimed}
                        helperText={errors.amountBeingClaimed?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <FormControl fullWidth>
                    <FormLabel>
                      Has the healthcare provider granted you a discount?
                    </FormLabel>
                    <Controller
                      name="discountGranted"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <FormControl fullWidth>
                    <FormLabel>
                      Are further payments due by your medical aid?
                    </FormLabel>
                    <Controller
                      name="furtherPaymentsDue"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                SUPPORTING DOCUMENT CHECKLIST
              </Typography>

              <FormGroup row>
                <Controller
                  name="dayClinicInvoice"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Day Clinic Invoice"
                    />
                  )}
                />
                <Controller
                  name="hospitalInvoice"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Hospital Invoice"
                    />
                  )}
                />
                <Controller
                  name="healthcareProviderInvoice"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Healthcare Provider Invoice"
                    />
                  )}
                />
                <Controller
                  name="medicalAidStatement"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Medical Aid Statement"
                    />
                  )}
                />
                <Controller
                  name="otherDocuments"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Other Documents"
                    />
                  )}
                />
              </FormGroup>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                HEALTHCARE PROVIDER CONTACT DETAILS
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="generalPractitioner"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="General Practitioner"
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="gpContactNo"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Contact No."
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="referringProvider"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Referring / Treating Healthcare Provider"
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="referringProviderContact"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        label="Contact No."
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Section 4: Claim Reimbursement Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1 }}
              >
                4. CLAIM REIMBURSEMENT DETAILS
              </Typography>

              <Alert severity="warning" sx={{ mb: 2 }}>
                The approved claim amount will be paid into the bank account
                number provided. We won't accept responsibility for payments
                made into incorrect bank accounts.
              </Alert>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel>Bank Account Option</FormLabel>
                <Controller
                  name="bankAccountType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="debitOrder"
                        control={<Radio />}
                        label="Debit Order Bank Account (Same account from which you're debited)"
                      />
                      <FormControlLabel
                        value="alternative"
                        control={<Radio />}
                        label="Alternative Bank Account"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>

              {bankAccountType === "alternative" && (
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="bankName"
                      control={control}
                      rules={{ required: "Bank Name is required" }}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          label="Bank Name"
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
                      rules={{ required: "Bank account number is required" }}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          {...field}
                          label="Bank Account No."
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
                    <FormControl fullWidth>
                      <FormLabel>Account Type</FormLabel>
                      <Controller
                        name="accountType"
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
                </Grid>
              )}
            </CardContent>
          </Card>

          {/* Section 5: Declaration */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#fff", bgcolor: "#f36c23", pl: 1, ml: -1 }}
              >
                5. POLICYHOLDER DECLARATION & AUTHORISATION
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                By signing this form, you agree to share information with
                Stratum Benefits for underwriting and claims purposes. You
                confirm that all details and supporting documents submitted are
                true and correct, and accept that non-disclosure or false
                representation may result in claim rejection and cancellation of
                cover.
              </Typography>

              <Controller
                name="declarationAccepted"
                control={control}
                rules={{ required: "You must accept the declaration" }}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: errors.declarationAccepted
                            ? "error.main"
                            : "primary.main",
                        }}
                      />
                    }
                    label="I confirm that the details and supporting documents submitted are true and correct"
                  />
                )}
              />
              {errors.declarationAccepted && (
                <Typography color="error" variant="caption" display="block">
                  {errors.declarationAccepted.message}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              //size="large"
              sx={{ px: 2, py: 1.5 }}
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
            Email: yourclaim@stratumbenefits.co.za
            <br />
            Phone: +27 10 593 0981 | 086 633 3761
            <br />
            Please contact us if you haven't received feedback within 10 working
            days.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default StartumGapCoverClaimForm;
