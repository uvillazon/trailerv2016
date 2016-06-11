using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Common;
using Trailer.Common.Data;
using Trailer.Model;
using Trailer.Common.Data.Interfaces;
using System.Data.Objects;

namespace Trailer.Business
{
    public class ProductosManager : Repository<EE_PRODUCTOS>
    {


        public ProductosManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_PRODUCTOS> GetAllProductos(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_PRODUCTOS> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                info.search = info.search.ToUpper();
                result = from p in context.EE_PRODUCTOS
                             where p.CLIENTE.ToUpper().Contains(info.search)||p.COLOR.ToUpper().Contains(info.search)||p.TALLA.ToUpper().Contains(info.search)
                             select p;
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_PRODUCTOS>()
            {
                Page = info.page,
                Records = info.limit,
                Rows = result.ToList(),
                Total = Total
            };
            return resultado;

        }
    }
}
