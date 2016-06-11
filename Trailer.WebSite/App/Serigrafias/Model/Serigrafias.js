Ext.define("App.Serigrafias.Model.Serigrafias", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_SERIGRAFIA" },
            { type: "int", name: "ID_PROVEEDOR" },
            { type: "string", name: "PROVEEDOR" },
            { type: "string", name: "NRO_NOTA" },
            { type: "string", name: "RESPONSABLE" },
            { type: "string", name: "OBSERVACION" },
            { type: "float", name: "CANTIDAD" },
            { type: "float", name: "TOTAL" },
            { type: "date", name: "FECHA_RECEPCION", dateFormat: "d/m/Y", convert: convertDate },
            { type: "date", name: "FECHA_ENTREGA", dateFormat: "d/m/Y", convert: convertDate },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: convertDate },
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_ORDEN_PRODUCCION" },
            { type: "string", name: "DETALLE_ITEM" },
            { type: "string", name: "NRO_OP" },
            { type: "int", name: "ID_DETALLE_ORDEN" },
            { type: "string", name: "OBSERVACION" },
            { type: "float", name: "CANTIDAD" },
            { type: "float", name: "PRECIO_UNITARIO" },
            { type: "float", name: "TOTAL" },

    ]
});