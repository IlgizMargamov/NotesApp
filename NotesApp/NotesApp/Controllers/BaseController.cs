using Microsoft.AspNetCore.Mvc;

namespace NotesApp.Controllers;

public class BaseController : ControllerBase
{
    protected DataContext _context = new();
}