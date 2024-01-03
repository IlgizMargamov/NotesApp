using Microsoft.AspNetCore.Mvc;
using NotesApp.DTO.Reminder;
using NotesApp.Entities;

namespace NotesApp.Controllers;

[ApiController]
public class ReminderController : BaseController
{
    [HttpGet]
    public IEnumerable<Reminder> Get()
    {
        return _context.Reminders.ToList();
    }

    [HttpPost]
    public bool Create(CreateReminderInput input)
    {
        if (!_context.Notes.Any(x => x.Id == input.NoteId))
        {
            return false;
        }

        if (DateTime.Now - input.DueDateTime <= new TimeSpan(0,1,0))
        {
            return false;
        }
        
        _context.Add(new Reminder
        {
            NoteId = input.NoteId,
            DueDateTime = input.DueDateTime
        });
        _context.SaveChanges();
        return true;
    }

    [HttpDelete]
    public bool Delete(int id)
    {
        var reminder = _context.Reminders.FirstOrDefault(x => x.Id == id);
        if (reminder == null)
        {
            return false;
        }

        _context.Remove(reminder);
        _context.SaveChanges();
        return true;
    }
}