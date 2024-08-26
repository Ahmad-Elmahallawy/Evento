using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    public class EventsController : ControllerBase
    {

        private readonly EventoContext _context;

        public EventsController(EventoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllEvents()
        {
            var events = _context.eventTbl.ToList();
            return Ok(events);
        }

        [HttpPost]
        [Authorize]
        public IActionResult AddEvent([FromBody] Event newEvent)
        {
            if (ModelState.IsValid)
            {
                _context.eventTbl.Add(newEvent);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetAllEvents), new { id = newEvent.Id }, newEvent);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        [Route("{eventId}")]
        public IActionResult DeleteEvent([FromRoute] int eventId)
        {
            var eventToDelete = _context.eventTbl.Find(eventId);
            if (eventToDelete == null)
            {
                return NotFound();
            }

            _context.eventTbl.Remove(eventToDelete);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
