import React from "react";
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
} from "@mui/material";

const raceOptions = [
  "African",
  "Coloured",
  "Indian/Asian",
  "White",
  "Other",
  "Do not want to disclose",
];

const genderOptions = ["Male", "Female"];

const DiscoveryHMSForm = () => {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2}}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Discovery Health Medical Scheme Application (2025)
      </Typography>

      {/* Section 1: Main Applicant */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          1. About yourself (main applicant)
        </Typography>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid> */}
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Title" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Initials" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Surname" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First names (as per ID)" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="ID or Passport Number" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl fullWidth>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row>
                {genderOptions.map((g) => (
                  <FormControlLabel
                    key={g}
                    value={g}
                    control={<Radio />}
                    label={g}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Race" sx={{minWidth: '120px'}}>
              {raceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {/* Section 2: Spouse or Partner */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          2. About your spouse or partner (only complete if applying for cover)
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="Title" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Initials" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Surname" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="First names (as per ID)" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="ID or Passport Number" />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row>
                {genderOptions.map((g) => (
                  <FormControlLabel
                    key={g}
                    value={g}
                    control={<Radio />}
                    label={g}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField select fullWidth label="Race" sx={{minWidth: 120}}>
              {raceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Marital Status" />
          </Grid>
        </Grid>
      </Box>

      {/* Section 3: Dependants */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          3. About your dependants (only complete if they are also applying for
          cover)
        </Typography>
        <Typography variant="subtitle1">Dependant 1</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="Title" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Initials" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Surname" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="First names (as per ID)" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="ID or Passport Number" />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row>
                {genderOptions.map((g) => (
                  <FormControlLabel
                    key={g}
                    value={g}
                    control={<Radio />}
                    label={g}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField select fullWidth label="Race" sx={{minWidth: 120}}>
              {raceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Relationship to main member" />
          </Grid>
        </Grid>
      </Box>
      {/* Section 3: financial adviser’s details */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          4. Your financial adviser’s details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Do you want an adviser? (Yes/No)" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Adviser's Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Adviser Code" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Intermediary House" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="House Code" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Telephone Number (Work)" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Lead Number" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bank Reference Number (ABSA/FNB only)"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Section 5: Health Plan Selection */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          5. Please select your health plan
        </Typography>
        <TextField
          fullWidth
          label="Health Plan Option"
          placeholder="e.g., Executive, KeyCare Plus, etc."
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Shariah-compliant plan"
        />
        <TextField
          fullWidth
          label="Medical Savings Account claim payment preference"
          placeholder="Discovery Health Rate or Cost"
        />
      </Box>

      {/* Section 6: KeyCare Plan */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          6. If you choose a KeyCare plan
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="Gross Earnings (Main Member)" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Gross Earnings (Spouse/Partner)" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="KeyCare GP (Main Member)" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="KeyCare GP (Spouse/Partner)" />
          </Grid>
        </Grid>
      </Box>

      {/* Section 7: Employment Details */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          7. Your employment details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Employer Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Employee Number" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date of Employment"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Branch Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Branch Number" />
          </Grid>
        </Grid>
      </Box>

      {/* Section 8: Banking Details */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          8. Your banking details
        </Typography>
        <Typography variant="subtitle2">8.1 Contributions</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Bank Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Branch Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Branch Code" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Account Number" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Account Type" />
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2">8.2 Claims Refund</Typography>
        <TextField
          fullWidth
          label="Use same account for claims refund? (Yes/No)"
        />
        <TextField
          fullWidth
          label="Alternative Claims Account (if different)"
        />
      </Box>
      {/* Section 9: Previous Medical Scheme Details */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          9. Previous medical scheme details
        </Typography>
        <TextField
          fullWidth
          label="Were all dependants on the same scheme? (Yes/No)"
        />
        <Divider sx={{ my: 2 }} />
        {[1, 2, 3].map((i) => (
          <Grid container spacing={2} key={i}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Scheme {i}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Name" />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Are they still a member? (Yes/No)" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Reason for leaving" />
            </Grid>
          </Grid>
        ))}
      </Box>

      {/* Section 10: Moving from another scheme */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          10. Moving from another medical scheme
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Break in membership > 90 days? (Yes/No)"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Member for 24+ months? (Yes/No)" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Admitted to hospital in past 12 months? (Yes/No)"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ongoing medication/treatment? (Yes/No)"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Planned hospital/dental/medical expenses > R2,000 in next 12 months? (Yes/No)"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Section 11: Medical History Summary */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          11. Health questions summary
        </Typography>
        {[...Array(3)].map((_, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={`Condition ${index + 1} - Diagnosis or Symptoms`}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Patient Name" />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date First Diagnosed"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Consultation or Symptoms Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Medicine and Dosage" />
            </Grid>
          </Grid>
        ))}
      </Box>

      {/* Section 12: Privacy Statement Acknowledgment */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          12. Privacy statement
        </Typography>
        <Typography variant="body2">
          By signing, you confirm that you have read and understood the privacy
          statement at{" "}
          <a
            href="https://www.discovery.co.za/medical-aid/about-discovery-health-medical-scheme"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discovery
          </a>
          .
        </Typography>
        <TextField
          fullWidth
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{ mt: 2 }}
        />
        <TextField fullWidth label="Signature of applicant" sx={{ mt: 2 }} />
      </Box>

      {/* Section 13: Terms and Conditions */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          13. Terms and Conditions
        </Typography>
        <Typography variant="body2" gutterBottom>
          By submitting this form, you agree to the Scheme rules and confirm all
          information is true and complete.
        </Typography>
        <TextField
          fullWidth
          label="Do you agree to direct marketing? (Yes/No)"
        />
      </Box>

      {/* Section 14: Final Declaration */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          14. Final Declaration
        </Typography>
        <Typography variant="body2" gutterBottom>
          By signing below, you confirm that all details in this form are
          accurate and agree to the membership terms.
        </Typography>
        <TextField fullWidth label="Signature of main applicant" />
        <TextField
          fullWidth
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{ mt: 2 }}
        />
        <Box mt={4}>
          <Button variant="contained" color="primary">
            Submit Application
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DiscoveryHMSForm;
