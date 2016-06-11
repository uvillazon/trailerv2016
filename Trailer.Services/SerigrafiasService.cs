using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class SerigrafiasService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_DETALLES_SERIGRAFIA> GetAllSerigrafias(PagingInfo info, string codigo)
        {

            DataPaged<EE_DETALLES_SERIGRAFIA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SerigrafiasManager(uow);
                result = manager.GetAllSerigrafias(info, codigo);
               
            });
            return result;
        }

        
    }
}
