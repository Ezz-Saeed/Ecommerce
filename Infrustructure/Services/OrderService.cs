using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications;
using Infrustructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrustructure.Services
{
    public class OrderService(IUntiOfWork untiOfWork, IBasketRepository basketRepo, 
        IPaymentService paymentService) : IOrderService
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

            //Check if order exists
            var spec = new OrderByPaymentIntentIdSpec(basket.PaymentIntentId);
            var existingOrder = await untiOfWork.Repository<Order>().GetEntityWithSpec(spec);
            if (existingOrder is not null)
            {
                 untiOfWork.Repository<Order>().Delete(existingOrder);
                 await paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }
            //create order
            var order = new Order(items, buerEmail, address, deliveryMethod, subTotal, basket.PaymentIntentId);
            untiOfWork.Repository<Order>().Add(order);
            

            //save order to db
            int result = 0;
            try
            {
                 result = await untiOfWork.Complete();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            //delete basket when success
            if (result <= 0)
                return null;
            
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await untiOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string email)
        {
            var spec = new OrderWithItemsAndDeliverySpecification(id,email);

            return await untiOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buerEmail)
        {
            var spec = new OrderWithItemsAndDeliverySpecification(buerEmail);

            return await untiOfWork.Repository<Order>().ListAsynckWithSpec(spec);
        }
    }
}
