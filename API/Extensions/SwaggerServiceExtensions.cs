using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwagerService(this IServiceCollection Services)
        {
           Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "KSINET API", Version = "v1" });
            });

            return Services;
        }


        public static WebApplication UseSwaggerService(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json/", "KSINET API v1"));
            }

            return app;
        }
    }
}
