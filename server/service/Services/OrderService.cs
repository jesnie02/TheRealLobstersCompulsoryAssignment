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
    }

    public class OrderService : IOrderService
    {
        private readonly ILogger<OrderService> _logger;
        private readonly IValidator<OrderDto> _createOrderValidator;
        private readonly IValidator<OrderDto> _updateOrderValidator;
        private readonly MyDbContext _context;

        public OrderService(
            ILogger<OrderService> logger,
            IValidator<OrderDto> createOrderValidator,
            IValidator<OrderDto> updateOrderValidator,
            MyDbContext context)
        {
            _logger = logger;
            _createOrderValidator = createOrderValidator;
            _updateOrderValidator = updateOrderValidator;
            _context = context;
        }

        public async Task<OrderDto> CreateOrderAsync(OrderDto createOrderDto)
        {
            _logger.LogInformation("Creating a new order"); // Logging statement
            await _createOrderValidator.ValidateAndThrowAsync(createOrderDto);
            var order = createOrderDto.ToOrder();
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Order created successfully"); // Logging statement
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
    }
}