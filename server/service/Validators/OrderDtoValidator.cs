using FluentValidation;
using service.dto;

namespace service.Validators;

public class OrderDtoValidator : AbstractValidator<OrderDto>
{
    public OrderDtoValidator()
    {
        RuleFor(order => order.OrderDate).NotEmpty();
        RuleFor(order => order.DeliveryDate).NotEmpty();
        RuleFor(order => order.Status).NotEmpty();
        RuleFor(order => order.TotalAmount).GreaterThan(0);
        RuleFor(order => order.CustomerId).GreaterThan(0);
    }
}