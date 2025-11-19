import React, { useContext, useState, useMemo, useCallback } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Tab,
  Tabs,
  Container,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import StartumGapCoverClaimForm from "./Forms/StratumForms/StartumGapCoverClaimForm";
import StartumGapCoverApplicationForm from "./Forms/StratumForms/StartumGapCoverApplicationForm";
import DiscoveryForm2 from "./Forms/DiscoveryForm2";
import { appContext } from "../App";
import HMSApplicationForm from "./Forms/DiscoveryForms/HMSApplicationForm";
import AcknowledgementOfDebtForm from "./Forms/DiscoveryForms/AcknowledgementOfDebitForm";
import ChangeMainMemberForm from "./Forms/DiscoveryForms/ChangeMainMemberForm";
import GapCoverProfileUpdateForm from "./Forms/StratumForms/GapCoverProfileUpdateForm";

export default function GenerateForm() {
  const { customers, setCustomers, currentCustomer, setCurrentCustomer } =
    useContext(appContext);

  // State management
  const [selectedFormName, setSelectedFormName] = useState("");
  const [selectedCompanyNames, setSelectedCompanyNames] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Constants
  const allCompanyNames = ["Discovery", "Startum"]; // Separate array for company names
  const allFormNames = [
    "Claim-Form",
    "Application-Form",
    "Profile-Update-Form",
  ]; // Separate array for all form names

  // Removed companyFormMapping as per request

  // Memoized values
  const customerNames = useMemo(
    () =>
      customers?.map((customer) => ({
        id: customer.id,
        name: customer.firstName,
      })) || [],
    [customers]
  );

  const isAllCompaniesSelected = useMemo(
    () =>
      allCompanyNames.length > 0 &&
      selectedCompanyNames.length === allCompanyNames.length,
    [allCompanyNames, selectedCompanyNames]
  );

  const showTabs = useMemo(
    () =>
      selectedCompanyNames.length > 0 &&
      selectedFormName !== "" &&
      customerName !== "",
    [selectedCompanyNames, selectedFormName, customerName]
  );

  const CurrentTab = useMemo(() => {
    if (showTabs && selectedCompanyNames.length > 0) {
      return `${selectedCompanyNames[selectedTab]}-${selectedFormName}`;
    }
    return "";
  }, [showTabs, selectedCompanyNames, selectedFormName, selectedTab]);

  const displayQuery = useMemo(() => {
    return currentCustomer?.id || query;
  }, [currentCustomer, query]);

  // Event handlers
  const handleFormChange = useCallback((event) => {
    setSelectedFormName(event.target.value);
  }, []);

  const handleCompanyChange = useCallback(
    (event) => {
      const { value } = event.target;
      if (value.includes("all")) {
        setSelectedCompanyNames((prev) =>
          prev.length === allCompanyNames.length ? [] : allCompanyNames
        );
      } else {
        setSelectedCompanyNames(
          typeof value === "string" ? value.split(",") : value
        );
      }
      setSelectedFormName(""); // Clear form selection when company selection changes
    },
    [allCompanyNames]
  );

  const handleTabChange = useCallback((event, newValue) => {
    setSelectedTab(newValue);
  }, []);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);
      setCurrentCustomer(null);
      setSelectedFormName("");
      setSelectedCompanyNames([]);

      if (value.length >= 1) {
        const results = customerNames.filter((item) =>
          item?.id.includes(value)
        );
        setFilteredResults(results);
        setShowResults(true);
      } else {
        setFilteredResults([]);
        setShowResults(false);
      }
    },
    [customerNames, setCurrentCustomer]
  );

  const handleSearchClick = useCallback(() => {
    console.log("Searched for:", query);
  }, [query]);

  const handleClear = useCallback(() => {
    setQuery("");
    setCustomerName("");
    setCurrentCustomer(null);
    setFilteredResults([]);
    setShowResults(false);
    setSelectedFormName("");
    setSelectedCompanyNames([]);
  }, [setCurrentCustomer]);

  const handleItemClick = useCallback(
    (item) => {
      setQuery(item.name);
      setCustomerName(item.id);
      const foundCustomer = customers.find((name) => name.id === item.id);
      setCurrentCustomer(foundCustomer);
      setFilteredResults([]);
      setShowResults(false);
    },
    [customers, setCurrentCustomer]
  );

  // Render functions
  const renderCompanySelect = () => (
    <FormControl sx={{ width: { xs: "100%", md: "35%" } }}>
      <InputLabel>Select Company Name(s)</InputLabel>
      <Select
        multiple
        value={selectedCompanyNames}
        onChange={handleCompanyChange}
        input={<OutlinedInput label="Select Company Name(s)" />}
        renderValue={(selected) => selected.join(", ")}
      >
        <MenuItem
          key="select-all-companies"
          value="all"
          disabled={allCompanyNames.length <= 1}
        >
          <Checkbox
            checked={isAllCompaniesSelected}
            indeterminate={
              selectedCompanyNames.length > 0 &&
              selectedCompanyNames.length < allCompanyNames.length
            }
          />
          <ListItemText primary="Select All Companies" />
        </MenuItem>
        {allCompanyNames.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selectedCompanyNames.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderFormsSelect = () => {
    return (
      <FormControl sx={{ width: { xs: "100%", md: "35%" } }}>
        <InputLabel>Select Required Form</InputLabel>
        <Select
          value={selectedFormName}
          onChange={handleFormChange}
          input={<OutlinedInput label="Select Required Form" />}
          disabled={selectedCompanyNames.length === 0} // Disable if no company is selected
        >
          {allFormNames.length > 0 ? (
            allFormNames.map((form) => (
              <MenuItem key={form} value={form}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Typography>{form}</Typography>
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>
              <ListItemText primary="Select a Company First" />
            </MenuItem>
          )}
        </Select>
      </FormControl>
    );
  };

  const renderSearchField = () => (
    <Box sx={{ width: { xs: "100%", md: "25%" }, position: "relative" }}>
      <TextField
        fullWidth
        type="number"
        label={"Search Customer"}
        value={displayQuery}
        onChange={handleSearchChange}
        placeholder="Enter Customer id"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {query && currentCustomer ? (
                <IconButton onClick={handleClear} size="small">
                  <ClearIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />

      {showResults && (
        <Paper
          sx={{
            position: "absolute",
            width: "100%",
            mt: 1,
            zIndex: 10,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <MenuItem key={item.id} onClick={() => handleItemClick(item)}>
                {item.id}
              </MenuItem>
            ))
          ) : (
            <Typography sx={{ p: 2 }} color="text.secondary">
              No results found
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );

  const renderFormContent = () => {
    if (!showTabs) {
      return (
        <Box
          sx={{
            height: "60vh",
            backgroundColor: "whitesmoke",
            backdropFilter: "blur(8px)",
            boxShadow: 1,
            borderRadius: 2,
            margin: "calc(var(--template-frame-height, 0px) + 8px) 0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography variant="body1" sx={{ color: "#555" }}>
              Please select company/companies, a required form and a customer to
              proceed.
            </Typography>
          </Box>
        </Box>
      );
    }

    const tabsToRender = selectedCompanyNames.map((company) => ({
      company,
      form: selectedFormName,
      label: `${company}-${selectedFormName}`,
    }));

    // Determine which form to render based on the currently selected tab's company and the specific form logic
    const currentCompanyInTab = selectedCompanyNames[selectedTab];
    let FormComponentToRender = null;

    if (currentCompanyInTab === "Discovery") {
        if(selectedFormName === "Application-Form"){
            FormComponentToRender = <HMSApplicationForm />;
        }else if(selectedFormName === "Claim-Form"){
            FormComponentToRender = <AcknowledgementOfDebtForm />;
        }else if(selectedFormName === "Profile-Update-Form"){
            FormComponentToRender = <ChangeMainMemberForm />;
        }
      
    } else if (currentCompanyInTab === "Startum") {
      if (
        
        selectedFormName === "Claim-Form"
      ) {
        FormComponentToRender = <StartumGapCoverClaimForm />;
      } else if (selectedFormName === "Application-Form") {
        FormComponentToRender = <StartumGapCoverApplicationForm />;
      }else if(selectedFormName === "Profile-Update-Form"){
        FormComponentToRender = <GapCoverProfileUpdateForm />;
      }
    }

    return (
      <>
        <Box>
          <Typography variant="subtitle2">Select The Required Form</Typography>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={selectedTab}
            onChange={handleTabChange}
          >
            {tabsToRender.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 500,
                  color: "#000",
                  fontSize: "0.9rem",
                }}
              />
            ))}
          </Tabs>
        </Box>
        <Box mt={2}>{FormComponentToRender}</Box>
      </>
    );
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "whitesmoke",
        backdropFilter: "blur(8px)",
        boxShadow: 1,
        borderRadius: 2,
        py: "7px",
        mt: "calc(var(--template-frame-height, 0px) + 8px)",
      }}
    >
      <Box mb={2} mt={2}>
        <Typography variant="subtitle2" sx={{ my: 2 }}>
          Select Required Forms and Customer
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {renderSearchField()}
          {renderCompanySelect()}
          {renderFormsSelect()}
        </Box>
      </Box>
      {renderFormContent()}
    </Container>
  );
}
