using dataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using service.dto;
using service.Services;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // Creates a new order
        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrderAsync(OrderDto createOrderDto)
        {
            var order = await _orderService.CreateOrderAsync(createOrderDto);
            return Ok(order);
        }

        // Retrieves an order by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // Retrieves the order history for a specific customer
        [HttpGet("customer/{customerId}/history")]
        public async Task<ActionResult<List<OrderDto>>> GetOrderHistory(int customerId)
        {
            var orders = await _orderService.GetOrdersByCustomerIdAsync(customerId);
            if (orders == null || !orders.Any())
            {
                return NotFound();
            }

            return Ok(orders);
        }
        
        //Update a specific order
        [HttpPut("{id}")]
        public async Task<ActionResult<OrderDto>> UpdateOrder(int id, OrderDto updateOrderDto)
        {
            var order = await _orderService.UpdateOrderByIdAsync(id, updateOrderDto);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }
        
        //Delete order by id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _orderService.DeleteOrderByIdAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}