using Microsoft.EntityFrameworkCore;
using System;

namespace ContactsAPI.Models
{
    public static class ModelBuilderExtensions
    {
        // Method to create initial application data for the in-memory DB
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().HasData(
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Amit",
                    MiddleName = "Kumar",
                    LastName = "Sharma",
                    Phone = "+91 9876543210",
                    Email = "amit.sharma@example.com",
                    Address = "123 MG Road, Mumbai, Maharashtra",
                    Note = "Bombay University Friend"
                },
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Neha",
                    MiddleName = "Rajesh",
                    LastName = "Patel",
                    Phone = "+91 9823456789",
                    Email = "neha.patel@example.com",
                    Address = "45 Satellite Road, Ahmedabad, Gujarat",
                    Note = "Sandesh's Wife"
                },
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Rahul",
                    MiddleName = "Pratap",
                    LastName = "Singh",
                    Phone = "+91 9998877665",
                    Email = "rahul.singh@example.com",
                    Address = "78 Civil Lines, Lucknow, Uttar Pradesh",
                    Note = "Realtor"
                },
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Pooja",
                    MiddleName = "Suresh",
                    LastName = "Iyer",
                    Phone = "+91 8887766554",
                    Email = "pooja.iyer@example.com",
                    Address = "102 Anna Nagar, Chennai, Tamil Nadu",
                    Note = "Tanvi's Mom"
                },
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Vikram",
                    MiddleName = "Ramesh",
                    LastName = "Nair",
                    Phone = "+91 9123456780",
                    Email = "vikram.nair@example.com",
                    Address = "56 MG Road, Bangalore, Karnataka",
                    Note = "Cricket friend"
                },
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Ananya",
                    MiddleName = "Mahesh",
                    LastName = "Deshpande",
                    Phone = "+91 9012345678",
                    Email = "ananya.deshpande@example.com",
                    Address = "204 Fergusson College Road, Pune, Maharashtra",
                    Note = "Saree Shop"
                },
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Siddharth",
                    MiddleName = "Ashok",
                    LastName = "Verma",
                    Phone = "+91 9632587410",
                    Email = "siddharth.verma@example.com",
                    Address = "66 Park Street, Kolkata, West Bengal",
                    Note = "CS Teacher"
                },
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Kavita",
                    MiddleName = "Shankar",
                    LastName = "Menon",
                    Phone = "+91 8765432109",
                    Email = "kavita.menon@example.com",
                    Address = "301 Brigade Road, Bangalore, Karnataka",
                    Note = "CA - Bangalore"
                },
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Arjun",
                    MiddleName = "Deepak",
                    LastName = "Chopra",
                    Phone = "+91 8527419630",
                    Email = "arjun.chopra@example.com",
                    Address = "89 Rajpath, New Delhi",
                    Note = "Investment banker"
                },
                new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Meera",
                    MiddleName = "Vinod",
                    LastName = "Pillai",
                    Phone = "+91 7418529630",
                    Email = "meera.pillai@example.com",
                    Address = "14 Marine Drive, Kochi, Kerala",
                    Note = "Yoga teacher"
                }
            );
        }
    }
}
