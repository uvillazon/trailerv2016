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
    public class ProveedoresManager : Repository<EE_PROVEEDORES>
    {


        public ProveedoresManager(IUnitOfWork uow) : base(uow) { }



        public DataPaged<EE_PROVEEDORES> GetAllProveedores(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_PROVEEDORES> result = null;
            int Total = 0;
            if (((info.search == null) || (info.search == "") )&& Codigo == null)
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                if (Codigo == "SERIGRAFIA")
                {
                    result = context.EE_PROVEEDORES.Where(x => x.TIPO == "SERIGRAFIA");
                }
                else
                {
                    info.search = info.search.ToUpper();
                    result = from p in context.EE_PROVEEDORES
                             where p.NOMBRE.ToUpper().Contains(info.search) || p.DESCRIPCION.ToUpper().Contains(info.search) || p.CIUDAD.ToUpper().Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_PROVEEDORES>()
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
