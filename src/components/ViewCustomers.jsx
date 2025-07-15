import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import { appContext } from "../App";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewCustomers = () => {
  const navigate = useNavigate();
  const { customers, setCustomers, currentCustomer, setCurrentCustomer } =
    useContext(appContext);

  const handleDeleteButton = useCallback(
    (id) => {
      if (currentCustomer?.id === id) setCurrentCustomer({});
      setCustomers((prev) => prev.filter((name) => name.id !== id));
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
          justifyContent: "start",
          alignItems: "center",
          gap: 2,
        }}
      >
        <h2>Customers Table</h2>
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
                <TableCell sx={{ color: "#808080" }} align="right">
                  Edit
                </TableCell>
                <TableCell sx={{ color: "#808080" }} align="right">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.firstName}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.contactNumber}</TableCell>
                  <TableCell align="right">{row.idPassportNumber}</TableCell>
                  <TableCell align="right">
                    <IconButton sx={{ p: 0 }}>
                      <EditIcon sx={{ p: "2px" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{ p: 0 }}
                      onClick={() => {
                        handleDeleteButton(row.id);
                      }}
                    >
                      <DeleteIcon sx={{ p: "2px" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {customers?.length === 0 && (
                <TableRow>
                  <TableCell sx={{ color: "#808080" }}>
                    Customers data not available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Box sx={{ display: "flex", gap: 1, pr: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/commonform/new")}
            sx={{
              bgcolor: "#0c3948",
              color: "#fff",
              "&:hover": { bgcolor: "#0c3948" },
              textTransform: "capitalize",
            }}
          >
            Common Form
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/formsection")}
            sx={{
              bgcolor: "#0c3948",
              color: "#fff",
              "&:hover": { bgcolor: "#0c3948" },
              textTransform: "capitalize",
            }}
          >
            Forms Section
          </Button>
        </Box> */}
      </Box>
    </Container>
  );
};

export default ViewCustomers;
