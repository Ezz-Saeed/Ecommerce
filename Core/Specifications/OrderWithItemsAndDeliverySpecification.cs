﻿using Core.Enitities.OrderAggregate;
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
        }

        public OrderWithItemsAndDeliverySpecification(int id, string email) 
            : base(o=>o.Id==id && o.BuyerEmail==email)
        {
        }
    }
}