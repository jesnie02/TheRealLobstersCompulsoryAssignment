using _service.dto;
using FluentValidation;

namespace _service.Validators;

public class CreatePaperValidator : AbstractValidator<CreatePaperDto>
{
    public CreatePaperValidator()
    {
        RuleFor(p => p.Name)
            .NotNull()
            .WithMessage("Name cannot be null")
            .NotEmpty()
            .WithMessage("Name cannot be empty")
            .MinimumLength(3)
            .WithMessage("Name must be at least 3 characters long");
        
        
        RuleFor(p => p.Price)
            .NotEmpty()
            .WithMessage("Price cannot be empty")
            .GreaterThan(0)
            .WithMessage("Price must be greater than 0");
        
        RuleFor(p => p.Stock)
            .NotEmpty().WithMessage("Stock cannot be empty")
            .GreaterThanOrEqualTo(0).WithMessage("Stock must be greater than 0");
    }
    
    
}