using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using dataAccess.Models;
using service.dto;

namespace _service.dto;

public class CreatePaperDto
{
    [Required(ErrorMessage = "Name cannot be null")]
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
            Price = Price,
            
        };
    }
}

