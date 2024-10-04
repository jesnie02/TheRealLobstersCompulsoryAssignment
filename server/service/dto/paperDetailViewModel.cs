using dataAccess.Models;

namespace service.dto;

public class paperDetailViewModel
{
    
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    
    public List<PaperTraitDetailViewModel>? Traits { get; set; }
    
    public static paperDetailViewModel FromEntity(Paper paper)
    {
        return new paperDetailViewModel
        {
            Id = paper.Id,
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price,
            Traits = paper.Traits.Select(t => new PaperTraitDetailViewModel
            {
                Id = t.Id,
                TraitName = t.TraitName,
                
            }).ToList()
            
        };
    }
}