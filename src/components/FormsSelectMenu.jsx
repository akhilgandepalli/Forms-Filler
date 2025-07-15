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
import StartumGapCoverClaimForm from "./Forms/StartumGapCoverClaimForm";
import StartumGapCoverApplicationForm from "./Forms/StartumGapCoverApplicationForm";
import DiscoveryForm2 from "./Forms/DiscoveryForm2";
import { appContext } from "../App";

export default function FormsSelectMenu() {
  const { customers, setCustomers, currentCustomer, setCurrentCustomer } =
    useContext(appContext);

  // State management
  const [selectedNames, setSelectedNames] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Constants
  const formNames = {
    Discovery: ["DiscoveryForm"],
    Startum: ["StartumGapCoverClaimForm", "StartumGapCoverApplicationForm"],
  };
  const companyNames = Object.keys(formNames);
  const names = [
    "StartumGapCoverClaimForm",
    "StartumGapCoverApplicationForm",
    "DiscoveryForm",
  ];

  // Memoized values
  const customerNames = useMemo(
    () =>
      customers?.map((customer) => ({
        id: customer.id,
        name: customer.firstName,
      })) || [],
    [customers]
  );

  const isAllSelected = useMemo(
    () =>
      formNames[companyName]?.length > 0 &&
      selectedNames.length === formNames[companyName]?.length,
    [companyName, selectedNames, formNames]
  );

  const showTabs = useMemo(
    () => selectedNames.length > 0 && companyName !== "",
    [selectedNames, companyName, customerName]
  );

  const CurrentTab = useMemo(
    () => (showTabs ? selectedNames[selectedTab] : ""),
    [showTabs, selectedNames, selectedTab]
  );

  const displayQuery = useMemo(() => {
    return currentCustomer?.firstName || query;
  }, [currentCustomer, query]);

  // Event handlers
  const handleMultiSelectChange = useCallback(
    (event) => {
      const { value } = event.target;
      if (value.includes("all")) {
        setSelectedNames((prev) =>
          prev.length === formNames[companyName]?.length
            ? []
            : formNames[companyName] || []
        );
      } else {
        setSelectedNames(typeof value === "string" ? value.split(",") : value);
      }
    },
    [companyName, formNames]
  );

  const handleCompanyChange = useCallback((event) => {
    setCompanyName(event.target.value);
    setSelectedNames([]);
  }, []);

  // const handleCustomerChange = useCallback((event) => {
  //   const customerId = event.target.value;
  //   setCustomerName(customerId);
  //   const foundCustomer = customers.find(name => name.id === customerId);
  //   setCurrentCustomer(foundCustomer);
  // }, [customers, setCurrentCustomer]);

  const handleTabChange = useCallback((event, newValue) => {
    setSelectedTab(newValue);
  }, []);

  // const handleDeleteSingleOption = useCallback((id) => {
  //   if (currentCustomer?.id === id) setCurrentCustomer({});
  //   setCustomers(prev => prev.filter(name => name.id !== id));
  //   location.reload();
  // }, [currentCustomer, setCurrentCustomer, setCustomers]);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);
      setCurrentCustomer(null);
      setSelectedNames([]);

      if (value.length >= 2) {
        const results = customerNames.filter((item) =>
          item?.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredResults(results);
        setShowResults(true);
      } else {
        setFilteredResults([]);
        setShowResults(false);
      }
    },
    [customerNames]
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
    <FormControl sx={{ width: { xs: "100%", md: "25%" } }}>
      <InputLabel>Select Company Name</InputLabel>
      <Select
        value={companyName}
        onChange={handleCompanyChange}
        input={<OutlinedInput label="Select Company Name" />}
      >
        {companyNames.map((name) => (
          <MenuItem
            key={name}
            value={name}
            onMouseEnter={() => setHoveredOption(name)}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography>{name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderFormsSelect = () => (
    <FormControl sx={{ width: { xs: "100%", md: "45%" } }}>
      <InputLabel>Select Required Forms</InputLabel>
      <Select
        multiple
        value={selectedNames}
        onChange={handleMultiSelectChange}
        input={<OutlinedInput label="Select Required Forms" />}
        renderValue={(selected) => selected.join(", ")}
      >
        {formNames[companyName]?.length > 0 ? (
          [
            <MenuItem
              key="select-all"
              value="all"
              disabled={formNames[companyName].length <= 1}
            >
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  selectedNames.length > 0 &&
                  selectedNames.length < formNames[companyName].length
                }
              />
              <ListItemText primary="Select All" />
            </MenuItem>,
            ...formNames[companyName].map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedNames.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            )),
          ]
        ) : (
          <MenuItem disabled>
            <ListItemText primary="No Forms Available" />
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );

  const renderSearchField = () => (
    <Box sx={{ width: "25%", position: "relative" }}>
      <TextField
        fullWidth
        label={"Select Customer"}
        value={displayQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
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
                {item.name}
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
              Please select a company, required forms and customer to proceed.
            </Typography>
          </Box>
        </Box>
      );
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
            {selectedNames.map((name) => (
              <Tab
                key={name}
                label={name}
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
        <Box mt={2}>
          {CurrentTab === "StartumGapCoverClaimForm" && (
            <StartumGapCoverClaimForm />
          )}
          {CurrentTab === "StartumGapCoverApplicationForm" && (
            <StartumGapCoverApplicationForm />
          )}
          {CurrentTab === "DiscoveryForm" && <DiscoveryForm2 />}
        </Box>
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
          {renderCompanySelect()}
          {renderFormsSelect()}
          {renderSearchField()}
        </Box>
      </Box>
      {renderFormContent()}
    </Container>
  );
}
