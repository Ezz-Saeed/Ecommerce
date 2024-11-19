using Core.Enitities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class OrderWithItemsAndDeliverySpecification : BaseSpecification<Order>
    {
        public OrderWithItemsAndDeliverySpecification(string email) : base(o=> o.BuyerEmail==email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrderWithItemsAndDeliverySpecification(int id, string email) 
            : base(o=>o.Id==id && o.BuyerEmail==email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}
