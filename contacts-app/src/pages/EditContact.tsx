import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { getContact, updateContact } from "../services/api";
import { Contact, ContactFormData } from "../types/contact";

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contact details when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        if (!id) throw new Error("Invalid contact ID");
        const data = await getContact(id);
        setContact(data);
      } catch (err) {
        setError("Failed to load contact details");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  // Handle form submission for updating contact
  const handleSubmit = async (data: ContactFormData) => {
    if (!id) return;
    await updateContact(id, data);
    navigate("/");
  };

  if (loading) return <p>Loading contact...</p>;
  if (error) return <p>{error}</p>;
  if (!contact) return <p>Contact not found</p>;

  return (
    <div>
      <h1>Edit Contact</h1>
      <ContactForm initialData={contact} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditContact;