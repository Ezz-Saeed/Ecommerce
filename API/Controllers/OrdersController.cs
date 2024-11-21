using API.DTOs;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController(IOrderService orderService, IMapper mapper) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<Order>>CreateOrderAsync(OrderDto orderDto)
        {
            var email = User.GetEmailFromPrincipal();
            var address = mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);
            var order = await orderService.CreateOrderAsync(email,orderDto.DeliveryMethodId,orderDto.BasketId,address);

            if (order is null)
                return BadRequest(new ApiResponseError(400, "Failed to create order"));

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Order>>> GetOrdersForUser()
        {
            var email = User.GetEmailFromPrincipal();

            var orders = await orderService.GetOrdersForUserAsync(email);
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>>GetOrderWithId(int id)
        {
            var email = User.GetEmailFromPrincipal();
            var order = await orderService.GetOrderByIdAsync(id,email);
            if (order is null)
                return BadRequest(new ApiResponseError(404, "Coouldn't find order for user"));
            var orderDto = mapper.Map<Order, OrderToReturnDto>(order);
            return orderDto;
        }

        [HttpGet("getDeliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await orderService.GetDeliveryMethodsAsync());
        }
    }
}
