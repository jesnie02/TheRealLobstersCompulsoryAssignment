// This class provides services related to orders, including creating an order, 
// retrieving an order by its ID, and getting all orders for a specific customer.

using dataAccess;
using dataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace service.Services
{
    public class OrderService
    {
        private readonly MyDbContext _context;

        public OrderService(MyDbContext context)
        {
            _context = context;
        }

        // Creates a new order and saves it to the database
        public async Task<Order> CreateOrderAsync(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        // Retrieves an order by its ID
        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        // Retrieves all orders for a specific customer by their customer ID
        public async Task<List<Order>> GetOrdersByCustomerIdAsync(int customerId)
        {
            return await _context.Orders
                .Where(o => o.CustomerId == customerId)
                .ToListAsync();
        }
    }
}