import axios from "axios";
import { Contact, ContactFormData } from "../types/contact";

const API_URL = "https://localhost:44305/api/Contact"

// Get all Contacts
export const getAllContacts = async(): Promise<Contact[]> => {
    const response = await axios.get(API_URL);
    return response.data;
}

// Get a Particular Contact by its GUID
export const getContact = async(id: string): Promise<Contact> => {
    if(!isValidGuid(id)) {
        throw new Error("Invalid GUID Format");
    }
    const response = await axios.get(`${API_URL}/${id}`);
    return (await response).data;
}

// Create a New Contact - Backend will generate the ID so use ContactFormData type which omits id while sending to backend
export const createContact = async (contact: ContactFormData): Promise<Contact | null> => {
    try {
        const response = await axios.post(API_URL, contact, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data; // Return new contact data with generated ID
    } catch (error) {
        console.error("Error creating contact:", error);

        // Return null if an error occurs
        return null;
    }
};


// Update an Existing Contact - ID passed through URL NOT the body - so use ContactFormData type which omits id
export const updateContact = async (id: string, contactData: ContactFormData) => {
    try {
        const response = await axios.put(
            `https://localhost:44305/api/Contact/${id}`,
            contactData,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating contact:", error);
        throw error;
    }
};

// Delete a Contact by its ID
export const deleteContact = async(id: string): Promise<void> => {
    if(!isValidGuid(id)) {
        throw new Error("Invalid GUID Format");
    }
    await axios.delete(`${API_URL}/${id}`);
}


// Helper Function to Validate GUID Format
const isValidGuid = (id: string) : boolean => {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return guidRegex.test(id);
}