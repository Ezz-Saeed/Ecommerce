using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text;

namespace API.Helpers
{
    public class CashedAttribute(int timeToLiveInSeconds) : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cashService = context.HttpContext.RequestServices.GetRequiredService<IResponseCasheService>();
            var cashKey = GenerateCashKeyFromRequest(context.HttpContext.Request);
            
            var cashedResponse = await cashService.GetCashedResponseAsync(cashKey);

            if(!string.IsNullOrEmpty(cashedResponse) )
            {
                var contentResult = new ContentResult
                {
                    Content = cashedResponse,
                    ContentType = "application/json",
                    StatusCode = 200,
                };
                context.Result = contentResult;
                return;
            }

            var executedContext =await next();
            if(executedContext.Result is OkObjectResult okObjectResult)
            {
                await cashService.CasheResponseAsync(cashKey, okObjectResult.Value, TimeSpan.FromSeconds(timeToLiveInSeconds));
            }
        }

        private string GenerateCashKeyFromRequest(HttpRequest request)
        {
            var keyBuilder = new StringBuilder();
            keyBuilder.Append($"{request.Path}");

            foreach(var (key,value) in request.Query.OrderBy(r=>r.Key))
            {
                keyBuilder.Append($"|{key}-{value}");
            }

            return keyBuilder.ToString();
        }
    }
}
