using dataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using service.dto;
using service.Services;

namespace api.Controllers
{
    [ApiController]
    [Route("api/traits")]
    public class TraitController : ControllerBase
    {
        private readonly ITraitService _traitService;

        public TraitController(ITraitService traitService)
        {
            _traitService = traitService;
        }

        // Create new trait
        [HttpPost]
        public async Task<ActionResult<TraitDto>> CreateTrait(TraitDto traitDto)
        {
            var createdTrait = await _traitService.CreateTraitAsync(traitDto);
            return CreatedAtAction(nameof(GetTrait), new { id = createdTrait.Id }, createdTrait);
        }

        // Retrieve trait by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrait(int id)
        {
            var traitDto = await _traitService.GetTraitByIdAsync(id);
            if (traitDto == null)
            {
                return NotFound();
            }
            return Ok(traitDto);
        }

        // Retrieve all traits
        [HttpGet]
        public async Task<IActionResult> GetAllTraits()
        {
            var traits = await _traitService.GetAllTraitsAsync();
            return Ok(traits);
        }
        
        // Update trait by id
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrait(int id, TraitDto traitDto)
        {
            if (id != traitDto.Id)
            {
                return BadRequest("Trait ID mismatch");
            }

            var updatedTrait = await _traitService.UpdateTraitAsync(traitDto);
            if (updatedTrait == null)
            {
                return NotFound();
            }

            return Ok(updatedTrait);
        }

        // Delete trait by id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrait(int id)
        {
            var isDeleted = await _traitService.DeleteTraitAsync(id);
            if (!isDeleted)
            {
                return NotFound();
            }
            return NoContent();
        }
        
        [HttpGet("byPaper/{paperId}")]
        public async Task<IActionResult> GetTraitsByPaperId(int paperId)
        {
            var traits = await _traitService.GetTraitsByPaperIdAsync(paperId);
            if (traits == null || !traits.Any())
            {
                return NotFound();
            }
            return Ok(traits);
        }
        
    }
}