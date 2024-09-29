using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using _service.dto;
using dataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using service.dto;
using Xunit.Abstractions;

namespace ApiTest;

public class UnitTest1 : WebApplicationFactory<Program>
{
    private readonly ITestOutputHelper _outputHelper;
    private readonly PgCtxSetup<MyDbContext> _ctxSetup = new() ;

    public UnitTest1(ITestOutputHelper outputHelper)
    {
        
        Environment.SetEnvironmentVariable("DB", _ctxSetup._postgres.GetConnectionString());
        _outputHelper = outputHelper;
    }

    [Fact]
    public async Task CreatePaperTest()
    {
        
        
        var paper = new CreatePaperDto()
        {
                Name = "Test",
                Discontinued = false,
                Price = 100,
                Stock = 10
        };
        
        
        var result = await CreateClient().PostAsJsonAsync("/api/paper", paper);
        var responseDto = await result.Content.ReadFromJsonAsync<PaperDto>();
        _outputHelper.WriteLine(JsonSerializer.Serialize(responseDto));
        result.EnsureSuccessStatusCode();
        
        Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(responseDto);
        Assert.NotEqual(0, responseDto.Id);
        Assert.Equal(paper.Name, responseDto.Name);
        Assert.Equal(paper.Discontinued, responseDto.Discontinued);
        Assert.Equal(paper.Price, responseDto.Price);  
        Assert.Equal(paper.Stock, responseDto.Stock);
    }
}