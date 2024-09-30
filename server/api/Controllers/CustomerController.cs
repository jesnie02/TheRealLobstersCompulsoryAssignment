using Microsoft.AspNetCore.Mvc;
using service.dto;
using service.Services;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpPost]
    public async Task<ActionResult<CreateCustomerDto>> CreateCustomerAsync(CreateCustomerDto createCustomerDto)
    {
        var customer = await _customerService.CreateCustomerAsync(createCustomerDto);
        return Ok(customer);
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomersAsync()
    {
        var customers = await _customerService.GetAllCustomersAsync();
        return Ok(customers);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<CustomerDto>> GetCustomerByIdAsync(int id)
    {
        var customer = await _customerService.GetCustomerByIdAsync(id);
        if (customer == null)
        {
            return NotFound();
        }

        return Ok(customer);
    }
    
    [HttpGet("{customerId}/orders")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersByCustomerIdAsync(int customerId)
    {
        var orders = await _customerService.GetOrdersByCustomerIdAsync(customerId);
        if (orders == null || !orders.Any())
        {
            return NotFound();
        }

        return Ok(orders);
    }
}