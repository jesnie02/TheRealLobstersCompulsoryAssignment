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
            if (order == null)
            {
                return BadRequest("Order creation failed.");
            }
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
        public async Task<ActionResult<List<OrderWithUserDto>>> GetOrderHistory(int customerId)
        {
            var orders = await _orderService.GetOrdersByCustomerIdAsync(customerId);
            if (orders == null || !orders.Any())
            {
                return NotFound();
            }

            return Ok(orders);
        }
        
        // Retrieves all orders
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetAllOrdersAsync()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            if (orders == null || !orders.Any())
            {
                return NotFound();
            }

            return Ok(orders);
        }
        
        //Update a specific order
        [HttpPatch("{id}")]
        public async Task<ActionResult<OrderDto>> UpdateOrder(int id, OrderDto updateOrderDto)
        {
            var order = await _orderService.UpdateOrderByIdAsync(id, updateOrderDto);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }
        
        // Update the status of a specific order
        [HttpPatch("{id}/status")]
        public async Task<ActionResult<OrderDto>> UpdateOrderStatus(int id, UpdateOrderStatusDto updateOrderStatusDto)
        {
            var order = await _orderService.UpdateOrderStatusByIdAsync(id, updateOrderStatusDto.Status);
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
        
        // Retrieves all order entries
        [HttpGet("entries")]
        public async Task<ActionResult<List<OrderEntryDto>>> GetOrderEntries()
        {
            var orderEntries = await _orderService.GetOrderEntriesAsync();
            if (orderEntries == null || !orderEntries.Any())
            {
                return NotFound();
            }

            return Ok(orderEntries);
        }
    }
}

