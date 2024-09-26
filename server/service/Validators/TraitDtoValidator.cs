using FluentValidation;
using service.dto;

namespace service.Validators
{
    public class TraitDtoValidator : AbstractValidator<TraitDto>
    {
        public TraitDtoValidator()
        {
            RuleFor(trait => trait.TraitName)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(100).WithMessage("Name cannot exceed 100 characters.");
        }
    }
}