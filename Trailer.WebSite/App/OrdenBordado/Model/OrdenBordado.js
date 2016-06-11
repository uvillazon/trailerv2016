Ext.define("App.OrdenBordado.Model.OrdenBordado", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_DETALLE" },
            
            { type: "string", name: "OBSERVACION" },
           
            { type: "int", name: "ID_ORDEN_PRODUCCION" },
            { type: "string", name: "DETALLE_ITEM" },
            { type: "string", name: "NRO_OP" },
            { type: "int", name: "ID_DETALLE_ORDEN" },
            { type: "string", name: "OBSERVACION" },
            { name: 'ID_BORDADO', type: 'int' },
            { name: 'ID_IMAGEN', type: 'int' },
            { name: 'CANAL', type: 'string' },
            { name: 'KARDEX', type: 'string' },

    ]
});