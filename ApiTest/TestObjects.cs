using Bogus;
using dataAccess.Models;

namespace ApiTest;

public class TestObjects
{
    public static Paper GetPaper()
    {
        return new Faker<Paper>()
            .RuleFor(p => p.Name, f => f.Commerce.ProductName())
            .RuleFor(p => p.Discontinued, false)
            .RuleFor(p => p.Price, f => f.Random.Int(1, 1000))
            .RuleFor(p => p.Stock, f => f.Random.Int(1, 100));

    }
    
    public static Customer GetCustomer()
    {
        return new Faker<Customer>()
            .RuleFor(c => c.Name, f => f.Person.FullName)
            .RuleFor(c => c.Address, f => f.Address.FullAddress())
            .RuleFor(c => c.Phone, f => f.Phone.PhoneNumber())
            .RuleFor(c => c.Email, f => f.Person.Email);
    }
    
    public static Trait GetTrait()
    {
        return new Faker<Trait>()
            .RuleFor(t => t.TraitName, f => f.Commerce.ProductAdjective());
    }
    
    
    public static Paper updatePaper(Paper paper)
    {
        paper.Name = "Updated Name";
        paper.Price = 100;
        paper.Stock = 10;
        paper.Discontinued = true;
        paper.Traits = new List<Trait>();
        return paper;
    }
    
}