using Microsoft.AspNetCore.Mvc;

namespace aspnet_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SuburbController : Controller
    {
        private readonly ISuburbService _suburbService;

        public SuburbController()
        {
            _suburbService = new SuburbService();
        }

        //[HttpGet]
        //public async Task<IActionResult> GetAllSuburbs()
        //{
        //    var suburbs = await _suburbService.GetSuburb();
        //    return Ok(suburbs);
        //}

        [HttpGet]
        public async Task<IActionResult> GetClosestSuburb([FromQuery] double latitude, [FromQuery] double longitude)
        {
            var suburb = await _suburbService.GetSuburb(latitude, longitude);

            return Ok(suburb);

        }
    }
}
