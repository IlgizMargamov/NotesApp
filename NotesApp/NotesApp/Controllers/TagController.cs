using Microsoft.AspNetCore.Mvc;
using NotesApp.DTO.Tag;
using NotesApp.Entities;

namespace NotesApp.Controllers;

[ApiController]
public class TagController : BaseController
{
    [HttpGet]
    public IEnumerable<Tag> Get()
    {
        return _context.Tags.ToList();
    }

    [HttpPost]
    public bool Post(PostTagInput input)
    {
        if (_context.Tags.Any(x => x.Header == input.Header))
        {
            return false;
        }

        _context.Add(new Tag
        {
            Header = input.Header
        });
        _context.SaveChanges();
        return true;
    }

    [HttpDelete]
    public bool Delete(int id)
    {
        var tag = _context.Tags.FirstOrDefault(x => x.Id == id);
        if (tag == null)
        {
            return false;
        }

        _context.Remove(tag);
        _context.SaveChanges();
        return true;
    }
}