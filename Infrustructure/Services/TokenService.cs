using Core.Enitities.IdentityEntities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Infrustructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration configuration;
        private readonly SymmetricSecurityKey key;

        public TokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"]!));
        }
        public string CreateToken(AppUser appUser)
        {
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, appUser.Email!),
                new Claim (JwtRegisteredClaimNames.GivenName, appUser.DisplayName),
                new Claim("BasketId", appUser.BasketId),
            };

            var userCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = configuration["Token:Issuer"],
                SigningCredentials = userCredentials,
                Expires = DateTime.Now.AddDays(7)
            };

            var tokeHandler = new JwtSecurityTokenHandler();

            var token = tokeHandler.CreateToken(tokenDescriptor);
            return tokeHandler.WriteToken(token);
        }
    }
}
