using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Models.Enums;

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

            var eventDetails = events.Select(e => new
            {
                e.Id,
                e.title,
                e.description,
                e.date,
                e.location,
                e.userId,
                e.currentCapacity,
                e.maximumCapacity,
                RSVPCounts = new
                {
                    Going = _context.rsvpTbl.Count(r => r.eventId == e.Id && r.status == RSVPStatusEnum.Going),
                    NotGoing = _context.rsvpTbl.Count(r => r.eventId == e.Id && r.status == RSVPStatusEnum.NotGoing),
                    Maybe = _context.rsvpTbl.Count(r => r.eventId == e.Id && r.status == RSVPStatusEnum.Maybe)
                }
            }).ToList();
            return Ok(eventDetails);
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
