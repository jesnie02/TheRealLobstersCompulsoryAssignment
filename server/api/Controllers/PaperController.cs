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
    public ActionResult<PaperDto> CreatePaper(CreatePaperDto createPaperDto)
    {
        var paper = _service.CreatePaper(createPaperDto);
        return Ok(paper);
    }
    
    [HttpPut("{id}")]
    public ActionResult<PaperDto> UpdatePaper(int id, UpdatePaperDto updatePaperDto)
    {
        if (id != updatePaperDto.Id)
        {
            return BadRequest("Paper ID mismatch");
        }

        var paper = _service.UpdatePaper(updatePaperDto);
        return Ok(paper);
    }
    
    [HttpDelete("{paperId}")]
    public ActionResult DeletePaper(int paperId)
    {
        _service.DeletePaper(paperId);
        return NoContent();
    }
    
    
    
}