import React from "react";
import ContactBook from "./ContactBook";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      {/* <Typography variant="h4" gutterBottom>
        Contacts
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/add")}
        style={{ marginBottom: "15px" }}
      >
        Add Contact
      </Button> */}
      <ContactBook />
    </Container>
  );
};

export default Home;