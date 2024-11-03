﻿using API.DTOs;
using API.Errors;
using Core.Enitities.IdentityEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;

        public AccountController( UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
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
                Token = "Token"
            };
        }
    }
}
