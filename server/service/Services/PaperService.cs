﻿using _service.dto;
using dataAccess;
using dataAccess.interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using service.dto;

namespace service.Services;

public interface IPaperService
{

    //Task<PaperDto> UpdatePaperAsync(UpdatePaperDto updatePaperDto);
    Task DeletePaperAsync(int paperId);
   
    Task<List<PaperDto>> GetAllPapersAsync();
    Task AddTraitsToPaperAsync(TraitToPaperDto traitToPaperDto);
    Task<paperDetailViewModel> CreateNewPaper(CreatePaperDto createPaperDto);
    Task<paperDetailViewModel> UpdateExistingPaper(UpdatePaperDto updatePaperDto);
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
    
    
    
    public async Task AddTraitsToPaperAsync(TraitToPaperDto traitToPaperDto)
    {
        var paper = await _context.Papers.Include(p => p.Traits).FirstOrDefaultAsync(p => p.Id == traitToPaperDto.PaperId);
        if (paper == null)
        {
            throw new Exception("Paper not found");
        }

        var traits = await _context.Traits.Where(t => traitToPaperDto.TraitIds.Contains(t.Id)).ToListAsync();
        if (traits.Count != traitToPaperDto.TraitIds.Count)
        {
            throw new Exception("One or more traits not found");
        }

        foreach (var trait in traits)
        {
            if (!paper.Traits.Any(t => t.Id == trait.Id))
            {
                paper.Traits.Add(trait);
            }
        }

        await _context.SaveChangesAsync();
    }
    
    public async Task<List<PaperDto>> GetAllPapersAsync()
    {
        var papers = await _context.Papers.Include(p => p.Traits).ToListAsync();
        return papers.Select(PaperDto.FromEntity).ToList();
    }

    public async Task<paperDetailViewModel> CreateNewPaper(CreatePaperDto createPaperDto)
    {
        await _createPaperValidator.ValidateAndThrowAsync(createPaperDto);
        var newPaper = createPaperDto.ToPaper();
        var exists = await _context.Papers.AnyAsync(p => p.Name.ToLower() ==newPaper.Name.ToLower());
        
        if (exists)
            throw new InvalidOperationException($"paper with name {newPaper.Name} already exists");

        if (createPaperDto.TraitIds != null && createPaperDto.TraitIds.Count != 0)
        {
            var uniqueTraitIds = createPaperDto.TraitIds.Distinct().ToList();
            var traits = await _context.Traits.Where(t => uniqueTraitIds.Contains(t.Id)).ToListAsync();
            
            newPaper.Traits = traits;
        }
        
        await _context.Papers.AddAsync(newPaper);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException e)
        {
           throw new DbUpdateException("An error occurred while saving the paper", e);
        }
        return paperDetailViewModel.FromEntity(newPaper);
    }
    
    
    public async Task<paperDetailViewModel> UpdateExistingPaper(UpdatePaperDto updatePaperDto)
    {
        await _updatePaperValidator.ValidateAndThrowAsync(updatePaperDto);
        var paper = await _context.Papers.Include(p => p.Traits).FirstOrDefaultAsync(p => p.Id == updatePaperDto.Id);
    
        if (paper == null)
            throw new InvalidOperationException($"Paper with ID {updatePaperDto.Id} not found");

        paper.Name = updatePaperDto.Name ?? paper.Name;
        paper.Discontinued = updatePaperDto.Discontinued;
        paper.Stock = updatePaperDto.Stock;
        paper.Price = updatePaperDto.Price;

        if (updatePaperDto.TraitIds != null && updatePaperDto.TraitIds.Count != 0)
        {
            var uniqueTraitIds = updatePaperDto.TraitIds.Distinct().ToList();
            var traits = await _context.Traits.Where(t => uniqueTraitIds.Contains(t.Id)).ToListAsync();
        
            paper.Traits = traits;
        }

        _context.Papers.Update(paper);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException e)
        {
            throw new DbUpdateException("An error occurred while updating the paper", e);
        }
        return paperDetailViewModel.FromEntity(paper);
    }
}