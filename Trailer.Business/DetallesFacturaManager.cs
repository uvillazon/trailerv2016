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
    public class DetallesFacturaManager : Repository<EE_DETALLES_FACTURA>
    {


        public DetallesFacturaManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_DETALLES_FACTURA> GetAllDetallesFactura(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_FACTURA> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                result = QueryPaged(Query(), info.limit, info.start,info.sort,info.dir);
                Total = Query().Count();
               
            }
            else{
                result = from c in context.EE_DETALLES_FACTURA
                         select c;
                if (Codigo == "ORDENPRODUCCION")
                {
                    //int id = Convert.ToInt32(info.search);
                    result = from p in result
                             where p.NRO_OP.Contains(info.search)
                             select p;
                }
                
                else
                {
                    info.search = info.search.ToUpper();
                    result = from p in result
                             where p.DETALLE.ToUpper().Contains(info.search) || p.NRO_OP.Contains(info.search) || p.EE_FACTURAS.RAZON_SOCIAL.ToUpper().Contains(info.search) || p.EE_FACTURAS.EMPRESA.ToUpper().Contains(info.search) || p.EE_FACTURAS.CLIENTE.ToUpper().Contains(info.search) || p.EE_FACTURAS.NRO_FACTURA1.ToUpper().Contains(info.search) 
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start,info.sort,info.dir);
               
            }
            var resultado = new DataPaged<EE_DETALLES_FACTURA>()
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
