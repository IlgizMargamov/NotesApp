using Microsoft.AspNetCore.Mvc;
using NotesApp.Entities;

namespace NotesApp.Controllers;

[ApiController]
[Route("[controller]")]
public class NoteController : BaseController
{
    [HttpGet]
    public IEnumerable<Note> Get()
    {
        return _context.Notes.ToArray();
    }

    public class EditInput
    {
        public int Id { get; set; }
        public string? Header { get; set; }
        public string? Description { get; set; }
    }
    
    public class PostInput
    {
        public string Header { get; set; }
        public string Description { get; set; }
    }
    [HttpPost]
    public bool Post(PostInput input)
    {
        _context.Add(new Note
        {
            Header = input.Header,
            Description = input.Description
        });

        _context.SaveChanges();
        return true;
    }

    [HttpPatch]
    public bool Edit(EditInput input)
    {
        var note = _context.Notes.FirstOrDefault(x => x.Id == input.Id);
        if (note == null)
        {
            return false;
        }

        if (input.Header != null)
        {
            note.Header = input.Header;
        }

        if (input.Description != null)
        {
            note.Description = input.Description;
        }

        _context.SaveChanges();
        return true;
    }

    [HttpDelete]
    public bool Delete(int id)
    {
        var note = _context.Notes.FirstOrDefault(x => x.Id == id);
        if (note == null)
        {
            return false;
        }

        _context.Remove(note);
        _context.SaveChanges();
        return true;
    }
}