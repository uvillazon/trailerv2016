using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Trailer.Business;
using Trailer.Common;
using Trailer.Model;
namespace Trailer.Services
{

    public class OrdenBordadoService : BaseService
    {
        /// <summary>
        /// recupera toda la lista de los puestos paginados
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public DataPaged<EE_BORDADOS_OP> GetAllOrdenBordado(PagingInfo info, string codigo)
        {

            DataPaged<EE_BORDADOS_OP> result = null;
            ExecuteManager(uow =>
            {
                var manager = new OrdenBordadoManager(uow);
                result = manager.GetAllOrdenBordado(info, codigo);
               
            });
            return result;
        }

        
    }
}
