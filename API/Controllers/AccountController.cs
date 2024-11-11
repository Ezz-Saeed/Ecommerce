using API.DTOs;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Enitities.IdentityEntities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;

        public AccountController( UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenService tokenService, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
        }


        [Authorize]
        [HttpGet]

        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(c=>c.Type== ClaimTypes.Email)?.Value;
            
            var user = await userManager.GetEmailFromClaimsPrincipal(User);
            return new UserDto
            {
                Email = user.Email!,
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user)
            };

        }

        [HttpGet("emailExists")]
        public async Task<ActionResult<bool>> CheckEmailExists(string email)
        {
            return await userManager.FindByEmailAsync(email) is not null;
        }

        [Authorize]
        [HttpGet("getAddress")]
        public async Task<ActionResult<AddressDto>> GetAddress()
        {          
            var user = await userManager.GetUSerWithAddress(User);
            return mapper.Map<Address, AddressDto>(user.Address!);
        }



        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user is null)
                return Unauthorized(new ApiResponseError(401));

            var identityResult = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password,false);

            if (!identityResult.Succeeded)
                return Unauthorized(new ApiResponseError(401));

            return new UserDto
            {
                Email = user.Email!,
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
            };

            var result = await userManager.CreateAsync(user,registerDto.Password);

            if (!result.Succeeded)
                return BadRequest(new ApiResponseError(400));

            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user)
            };
        }
    }
}
