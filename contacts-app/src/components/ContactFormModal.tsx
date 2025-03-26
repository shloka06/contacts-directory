import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { Contact } from "../types/contact";

interface ContactFormModalProps {
    open: boolean;
    onClose: () => void;
    initialContact: Partial<Contact>;
    onSave: (contactData: Partial<Contact>) => void;
    isEditMode?: boolean;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
    open,
    onClose,
    initialContact,
    onSave,
    isEditMode = false,
}) => {
    const [contact, setContact] = useState<Partial<Contact>>(initialContact);
    const [errors, setErrors] = useState<{ firstName?: string; phone?: string; email?: string }>({});

    useEffect(() => {
        setContact(initialContact);
        setErrors({}); // Reset errors when opening modal
    }, [initialContact, open]);

    const validate = () => {
        let newErrors: { firstName?: string; phone?: string; email?: string } = {};

        if (!contact.firstName?.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!contact.phone?.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(contact.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
            newErrors.email = "Invalid email format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (validate()) {
            onSave(contact);
            onClose();
        }
    };    

    return (
        <Modal open={open} onClose={onClose} className={isEditMode ? "edit-contact-modal" : "add-contact-modal"}>
            <Box className={isEditMode ? "edit-contact-form" : "add-contact-form"}>
                <Typography variant="h5" gutterBottom>
                    {isEditMode ? "Edit Contact" : "Add New Contact"}
                </Typography>

                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    required
                    margin="normal"
                    value={contact.firstName || ""}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    margin="normal"
                    value={contact.middleName || ""}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    margin="normal"
                    value={contact.lastName || ""}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    required
                    margin="normal"
                    value={contact.phone || ""}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    margin="normal"
                    value={contact.email || ""}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    margin="normal"
                    value={contact.address || ""}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Note"
                    name="note"
                    margin="normal"
                    value={contact.note || ""}
                    onChange={handleChange}
                />

                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="error" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {isEditMode ? "Save" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ContactFormModal;