using dataAccess.Models;

namespace _service.dto;

public class PaperDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool Discontinued { get; set; } 
    public int Stock { get; set; } 
    public double Price { get; set; }  
    
    
    public PaperDto FromEntity(Paper paper)
    {
        return new PaperDto
        {
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price,
            
        };
        
    }
    
    
    
   
}