using Microsoft.EntityFrameworkCore;
using NotesApp.Entities;

namespace NotesApp;

public class DataContext : DbContext
{
    #region Sets

    public DbSet<Note> Notes { get; set; }
    
    public DbSet<Tag> Tags { get; set; }

    public DbSet<Reminder> Reminders { get; set; }

    #endregion
    
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("User ID=postgres;Password=Aa123456;Host=localhost;Port=5432;Database=notesApp;Pooling=true;Connection Lifetime=0;");
    }
}