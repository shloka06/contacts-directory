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
export const createContact = async(contact: ContactFormData): Promise<Contact> => {
    const response = await axios.post(API_URL, contact);
    return response.data; // Return new contact data - will contain generated id
}

// Update an Existing Contact - ID passed through URL NOT the body - so use ContactFormData type which omits id
export const updateContact = async(id: string, contact: ContactFormData) : Promise<Contact> => {
    if(!isValidGuid(id)) {
        throw new Error("Invalid GUID Format");
    }
    const response = await axios.put(`${API_URL}/${id}`, contact);
    return response.data;
}

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