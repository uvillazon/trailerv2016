using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Trailer.Common;
using Trailer.Services;
using System.Web.Script.Serialization;
using Trailer.Model;
using System.Data.Objects;
using Newtonsoft.Json;
namespace Trailer.WebSite.Controllers
{
    public class OrdenBordadoController : Controller
    {
        //
        // GET: /Clientes/


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllOrdenBordado(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
        {
            var filter = new PagingInfo
            {
                page = page,
                start = start,
                limit = limit,
                sort = sort,
                dir = dir,
                _dc = _dc,
                callback = callback,
                search = condicion

            };
            var service = new OrdenBordadoService();
            var jsondata = service.GetAllOrdenBordado(filter, codigo);
            var formatdata = jsondata.Rows.Select(s => new
            {
                ID_DETALLE = s.ID_DETALLE,
                ID_IMAGEN = s.EE_BORDADOS == null ? 0 : s.EE_BORDADOS.ID_IMAGEN,
                NRO_OP = s.EE_ORDENES_PRODUCCION == null ? null : s.EE_ORDENES_PRODUCCION.NRO_ORDEN1,
                DETALLE_ITEM = s.EE_DETALLES_ORDEN == null ? null : s.EE_DETALLES_ORDEN.ARTICULO,
                OBSERVACION = s.OBSERVACION,
                CLIENTE = s.EE_ORDENES_PRODUCCION == null ? null : s.EE_ORDENES_PRODUCCION.CLIENTE,
                KARDEX = s.EE_BORDADOS == null ? null : s.EE_BORDADOS.KARDEX,
                ID_DETALLE_ORDEN = s.EE_DETALLES_ORDEN == null ? 0 : s.EE_DETALLES_ORDEN.ID_DETALLE_ORDEN,
                ID_ORDEN_PRODUCCION = s.EE_ORDENES_PRODUCCION == null ? 0 : s.EE_ORDENES_PRODUCCION.ID_ORDEN_PRODUCCION
            });


            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatdata, Total = jsondata.Total }) + ");";
            return JavaScript(callback1);

        }
        #region sp para OrdenBordado

        [HttpPost]
        public ActionResult CrearBordado(string detalles)
        {
            var context = new Entities();
            var result = new ErrorPaged();
            var v_resp = new ObjectParameter("p_res", typeof(Int32));
            try
            {
                var obj = JsonConvert.DeserializeObject<List<EE_BORDADOS_OP>>(detalles);


                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                string valor = "Error";
                string msg = "Error";
                string bordado = "";
                //var data = context.P_EE_ALTA_BORDADO(c.ID_BORDADO, c.CANAL, c.KARDEX, c.DISENO, c.EMPRESA, c.DESCRIPCION, c.PUNTADA, c.ANCHO, c.ALTO, c.ORDEN_PRODUCCION, v_resp);
                foreach (var item in obj)
                {
                    //context.P_EE_ALTA_DETALLE_RECIBO(id_salida, item.ID_ORDEN_PRODUCCION, item.A_CUENTA, 0, v_resp);
                    context.P_EE_ALTA_EE_BORDADOS_OP(item.ID_DETALLE, item.ID_BORDADO, item.ID_ORDEN_PRODUCCION, item.ID_DETALLE_ORDEN, item.OBSERVACION, idusuario, v_resp);
                    valor = v_resp.Value.ToString();
                    if (valor != "1")
                    {
                        bordado = context.EE_BORDADOS.Where(x => x.ID_BORDADO == item.ID_BORDADO).FirstOrDefault().KARDEX;
                        msg = msg + "Bordado :" + bordado;
                    }

                }
                if (bordado != "")
                {
                    result.success = true;
                    result.msg = "Se inserto correctamente Excepto los Siguientes por que ya existe bordado a ese ITEM " + msg;
                    //result.datos = Id_serigrafiado.ToString();
                }
                else
                {
                    result.success = true;
                    result.msg = "Se inserto Correctamente";
                }

            }
            catch (Exception ex)
            {
                result.success = false;
                result.msg = "Error Al ejecturase el Procedimiento " + ex;
            }
            return Json(result);

        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EliminarBordado(int ID_DETALLE)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                //var data = context.P_ANULAR_RECIBO(ID_RECIBO, v_resp);
                context.P_EE_ELIMINAR_DETALLE_BOR(ID_DETALLE, v_resp);
                string valor = v_resp.Value.ToString();
                if (valor == "1")
                {
                    result.success = true;
                    result.msg = "Se Elimino Correctamente Correctamente";
                    result.datos = valor;
                }
                else
                {
                    result.success = false;
                    result.msg = valor;
                }

            }
            catch (Exception ex)
            {
                result.success = false;
                result.msg = "Error Al ejecturase el Procedimiento " + ex;
            }
            return Json(result);
        }
        #endregion
    }
}
