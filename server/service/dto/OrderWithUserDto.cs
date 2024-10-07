using dataAccess.Models;
using service.dto;

public class OrderWithUserDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public string? Status { get; set; }
    public double TotalAmount { get; set; }
    public int CustomerId { get; set; }
    public CustomerDto Customer { get; set; }
    public List<OrderEntryDto> OrderEntries { get; set; } = new List<OrderEntryDto>();

    public OrderWithUserDto FromEntity(Order order)
    {
        return new OrderWithUserDto()
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            CustomerId = order.CustomerId,
            Customer = CustomerDto.FromCustomer(order.Customer),
            OrderEntries = order.OrderEntries.Select(e => new OrderEntryDto
            {
                ProductId = e.ProductId,
                Quantity = e.Quantity
            }).ToList()
        };
    }

    public Order ToOrder()
    {
        return new Order
        {
            Id = Id,
            OrderDate = OrderDate,
            DeliveryDate = DeliveryDate ?? new DateOnly(),
            Status = Status,
            TotalAmount = TotalAmount,
            CustomerId = CustomerId,
            OrderEntries = OrderEntries.Select(e => new OrderEntry
            {
                ProductId = e.ProductId,
                Quantity = e.Quantity
            }).ToList()
        };
    }
        
    public static OrderDto FromOrder(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            CustomerId = order.CustomerId
        };
    }
}