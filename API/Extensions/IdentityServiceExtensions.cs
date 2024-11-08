using Core.Enitities.IdentityEntities;
using Infrustructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using    Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
        {
            var builder = services.AddIdentityCore<AppUser>();
            builder = new IdentityBuilder(builder.UserType,builder.Services);
            builder.AddEntityFrameworkStores<AppIdentityDbContext>();
            builder.AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = false;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = false,
                    ValidIssuer = configuration["Token:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"]))
                };
            });
            return services;
        }
    }
}
