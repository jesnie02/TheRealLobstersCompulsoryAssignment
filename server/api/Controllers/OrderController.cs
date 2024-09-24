using service.dto.OrderDto;
using dataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using service;
using service.dto.OrderDto;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto orderDto)
        {
            var order = new Order
            {
                OrderDate = orderDto.OrderDate,
                DeliveryDate = orderDto.DeliveryDate,
                Status = orderDto.Status,
                TotalAmount = orderDto.TotalAmount,
                CustomerId = orderDto.CustomerId
            };

            var createdOrder = await _orderService.CreateOrderAsync(order);
            return CreatedAtAction(nameof(CreateOrder), new { id = createdOrder.Id }, createdOrder);
        }
    }
}