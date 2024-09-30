using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using dataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using service.dto;
using Xunit.Abstractions;
using dataAccess.Models;

namespace ApiTest;

public class CustomerTest : WebApplicationFactory<Program>
{
    
    private readonly ITestOutputHelper _outputHelper;
    private readonly PgCtxSetup<MyDbContext> _ctxSetup = new() ;

    public CustomerTest(ITestOutputHelper outputHelper)
    {
        
        Environment.SetEnvironmentVariable("DB", _ctxSetup._postgres.GetConnectionString());
        _outputHelper = outputHelper;
    }

    [Fact]
    public async Task CreateCustomerTest()
    {
        // Arrange
        var customer = new CreateCustomerDto()
        {
            Name = "Test",
            Address = "Test",
            Phone = "Test",
            Email = "Test@test.dk"
        };
        
        // Act
        var result = await CreateClient().PostAsJsonAsync("/api/customer", customer);
        var responseDto = await result.Content.ReadFromJsonAsync<CustomerDto>();
        _outputHelper.WriteLine(JsonSerializer.Serialize(responseDto));
        result.EnsureSuccessStatusCode();
        
        // Assert
        Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(responseDto);
        Assert.NotEqual(0, responseDto.Id);
        Assert.Equal(customer.Name, responseDto.Name);
        Assert.Equal(customer.Address, responseDto.Address);
        Assert.Equal(customer.Phone, responseDto.Phone);  
        Assert.Equal(customer.Email, responseDto.Email);
    }
    
    
    [Fact]
    public async Task GetCustomersTest()
    {
        
        var customers = new List<Customer>
        {
            new Customer { Name = "John Doe", Address = "123 Main St", Phone = "123-456-7890", Email = "john.doe@example.com" },
            new Customer { Name = "Jane Smith", Address = "456 Elm St", Phone = "987-654-3210", Email = "jane.smith@example.com" }
        };
        
        // Arrange
        _ctxSetup.DbContextInstance.Customers.AddRange(customers);
        _ctxSetup.DbContextInstance.SaveChanges();
        
        // Act
        var result = await CreateClient().GetAsync("/api/customer");
        var responseDto = await result.Content.ReadFromJsonAsync<List<CustomerDto>>();
        _outputHelper.WriteLine(JsonSerializer.Serialize(responseDto));
        result.EnsureSuccessStatusCode();
        
        // Assert
        Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(responseDto);
        Assert.NotEmpty(responseDto);
    }
    
}