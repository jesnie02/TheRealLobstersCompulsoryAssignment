using Microsoft.AspNetCore.Mvc;
using _service;
using _service.dto;

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

    [HttpDelete("{paperId}")]
    public async Task<ActionResult> DeletePaperAsync(int paperId)
    {
        await _service.DeletePaperAsync(paperId);
        return NoContent();
    }
    
    
    
}