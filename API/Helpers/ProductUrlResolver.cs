﻿using API.DTOs;
using AutoMapper;
using AutoMapper.Execution;
using Core.Enitities;

namespace API.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
    {
        private readonly IConfiguration _configuration;

        public ProductUrlResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _configuration["ApiUrl"] + source.PictureUrl;
            }
            return null;
        }
    }
}
