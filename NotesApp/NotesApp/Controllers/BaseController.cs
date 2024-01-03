using Microsoft.AspNetCore.Mvc;

namespace NotesApp.Controllers;

[Route("[controller]/[action]")]
public class BaseController : ControllerBase
{
    protected DataContext _context = new();
}