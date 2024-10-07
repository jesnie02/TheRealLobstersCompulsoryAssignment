using dataAccess;
using dataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using service.dto;

namespace service.Services;



public interface ICustomerService
{
    Task<CreateCustomerDto> CreateCustomerAsync(CreateCustomerDto createCustomerDto);
    Task<CustomerDto?> GetCustomerByIdAsync(int id);
    Task<List<CustomerDto>> GetAllCustomersAsync();
    Task<CreateCustomerDto?> UpdateCustomerAsync(int id, CreateCustomerDto createCustomerDto);
    Task<bool> DeleteCustomerAsync(int id);
    Task<List<OrderDto>> GetOrdersByCustomerIdAsync(int customerId);
    Task<int> GetCustomerIdByEmailAsync(string email);
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

    public async Task<CustomerDto?> GetCustomerByIdAsync(int id)
    {
        var customer = await _context.Customers
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);

        if (customer == null)
        {
            return null;
        }

        return new CustomerDto
        {
            Id = customer.Id,
            Name = customer.Name,
            Address = customer.Address,
            Phone = customer.Phone,
            Email = customer.Email
        };
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
    
    // se orders from a specific customer
    public async Task<List<OrderDto>> GetOrdersByCustomerIdAsync(int customerId)
    {
        var orders = await _context.Orders
            .Where(o => o.CustomerId == customerId)
            .ToListAsync();
        return orders.Select(OrderDto.FromOrder).ToList();
    }

    public async Task<int> GetCustomerIdByEmailAsync(string email)
    {
        // Implementer logikken for at hente kunde-ID baseret på e-mail
        // Dette er blot et eksempel
        var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
        return customer?.Id ?? 0;
    }
}