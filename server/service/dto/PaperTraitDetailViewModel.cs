using System.Text.Json.Serialization;
using dataAccess.Models;

namespace service.dto;

public class PaperTraitDetailViewModel
{
    public int Id { get; set; }
    
    public string? TraitName { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    
    public List<paperDetailViewModel>? PaperTraitsDetails { get; set; }
    
    public static PaperTraitDetailViewModel FromEntity(Trait trait)
    {
        return new PaperTraitDetailViewModel()
        {
            Id = trait.Id,
            TraitName = trait.TraitName,
            PaperTraitsDetails = trait.Papers.Select(p => new paperDetailViewModel
            {
                Id = p.Id,
                Discontinued = p.Discontinued,
                Name = p.Name,
                Price = p.Price,
                Stock = p.Stock,
                Traits = p.Traits.Select(paperTrait => new PaperTraitDetailViewModel
                {
                    Id = paperTrait.Id,
                    TraitName = paperTrait.TraitName
                }).ToList()
            }).ToList()
        };
    }
}