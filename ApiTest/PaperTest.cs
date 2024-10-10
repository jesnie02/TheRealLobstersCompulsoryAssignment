using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using _service.dto;
using Bogus;
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
   
    [Fact]
    public async Task UpdateExistingPaper_ShouldReturnOkResult_WhenPaperIsUpdated()
    {
        // Arrange
        var faker = new Faker();
        var updatePaperDto = new UpdatePaperDto
        {
            Id = faker.Random.Int(1),
            Name = faker.Commerce.ProductName(),
            Discontinued = faker.Random.Bool(),
            Stock = faker.Random.Int(100),
            Price = faker.Random.Double(24, 34),
            TraitIds = new List<int> { faker.Random.Int(1), faker.Random.Int(4) }
        };

        var updatedPaper = new paperDetailViewModel
        {
            Id = updatePaperDto.Id,
            Name = updatePaperDto.Name,
            Discontinued = updatePaperDto.Discontinued,
            Stock = updatePaperDto.Stock,
            Price = updatePaperDto.Price,
            Traits = updatePaperDto.TraitIds.Select(id => new PaperTraitDetailViewModel { Id = id, TraitName = faker.Commerce.ProductAdjective() }).ToList()
        };

        _ctxSetup.DbContextInstance.Papers.Add(updatePaperDto.ToPaper());
        _ctxSetup.DbContextInstance.SaveChanges();

        // Act
        var response = await CreateClient().PatchAsync($"/api/paper/{updatePaperDto.Id}", JsonContent.Create(updatePaperDto));
        response.EnsureSuccessStatusCode();
        var responseContent = await response.Content.ReadFromJsonAsync<paperDetailViewModel>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(responseContent);
        Assert.Equal(updatedPaper.Id, responseContent.Id);
    }
}
   
    
