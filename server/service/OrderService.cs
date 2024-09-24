using dataAccess;
using dataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace service
{
    public class OrderService
    {
        private readonly MyDbContext _context;

        public OrderService(MyDbContext context)
        {
            _context = context;
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            _context.Set<Order>().Add(order);
            await _context.SaveChangesAsync();
            return order;
        }
    }
}