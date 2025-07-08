import { createContext, useState } from "react";
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

export const appContext = createContext();

function App() {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
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
      ></Box>
      <appContext.Provider value={{ customers, setCustomers, currentCustomer, setCurrentCustomer }}>
      <BrowserRouter>
        <AppAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/commonform/new" element={<MainPage />} />
          <Route path="/formsection" element={<FormsSelectMenu />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

      <IconButton>
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
      </IconButton>
      <IconButton>
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
      </IconButton>
      </appContext.Provider>
    </>
  );
}

export default App;
