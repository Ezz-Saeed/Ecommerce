﻿using API.DTOs;
using AutoMapper;
using Core.Enitities;

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
        }
    }
}