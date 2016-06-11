Ext.define("App.OrdenBordado.View.GridOrdenBordado", {
    extend: "App.Config.Abstract.Grid",
    title: 'Orden Bordados Registrados',
    criterios: true,
    textBusqueda: 'Orden Bordado.',
    imprimir: false,
    equipo: 'Orden Bordado',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.OrdenBordado.Store.OrdenBordado");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Bordado", width: 160, sortable: true, dataIndex: 'ID_IMAGEN', renderer: me.renderImagen },
            { header: "Kardex", width: 100, sortable: true, dataIndex: "KARDEX" },
            { header: "Nro OP", width: 100, sortable: true, dataIndex: "NRO_OP" },
            { header: "Detalle Item", width: 200, sortable: true, dataIndex: "DETALLE_ITEM" },
//            { header: "Responsable", width: 200, sortable: true, dataIndex: "RESPONSABLE" },
            { header: "Observacion", width: 150, sortable: true, dataIndex: "OBSERVACION" },
            
            ];
        this.callParent(arguments);
    },
    renderImagen: function (val, metaData, record) {
        //  alert(record.data.ID)
        if (record.data.ID_IMAGEN == 0) {
            return '<img src="'+host+'Content/Iconos/no-imagen.jpg" />';
        }
        else {
            return '<img src="' + host + 'Imagen/GetImage/?id=' + val + '&tamano=140"/>';
        }
    }
});

