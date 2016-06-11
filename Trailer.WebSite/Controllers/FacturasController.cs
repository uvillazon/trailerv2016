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
using Trailer.WebSite.Infrastructure;
namespace Trailer.WebSite.Controllers
{
    public class FacturasController : Controller
    {
        //
        // GET: /Clientes/


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllFacturas(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new FacturasService();
            var jsondata = service.GetAllFacturas(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllDetallesFactura(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
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
            var service = new FacturasService();
            var jsondata = service.GetAllDetallesFactura(filter, codigo);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(jsondata) + ");";
            return JavaScript(callback1);

        }
        #region sp para Facturas

        [HttpPost,ValidateInput(false)]
        public ActionResult CrearFactura(EE_FACTURAS f, string detalles)
        {
            var context = new Entities();
            var result = new ErrorPaged();
            var v_resp = new ObjectParameter("p_res", typeof(Int32));
            context.P_EE_ALTA_EE_FACTURAS(f.ID_FACTURA,f.ID_CLIENTE,f.ID_EMPRESA,f.CLIENTE,f.EMPRESA,f.RAZON_SOCIAL,f.NIT,f.NRO_FACTURA,f.FECHA,f.MONTO,f.OBSERVACION,f.EMITIDO_POR,f.TIEMPO_APROX,f.FECHA_APROX,0,v_resp);
            //context.P_EE_ALTA_RECIBO(c.ID_CLIENTE, c.ID_EMPRESA, c.CLIENTE, c.EMPRESA,c.ENTREGADO, c.FECHA, c.MONTO, c.NRO_CHEQUE, c.BANCO, c.TIPO,c.DEPOSITO,c.DESCRIPCION, c.RECIBIDO_POR, v_resp);
            int id_salida;
            bool esNumero = int.TryParse(v_resp.Value.ToString(), out id_salida);
            if (esNumero)
            {
                try
                {
                    var obj = JsonConvert.DeserializeObject<List<EE_DETALLES_FACTURA>>(detalles);
                    int idusuario = Convert.ToInt32(Session["ID_USR"]);
                    string valor = "Error";
                    foreach (var item in obj)
                    {
                        var num = new Numero();
                        //string numujjj = num.Convertir(item.TOTAL.ToString() , true);

                        context.P_EE_ALTA_EE_DETALLES_FACTURA(item.ID_DETALLE, id_salida, item.ID_ORDEN_PRODUCCION, item.NRO_OP, item.CANTIDAD, item.COSTO, item.TOTAL, item.DETALLE, idusuario, v_resp);
                        //context.P_EE_ALTA_DETALLE_RECIBO(id_salida, item.ID_ORDEN_PRODUCCION, item.A_CUENTA, 0, v_resp);
                        valor = v_resp.Value.ToString();
                        if (valor != "1")
                        {
                            break;
                        }
                    }
                   
                    if (valor == "1")
                    {
                        context.P_EE_ACTUALIZAR_FACTURA_OP(id_salida, v_resp);
                        if (v_resp.Value.ToString() == "1")
                        {
                            result.success = true;
                            result.msg = "Se inserto Correctamente";
                        }
                        else {
                            result.success = false;
                            result.msg = v_resp.Value.ToString();
                        }
                    }
                    else
                    {
                        result.success = true;
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
        public ActionResult EliminarFactura(int ID_FACTURA)
        {
            var result = new ErrorPaged();
            try
            {
                var context = new Entities();
                int idusuario = Convert.ToInt32(Session["ID_USR"]);
                var v_resp = new ObjectParameter("p_res", typeof(Int32));
                var data = context.P_ANULAR_FACTURA(ID_FACTURA, v_resp);
                string valor = v_resp.Value.ToString();
                if (valor == "1")
                {
                    result.success = true;
                    result.msg = "Se Anulo Correctamente";
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
