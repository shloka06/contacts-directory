import React from "react";
import { useNavigate } from "react-router-dom";
import { Contact } from "../types/contact";

interface ContactCardProps {
    contact: Contact,
    onDelete: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({contact, onDelete}) => {
  const navigate = useNavigate();

  return (
    <div className="contact-card">
      <h3>{contact.firstName} {contact.middleName ? contact.middleName + " " : ""}{contact.lastName}</h3>
      <p><strong>Phone:</strong> {contact.phone}</p>
      {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
      {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
      {contact.note && <p><strong>Note:</strong> {contact.note}</p>}
      
      <button onClick={() => navigate(`/edit/${contact.id}`)}>Edit</button>
      <button onClick={() => onDelete(contact.id)}>Delete</button>
    </div>
  )
}

export default ContactCard