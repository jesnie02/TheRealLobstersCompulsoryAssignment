using _service.dto;
using dataAccess;
using dataAccess.interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using service.dto;

namespace service.Services;

public interface IPaperService
{
    Task<PaperDto> CreatePaperAsync(CreatePaperDto createPaperDto);
    Task<PaperDto> UpdatePaperAsync(UpdatePaperDto updatePaperDto);
    Task DeletePaperAsync(int paperId);
    Task<PaperDto> TraitToPaperAsync(TraitToPaperDto traitsToPaperDto);
    Task<List<PaperDto>> GetAllPapersAsync();
}

public class PaperService : IPaperService
{
    private readonly ILogger<PaperService> _logger;
    private readonly IPaper _paperRepository;
    private readonly IValidator<CreatePaperDto> _createPaperValidator;
    private readonly IValidator<UpdatePaperDto> _updatePaperValidator;
    private readonly MyDbContext _context;

    public PaperService(
        ILogger<PaperService> logger,
        IPaper paperRepository,
        IValidator<CreatePaperDto> createPaperValidator,
        IValidator<UpdatePaperDto> updatePaperValidator,
        MyDbContext context)
    {
        _logger = logger;
        _paperRepository = paperRepository;
        _createPaperValidator = createPaperValidator;
        _updatePaperValidator = updatePaperValidator;
        _context = context;
    }

    public async Task<PaperDto> CreatePaperAsync(CreatePaperDto createPaperDto)
    {
        await _createPaperValidator.ValidateAndThrowAsync(createPaperDto);
        var paper = createPaperDto.ToPaper();
        await _context.Papers.AddAsync(paper);
        await _context.SaveChangesAsync();

        return PaperDto.FromEntity(paper);
    }

    public async Task<PaperDto> UpdatePaperAsync(UpdatePaperDto updatePaperDto)
    {
        var paper = await _context.Papers.FindAsync(updatePaperDto.Id);
        if (paper == null)
        {
            throw new Exception("Paper not found");
        }

        paper.Name = updatePaperDto.Name ?? string.Empty;
        paper.Discontinued = updatePaperDto.Discontinued;
        paper.Stock = updatePaperDto.Stock;
        paper.Price = updatePaperDto.Price;

        _context.Papers.Update(paper);
        await _context.SaveChangesAsync();

        return PaperDto.FromEntity(paper);
    }

    public async Task DeletePaperAsync(int paperId)
    {
        var paper = await _context.Papers.FindAsync(paperId);
        if (paper == null)
        {
            throw new Exception("Paper not found");
        }

        _context.Papers.Remove(paper);
        await _context.SaveChangesAsync();
    }
    
    
    public async Task<PaperDto> TraitToPaperAsync(TraitToPaperDto traitsToPaperDto) 
    {
        var paper = await _context.Papers.Include(p => p.Traits)
            .FirstOrDefaultAsync(p => p.Id == traitsToPaperDto.PaperId);
        if (paper == null) throw new KeyNotFoundException("Paper not found");

        var traits = await _context.Traits
            .Where(t => traitsToPaperDto.TraitIds.Contains(t.Id))
            .ToListAsync();
        if (traits.Count != traitsToPaperDto.TraitIds.Count)
            throw new KeyNotFoundException("Some Traits not found");
    
        foreach (var trait in traits)
        {
            if (!paper.Traits.Any(t => t.Id == trait.Id))
            {
                paper.Traits.Add(trait);
            }
        }
        await _context.SaveChangesAsync();
        return PaperDto.FromEntity(paper);
    }
    
    public async Task<List<PaperDto>> GetAllPapersAsync()
    {
        var papers = await _context.Papers.Include(p => p.Traits).ToListAsync();
        return papers.Select(PaperDto.FromEntity).ToList();
    }
}