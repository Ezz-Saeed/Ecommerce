
using API.Errors;
using API.Extensions;
using API.Helpers;
using API.MiddleWares;
using Core.Interfaces;
using Infrustructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
           
            
            builder.Services.AddAutoMapper(typeof(MappingProfiles));

            var connection = builder.Configuration.GetConnectionString("connection");
            builder.Services.AddDbContext<StoreContext>
                (context => context.UseSqlServer(connection, c=>c.MigrationsAssembly("Infrustructure")));

            builder.Services.AddControllers();

            builder.Services.AddApplicationServices();

            builder.Services.AddSwagerService();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            //if (app.Environment.IsDevelopment())
            //{
            //    app.UseSwagger();
            //    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json/", "KSINET API v1"));
            //}

            app.UseSwaggerService();

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseAuthorization();


            app.MapControllers();

            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            var iLoggerFactory = services.GetRequiredService<ILoggerFactory>();
            try
            {
                var context = services.GetRequiredService<StoreContext>();
                await context.Database.MigrateAsync();
                await StoreContextSeed.SeedAsync(context, iLoggerFactory);
            }
            catch (Exception ex)
            {
                var logger = iLoggerFactory.CreateLogger<Program>();
                logger.LogError(ex, "An error occured during migration");
                
            }

            app.Run();
        }
    }
}
