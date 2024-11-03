﻿using Core.Enitities.IdentityEntities;
using Infrustructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services)
        {
            var builder = services.AddIdentityCore<AppUser>();
            builder = new IdentityBuilder(builder.UserType,builder.Services);
            builder.AddEntityFrameworkStores<AppIdentityDbContext>();
            builder.AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthentication();
            return services;
        }
    }
}