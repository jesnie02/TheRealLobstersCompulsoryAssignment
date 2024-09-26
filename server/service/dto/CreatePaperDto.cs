using System.Security.Cryptography;
using dataAccess.Models;

namespace _service.dto;

public class CreatePaperDto
{
    public string? Name { get; set; }
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    
    
    public Paper ToPaper()
    {
        return new Paper
        {
            Name = Name ?? string.Empty,
            Discontinued = Discontinued,
            Stock = Stock,
            Price = Price
        };
    }
}

