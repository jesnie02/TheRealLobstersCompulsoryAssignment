using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using dataAccess.Models;
using service.dto;

namespace _service.dto;

public class CreatePaperDto
{
    
    public string Name { get; set; } = string.Empty;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    
    public List<int>? TraitIds { get; set; } 
    
    public Paper ToPaper()
    {
        return new Paper
        {
            Name = Name,
            Discontinued = false,
            Stock = Stock,
            Price = Price,
            
        };
    }
}

