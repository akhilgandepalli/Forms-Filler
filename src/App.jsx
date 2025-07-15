import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import AppAppBar from "./components/AppAppBar.jsx";
import { Box, IconButton } from "@mui/material";
import MainPage from "./components/MainPage.jsx";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FormsSelectMenu from "./components/FormsSelectMenu.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import ViewCustomers from "./components/ViewCustomers.jsx";
import ModifyCustomersPage from "./components/ModifyCustomersPage.jsx";
import SearchComponent from "./components/SearchComponent.jsx";
import DeleteCustomerPage from "./components/DeleteCustomerPage.jsx";

export const appContext = createContext();

function App() {
  const getCustomersFromStorage = () => {
    const storedCustomers = sessionStorage.getItem("customerData");
    return storedCustomers ? JSON.parse(storedCustomers) : [];
  };
  const [customers, setCustomers] = useState(getCustomersFromStorage);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    sessionStorage.setItem("customerData", JSON.stringify(customers));
  }, [customers]);

  return (
    <>
      <Box
        component={"img"}
        src="\images\bg-1.jpg"
        sx={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <appContext.Provider
        value={{
          customers,
          setCustomers,
          currentCustomer,
          setCurrentCustomer,
          loginStatus,
          setLoginStatus,
        }}
      >
        <BrowserRouter>
          <AppAppBar />
          <Box
            sx={{
              height: "52px",
            }}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/customer/createcustomer" element={<MainPage />} />
            <Route path="/customer/viewcustomers" element={<ViewCustomers />} />
            <Route
              path="/customer/modifycustomer"
              element={<ModifyCustomersPage />}
            />
            <Route
              path="/customer/deletecustomer"
              element={<DeleteCustomerPage />}
            />

            <Route path="/forms/generateform" element={<FormsSelectMenu />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>

        <ArrowDownwardIcon
          onClick={scrollToBottom}
          sx={{
            fontSize: 40,
            zIndex: 1000,
            cursor: "pointer",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
            position: "fixed",
            bottom: 16,
            right: 16,
            color: "#000",
            backgroundColor: "#fff",
            borderRadius: "50%",
            padding: 1,
            boxShadow: 3,
          }}
        />

        <ArrowUpwardIcon
          onClick={scrollToTop}
          sx={{
            fontSize: 40,
            zIndex: 1000,
            cursor: "pointer",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
            position: "fixed",
            bottom: 60,
            right: 16,
            color: "#000",
            backgroundColor: "#fff",
            borderRadius: "50%",
            padding: 1,
            boxShadow: 3,
          }}
        />
      </appContext.Provider>
    </>
  );
}

export default App;
