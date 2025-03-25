export interface Contact {
    id: string;
    firstName: string;
    middleName?: string;
    lastName?: string;
    phone: string;
    email?: string;
    address?: string;
    note?: string;
}

// Export Type for Creating/Updating a Contact (Without Id)
export type ContactFormData = Omit<Contact, "id">;