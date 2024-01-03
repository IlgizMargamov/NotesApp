namespace NotesApp.Entities;

public class Reminder
{
    public int Id { get; set; }
    public int NoteId { get; set; }
    public Note Note { get; set; }
    public DateTime DueDateTime { get; set; }
}