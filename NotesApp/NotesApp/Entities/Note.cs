namespace NotesApp.Entities;

public class Note
{
    public int Id { get; set; }
    public string Header { get; set; }
    public string Description { get; set; }
    
    public DateTime CreationDateTime { get; set; } 
}