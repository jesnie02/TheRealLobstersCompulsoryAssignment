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

public class PaperTest : WebApplicationFactory<Program>
{
    private readonly ITestOutputHelper _outputHelper;
    private readonly PgCtxSetup<MyDbContext> _ctxSetup = new() ;

    public PaperTest(ITestOutputHelper outputHelper)
    {
        
        Environment.SetEnvironmentVariable("DB", _ctxSetup._postgres.GetConnectionString());
        _outputHelper = outputHelper;
    }

    [Fact]
    public async Task CreatePaperTest()
    {
        // Arrange
        var paper = new CreatePaperDto()
        {
                Name = "Test",
                Discontinued = false,
                Price = 100,
                Stock = 10
        };
        
        // Act
        var result = await CreateClient().PostAsJsonAsync("/api/paper", paper);
        var responseDto = await result.Content.ReadFromJsonAsync<PaperDto>();
        _outputHelper.WriteLine(JsonSerializer.Serialize(responseDto));
        result.EnsureSuccessStatusCode();
        
        // Assert
        Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        if (responseDto != null)
        {
            Assert.NotNull(responseDto);
            Assert.NotEqual(0, responseDto.Id);
            Assert.Equal(paper.Name, responseDto.Name);
            Assert.Equal(paper.Discontinued, responseDto.Discontinued);
            Assert.Equal(paper.Price, responseDto.Price);
            Assert.Equal(paper.Stock, responseDto.Stock);
        }
    }
    
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
            Stock = 20
        };
        
        // Act
        var updateResult = await CreateClient().PutAsJsonAsync($"/api/paper/{updatePaper.Id}", updatePaper);
        var updateResponseDto = await updateResult.Content.ReadFromJsonAsync<PaperDto>();
        _outputHelper.WriteLine(JsonSerializer.Serialize(updateResponseDto));
        updateResult.EnsureSuccessStatusCode();
        
        // Assert
        Assert.Equal(HttpStatusCode.OK, updateResult.StatusCode);
        Assert.NotNull(updateResponseDto);
        Assert.NotEqual(0, updatePaper.Id);
        Assert.Equal(updatePaper.Id, updateResponseDto.Id);
        Assert.Equal(updatePaper.Name, updateResponseDto.Name);
        Assert.Equal(updatePaper.Discontinued, updateResponseDto.Discontinued);
        Assert.Equal(updatePaper.Price, updateResponseDto.Price);  
        Assert.Equal(updatePaper.Stock, updateResponseDto.Stock);
    }
    
    [Fact]
    public async Task DeletePaperTest()
    {
        // Arrange
        _ctxSetup.DbContextInstance.Papers.Add(TestObjects.GetPaper());
        _ctxSetup.DbContextInstance.SaveChanges();
        
        // Act
        var deleteResult = await CreateClient().DeleteAsync($"/api/paper/1");
        deleteResult.EnsureSuccessStatusCode();
        
        // Assert
        Assert.Equal(HttpStatusCode.NoContent, deleteResult.StatusCode);
    }
    
   
}