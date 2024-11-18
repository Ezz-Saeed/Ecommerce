using Core.Enitities;
using Core.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrustructure.Data
{
    public class UntiOfWork(StoreContext context) : IUntiOfWork
    {
        private Hashtable repositories;
        public async Task<int> Complete()
        {
            return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if(repositories is null)
                repositories = new Hashtable();

            var typeName = typeof(TEntity).Name;

            if (!repositories.ContainsKey(typeName))
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.
                    MakeGenericType(typeof(TEntity)), context);

                repositories.Add(typeName,repositoryInstance);
            }

            return repositories[typeName] as IGenericRepository<TEntity>;
        }
    }
}
