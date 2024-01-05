namespace NotesApp.Entities;

public class Tag
{
    public int Id { get; set; }
    public string Header { get; set; }
    public List<NoteTag> NoteTags { get; } = new();
}