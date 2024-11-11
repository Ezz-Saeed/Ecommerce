using Core.Enitities.IdentityEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> GetEmailFromClaimsPrincipal(this UserManager<AppUser> userManager
            , ClaimsPrincipal claimsPrincipal)
        {
            var email = claimsPrincipal.Claims.FirstOrDefault(c=>c.Type==ClaimTypes.Email)?.Value;

            return await userManager.Users.SingleOrDefaultAsync(u => u.Email == email);
        }


        public static async Task<AppUser> GetUSerWithAddress(this UserManager<AppUser> userManager
            ,ClaimsPrincipal claimsPrincipal)
        {
            var email = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            return await userManager.Users.Include(u=>u.Address).SingleOrDefaultAsync(u => u.Email == email);
        }
    }
}
