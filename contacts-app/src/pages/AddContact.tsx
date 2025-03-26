import React from "react";
import ContactForm from "../components/ContactForm";
import { createContact } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ContactFormData } from "../types/contact";

const AddContact: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: ContactFormData) => {
    await createContact(data);
    navigate("/");
  };

  return (
    <div>
      <h1>Add Contact</h1>
      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddContact;