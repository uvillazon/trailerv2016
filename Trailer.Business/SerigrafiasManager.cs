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
    public class SerigrafiasManager : Repository<EE_DETALLES_SERIGRAFIA>
    {


        public SerigrafiasManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_DETALLES_SERIGRAFIA> GetAllSerigrafias(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            //this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_SERIGRAFIA> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                result = from c in context.EE_DETALLES_SERIGRAFIA
                         select c;
                if (Codigo == "ORDENPRODUCCION")
                {
                    int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.EE_ORDENES_PRODUCCION.NRO_ORDEN == id
                             select p;
                }
                
                else
                {
                    result = from p in result
                             where p.EE_SERIGRAFIAS.PROVEEDOR.Contains(info.search)||p.EE_DETALLES_ORDEN.DETALLE_ITEM.Contains(info.search)||p.EE_ORDENES_PRODUCCION.NRO_ORDEN1.Contains(info.search)
                             || p.EE_SERIGRAFIAS.RESPONSABLE.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_DETALLES_SERIGRAFIA>()
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
