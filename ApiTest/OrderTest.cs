using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using api.Controllers;
using dataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using service.dto;
using service.Services;
using Xunit.Abstractions;

namespace ApiTest;

public class OrderTest : WebApplicationFactory<Program>
{
    private readonly ITestOutputHelper _outputHelper;
    private readonly PgCtxSetup<MyDbContext> _ctxSetup = new() ;

    public OrderTest(ITestOutputHelper outputHelper)
    {
        
        Environment.SetEnvironmentVariable("DB", _ctxSetup._postgres.GetConnectionString());
        _outputHelper = outputHelper;
    }
    
    //TODO: Implement tests for OrderController 
    /*
    [Fact]
    public async Task CreateOrderTest()
    {
        // Arrange
        var createOrderDto = new OrderDto
        {
            Id = 1,
            CustomerId = 123,
            OrderDate = DateTime.UtcNow,
            TotalAmount = 100.00,
            OrderEntries = new List<OrderEntryDto>
            {
                new OrderEntryDto { ProductId = 1, Quantity = 2 },
                new OrderEntryDto { ProductId = 2, Quantity = 1 }
            }
        };

        // Act
        var result = await CreateClient().PostAsJsonAsync("/api/order", createOrderDto);
    
        // Ensure the response was successful
        result.EnsureSuccessStatusCode();

        // Read and assert the response DTO
        var responseDto = await result.Content.ReadFromJsonAsync<OrderDto>();
    
        // Log for debugging
        _outputHelper.WriteLine(JsonSerializer.Serialize(responseDto));
    
        // Assert
        Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(responseDto);
        Assert.NotEqual(0, responseDto.Id);
        Assert.Equal(createOrderDto.CustomerId, responseDto.CustomerId);
        Assert.Equal(createOrderDto.OrderDate, responseDto.OrderDate);
        Assert.Equal(createOrderDto.TotalAmount, responseDto.TotalAmount);
        Assert.Equal(createOrderDto.OrderEntries.Count, responseDto.OrderEntries.Count);

        for (int i = 0; i < createOrderDto.OrderEntries.Count; i++)
        {
            Assert.Equal(createOrderDto.OrderEntries[i].ProductId, responseDto.OrderEntries[i].ProductId);
            Assert.Equal(createOrderDto.OrderEntries[i].Quantity, responseDto.OrderEntries[i].Quantity);
        }
    }
    */



    
}