using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApp.DTO;
using NotesApp.DTO.Note;
using NotesApp.Entities;

namespace NotesApp.Controllers;

[ApiController]
public class NoteController : BaseController
{
    [HttpGet]
    public IEnumerable<NoteDTO> Get()
    {
        var notes = _context.Notes.Select(x=>new NoteDTO
        {
            Id = x.Id,
            Header = x.Header,
            Description = x.Description,
            Tags = x.NoteTags.Select(x=>x.Tag).ToList()
        }).ToArray();
        return notes;
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

        var note = _context.Notes.Include(x=>x.NoteTags).FirstOrDefault(x => x.Id == noteId);
        if (note == null || note.NoteTags.ToList().Any(x => x.TagId == tagId))
        {
            return false;
        }

        note.NoteTags.Add(new NoteTag
        {
            TagId = tagId
        });
        _context.SaveChanges();
        return true;
    }
    
    [HttpPatch]
    public bool RemoveTag(int noteId, int tagId)
    {
        var tag = _context.Tags.FirstOrDefault(x => x.Id == tagId);
        if (tag == null)
        {
            return false;
        }

        var note = _context.Notes.Include(x=>x.NoteTags).FirstOrDefault(x => x.Id == noteId);
        if (note == null || note.NoteTags.All(x => x.TagId != tagId))
        {
            return false;
        }

        var noteTag = note.NoteTags.FirstOrDefault(x => x.TagId == tagId);
        if (noteTag == null)
        {
            return false;
        }
        
        _context.NoteTag.Remove(noteTag);
        _context.SaveChanges();
        return true;
    }
}