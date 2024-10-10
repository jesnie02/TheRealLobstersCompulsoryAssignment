using dataAccess.Models;

namespace service.dto;

public class TraitDto
{
    public int Id {get; set; }
    
    public string? TraitName {get; set; } 
    
    public TraitDto FromEntity(Trait trait)
    {
        return new TraitDto()
        {
            Id = trait.Id,
            TraitName = trait.TraitName
        };
        
    }
}

