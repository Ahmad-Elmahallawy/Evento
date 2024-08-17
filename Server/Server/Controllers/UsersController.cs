using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok("First API");
    }
}
