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
    public async Task<ActionResult<CustomerDto>> CreateCustomerAsync(CustomerDto customerDto)
    {
        var customer = await _customerService.CreateCustomerAsync(customerDto);
        return Ok(customer);
    }
}