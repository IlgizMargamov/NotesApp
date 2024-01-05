namespace NotesApp.Entities;

public class NoteTag
{
    public int Id { get; set; }
    
    public int NoteId { get; set; }
    public int TagId { get; set; }
    public Note Note { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}