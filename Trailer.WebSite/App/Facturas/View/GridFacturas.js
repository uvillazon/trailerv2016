Ext.define("App.Facturas.View.GridFacturas", {
    extend: "App.Config.Abstract.Grid",
    title: 'Facturas Registrados',
    criterios: true,
    textBusqueda: 'Facturas.',
    imprimir: false,
    equipo: 'Facturas',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Facturas.Store.Facturas");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
             { header: "Nro Factura", width: 70, sortable: true, dataIndex: "NRO_FACTURA" },
            { header: "Razon Social", width: 70, sortable: true, dataIndex: "RAZON_SOCIAL" },
            { header: "Nit", width: 70, sortable: true, dataIndex: "NIT" },

            { header: "Fecha <br>Emision", width: 70, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Ordenes <br>Produccion", width: 70, sortable: true, dataIndex: "OPS" },
            { header: "nro Recibos", width: 70, sortable: true, dataIndex: "NRO_RECIBOS" },
            { header: "Importe <br>Facturado", width: 70, sortable: true, dataIndex: "MONTO" },
            { header: "Importe<br>Cancelado<br>a la Fecha", width: 70, sortable: true, dataIndex: "MONTO_CANCELADO" },
            { header: "Emitido por", width: 70, sortable: true, dataIndex: "EMITIDO_POR" },
            { header: "Fecha<br>Aproximado <br> Pago", width: 70, sortable: true, dataIndex: "FECHA_APROX", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Observacion", width: 100, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
            
            ];
        this.callParent(arguments);
    }
});

