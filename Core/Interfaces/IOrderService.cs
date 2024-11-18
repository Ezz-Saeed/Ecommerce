using Core.Enitities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buerEmail, int deliveryMethod, string basketId, Address address);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buerEmail);
        Task<Order> GetOrderByIdAsync(int id, string email);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}
