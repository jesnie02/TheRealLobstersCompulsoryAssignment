using dataAccess;
using dataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using service.dto;

namespace service.Services;


public interface IFilterService
{
    Task<List<PaperDto>> GetFilteredPapers(decimal minPrice, decimal maxPrice, string trait);
}

public class FilterService : IFilterService
{
 
    private readonly ILogger<CustomerService> _logger;
    private readonly MyDbContext _context;

    public FilterService(ILogger<CustomerService> logger, MyDbContext context)
    {
        _logger = logger;
        _context = context;
    }


    public Task<List<PaperDto>> GetFilteredPapers(decimal minPrice, decimal maxPrice, string trait)
    {
        throw new System.NotImplementedException();
        
    }
}