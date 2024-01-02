using Microsoft.EntityFrameworkCore;
using NotesApp.Entities;

namespace NotesApp;

public class DataContext : DbContext
{
    public DbSet<Note> Notes { get; set; }
    
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("User ID=postgres;Password=Aa123456;Host=localhost;Port=5432;Database=notesApp;Pooling=true;Connection Lifetime=0;");
    }
}