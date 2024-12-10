using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IResponseCasheService
    {
        Task CasheResponseAsync(string casheKey, object response, TimeSpan timeToLive);
        Task<string> GetCashedResponseAsync(string cahseKey);
    }
}
