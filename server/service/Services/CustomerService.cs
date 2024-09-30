using dataAccess;
using dataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using service.dto;

namespace service.Services;



public interface ICustomerService
{
    Task<CreateCustomerDto> CreateCustomerAsync(CreateCustomerDto createCustomerDto);
    Task<CreateCustomerDto?> GetCustomerByIdAsync(int id);
    Task<List<CustomerDto>> GetAllCustomersAsync();
    Task<CreateCustomerDto?> UpdateCustomerAsync(int id, CreateCustomerDto createCustomerDto);
    Task<bool> DeleteCustomerAsync(int id);
}


public class CustomerService : ICustomerService
{
    
    private readonly ILogger<CustomerService> _logger;
    private readonly MyDbContext _context;

    public CustomerService(ILogger<CustomerService> logger, MyDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<CreateCustomerDto> CreateCustomerAsync(CreateCustomerDto createCustomerDto)
    {
        _logger.LogInformation("Creating a new customer");
        var customer = new Customer
        {
            Name = createCustomerDto.Name,
            Address = createCustomerDto.Address,
            Phone = createCustomerDto.Phone,
            Email = createCustomerDto.Email
        };
        await _context.Customers.AddAsync(customer);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Customer created successfully");
        return CreateCustomerDto.FromCustomer(customer);

    }

    public Task<CreateCustomerDto?> GetCustomerByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

  

    public Task<CreateCustomerDto?> UpdateCustomerAsync(int id, CreateCustomerDto createCustomerDto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteCustomerAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<CustomerDto>> GetAllCustomersAsync()
    {
        var customers = await _context.Customers.ToListAsync();
        return customers.Select(CustomerDto.FromCustomer).ToList();
    }
}