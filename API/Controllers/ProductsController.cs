using API.DTOs;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Infrustructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _ProductRepository;
        private readonly IGenericRepository<ProductBrand> _brandsRepository;

        private readonly IGenericRepository<ProductType> _typesRepository;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> repository,
            IGenericRepository<ProductBrand> brandsRepository,
            IGenericRepository<ProductType> typesRepository,
            IMapper mapper)
        {
            _ProductRepository = repository;
            _brandsRepository = brandsRepository;
            _typesRepository = typesRepository;
            _mapper = mapper;
        }

        [Cashed(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts
            ([FromQuery] ProductSpecParams productSpecParams)
        {
            var spec = new ProductWithTypeAndBrandSpecification(productSpecParams);
            var countSpec = new ProductsWithFiltersForCountSpecification(productSpecParams);

            var products = await _ProductRepository.ListAsynckWithSpec(spec);
            var totalItems = await _ProductRepository.CountAsync(countSpec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>
                (productSpecParams.PageIndex, productSpecParams.PageSize, totalItems, data));
        }

        [Cashed(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponseError), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithTypeAndBrandSpecification(id);
            var product = await _ProductRepository.GetEntityWithSpec(spec);
            if (product is null)
                return NotFound(new ApiResponseError(404));
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [Cashed(600)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            return Ok(await _brandsRepository.ListAllAsync());
        }

        [Cashed(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetTypes()
        {
            return Ok(await _typesRepository.ListAllAsync());
        }
    }
}
