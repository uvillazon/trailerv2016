Ext.define("App.Facturas.Model.DetallesFactura", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_ORDEN_PRODUCCION" },
            { type: "int", name: "ID_FACTURA" },
            { type: "int", name: "ID_DETALLE_ORDEN" },
            { type: "string", name: "DETALLE" },
            { type: "string", name: "NRO_OP" },
            { type: "float", name: "CANTIDAD" },
            { type: "float", name: "COSTO" },
            { type: "float", name: "TOTAL" },
            
    ]
});