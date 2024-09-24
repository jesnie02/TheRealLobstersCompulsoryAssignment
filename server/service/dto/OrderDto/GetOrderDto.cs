namespace service.dto.OrderDto
{
    public class GetOrderDto
    {
        public DateTime OrderDate { get; set; }
        public DateOnly? DeliveryDate { get; set; }
        public string Status { get; set; }
        public double TotalAmount { get; set; }
        public int CustomerId { get; set; }
    }
}