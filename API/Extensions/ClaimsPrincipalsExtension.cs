using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalsExtension
    {
        public static string GetEmailFromPrincipal(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal?.Claims?.FirstOrDefault(u => u.Type == ClaimTypes.Email)?.Value;
        }
    }
}
