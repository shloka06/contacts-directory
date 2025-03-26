import React, { useState } from "react";
import { ContactFormData } from "../types/contact";

interface ContactFormProps {
  initialData?: ContactFormData;
  onSubmit: (data: ContactFormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: initialData?.firstName || "",
    middleName: initialData?.middleName || "",
    lastName: initialData?.lastName || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    note: initialData?.note || "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
      <input type="text" name="middleName" placeholder="Middle Name (Optional)" value={formData.middleName} onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name (Optional)" value={formData.lastName} onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email (Optional)" value={formData.email} onChange={handleChange} />
      <input type="text" name="address" placeholder="Address (Optional)" value={formData.address} onChange={handleChange} />
      <textarea name="note" placeholder="Notes (Optional)" value={formData.note} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default ContactForm;