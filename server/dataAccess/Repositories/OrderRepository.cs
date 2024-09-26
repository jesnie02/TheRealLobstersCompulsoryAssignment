using dataAccess.interfaces;
using dataAccess.Models;

namespace dataAccess.Repositories;

public class OrderRepository(MyDbContext context) : IOrder
{

    public Order InsertOrder(Order order)
    {
        context.Orders.Add(order);
        context.SaveChanges();
        return order;
    }
}