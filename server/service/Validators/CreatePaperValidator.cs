using _service.dto;
using FluentValidation;

namespace _service.Validators;

public class CreatePaperValidator : AbstractValidator<CreatePaperDto>
{
    public CreatePaperValidator()
    {
        RuleFor(p => p.Name.Length).GreaterThan(3);
        RuleFor(p => p.Price).GreaterThan(0);
        RuleFor(p => p.Stock).GreaterThan(0);
    }
    
    
}