import React, { useState } from "react";
import { Button, Alert, Collapse, Stack } from "@mui/material";

const AlertBar = ({message, openAlert, setOpenAlert}) => {
  //const [open, setOpen] = useState(false);

 if(openAlert){
    setTimeout(() => {
      setOpenAlert(false);
    }, 2500); // Alert disappears after 1 second
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Collapse in={openAlert}>
        <Alert
          sx={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1300, // ensures it's above MUI modals and other components
          }}
          severity="success"
        >
          Submitted successfully!{message}
        </Alert>{" "}
      </Collapse>
    </Stack>
  );
};

export default AlertBar;
