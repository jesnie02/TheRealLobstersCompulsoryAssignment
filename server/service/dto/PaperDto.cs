using dataAccess.Models;
using service.dto;

namespace _service.dto;

public class PaperDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
   
    public virtual ICollection<Trait> Traits { get; set; } = new List<Trait>();

    public static PaperDto FromEntity(dataAccess.Models.Paper paper)
    {
        return new PaperDto
        {
            Id = paper.Id,
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price,
            Traits = paper.Traits
        };
    }
}