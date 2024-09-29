using dataAccess;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using service.dto;

namespace service.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(OrderDto createOrderDto);
        Task<OrderDto?> GetOrderByIdAsync(int id);
        Task<List<OrderDto>> GetOrdersByCustomerIdAsync(int customerId);
        Task<OrderDto?> UpdateOrderByIdAsync(int id, OrderDto updateOrderDto);
    }

    public class OrderService : IOrderService
    {
        private readonly ILogger<OrderService> _logger;
        private readonly IValidator<OrderDto> _orderValidator;
        private readonly MyDbContext _context;

        public OrderService(
            ILogger<OrderService> logger,
            IValidator<OrderDto> orderValidator,
            MyDbContext context)
        {
            _logger = logger;
            _orderValidator = orderValidator;
            _context = context;
        }

        public async Task<OrderDto> CreateOrderAsync(OrderDto createOrderDto)
        {
            _logger.LogInformation("Creating a new order");
            await _orderValidator.ValidateAndThrowAsync(createOrderDto);
            var order = createOrderDto.ToOrder();
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Order created successfully");
            return new OrderDto().FromEntity(order);
        }
        
        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            return order == null ? null : new OrderDto().FromEntity(order);
        }

        public async Task<List<OrderDto>> GetOrdersByCustomerIdAsync(int customerId)
        {
            var orders = await _context.Orders.Where(o => o.CustomerId == customerId).ToListAsync();
            return orders.Select(order => new OrderDto().FromEntity(order)).ToList();
        }

        public async Task<OrderDto?> UpdateOrderByIdAsync(int id, OrderDto updateOrderDto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return null;
            }

            // Update order properties
            order.CustomerId = updateOrderDto.CustomerId;
            order.OrderDate = updateOrderDto.OrderDate;
            order.TotalAmount = updateOrderDto.TotalAmount;
            order.DeliveryDate = updateOrderDto.DeliveryDate;
            order.Status = updateOrderDto.Status;

            await _orderValidator.ValidateAndThrowAsync(updateOrderDto);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Order was successfully updated");
            
            return new OrderDto().FromEntity(order);
        }
    }
}