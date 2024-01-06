using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApp.DTO.Reminder;
using NotesApp.Entities;

namespace NotesApp.Controllers;

[ApiController]
public class ReminderController : BaseController
{
    [HttpGet]
    public IEnumerable<Reminder> Get()
    {
        return _context.Reminders.Include(x=>x.Note).ToList();
    }

    [HttpGet]
    public IEnumerable<Reminder> CheckDates()
    {
        var now = DateTime.Now;
        var result = new List<Reminder>();
        foreach (var reminder in _context.Reminders.Include(x=>x.Note).Where(x=>x.DueDateTime < now).ToList())
        {
            result.Add(reminder);
            _context.Remove(reminder);
        }

        _context.SaveChanges();
        return result;
    }
    
    [HttpPost]
    public bool Create(CreateReminderInput input)
    {
        if (!_context.Notes.Any(x => x.Id == input.NoteId))
        {
            return false;
        }

        var timeInLocal = input.DueDateTime.AddMinutes(input.TimeZoneOffset*-1);
        if (timeInLocal - DateTime.Now <= new TimeSpan(0, 1,0))
        {
            return false;
        }
        
        _context.Add(new Reminder
        {
            NoteId = input.NoteId,
            DueDateTime = timeInLocal
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