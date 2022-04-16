using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace the_third
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<TodoItem> Items { get; set; }
        public DbSet<TodoList> Lists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Port=5433;Database=the_third;Username=postgres;Password=nhuthan@123");
    }
}