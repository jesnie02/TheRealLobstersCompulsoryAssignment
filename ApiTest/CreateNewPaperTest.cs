using System.Net;
using System.Net.Http.Json;
using _service.dto;
using dataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using service.dto;
using Xunit.Abstractions;
using System.Text.Json;

namespace ApiTest;

public class CreateNewPaperTest : WebApplicationFactory<Program>
{
    private readonly ITestOutputHelper _outputHelper;
    private readonly PgCtxSetup<MyDbContext> _ctxSetup = new();

    public CreateNewPaperTest(ITestOutputHelper outputHelper)
    {
        Environment.SetEnvironmentVariable("DB", _ctxSetup._postgres.GetConnectionString());
        _outputHelper = outputHelper;
    }
/*
    [Fact]
    public async Task CreateNewPaper()
    {
        // Arrange
        var paper = new CreatePaperDto()
        {
            Name = "Test",
            Discontinued = false,
            Stock = 10,
            Price = 10.0
        };

        // Act
        var result = await CreateClient().PostAsJsonAsync("/api/paper", paper);
        var responseDto = await result.Content.ReadFromJsonAsync<PaperDto>();
        _outputHelper.WriteLine(JsonSerializer.Serialize(responseDto));
        result.EnsureSuccessStatusCode();

        // Assert
        Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(responseDto);
        Assert.NotEqual(0, responseDto.Id);
        Assert.Equal(paper.Name, responseDto.Name);
        Assert.Equal(paper.Discontinued, responseDto.Discontinued);
        Assert.Equal(paper.Stock, responseDto.Stock);
        Assert.Equal(paper.Price, responseDto.Price);
    }
*/
}