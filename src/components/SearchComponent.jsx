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

const SearchComponent = ({ obj }) => {
  const { customers, setCustomers } = useContext(appContext);
  const {
    currentCustomer,
    setCurrentCustomer,
    query,
    setQuery,
    filteredResults,
    setFilteredResults,
    showResults,
    setShowResults,
  } = obj;

  // State management

  const customerNames = useMemo(
    () =>
      customers?.map((customer) => ({
        id: customer.id,
        name: customer.firstName,
      })) || [],
    [customers]
  );
  const displayQuery = useMemo(() => {
    return currentCustomer?.firstName || query;
  }, [currentCustomer, query]);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);
      setCurrentCustomer(null);

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
    setCurrentCustomer(null);
    setFilteredResults([]);
    setShowResults(false);
  }, [setCurrentCustomer]);

  const handleItemClick = useCallback(
    (item) => {
      setQuery(item.name);
      const foundCustomer = customers.find((name) => name.id === item.id);
      setCurrentCustomer(foundCustomer);
      setFilteredResults([]);
      setShowResults(false);
    },
    [customers, setCurrentCustomer]
  );

  return (
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
              {query ? (
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
};

export default SearchComponent;
