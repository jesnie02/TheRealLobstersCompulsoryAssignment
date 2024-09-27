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

    public UnitTest1(ITestOutputHelper outputHelper)
    {
        var setup = new PgCtxSetup<MyDbContext>();
        Environment.SetEnvironmentVariable("DB", setup._postgres.GetConnectionString());
        _outputHelper = outputHelper;
    }

    [Fact]
    public async Task Test1()
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
    }
}