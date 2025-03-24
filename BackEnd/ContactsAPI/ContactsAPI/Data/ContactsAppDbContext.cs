using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Data
{
    public class ContactsAppDbContext : DbContext
    {
        public ContactsAppDbContext(DbContextOptions<ContactsAppDbContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Seed(); // Call the seeding method from ModelBuilderExtensions.cs to fill initial data
        }
    }
}
