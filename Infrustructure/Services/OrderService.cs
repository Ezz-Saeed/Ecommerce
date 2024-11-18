using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Infrustructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrustructure.Services
{
    public class OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<Product> productRepo,
        IGenericRepository<DeliveryMethod> dMethodRepo, IBasketRepository basketRepo) : IOrderService
    {
        
        public async Task<Order> CreateOrderAsync(string buerEmail, int deliveryMethodId, string basketId, Address address)
        {
            //get basket
            var basket = await basketRepo.GetBasketAsync(basketId);

            var items = new List<OrderItem>();

            foreach (var item in basket.BasketItems)
            {
                //get product from db
                var productItem = await productRepo.FindAsync(item.Id);
                var productItemOrdered = new ProductItemOrdered(productItem.Id,productItem.Name,productItem.PictureUrl);
                //create order item
                var orderItem = new OrderItem(productItemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            //get delivery method from db
            var deliveryMethod = await dMethodRepo.FindAsync(deliveryMethodId);
            //calc subtotal
            var subTotal = items.Sum(i => i.Price * i.Quantity);
            //create order
            var order = new Order(items, buerEmail, address, deliveryMethod, subTotal);

            //save order to db
            ///////////////////////

            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string email)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buerEmail)
        {
            throw new NotImplementedException();
        }
    }
}
