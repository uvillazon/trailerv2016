Ext.define("App.Serigrafias.Model.DetallesSerigrafia", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_SERIGRAFIA" },
            { type: "int", name: "ID_ORDEN_PRODUCCION" },
            { type: "int", name: "ID_DETALLE_ORDEN" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "DETALLE" },
            { type: "string", name: "NRO_OP" },
            { type: "float", name: "CANTIDAD" },
            { type: "float", name: "PRECIO_UNITARIO" },
            { type: "float", name: "TOTAL" },
            
    ]
});