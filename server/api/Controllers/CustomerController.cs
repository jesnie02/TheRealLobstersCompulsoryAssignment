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
}