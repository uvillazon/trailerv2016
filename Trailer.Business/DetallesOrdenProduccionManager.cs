using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Common;
using Trailer.Common.Data;
using Trailer.Model;
using Trailer.Common.Data.Interfaces;
using System.Data.Objects;
using Newtonsoft.Json;
using Trailer.Business.Infrastructure;

namespace Trailer.Business
{
    public class DetallesOrdenProduccionManager : Repository<EE_DETALLES_ORDEN>
    {
        public DetallesOrdenProduccionManager(IUnitOfWork uow) : base(uow) { }

        public DataPaged<EE_DETALLES_ORDEN> GetAllDetallesOrdenProduccion(PagingInfo info, string Codigo)
        {

            var context = (Entities)Context;
            this.Context.ContextOptions.LazyLoadingEnabled = false;
            IQueryable<EE_DETALLES_ORDEN> result = null;
            int Total = 0;
            if ((info.search == null) || (info.search == ""))
            {
                Total = Query().Count();
                result = QueryPaged(Query(), info.limit, info.start, info.sort, info.dir);

            }
            else
            {
                if (Codigo == "CODIGO")
                {
                    info.search = info.search.ToUpper();
                    result = from p in context.EE_DETALLES_ORDEN
                             where p.NRO_OP.Contains(info.search) || p.DETALLE_ITEM.Contains(info.search)
                             select p;
                }
                else if (Codigo == "RECIBO")
                {
                    result = from p in context.EE_DETALLES_ORDEN
                             where p.NRO_OP.Contains(info.search) && p.TOTAL_A_CANCELAR > 0
                             select p;
                }
                else if (Codigo == "FACTURACLIENTE")
                {
                    int id = Convert.ToInt32(info.search);
                    info.search = info.search.ToUpper();
                    result = from p in context.EE_DETALLES_ORDEN
                             join c in context.EE_ORDENES_PRODUCCION on p.ID_ORDEN_PRODUCCION equals c.ID_ORDEN_PRODUCCION
                             where c.ID_TIPO_CLIENTE == id && c.CLIENTE != null && c.IMPORTE_FACTURADO < c.TOTAL
                             select p;
                }
                else if (Codigo == "FACTURAEMPRESA")
                {
                    int id = Convert.ToInt32(info.search);
                    info.search = info.search.ToUpper();
                    result = from p in context.EE_DETALLES_ORDEN
                             join c in context.EE_ORDENES_PRODUCCION on p.ID_ORDEN_PRODUCCION equals c.ID_ORDEN_PRODUCCION
                             where c.ID_TIPO_CLIENTE == id && c.EMPRESA != null && c.IMPORTE_FACTURADO < c.TOTAL
                             select p;
                }
                else
                {
                    //var id = Convert.ToInt32(info.search);
                    info.search = info.search.ToUpper();
                    result = from p in context.EE_DETALLES_ORDEN
                             join c in context.EE_ORDENES_PRODUCCION on p.ID_ORDEN_PRODUCCION equals c.ID_ORDEN_PRODUCCION
                             where c.TIPO_CLIENTE.Contains(info.search) || p.NRO_OP.Contains(info.search)
                             select p;
                }
                Total = result.Count();
                result = QueryPaged(result, info.limit, info.start, info.sort, info.dir);
            }
            var resultado = new DataPaged<EE_DETALLES_ORDEN>()
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
