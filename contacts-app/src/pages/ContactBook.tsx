import React, { useEffect, useState } from "react";
import { getAllContacts, createContact, updateContact, deleteContact } from "../services/api";
import { Contact } from "../types/contact";
import { Card, CardContent, Typography, Box, Button, CircularProgress, Modal, TextField } from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ContactFormModal from "../components/ContactFormModal";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const ContactBook: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedLetter, setSelectedLetter] = useState<string>("A");
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const [newContact, setNewContact] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        note: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setLoading(true);
                const data = await getAllContacts();
                setContacts(data);
            } catch (err) {
                setError("Failed to fetch contacts.");
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const filteredContacts = selectedLetter
        ? contacts.filter((contact) => contact.firstName.toUpperCase().startsWith(selectedLetter))
        : contacts;

    // Handle delete confirmation
    const confirmDelete = async () => {
        if (selectedContact) {
            await deleteContact(selectedContact.id);
            setContacts((prevContacts) => prevContacts.filter((c) => c.id !== selectedContact.id));
            setSelectedContact(null);
            setOpenDeleteModal(false);
        }
    };

    // Validation function
    const validateForm = () => {
        let valid = true;
        let newErrors = { firstName: "", phone: "", email: "" };

        if (!newContact.firstName.trim()) {
            newErrors.firstName = "First name is required.";
            valid = false;
        }

        if (!newContact.phone.trim()) {
            newErrors.phone = "Phone number is required.";
            valid = false;
        } else if (!/^\d{10,}$/.test(newContact.phone)) {
            newErrors.phone = "Enter a valid phone number (at least 10 digits).";
            valid = false;
        }

        if (newContact.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newContact.email)) {
            newErrors.email = "Enter a valid email address.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleAddContact = async () => {
        if (validateForm()) {
            const newContactData: Omit<Contact, "id"> = { ...newContact }; // Exclude ID - Backend will Generate it
            const addedContact = await createContact(newContactData); // Call API to Add Contact

            if (addedContact) {
                setContacts((prevContacts) => [...prevContacts, addedContact]); // Ensure only Valid Contacts are Added
                const firstLetter = addedContact.firstName.charAt(0).toUpperCase();
                setSelectedLetter(firstLetter);
            }
            setOpenAddModal(false);
            setNewContact({
                firstName: "",
                middleName: "",
                lastName: "",
                phone: "",
                email: "",
                address: "",
                note: "",
            });
            setErrors({ firstName: "", phone: "", email: "" });
        }
    };
    // const handleAddContact = async (contactData: Partial<Contact>) => {
    //     if (validateForm()) {
    //         const newContactData: Omit<Contact, "id"> = {
    //             firstName: contactData.firstName ?? "",
    //             middleName: contactData.middleName ?? "",
    //             lastName: contactData.lastName ?? "",
    //             phone: contactData.phone ?? "",
    //             email: contactData.email ?? "",
    //             address: contactData.address ?? "",
    //             note: contactData.note ?? ""
    //         };

    //         alert("New Contact Data:" + newContactData); // Debugging

    //         try {
    //             const addedContact = await createContact(newContactData);
    //             alert("API Response:" + addedContact); // Debugging

    //             if (addedContact) {
    //                 setContacts((prevContacts) => [...prevContacts, addedContact]);
    //                 const firstLetter = addedContact.firstName.charAt(0).toUpperCase();
    //                 setSelectedLetter(firstLetter);
    //             }

    //             setOpenAddModal(false);
    //             setErrors({ firstName: "", phone: "", email: "" });
    //         } catch (error) {
    //             console.error("Error adding contact:", error);
    //         }
    //     }
    // };


    // Open edit modal with prefilled data
    const openEditContactModal = () => {
        if (selectedContact) {
            setNewContact({
                firstName: selectedContact.firstName,
                middleName: selectedContact.middleName ?? "",
                lastName: selectedContact.lastName ?? "",
                phone: selectedContact.phone,
                email: selectedContact.email ?? "",
                address: selectedContact.address ?? "",
                note: selectedContact.note ?? "",
            });
            setOpenEditModal(true);
        }
    };

    // Handle contact update
    const handleUpdateContact = async () => {
        if (selectedContact && validateForm()) {
            const updatedContactData = { ...newContact };
            try {
                await updateContact(selectedContact.id, updatedContactData);
                setContacts((prevContacts) =>
                    prevContacts.map((c) => (c.id === selectedContact.id ? { ...selectedContact, ...updatedContactData } : c))
                );
                setOpenEditModal(false);
                setSelectedContact(null);
            } catch (error) {
                console.error("Error updating contact:", error);
            }
        }
    };

    return (
        <Box className="contact-book">
            <Box className="contact-book-header">
                <Typography className="contact-book-title" variant="h5">Contact Book</Typography>
                <Button
                    className="add-contact-button"
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenAddModal(true)}
                >
                    + Add Contact
                </Button>
            </Box>

            <Box className="spiral-binding" />

            <motion.div
                key={selectedLetter || "all"}
                className="contact-page"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                ) : filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                        <Card
                            key={contact.id}
                            className="contact-card"
                            onClick={() => setSelectedContact(contact)}
                            style={{ cursor: "pointer" }}
                        >
                            <CardContent>
                                <Typography variant="h6">{contact.firstName} {contact.lastName}</Typography>
                                <Typography variant="body2" color="textSecondary">{contact.phone}</Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="h6" className="no-contact">
                        No contacts found for "{selectedLetter}"
                    </Typography>
                )}
            </motion.div>

            <Box className="alphabet-tabs">
                {alphabet.map((letter) => (
                    <Button
                        key={letter}
                        className={`tab ${selectedLetter === letter ? "active" : ""}`}
                        onClick={() => setSelectedLetter(letter)}
                    >
                        {letter}
                    </Button>
                ))}
            </Box>

            <Modal open={!!selectedContact} onClose={() => setSelectedContact(null)} className="contact-modal">
                <Box className="contact-detail-popup">
                    {selectedContact && (
                        <Card className="contact-card-detail">
                            <CardContent>
                                <IconButton
                                    onClick={() => setSelectedContact(null)}
                                    color="secondary"
                                    style={{ position: "absolute", top: "10px", right: "10px" }}
                                >
                                    <CloseIcon />
                                </IconButton>

                                {/* Contact details */}
                                <Typography variant="h4" paddingBottom={4}>
                                    {selectedContact.firstName} {selectedContact.middleName} {selectedContact.lastName}
                                </Typography>

                                <Box sx={{ textAlign: "left" }}>
                                    <Typography variant="body1"><strong>Phone:</strong> {selectedContact.phone}</Typography>
                                    <Typography variant="body1"><strong>Email:</strong> {selectedContact.email}</Typography>
                                    <Typography variant="body1"><strong>Address:</strong> {selectedContact.address}</Typography>
                                    <Typography variant="body1"><strong>Note:</strong> {selectedContact.note}</Typography>
                                </Box>
                            </CardContent>

                            <Box display="flex" justifyContent="center" gap={2} mt={2}>
                                <Button variant="contained" color="primary" onClick={openEditContactModal}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" onClick={() => setOpenDeleteModal(true)}>
                                    Delete
                                </Button>
                            </Box>
                        </Card>
                    )}
                </Box>
            </Modal>

            {/* Add Contact Modal */}
            <Modal open={openAddModal} onClose={() => setOpenAddModal(false)} className="add-contact-modal">
                <Box className="add-contact-form">
                    <Typography variant="h5" gutterBottom>Add New Contact</Typography>
                    <TextField fullWidth label="First Name" required margin="normal" value={newContact.firstName}
                        onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                        error={!!errors.firstName} helperText={errors.firstName}
                    />
                    <TextField fullWidth label="Middle Name" margin="normal" value={newContact.middleName} onChange={(e) => setNewContact({ ...newContact, middleName: e.target.value })} />
                    <TextField fullWidth label="Last Name" margin="normal" value={newContact.lastName} onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })} />
                    <TextField fullWidth label="Phone" required margin="normal" value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                        error={!!errors.phone} helperText={errors.phone}
                    />
                    <TextField fullWidth label="Email" margin="normal" value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        error={!!errors.email} helperText={errors.email}
                    />
                    <TextField fullWidth label="Address" margin="normal" value={newContact.address} onChange={(e) => setNewContact({ ...newContact, address: e.target.value })} />
                    <TextField fullWidth label="Note" margin="normal" value={newContact.note} onChange={(e) => setNewContact({ ...newContact, note: e.target.value })} />

                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="text" sx={{ color: "#d32f2f" }} onClick={() => setOpenAddModal(false)}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleAddContact}>Add</Button>
                    </Box>
                </Box>
            </Modal>
            {/* <ContactFormModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                initialContact={{ firstName: "", phone: "", email: "" }}
                onSave={handleAddContact} 
            /> */}
            
            {/* Edit Contact Modal */}
            <Modal open={openEditModal} onClose={() => setOpenEditModal(false)} className="edit-contact-modal">
                <Box className="edit-contact-form">
                    <Typography variant="h5" gutterBottom>Edit Contact</Typography>
                    <TextField fullWidth label="First Name" required margin="normal" value={newContact.firstName}
                        onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                        error={!!errors.firstName} helperText={errors.firstName}
                    />
                    <TextField fullWidth label="Middle Name" margin="normal" value={newContact.middleName} onChange={(e) => setNewContact({ ...newContact, middleName: e.target.value })} />
                    <TextField fullWidth label="Last Name" margin="normal" value={newContact.lastName} onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })} />
                    <TextField fullWidth label="Phone" required margin="normal" value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                        error={!!errors.phone} helperText={errors.phone}
                    />
                    <TextField fullWidth label="Email" margin="normal" value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        error={!!errors.email} helperText={errors.email}
                    />
                    <TextField fullWidth label="Address" margin="normal" value={newContact.address} onChange={(e) => setNewContact({ ...newContact, address: e.target.value })} />
                    <TextField fullWidth label="Note" margin="normal" value={newContact.note} onChange={(e) => setNewContact({ ...newContact, note: e.target.value })} />

                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="contained" color="error" onClick={() => setOpenEditModal(false)}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleUpdateContact}>Save</Button>
                    </Box>
                </Box>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <Box className="delete-confirmation-popup">
                    <Typography variant="h6" gutterBottom>
                        Are you sure you want to delete this contact?
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="center" gap={2}>
                        <Button
                            variant="text"
                            sx={{ color: "#1976d2" }}
                            onClick={() => setOpenDeleteModal(false)}
                        >
                            No
                        </Button>
                        <Button
                            variant="text"
                            sx={{ color: "#d32f2f" }}
                            onClick={confirmDelete}
                        >
                            Yes
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default ContactBook;