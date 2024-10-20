using Core.Enitities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
     public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams productSpecParams)
            :base(p => 
                (string.IsNullOrEmpty(productSpecParams.Search) || p.Name.Contains(productSpecParams.Search))&&
                (!productSpecParams.BrandId.HasValue || p.ProductBrandID==productSpecParams.BrandId)&&
                (!productSpecParams.TypeId.HasValue || p.ProductTypeId==productSpecParams.TypeId)
            )
        {
            
        }
    }
}
