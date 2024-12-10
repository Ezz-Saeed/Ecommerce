using Core.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrustructure.Services
{
    public class ResponseCasheService(IConnectionMultiplexer redis) : IResponseCasheService
    {
        private readonly StackExchange.Redis.IDatabase database= redis.GetDatabase();


        public async Task CasheResponseAsync(string casheKey, object response, TimeSpan timeToLive)
        {
            if (response is null) return;

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            var serializedResponse = JsonSerializer.Serialize(response, options);

            await database.StringSetAsync(casheKey, serializedResponse, timeToLive);
        }

        public async Task<string> GetCashedResponseAsync(string cahseKey)
        {
            var cashedResponse = await database.StringGetAsync(cahseKey);
            if (cashedResponse.IsNullOrEmpty) return null;

            return cashedResponse!;
        }
    }
}
