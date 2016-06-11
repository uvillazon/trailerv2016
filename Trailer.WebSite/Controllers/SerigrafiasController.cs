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
    public class SerigrafiasController : Controller
    {
        //
        // GET: /Clientes/


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllSerigrafias(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new SerigrafiasService();
            var jsondata = service.GetAllSerigrafias(filter, codigo);
            var formatdata = jsondata.Rows.Select(s => new {
                ID_DETALLE = s.ID_DETALLE,
                ID_SERIGRAFIA = s.ID_SERIGRAFIA,
                ID_PROVEEDOR = s.EE_SERIGRAFIAS == null ? 0 : s.EE_SERIGRAFIAS.ID_PROVEEDOR,
                PROVEEDOR = s.EE_SERIGRAFIAS == null ? null : s.EE_SERIGRAFIAS.PROVEEDOR,
                NRO_NOTA = s.EE_SERIGRAFIAS == null ? null : s.EE_SERIGRAFIAS.NRO_NOTA,
                RESPONSABLE = s.EE_SERIGRAFIAS == null ? null : s.EE_SERIGRAFIAS.RESPONSABLE,
                FECHA_ENTREGA = s.EE_SERIGRAFIAS == null ? null : s.EE_SERIGRAFIAS.FECHA_ENTREGA,
                NRO_OP = s.EE_ORDENES_PRODUCCION == null?null:s.EE_ORDENES_PRODUCCION.NRO_ORDEN1,
                DETALLE_ITEM = s.EE_DETALLES_ORDEN == null ? null : s.EE_DETALLES_ORDEN.ARTICULO,
                OBSERVACION = s.OBSERVACION,
                CANTIDAD = s.CANTIDAD,
                PRECIO_UNITARIO = s.PRECIO_UNITARIO,
                TOTAL = s.TOTAL,
                ID_DETALLE_ORDEN = s.EE_DETALLES_ORDEN == null ? 0 : s.EE_DETALLES_ORDEN.ID_DETALLE_ORDEN,
                ID_ORDEN_PRODUCCION = s.EE_ORDENES_PRODUCCION == null ? 0 : s.EE_ORDENES_PRODUCCION.ID_ORDEN_PRODUCCION
            });
        
           
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(new {Rows = formatdata , Total = jsondata.Total }) + ");";
            return JavaScript(callback1);

        }
        #region sp para Serigrafias

        [HttpPost]
        public ActionResult CrearSerigrafiado(string detalles , EE_SERIGRAFIAS s)
        {
            var context = new Entities();
            var result = new ErrorPaged();
            var v_resp = new ObjectParameter("p_res", typeof(Int32));
            context.P_EE_ALTA_EE_SERIGRAFIA(s.ID_SERIGRAFIA, s.ID_PROVEEDOR, s.PROVEEDOR, s.NRO_NOTA, s.RESPONSABLE, s.OBSERVACION, s.FECHA_RECEPCION, s.FECHA_ENTREGA, 0, v_resp);
            //context.P_EE_alta_se
            //context.P_EE_ALTA_RECIBO(c.ID_CLIENTE, c.ID_EMPRESA, c.CLIENTE, c.EMPRESA,c.ENTREGADO, c.FECHA, c.MONTO, c.NRO_CHEQUE, c.BANCO, c.TIPO,c.DEPOSITO,c.DESCRIPCION, c.RECIBIDO_POR, v_resp);
            int Id_serigrafiado;
            bool esNumero = int.TryParse(v_resp.Value.ToString(), out Id_serigrafiado);
            if (esNumero)
            {
                try
                {
                    var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_SERIGRAFIA>>(detalles);


                    int idusuario = Convert.ToInt32(Session["ID_USR"]);
                    string valor = "Error";
                    //var data = context.P_EE_ALTA_BORDADO(c.ID_BORDADO, c.CANAL, c.KARDEX, c.DISENO, c.EMPRESA, c.DESCRIPCION, c.PUNTADA, c.ANCHO, c.ALTO, c.ORDEN_PRODUCCION, v_resp);
                    foreach (var item in obj)
                    {
                        //context.P_EE_ALTA_DETALLE_RECIBO(id_salida, item.ID_ORDEN_PRODUCCION, item.A_CUENTA, 0, v_resp);
                        context.P_EE_ALTA_EE_DETALLES_SERI(item.ID_DETALLE, Id_serigrafiado, item.ID_ORDEN_PRODUCCION, item.ID_DETALLE_ORDEN, item.OBSERVACION, item.CANTIDAD, item.PRECIO_UNITARIO, item.TOTAL, idusuario, v_resp);
                        valor = v_resp.Value.ToString();
                        if (valor != "1")
                        {
                            break;
                        }
                    }
                   
                    if (valor == "1")
                    {
                       
                        result.success = true;
                        result.msg = "Se inserto Correctamente";
                        result.datos = Id_serigrafiado.ToString();
                    }
                    else
                    {
                        var query = context.EE_SERIGRAFIAS.Where(x => x.ID_SERIGRAFIA == Id_serigrafiado);
                        context.EE_SERIGRAFIAS.DeleteObject(query.FirstOrDefault());
                        context.SaveChanges();
                        result.success = false;
                        result.msg = valor;
                    }
                    

                }
                catch (Exception ex)
                {
                    result.success = false;

                    result.msg = "Error Al ejecturase el Procedimiento " + ex;


                }
            }
            else
            {
                result.success = false;

                result.msg = "Error Al ejecturase el Procedimiento ";
            }



            return Json(result);

           
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EliminarSerigrafia(int ID_DETALLE)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                //var data = context.P_ANULAR_RECIBO(ID_RECIBO, v_resp);
                context.P_EE_ELIMINAR_DETALLE_SER(ID_DETALLE, v_resp);
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
