using Core.Enitities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class OrderByPaymentIntentIdSpec : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdSpec(string paymentIntentId)
            :base(o=>o.PaymentIntentId == paymentIntentId)
        {
            
        }
    }
}
