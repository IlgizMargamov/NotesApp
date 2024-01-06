namespace NotesApp.DTO.Reminder;

public class CreateReminderInput
{
    public int NoteId { get; set; }
    public DateTime DueDateTime { get; set; }
    public int TimeZoneOffset { get; set; }
}