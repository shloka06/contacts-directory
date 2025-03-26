import React, { useEffect, useState } from "react";
import { getAllContacts, deleteContact } from "../services/api";
import ContactCard from "./ContactCard";
import { Contact } from "../types/contact";

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Fetch Contacts on Component Mount
  useEffect(() => {  
    const fetchContacts = async () => {
      try {
        const data = await getAllContacts();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        alert("Failed to fetch contacts.");
      }
    };
  
    fetchContacts();
  }, []);

  // Handle Contact Deletion
  const handleDelete = async (id: string) => {
    await deleteContact(id);
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  return (
    <div>
      <h2>Contact List</h2>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} onDelete={handleDelete} />
        ))
      ) : (
        <p>No contacts available.</p>
      )}
    </div>
  );
};

export default ContactList;