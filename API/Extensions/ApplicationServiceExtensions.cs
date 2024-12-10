using API.Errors;
using Core.Interfaces;
using Infrustructure.Data;
using Infrustructure.Services;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IResponseCasheService, ResponseCasheService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUntiOfWork, UntiOfWork>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IOrderService,  OrderService>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var options = ConfigurationOptions.Parse
                (configuration.GetConnectionString("Redis")!);
                return ConnectionMultiplexer.Connect(options);
            });
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

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
                });
            });

            return services;
        }
    }
}
