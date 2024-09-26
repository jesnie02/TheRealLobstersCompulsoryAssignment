using dataAccess.Models;

namespace _service.dto;

public class UpdatePaperDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    
    public Paper ToPaper()
    {
        return new Paper
        {
            Id = Id,
            Name = Name ?? string.Empty,
            Discontinued = Discontinued,
            Stock = Stock,
            Price = Price
        };
    }
}