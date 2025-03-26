using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly ContactsAppDbContext _context; // Refers to the in-memory DB

        public ContactController(ContactsAppDbContext context)
        {
            _context = context;
        }

        // GET: api/<controller>
        // Get full contacts list - Returns list of contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetAllContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        // GET api/<controller>/5
        // Get one particular contact by its ID - Takes in Guid; Returns particular contact if found, else not found error
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Contact>> GetContact(Guid id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
                return NotFound(); // Return 404

            return contact;
        }

        // POST api/<controller>
        // Create a new contact - Takes in new contact; Returns success message with newly created contact, or error message
        [HttpPost]
        public async Task<ActionResult<Contact>> CreateContact([FromBody] Contact contact)
        {
            if (contact == null)
                return BadRequest("Invalid contact data.");

            contact.Id = Guid.NewGuid(); // Generate a proper unique ID
            _context.Contacts.Add(contact);

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetContact), new
                {
                    id = contact.Id
                }, contact);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error creating contact: {ex.Message}");
                return StatusCode(500, "An error occurred while saving the contact.");
            }
        }


        // PUT api/<controller>/5
        // Update a contact based on Guid - Takes in Guid and contact with updated data; Returns success message with empty body, or error message
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(Guid id, [FromBody] Contact updatedContact)
        {
            if (updatedContact == null)
                return BadRequest("Invalid contact data");

            var existingContact = await _context.Contacts.FindAsync(id);
            if (existingContact == null)
                return NotFound("Contact not found");

            existingContact.FirstName = updatedContact.FirstName;
            existingContact.MiddleName = updatedContact.MiddleName;
            existingContact.LastName = updatedContact.LastName;
            existingContact.Phone = updatedContact.Phone;
            existingContact.Email = updatedContact.Email;
            existingContact.Address = updatedContact.Address;
            existingContact.Note = updatedContact.Note;

            await _context.SaveChangesAsync();
            return NoContent();
        }



        // DELETE api/<controller>/5
        // Delete a contact based on Guid - Takes in Guid; Returns success message with empty body, or error message
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
                return NotFound();

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
