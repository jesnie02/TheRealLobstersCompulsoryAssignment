using dataAccess;
using dataAccess.Models;
using Microsoft.Extensions.Logging;
using service.dto;

namespace service.Services;



public interface ICustomerService
{
    Task<CustomerDto> CreateCustomerAsync(CustomerDto customerDto);
    Task<CustomerDto?> GetCustomerByIdAsync(int id);
    Task<List<CustomerDto>> GetAllCustomersAsync();
    Task<CustomerDto?> UpdateCustomerAsync(int id, CustomerDto customerDto);
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

    public async Task<CustomerDto> CreateCustomerAsync(CustomerDto customerDto)
    {
        _logger.LogInformation("Creating a new customer");
        var customer = new Customer
        {
            Name = customerDto.Name,
            Address = customerDto.Address,
            Phone = customerDto.Phone,
            Email = customerDto.Email
        };
        await _context.Customers.AddAsync(customer);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Customer created successfully");
        return CustomerDto.FromCustomer(customer);

    }

    public Task<CustomerDto?> GetCustomerByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<List<CustomerDto>> GetAllCustomersAsync()
    {
        throw new NotImplementedException();
    }

    public Task<CustomerDto?> UpdateCustomerAsync(int id, CustomerDto customerDto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteCustomerAsync(int id)
    {
        throw new NotImplementedException();
    }
}