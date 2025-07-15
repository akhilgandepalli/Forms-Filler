import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { useNavigate } from "react-router";
import { appContext } from "../App";
import NewForm from "./Forms/NewForm";
import SearchComponent from "./SearchComponent";

const ModifyCustomersPage = () => {
  const { customers, setCustomers } = useContext(appContext);

  const navigate = useNavigate();
  const [currentCustomer, setCurrentCustomer] = useState(null);
  //const [selectedNames, setSelectedNames] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  //const [customerName, setCustomerName] = useState("");
  const obj = {
    currentCustomer: currentCustomer,
    setCurrentCustomer: setCurrentCustomer,
    query: query,
    setQuery: setQuery,
    filteredResults: filteredResults,
    setFilteredResults: setFilteredResults,
    showResults: showResults,
    setShowResults: setShowResults,
  };

  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 0 } }}>
      <Box
        sx={{
          minHeight: "86vh",
          backgroundColor: "whitesmoke",
          boxShadow: 1,
          borderRadius: 2,
          margin: "calc(var(--template-frame-height, 0px) + 8px) 0 0 0",
          display: "flex",
          flexDirection: "column",
          //justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Welcome to the Edit Page !</h3>
        {
          //renderSearchField()
        }
        <SearchComponent obj={obj} />

        {currentCustomer && (
          <Box
            sx={{
              maxWidth: 1200,
              //minHeight: "80vh",
              mx: "4px",
              padding: "8px 24px",
              boxShadow: 1,
            }}
          >
            <NewForm
              currentCustomer={currentCustomer}
              setCurrentCustomer={setCurrentCustomer}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ModifyCustomersPage;
