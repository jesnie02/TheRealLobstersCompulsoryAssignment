using dataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
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
    
    
    [Fact]
    public async Task CreateOrderTest()
    {
        // Arrange
        
        
        // Act
        
        
        // Assert

       
    }
    
}