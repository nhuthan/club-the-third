using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace the_third
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<TodoItem> Items { get; set; }
        public DbSet<TodoList> Lists { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //     => optionsBuilder.UseNpgsql("Host=localhost;Port=5433;Database=the_third;Username=postgres;Password=nhuthan@123");

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // builder.Entity<TodoItem>()
            //     .HasOne<TodoList>(e => e.List)
            //     .WithMany(e => e.Items)
            //     .HasForeignKey(e => e.ListId);

            // builder.Entity<TodoItem>()
            //     .HasIndex(e => e.Title)
            //     .IsUnique();

        }

    }
}