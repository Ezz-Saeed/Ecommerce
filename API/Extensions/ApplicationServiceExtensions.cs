using API.Errors;
using Core.Interfaces;
using Infrustructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                    .Where(e => e.Value.Errors.Count > 0).
                    SelectMany(e => e.Value.Errors).
                    Select(e => e.ErrorMessage).ToArray();
                    var errorResponse = new ApiValidationError { Errors = errors };
                    return new BadRequestObjectResult(errorResponse);
                };
            });

            return services;
        }
    }
}
