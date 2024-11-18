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
    public class OrderService(IUntiOfWork untiOfWork, IBasketRepository basketRepo) : IOrderService
    {
        
        public async Task<Order> CreateOrderAsync(string buerEmail, int deliveryMethodId, string basketId, Address address)
        {
            //get basket
            var basket = await basketRepo.GetBasketAsync(basketId);

            var items = new List<OrderItem>();

            foreach (var item in basket.BasketItems)
            {
                //get product from db
                var productItem = await untiOfWork.Repository<Product>().FindAsync(item.Id);
                var productItemOrdered = new ProductItemOrdered(productItem.Id,productItem.Name,productItem.PictureUrl);
                //create order item
                var orderItem = new OrderItem(productItemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            //get delivery method from db
            var deliveryMethod = await untiOfWork.Repository<DeliveryMethod>().FindAsync(deliveryMethodId);
            //calc subtotal
            var subTotal = items.Sum(i => i.Price * i.Quantity);
            //create order
            var order = new Order(items, buerEmail, address, deliveryMethod, subTotal);
            untiOfWork.Repository<Order>().Add(order);

            //save order to db
            var result = await untiOfWork.Complete();

            //delete basket when success
            if (result <= 0)
                return null;

            await basketRepo.DeleteBasketAsync(basketId);

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
