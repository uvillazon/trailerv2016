Ext.define("App.Serigrafias.View.GridSerigrafias", {
    extend: "App.Config.Abstract.Grid",
    title: 'Serigrafias Registrados',
    criterios: true,
    textBusqueda: 'Serigrafias.',
    imprimir: false,
    equipo: 'Serigrafias',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Serigrafias.Store.Serigrafias");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Nota", width: 70, sortable: true, dataIndex: "NRO_NOTA" },
            { header: "Fecha <br >Entrtega", width: 70, sortable: true, dataIndex: "FECHA_ENTREGA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Proveedor", width: 100, sortable: true, dataIndex: "PROVEEDOR" },
            { header: "Nro OP", width: 70, sortable: true, dataIndex: "NRO_OP" },
            { header: "Detalle Item", width: 200, sortable: true, dataIndex: "DETALLE_ITEM" },
            { header: "Cantidad", width: 70, sortable: true, dataIndex: "CANTIDAD" },
            { header: "Precio <br>Unitario", width: 70, sortable: true, dataIndex: "PRECIO_UNITARIO" },
            { header: "Total", width: 70, sortable: true, dataIndex: "TOTAL" },
            { header: "Responsable", width: 100, sortable: true, dataIndex: "RESPONSABLE" },
            { header: "Observacion", width: 150, sortable: true, dataIndex: "OBSERVACION" },
            
            ];
        this.callParent(arguments);
    }
});

