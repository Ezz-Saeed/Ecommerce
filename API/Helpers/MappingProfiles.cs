using API.DTOs;
using AutoMapper;
using Core.Enitities;
using Core.Enitities.IdentityEntities;
using Core.Enitities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(dist=>dist.ProductBrand, opion=>opion.MapFrom(source=> source.ProductBrand.Name))
                .ForMember(dist=>dist.ProductType, option=>option.MapFrom(source=>source.ProductType.Name))
                .ForMember(d=>d.PictureUrl, options=>options.MapFrom<ProductUrlResolver>());

            CreateMap<Core.Enitities.IdentityEntities.Address, AddressDto>().ReverseMap();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<AddressDto, Core.Enitities.OrderAggregate.Address>();


            CreateMap<Order, OrderToReturnDto>().
                ForMember(d=>d.DeliveryMethod, o=>o.MapFrom(s=>s.DeliveryMethod.ShortName)).
                ForMember(d=>d.ShippingPrice, o=>o.MapFrom(s=>s.DeliveryMethod.Price));


            CreateMap<OrderItem, OrderItemDto>().
                ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductId)).
                ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.Name)).
                ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl)).
                ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
                
        }
    }
}
