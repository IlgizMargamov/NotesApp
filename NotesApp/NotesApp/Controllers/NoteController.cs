using Microsoft.AspNetCore.Mvc;
using NotesApp.DTO;
using NotesApp.DTO.Note;
using NotesApp.Entities;

namespace NotesApp.Controllers;

[ApiController]
public class NoteController : BaseController
{
    [HttpGet]
    public IEnumerable<Note> Get()
    {
        return _context.Notes.ToArray();
    }

    [HttpPost]
    public bool Post(PostNoteInput input)
    {
        _context.Add(new Note
        {
            Header = input.Header,
            Description = input.Description,
            CreationDateTime = DateTime.Now
        });

        _context.SaveChanges();
        return true;
    }

    [HttpPatch]
    public bool Edit(EditNoteInput input)
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

    [HttpPatch]
    public bool SetTag(int noteId, int tagId)
    {
        var tag = _context.Tags.FirstOrDefault(x => x.Id == tagId);
        if (tag == null)
        {
            return false;
        }

        var note = _context.Notes.FirstOrDefault(x => x.Id == noteId);
        if (note == null || note.Tags.Any(x => x.Id == tagId))
        {
            return false;
        }

        note.Tags.Add(tag);
        _context.SaveChanges();
        return true;
    }
}