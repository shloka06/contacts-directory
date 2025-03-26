import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContact } from "../services/api";
import { Contact } from "../types/contact";
import { Card, CardContent, Typography, Box, Button, CircularProgress } from "@mui/material";

const ContactDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                setLoading(true);
                const data = await getContact(id!);
                setContact(data);
            } catch (err) {
                setError("Failed to fetch contact details.");
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [id]);

    return (
        <Box className="contact-detail">
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography variant="h6" color="error">{error}</Typography>
            ) : contact ? (
                <Card className="contact-card-detail">
                    <CardContent>
                        <Typography variant="h4">{contact.firstName} {contact.middleName} {contact.lastName}</Typography>
                        <Typography variant="body1"><strong>Phone:</strong> {contact.phone}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {contact.email}</Typography>
                        <Typography variant="body1"><strong>Address:</strong> {contact.address}</Typography>
                        <Typography variant="body1"><strong>Note:</strong> {contact.note}</Typography>
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="h6">Contact not found.</Typography>
            )}
            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                Back to Contacts
            </Button>
        </Box>
    );
};

export default ContactDetail;