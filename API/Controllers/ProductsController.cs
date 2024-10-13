using API.DTOs;
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
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
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

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductWithTypeAndBrandSpecification();
            var products = await _ProductRepository.ListAsynckWithSpec(spec);
            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithTypeAndBrandSpecification(id);
            var product = await _ProductRepository.GetEntityWithSpec(spec);
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            return Ok(await _brandsRepository.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetTypes()
        {
            return Ok(await _ProductRepository.ListAllAsync());
        }
    }
}
