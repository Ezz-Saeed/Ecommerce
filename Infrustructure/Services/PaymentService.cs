using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Product = Core.Enitities.Product;

namespace Infrustructure.Services
{
    public class PaymentService(IBasketRepository basketRepository, IUntiOfWork untiOfWork,
        IConfiguration configuration) : IPaymentService
    {
        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string baketId)
        {
            StripeConfiguration.ApiKey = configuration["StripeSettings:SecretKey"];
            var basket = await basketRepository.GetBasketAsync(baketId);

            var shippingPrice = 0m;

            if (basket.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await untiOfWork.Repository<DeliveryMethod>().
                    FindAsync((int)basket.DeliveryMethodId);
                shippingPrice = deliveryMethod.Price;

            }

            foreach(var item in basket.BasketItems)
            {
                var productItem = await untiOfWork.Repository<Product>().FindAsync(item.Id);
                if(item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }

            var service = new PaymentIntentService();
            PaymentIntent paymentIntent;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)basket.BasketItems.Sum(i => i.Quantity * (i.Price * 100)) +
                    (long)shippingPrice * 100,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                paymentIntent = await service.CreateAsync(options);
                basket.PaymentIntentId = paymentIntent.Id;
                basket.ClientSecret = paymentIntent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)basket.BasketItems.Sum(i => i.Quantity * (i.Price * 100)) +
                    (long)shippingPrice * 100
                };

                await service.UpdateAsync(basket.PaymentIntentId, options);
            }

            await basketRepository.UpdateBasketAsync(basket);
            return basket;
        }
    }
}
