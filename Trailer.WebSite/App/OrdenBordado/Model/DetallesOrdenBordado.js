Ext.define("App.OrdenBordado.Model.DetallesOrdenBordado", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_BORDADO" },
            { type: "int", name: "ID_ORDEN_PRODUCCION" },
            { type: "int", name: "ID_DETALLE_ORDEN" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "DETALLE" },
            { type: "string", name: "KARDEX" },
            { type: "string", name: "NRO_OP" },
         
            
    ]
});