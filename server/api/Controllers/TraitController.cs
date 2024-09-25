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
        private readonly TraitService _traitService;

        public TraitController(TraitService traitService)
        {
            _traitService = traitService;
        }
        
        // Create new trait
        [HttpPost]
        public async Task<IActionResult> CreateTrait(TraitDto traitDto)
        {
            var trait = new Trait()
            {
                TraitName = traitDto.TraitName,
                Id = traitDto.Id
                
            };

            var createdTrait = await _traitService.CreateTraitAsync(trait);
            return CreatedAtAction(nameof(GetTrait), new { id = createdTrait.Id }, createdTrait);
        }
        
        // Retrive trait by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrait(int id)
        {
            var trait = await _traitService.GetTraitByIdAsync(id);
            if (trait == null)
            {
                return NotFound();
            }

            var traitDto = new TraitDto()
            {
                TraitName = trait.TraitName,
                Id = trait.Id
            };
            return Ok(traitDto);
        }
        
        //delete trait by id 
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
    }
}