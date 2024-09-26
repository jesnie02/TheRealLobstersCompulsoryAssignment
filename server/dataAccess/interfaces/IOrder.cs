using dataAccess.Models;

namespace dataAccess.interfaces;

public interface IOrder
{
    Order InsertOrder(Order order);
}