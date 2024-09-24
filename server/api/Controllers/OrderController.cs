// This controller handles HTTP requests related to orders, including creating an order,
// retrieving an order by its ID, and getting the order history for a specific customer.

using dataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using service;
using service.dto;
using service.Services;

namespace api.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        // Creates a new order
        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
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

        // Retrieves an order by its ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            var orderDto = new OrderDto
            {
                OrderDate = order.OrderDate,
                DeliveryDate = order.DeliveryDate,
                Status = order.Status,
                TotalAmount = order.TotalAmount,
                CustomerId = order.CustomerId
            };

            return Ok(orderDto);
        }

        // Retrieves the order history for a specific customer
        [HttpGet("customer/{customerId}/history")]
        public async Task<IActionResult> GetOrderHistory(int customerId)
        {
            var orders = await _orderService.GetOrdersByCustomerIdAsync(customerId);
            if (orders == null || !orders.Any())
            {
                return NotFound();
            }

            var orderDtos = orders.Select(order => new OrderDto
            {
                OrderDate = order.OrderDate,
                DeliveryDate = order.DeliveryDate,
                Status = order.Status,
                TotalAmount = order.TotalAmount,
                CustomerId = order.CustomerId
            }).ToList();

            return Ok(orderDtos);
        }
    }
}