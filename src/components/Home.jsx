import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const navigate= useNavigate()
  return (
    <Container maxWidth="md" sx={{padding:{xs:0}}} >
      <Box
        sx={{
          height: "50vh",
          backgroundColor: "whitesmoke",
          backdropFilter: "blur(8px)",
          boxShadow: 1,
          borderRadius: 2,
          margin: "calc(var(--template-frame-height, 0px) + 8px) 0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ><h2>Welcome the Home Page !</h2>
        <Box sx={{ display: "flex", gap: 1, pr: 1 }}>
          
            <Button
              variant="outlined"
              onClick={()=>navigate('/commonform/new')}
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
                onClick={()=>navigate('/formsection')}
              sx={{
                bgcolor: "#0c3948",
                color: "#fff",
                "&:hover": { bgcolor: "#0c3948" },
                textTransform: "capitalize",
              }}
            >
              Forms Section
            </Button>
          </Box>
        
        </Box>
    </Container>
  )
}

export default Home