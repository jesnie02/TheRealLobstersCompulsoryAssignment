using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using _service.dto;
using dataAccess;
using dataAccess.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using service.dto;
using Xunit.Abstractions;

namespace ApiTest;

public class PaperTest : WebApplicationFactory<Program>
{
    private readonly ITestOutputHelper _outputHelper;
    private readonly PgCtxSetup<MyDbContext> _ctxSetup = new() ;

    public PaperTest(ITestOutputHelper outputHelper)
    {
        
        Environment.SetEnvironmentVariable("DB", _ctxSetup._postgres.GetConnectionString());
        _outputHelper = outputHelper;
    }
 
    /*
   
    [Fact]
    public async Task UpdatePaperTest()
    {
        // Arrange
        _ctxSetup.DbContextInstance.Papers.Add(TestObjects.GetPaper());
        _ctxSetup.DbContextInstance.SaveChanges();

        var updatePaper = new UpdatePaperDto()
        {
            Id = 1,
            Name = "Test2",
            Discontinued = true,
            Price = 200,
            Stock = 20,
            TraitIds = new List<int>{1, 2, 3}
        };

        // Act
        var updateResult = await CreateClient().PatchAsJsonAsync($"/api/paper/{updatePaper.Id}", updatePaper);
        updateResult.EnsureSuccessStatusCode();

        var responseContent = await updateResult.Content.ReadAsStringAsync();
        _outputHelper.WriteLine("Response Content: " + responseContent);

        Assert.False(string.IsNullOrEmpty(responseContent), "Response content is empty");

        var updateResponseDto = JsonSerializer.Deserialize<paperDetailViewModel>(responseContent);
        _outputHelper.WriteLine("Deserialized Response: " + JsonSerializer.Serialize(updateResponseDto));

        // Assert
        Assert.Equal(HttpStatusCode.OK, updateResult.StatusCode);
        Assert.NotNull(updateResponseDto);
        Assert.NotEqual(0, updateResponseDto.Id);
        Assert.Equal(updatePaper.Id, updateResponseDto.Id);
        Assert.Equal(updatePaper.Name, updateResponseDto.Name);
        Assert.Equal(updatePaper.Discontinued, updateResponseDto.Discontinued);
        Assert.Equal(updatePaper.Price, updateResponseDto.Price);
        Assert.Equal(updatePaper.Stock, updateResponseDto.Stock);
    }
    */
    
    
    [Fact]
    public async Task GetPapersTest()
    {
        
        var papers = new List<Paper>
        {
            new Paper { Name = "Test1", Discontinued = false, Stock = 10, Price = 100 },
            new Paper { Name = "Test2", Discontinued = false, Stock = 10, Price = 100 }
        };
        
        // Arrange
        _ctxSetup.DbContextInstance.Papers.AddRange(papers);
        _ctxSetup.DbContextInstance.SaveChanges();
        
        // Act
        var result = await CreateClient().GetAsync("/api/paper");
        var responseDto = await result.Content.ReadFromJsonAsync<List<paperDetailViewModel>>();
        _outputHelper.WriteLine(JsonSerializer.Serialize(responseDto));
        result.EnsureSuccessStatusCode();
        
        // Assert
        Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(responseDto);
        Assert.NotEmpty(responseDto);
    }
   

   
    
}