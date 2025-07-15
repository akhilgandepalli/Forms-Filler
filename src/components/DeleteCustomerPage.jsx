import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useCallback, useContext, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router";
import { appContext } from "../App";
import SearchComponent from "./SearchComponent";

const DeleteCustomerPage = () => {
  const { customers, setCustomers } = useContext(appContext);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

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

  const handleDeleteButton = useCallback(
    (id) => {
      if (currentCustomer?.id === id) setCurrentCustomer({});
      setCustomers((prev) => prev.filter((name) => name.id !== id));
      setCurrentCustomer(null)
    },
    [currentCustomer, setCurrentCustomer, setCustomers]
  );

  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 0 } }}>
      <Box
        sx={{
          height: "86vh",
          backgroundColor: "whitesmoke",
          boxShadow: 1,
          borderRadius: 2,
          margin: "calc(var(--template-frame-height, 0px) + 8px) 0 0 0",
          display: "flex",
          flexDirection: "column",
          //justifyContent: "center",
          alignItems: "center",
          //pt:2,
          gap: 2,
        }}
      >
        <h3 style={{ margin: "16px 0 0 0" }}>Delete Customers</h3>
        <SearchComponent obj={obj} />
        <TableContainer component={Paper} sx={{ width: 850 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#808080" }}>Cust.ID</TableCell>
                <TableCell sx={{ color: "#808080" }} align="right">
                  Name
                </TableCell>
                <TableCell sx={{ color: "#808080" }} align="right">
                  Gender
                </TableCell>
                <TableCell sx={{ color: "#808080" }} align="right">
                  Mobile
                </TableCell>
                <TableCell sx={{ color: "#808080" }} align="right">
                  ID/Passport
                </TableCell>
                {/* <TableCell sx={{ color: "#808080" }} align="right">
                  Edit
                </TableCell> */}
                <TableCell sx={{ color: "#808080" }} align="right">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCustomer ? (
                <TableRow
                  key={currentCustomer?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {currentCustomer?.id}
                  </TableCell>
                  <TableCell align="right">
                    {currentCustomer?.firstName}
                  </TableCell>
                  <TableCell align="right">{currentCustomer?.gender}</TableCell>
                  <TableCell align="right">
                    {currentCustomer?.contactNumber}
                  </TableCell>
                  <TableCell align="right">
                    {currentCustomer?.idPassportNumber}
                  </TableCell>
                  {/* <TableCell align="right">
                    <IconButton sx={{ p: 0 }}>
                      <EditIcon sx={{ p: "2px" }} />
                    </IconButton>
                  </TableCell> */}
                  <TableCell align="right">
                    <IconButton
                      sx={{ p: 0 }}
                      onClick={() => {
                        handleDeleteButton(currentCustomer?.id);
                      }}
                    >
                      <DeleteIcon sx={{ p: "2px" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell sx={{ color: "#808080" }}>
                    Select a valid customer
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default DeleteCustomerPage;
