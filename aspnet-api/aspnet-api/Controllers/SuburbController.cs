using Microsoft.AspNetCore.Mvc;

namespace aspnet_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SuburbController : Controller
    {
        private readonly ISuburbService _suburbService;

        public SuburbController(ISuburbService suburbService)
        {
            _suburbService = suburbService;
        }

        [HttpGet]
        public async Task<IActionResult> GetClosestSuburb([FromQuery] double latitude, [FromQuery] double longitude)
        {
            var suburb = await _suburbService.GetClosestSuburbFromPoint(latitude, longitude);

            return Ok(suburb);

        }
    }
}
