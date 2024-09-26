using dataAccess.Models;

namespace service.dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public DateOnly? DeliveryDate { get; set; }
        public string? Status { get; set; }
        public double TotalAmount { get; set; }
        public int CustomerId { get; set; }

        public OrderDto FromEntity(Order order)
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

        public Order ToOrder()
        {
            return new Order
            {
                Id = Id,
                OrderDate = OrderDate,
                DeliveryDate = DeliveryDate,
                Status = Status,
                TotalAmount = TotalAmount,
                CustomerId = CustomerId
            };
        }
    }
}