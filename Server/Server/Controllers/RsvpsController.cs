using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Models.Enums;

namespace Server.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    public class RsvpsController : ControllerBase
    {
        private readonly EventoContext _context;

        public RsvpsController(EventoContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("{eventId}/{userId}/{rsvpStatus}")]
        public IActionResult AddRsvp([FromRoute] int eventId, [FromRoute] string userId, [FromRoute] RSVPStatusEnum rsvpStatus)
        {
            var existingRsvp = _context.rsvpTbl
                .FirstOrDefault(r => r.eventId == eventId && r.UserId.Equals(userId));

            if (existingRsvp != null)
            {
                existingRsvp.status = rsvpStatus;
                _context.rsvpTbl.Update(existingRsvp);
            }
            else
            {
                var newRsvp = new RSVP
                {
                    eventId = eventId,
                    UserId = userId,
                    status = rsvpStatus
                };
                _context.rsvpTbl.Add(newRsvp);
            }

            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Route("{userId}")]
        public IActionResult GetRSVPsByUser([FromRoute] string userId)
        {
            var rsvps = _context.rsvpTbl
                .Where(r => r.UserId == userId)
                .Select(r => new
                {
                    r.eventId,
                    r.status
                })
                .ToList();

            if (rsvps == null || !rsvps.Any())
            {
                return NotFound("No RSVPs found for the specified user.");
            }

            return Ok(rsvps);
        }

        [HttpGet]
        [Route("{eventId}/{userId}")]
        public IActionResult GetRsvpStatus([FromRoute] int eventId, [FromRoute] string userId)
        {
            var rsvp = _context.rsvpTbl
                .FirstOrDefault(r => r.eventId == eventId && r.UserId.Equals(userId));

            if (rsvp == null)
            {
                return NotFound("RSVP not found.");
            }

            return Ok(rsvp.status);
        }
    }
}
