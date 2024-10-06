using dataAccess.Models;
using service.dto;

namespace _service.dto;

public class UpdatePaperDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
   
    public List<int>? TraitIds { get; set; } 
    
    public Paper ToPaper()
    {
        return new Paper
        {
            Id = Id,
            Name = Name,
            Discontinued = Discontinued,
            Stock = Stock,
            Price = Price
        };
    }
}