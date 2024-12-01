using Core.Enitities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentController(IPaymentService paymentService): BaseApiController
    {
        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            return await paymentService.CreateOrUpdatePaymentIntent(basketId);
        }
    }
}
