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
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { useNavigate, useParams } from "react-router";
import { appContext } from "../App";
import NewForm from "./Forms/NewForm";
import SearchComponent from "./SearchComponent";

const ModifyCustomersPage = () => {
  const { customers, setCustomers } = useContext(appContext);
  const params = useParams();
  const customerData = useMemo(() => {
    if (params.id !== "select") {
      return (
        customers?.find((customer) => customer.id === params.id) || null
      );
    } else {
      return null;
    }
  }, [customers]);

  const navigate = useNavigate();
  const [currentCustomer, setCurrentCustomer] = useState(customerData);
  //const [selectedNames, setSelectedNames] = useState([]);
  const [query, setQuery] = useState(customerData ?? "");
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
        <h3>Modify Customer</h3>
        {/* <p>Enter Customer id to search</p> */}
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
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ position: "relative", top: 0, left: 5 }}
            >
              Id:&nbsp;
              {currentCustomer?.id ?? ""}
            </Typography>
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
