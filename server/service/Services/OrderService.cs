using dataAccess;
using dataAccess.Models;
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
        Task<List<OrderWithUserDto>> GetOrdersByCustomerIdAsync(int customerId);
        Task<OrderDto?> UpdateOrderByIdAsync(int id, OrderDto updateOrderDto);
        Task<bool> DeleteOrderByIdAsync(int id);
        Task<List<OrderDto>> GetAllOrdersAsync();
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

            // Update stock for each order entry
            foreach (var entry in order.OrderEntries)
            {
                var paper = await _context.Papers.FindAsync(entry.ProductId);
                if (paper == null)
                {
                    throw new Exception($"Paper with ID {entry.ProductId} not found.");
                }

                if (paper.Stock < entry.Quantity)
                {
                    throw new Exception($"Not enough stock for paper with ID {entry.ProductId}. Available: {paper.Stock}, Requested: {entry.Quantity}");
                }

                paper.Stock -= entry.Quantity;
                _context.Papers.Update(paper);
            }

            // Find the highest current ID and increment it by one
            var maxOrderId = await _context.Orders.MaxAsync(o => (int?)o.Id) ?? 0;
            order.Id = maxOrderId + 1;

            // Find the highest current ID for order entries
            var maxOrderEntryId = await _context.OrderEntries.MaxAsync(oe => (int?)oe.Id) ?? 0;
            var newOrderEntryId = maxOrderEntryId + 1;

            // Set IDs for order entries
            foreach (var entry in order.OrderEntries)
            {
                entry.Id = newOrderEntryId++;
            }

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Order created successfully");
            return OrderDto.FromOrder(order);
        }
        
        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderEntries).FirstOrDefaultAsync(o => o.Id == id);
            return order == null ? null : new OrderDto().FromEntity(order);
        }

        public async Task<List<OrderWithUserDto>> GetOrdersByCustomerIdAsync(int customerId)
        {
            var orders = await _context
                .Orders
                .Include(o => o.Customer)
                .Where(o => o.CustomerId == customerId)
                .Include(o => o.OrderEntries).ToListAsync();
            return orders.Select(order => new OrderWithUserDto().FromEntity(order)).ToList();
        }
        
        public async Task<List<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _context.Orders.Include(o => o.OrderEntries).ToListAsync();
            return orders.Select(order => new OrderDto().FromEntity(order)).ToList();
        }

        public async Task<OrderDto?> UpdateOrderByIdAsync(int id, OrderDto updateOrderDto)
        {
            var order = await _context.Orders.Include(o => o.OrderEntries).FirstOrDefaultAsync(o => o.Id == id);
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

            // Remove existing order entries
            _context.OrderEntries.RemoveRange(order.OrderEntries);

            // Add new order entries
            foreach (var entryDto in updateOrderDto.OrderEntries)
            {
                order.OrderEntries.Add(new OrderEntry
                {
                    ProductId = entryDto.ProductId,
                    Quantity = entryDto.Quantity
                });
            }

            await _orderValidator.ValidateAndThrowAsync(updateOrderDto);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Order was successfully updated");

            return new OrderDto().FromEntity(order);
        }
        
        public async Task<bool> DeleteOrderByIdAsync(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderEntries).FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
            {
                return false;
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Order and its entries were successfully deleted");

            return true;
        }

       
    }
}