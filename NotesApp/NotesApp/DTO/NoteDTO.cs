namespace NotesApp.DTO;

public class NoteDTO
{
    public int Id { get; set; }
    public string Header { get; set; }
    public string Description { get; set; }
    public List<Entities.Tag> Tags { get; set; }
}