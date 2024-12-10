using API.DTOs;
using AutoMapper;
using Core.Enitities;
using Core.Enitities.IdentityEntities;
using Core.Interfaces;
using Infrustructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper mapper;
        private readonly UserManager<AppUser> userManager;
        public BasketController(IBasketRepository basketRepository, IMapper mapper, UserManager<AppUser> userManager)
        {
            _basketRepository = basketRepository;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketAsync(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasketAsync([FromBody] CustomerBasketDto basketDto)
        {
            var basket = mapper.Map<CustomerBasketDto, CustomerBasket>(basketDto);
            var updatedBasket = await _basketRepository.UpdateBasketAsync(basket);
            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsnc(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }

        [HttpPut("upadtebasketid/{basketId}")]
        public async Task<ActionResult<string>> UpdateBaketId(string basketId)
        {
            var email = User.Claims.SingleOrDefault(u => u.Type == ClaimTypes.Email)?.Value;
            var user = userManager.Users.SingleOrDefault(u => u.Email == email);
            user.BasketId = basketId;

            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest("Couldn't create basket");
            return Ok(user.BasketId);
        }
    }
}
