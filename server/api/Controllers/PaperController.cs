using Microsoft.AspNetCore.Mvc;
using _service;
using _service.dto;
using service.dto;
using service.Services;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PaperController : ControllerBase
{
    
    private readonly IPaperService _service;

    public PaperController(IPaperService service)
    {
        _service = service;
    }

    /*
    [HttpPost]
    public async Task<ActionResult<PaperDto>> CreatePaperAsync(CreatePaperDto createPaperDto)
    {
        var paper = await _service.CreatePaperAsync(createPaperDto);
        return Ok(paper);
    }
   
    
    
    [HttpPut("{id}")]
    public async Task<ActionResult<PaperDto>> UpdatePaperAsync(int id, UpdatePaperDto updatePaperDto)
    {
        if (id != updatePaperDto.Id)
        {
            return BadRequest("Paper ID mismatch");
        }

        var paper = await _service.UpdatePaperAsync(updatePaperDto);
        return Ok(paper);
    }
 */
    
    
    [HttpDelete("{paperId}")]
    public async Task<ActionResult> DeletePaperAsync(int paperId)
    {
        await _service.DeletePaperAsync(paperId);
        return NoContent();
    }
    
    
    [HttpGet]
    public async Task<ActionResult<List<PaperDto>>> GetAllPapersAsync()
    {
        var papers = await _service.GetAllPapersAsync();
        return Ok(papers);
    }
    
    [HttpPost("{paperId}/traits")]
    public async Task<IActionResult> AddTraitsToPaper(int paperId, [FromBody] List<int> traitIds)
    {
        var traitToPaperDto = new TraitToPaperDto
        {
            PaperId = paperId,
            TraitIds = traitIds
        };

        try
        {
            await _service.AddTraitsToPaperAsync(traitToPaperDto);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    
    [HttpPost]
    public async Task<ActionResult<paperDetailViewModel>> CreateNewPaper([FromBody] CreatePaperDto createPaperDto)
    {
        var createdPaper = await _service.CreateNewPaper(createPaperDto);
        return CreatedAtAction(nameof(CreateNewPaper), new { id = createdPaper.Id }, createdPaper);
    }
    
    
    [HttpPatch("{id}")]
    public async Task<ActionResult<paperDetailViewModel>> UpdateExistingPaper(int id, UpdatePaperDto updatePaperDto)
    {
        if (id != updatePaperDto.Id)
        {
            return BadRequest("Paper ID mismatch");
        }

        try
        {
            var updatedPaper = await _service.UpdateExistingPaper(updatePaperDto);
            return Ok(updatedPaper);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}