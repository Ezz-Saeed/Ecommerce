using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrustructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _context;

        public GenericRepository(StoreContext context)
        {
            this._context = context;
        }
        public async Task<T> FindAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }     

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsynckWithSpec(ISpecification<T> specification)
        {
            return await ApplySecification(specification).ToListAsync();
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> specification)
        {
           return await ApplySecification(specification).FirstOrDefaultAsync();

        }

        public Task<int> CountAsync(ISpecification<T> specification)
        {
            return ApplySecification(specification).CountAsync();
        }


        private IQueryable<T> ApplySecification(ISpecification<T> specification)
        {
            return  SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), specification);
        }

        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }
    }
}
