using _service.dto;
using dataAccess;
using dataAccess.interfaces;
using dataAccess.Models;
using FluentValidation;
using Microsoft.Extensions.Logging;

namespace _service;

public interface IPaperService
{
    PaperDto CreatePaper(CreatePaperDto createPaperDto);
    PaperDto UpdatePaper(UpdatePaperDto updatePaperDto);
    PaperDto DeletePaper(int paperId);
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

    public PaperDto CreatePaper(CreatePaperDto createPaperDto)
    {
        _createPaperValidator.ValidateAndThrow(createPaperDto);
        var paper = createPaperDto.ToPaper();
        Paper newPaper = _paperRepository.InsertPaper(paper);
        return new PaperDto().FromEntity(newPaper);
    }

   public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto)
{
    var paper = _context.Papers.Find(updatePaperDto.Id);
    if (paper == null)
    {
        throw new Exception("Paper not found");
    }

    paper.Name = updatePaperDto.Name;
    paper.Discontinued = updatePaperDto.Discontinued;
    paper.Stock = updatePaperDto.Stock;
    paper.Price = updatePaperDto.Price;

    _context.Papers.Update(paper);
    _context.SaveChanges();

    return new PaperDto
    {
        Id = paper.Id,
        Name = paper.Name,
        Discontinued = paper.Discontinued,
        Stock = paper.Stock,
        Price = paper.Price
    };
}

    public PaperDto DeletePaper(int paperId)
    {
        var paper = _context.Papers.Find(paperId);
        _context.Papers.Remove(paper);
        _context.SaveChanges();
        return new PaperDto().FromEntity(paper);
    }
}