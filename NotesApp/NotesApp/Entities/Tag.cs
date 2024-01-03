namespace NotesApp.Entities;

public class Tag
{
    public int Id { get; set; }
    public string Header { get; set; }
    public int? NoteId { get; set; }
    public Note Note { get; set; }
}