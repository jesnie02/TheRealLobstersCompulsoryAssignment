using Bogus;
using dataAccess.Models;

namespace ValidatorTest;

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
}