namespace NotesApp.DTO.Note;

public class EditNoteInput
{
    public int Id { get; set; }
    public string? Header { get; set; }
    public string? Description { get; set; }
}