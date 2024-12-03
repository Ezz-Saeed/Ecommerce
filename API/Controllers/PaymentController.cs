using API.Errors;
using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    public class PaymentController(IPaymentService paymentService, ILogger<IPaymentService> logger): BaseApiController
    {
        private const string WhSecret = $"whsec_fef38cfa0c6df80d96ac040ec7ee24e3f287ad8ccec09eeadf94b9070d14b80e";

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await paymentService.CreateOrUpdatePaymentIntent(basketId);
            if (basket is null) return BadRequest(new ApiResponseError(400,"An error occured!"));

            return basket;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebHook()
        {
            string json;
            using (var streame = new StreamReader(HttpContext.Request.Body)) {
                json = await streame.ReadToEndAsync();
            };

            var stripeEvent = EventUtility.ConstructEvent(json, 
                Request.Headers["Stripe-Signature"], WhSecret);

            PaymentIntent paymentIntent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    logger.LogInformation("Payment succeeded", paymentIntent.Id);
                    order = await paymentService.UpdateOrderPaymentSucceeded(paymentIntent.Id);
                    logger.LogInformation("Order updated to Payment received", paymentIntent.Id);

                    break;
                case "payment_intent.payment_failed":
                    paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    logger.LogInformation("Payment failed", paymentIntent.Id);
                    order = await paymentService.UpdateOrderPaymentFailed(paymentIntent.Id);
                    logger.LogInformation("Order updated to Payment failed", paymentIntent.Id);
                    break;
            }
            return new EmptyResult();
        }
    }
}
