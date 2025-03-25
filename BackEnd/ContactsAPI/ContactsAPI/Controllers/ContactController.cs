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
        public async Task<ActionResult<Contact>> CreateContact(Contact contact)
        {
            contact.Id = new Guid();
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact ); // Return 201 Created; URI of the newly created contact; and the created Contact object
        }

        // PUT api/<controller>/5
        // Update a contact based on Guid - Takes in Guid and contact with updated data; Returns success message with empty body, or error message
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(Guid id, Contact contact)
        {
            if (id != contact.Id)
                return BadRequest(); // Return 400 - ID Mismatch

            var existingContact = await _context.Contacts.FindAsync(id);
            if (existingContact == null)
                return NotFound();  // Return 404 - Contact doesn't exist

            _context.Entry(contact).State = EntityState.Modified; // Mark entity as modified
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
