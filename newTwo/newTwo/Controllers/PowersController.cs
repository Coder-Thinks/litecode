using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newTwo.Context;
using newTwo.NewFolder;
using newTwo.Repository;

namespace newTwo.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PowersController : ControllerBase
    {
        private readonly IPowerRepository _contextPower;
        public PowersController(IPowerRepository contextPower)
        {
            _contextPower = contextPower;
        }
        [HttpPost("{power}")]
        public async Task<IActionResult> Create (Power power)
        {
            var data = await _contextPower.Craete(power);
                if(data > 0)
            {
                return Ok("Sucessfully");
            }
            return BadRequest("Something Wrong");

        }
        [HttpPatch("{power}")]
        public async Task<IActionResult> Update(Power power)
        {
            var data = await _contextPower.Update(power);
            if (data > 0)
            {
                return Ok("Sucessfully");
            }
            return BadRequest("Something Wrong");

        }
        [HttpDelete("{powerId}")]
        public async Task<IActionResult> Delete(int powerId)
        {
            var data = await _contextPower.Delete(powerId);
            if (data > 0)
            {
                return Ok("Sucessfully");
            }
            return BadRequest("Something Wrong");

        }
        [HttpGet("{powerId}")]
        public async Task<IActionResult> GetById(int powerId)
        {
            var data = await _contextPower.GetById(powerId);
            if (data != null)
                  
            {
                return Ok(data);
            }
            return BadRequest("Something Wrong");

        }
        [HttpGet]
        public async Task<IActionResult> Powers()
        {
            var data = await _contextPower.GetPowers();
            if (data != null)
            {
                return Ok(data);
            }
            return BadRequest("Something Wrong");

        }
        [HttpGet("countries")]
        public async Task<IActionResult> Countries()
        {
            var data = await _contextPower.GetCountries();
            if (data != null)
            {
                return Ok(data);
            }
            return BadRequest("Something Wrong");

        }
        [HttpGet("states/{powerId}")]
        public async Task<IActionResult> GetStates(int powerId)
        {
            var data = await _contextPower.GetStates(powerId);
            if (data != null)

            {
                return Ok(data);
            }
            return BadRequest("Something Wrong");

        }
        [HttpGet("cities/{powerId}")]
        public async Task<IActionResult> GetCities(int powerId)
        {
            var data = await _contextPower.GetCities(powerId);
            if (data != null)

            {
                return Ok(data);
            }
            return BadRequest("Something Wrong");

        }
    }
}
