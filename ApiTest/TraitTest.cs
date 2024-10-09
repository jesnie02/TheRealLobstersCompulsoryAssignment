using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using dataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using service.dto;
using Xunit.Abstractions;

namespace ApiTest;

public class TraitTest : WebApplicationFactory<Program>
{
    private readonly ITestOutputHelper _outputHelper;
    private readonly PgCtxSetup<MyDbContext> _ctxSetup = new();

    public TraitTest(ITestOutputHelper outputHelper)
    {
        Environment.SetEnvironmentVariable("DB", _ctxSetup._postgres.GetConnectionString());
        _outputHelper = outputHelper;
    }

    [Fact]
    public async Task CreateTrait_ReturnsCreatedAtActionResult_WithCreatedTrait()
    {
        
        
        // Arrange
        var client = CreateClient();
        var traitDto = new TraitDto
        {
            TraitName = "New Trait" 
        };

        // Act
        var response = await client.PostAsJsonAsync("/api/traits", traitDto);
        
        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        
        var createdTrait = await response.Content.ReadFromJsonAsync<TraitDto>();
        Assert.NotNull(createdTrait);
        Assert.Equal(traitDto.TraitName, createdTrait.TraitName);
        Assert.True(createdTrait.Id > 0);
    }
    
    
    [Fact]
    public async Task GetTrait_ReturnsTrait_WithId()
    {
        // Arrange
        var client = CreateClient();
        var traitDto = new TraitDto
        {
            TraitName = "New Trait" 
        };
        var response = await client.PostAsJsonAsync("/api/traits", traitDto);
        var createdTrait = await response.Content.ReadFromJsonAsync<TraitDto>();
        
        // Act
        var getResponse = await client.GetAsync($"/api/traits/{createdTrait.Id}");
        
        // Assert
        Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
        
        var getTrait = await getResponse.Content.ReadFromJsonAsync<TraitDto>();
        Assert.NotNull(getTrait);
        Assert.Equal(createdTrait.Id, getTrait.Id);
        Assert.Equal(createdTrait.TraitName, getTrait.TraitName);
    }
    
    [Fact]
    public async Task GetAllTraits_ReturnsAllTraits()
    {
        // Arrange
        var client = CreateClient();
        var traitDto = new TraitDto
        {
            TraitName = "New Trait" 
        };
        var response = await client.PostAsJsonAsync("/api/traits", traitDto);
        var createdTrait = await response.Content.ReadFromJsonAsync<TraitDto>();
        
        // Act
        var getResponse = await client.GetAsync($"/api/traits");
        
        // Assert
        Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
        
        var getTraits = await getResponse.Content.ReadFromJsonAsync<List<TraitDto>>();
        Assert.NotNull(getTraits);
        Assert.NotEmpty(getTraits);
        Assert.Contains(getTraits, t => t.Id == createdTrait.Id);
    }
    
    [Fact]
    public async Task UpdateTrait_ReturnsUpdatedTrait()
    {
        // Arrange
        var client = CreateClient();
        var traitDto = new TraitDto
        {
            TraitName = "New Trait" 
        };
        var response = await client.PostAsJsonAsync("/api/traits", traitDto);
        var createdTrait = await response.Content.ReadFromJsonAsync<TraitDto>();
        
        var updateTrait = new TraitDto
        {
            Id = createdTrait.Id,
            TraitName = "Updated Trait"
        };
        
        // Act
        var updateResponse = await client.PutAsJsonAsync($"/api/traits/{createdTrait.Id}", updateTrait);
        
        // Assert
        Assert.Equal(HttpStatusCode.OK, updateResponse.StatusCode);
        
        var updatedTrait = await updateResponse.Content.ReadFromJsonAsync<TraitDto>();
        Assert.NotNull(updatedTrait);
        Assert.Equal(createdTrait.Id, updatedTrait.Id);
        Assert.Equal(updateTrait.TraitName, updatedTrait.TraitName);
    }
    
   //DeleteTrait
    [Fact]
    public async Task DeleteTrait_ReturnsNoContent()
    {
        // Arrange
        var client = CreateClient();
        var traitDto = new TraitDto
        {
            TraitName = "New Trait" 
        };
        var response = await client.PostAsJsonAsync("/api/traits", traitDto);
        var createdTrait = await response.Content.ReadFromJsonAsync<TraitDto>();
        
        // Act
        var deleteResponse = await client.DeleteAsync($"/api/traits/{createdTrait.Id}");
        
        // Assert
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);
    }
    

}    