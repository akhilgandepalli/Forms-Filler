import React, { useContext, useState } from "react";
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
} from "@mui/material";
import { Start } from "@mui/icons-material";
import StartumGapCoverClaimForm from "./Forms/StartumGapCoverClaimForm";
import StartumGapCoverApplicationForm from "./Forms/StartumGapCoverApplicationForm";
import DiscoveryForm2 from "./Forms/DiscoveryForm2";
import { appContext } from "../App";

// const names = [
//   "StartumGapCoverClaimForm",
//   "StartumGapCoverApplicationForm",
//   "DiscoveryForm",
// ];
// const customerNames = ["Customer A", "Customer B", "Customer C", "Customer D"];
// const fixedName = "Forms";

export default function FormsSelectMenu() {
  const [selectedNames, setSelectedNames] = useState([]);
  const [singleName, setSingleName] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const { customers, currentCustomer, setCurrentCustomer } =
    useContext(appContext);
  const names = [
    "StartumGapCoverClaimForm",
    "StartumGapCoverApplicationForm",
    "DiscoveryForm",
  ];
  const customerNames = customers.map((customer) => ({id:customer.id,name:customer.firstNames}));
//   const customerNames = [{id:1,name:"Customer A"},{id:2,name:"Customer B"},{id:3,name:"Customer C"},{id:4,name:"Customer D"}];
  const fixedName = "Forms";
  //   const tabsStyle = {
  //     border: "1px solid",
  //     mr: "2px",
  //     borderRadius: 1,
  //     p: "4px",
  //   };

  const handleMultiSelectChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes("all")) {
      if (selectedNames.length === names.length) {
        setSelectedNames([]);
      } else {
        setSelectedNames(names);
      }
    } else {
      setSelectedNames(typeof value === "string" ? value.split(",") : value);
    }
  };

  const handleSingleSelectChange = (event) => {
    setSingleName(event.target.value);
    setCurrentCustomer(
      customers.find((name) => name.id === event.target.value)
    );
    console.log(currentCustomer);
  }; 

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    console.log(newValue);
    console.log(selectedNames);
  };

  const isAllSelected =
    names.length > 0 && selectedNames.length === names.length;
  const showTabs = selectedNames.length > 0 && singleName !== "";
  const CurrentTab = showTabs ? selectedNames[selectedTab] : "";

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "whitesmoke",
        backdropFilter: "blur(8px)",
        boxShadow: 1,
        borderRadius: 2,
        py: "8px",
        mt: "calc(var(--template-frame-height, 0px) + 8px)",
        //margin: "calc(var(--template-frame-height, 0px) + 8px) 0px",
      }}
    >
      {/* Section 1 */}
      <Box mb={2} mt={2}>
        <Typography variant="subtitle2" sx={{ my: 2 }}>
          Select Required Forms and Customer
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {/* Field 1: Multi-select with Select All */}
          <FormControl sx={{ width: 275 }}>
            <InputLabel>Select Required Forms</InputLabel>
            <Select
              multiple
              value={selectedNames}
              onChange={handleMultiSelectChange}
              input={<OutlinedInput label="Select Required Forms" />}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="all">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={selectedNames.length > 0 && !isAllSelected}
                />
                <ListItemText primary="Select All" />
              </MenuItem>
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedNames.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Field 2: Single select, no select all */}
          <FormControl sx={{ minWidth: 275 }}>
            <InputLabel>Select Customer Name</InputLabel>
            <Select
              value={singleName}
              onChange={handleSingleSelectChange}
              input={<OutlinedInput label="Select Customer Name" />}
            >
              {customerNames.map((name) => (
                <MenuItem key={name.id} value={name.id}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Field 3: Dropdown with only one name */}
          <FormControl sx={{ minWidth: 275 }}>
            <InputLabel>Fixed Name</InputLabel>
            <Select
              value={fixedName}
              input={<OutlinedInput label="Fixed Name" />}
              disabled
            >
              <MenuItem value={fixedName}>{fixedName}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Section 2: Show only if both Field 1 and Field 2 are selected */}
      {showTabs && (
        <Box>
          <Typography variant="subtitle2">Select The Required Form</Typography>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={selectedTab}
            onChange={handleTabChange}
          >
            {selectedNames.map((name, index) => (
              <Tab
                key={name}
                label={name}
                //sx={{color:'#000'}}
              />
            ))}
          </Tabs>
        </Box>
      )}
      {/* Section 3: Show the form based on the selected tab */}
      {showTabs ? (
        <>
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
      ) : (
        <Box
          sx={{
            height: "30vh",
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
              pr: 1,
            }}
          >
            <Typography variant="body1" sx={{ color: "#555" }}>
              Please select at least one form from the multi-select and one from
              the single select to view the form.
            </Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
}
