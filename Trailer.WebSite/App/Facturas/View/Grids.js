Ext.define("App.Facturas.View.Grids", {
    extend: "Ext.grid.Panel",
    //width: 250,
    margins: '0 2 0 0',
    loadMask: true,
    opcion: '',
    pieTitulo: '',
    initComponent: function () {
        var me = this;

        if (me.opcion == "GridOTPorCliente") {
            me.title = "OT's Registradas Sin Facturas Registradas";
            me.pieTitulo = "Ordenes de Produccion";
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
//        else if (me.opcion == "GridDetalleOTPorCliente") {
//            me.title = "Detalles de OT sin Facturas Registradas";
//            me.CargarGridDetalleOTPorCliente();
//            me.pieTitulo = "Detalles Orden Produccion";
//            me.bbar = Ext.create('Ext.PagingToolbar', {
//                store: me.store,
//                displayInfo: true,
//                displayMsg: 'Desplegando {0} - {1} de {2}',
//                emptyMsg: "No existen " + me.pieTitulo + "."

//            });
//        }
        else if (me.opcion == "GridDetalleEditar") {
            me.title = "Detalle De Factura";
            me.CargarGridDetalleEditar();
        }
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarGridDetalleOTPorCliente: function () {
//        var me = this;
//        me.store = Ext.create('App.OrdenesProduccion.Store.DetallesOrden');
//        me.columns = [
//            { xtype: 'rownumberer', width: 30, sortable: false },
//            { header: 'OT', sortable: true, dataIndex: 'ID_ORDEN_PRODUCCION', width: 70 },
//            { header: 'Articulo', sortable: true, dataIndex: 'ARTICULO', width: 200 },
//            { header: "Talla", width: 50, sortable: true, dataIndex: 'TALLA' },
//            { header: "Cantidad", width: 60, sortable: true, dataIndex: 'CANTIDAD'},
//            { header: "Costo <br>Unitario", width: 60, sortable: true, dataIndex: 'COSTO'},
//            { header: "Total", width: 60, sortable: true, dataIndex: 'TOTAL'},
//            { header: "Cantidad<br>Entregada", width: 50, sortable: true, dataIndex: 'CANTIDAD_ENTREGADA' },
//            { header: "Cantidad<br>Faltante", width: 50, sortable: true, dataIndex: 'CANTIDAD_FALTANTE' }];

//        ];
    },
    CargarGridDetalleEditar: function () {
        var me = this;
        me.store = Ext.create('App.Facturas.Store.DetallesFactura');
        me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        //******************************
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro OT", width: 70, sortable: true, dataIndex: "NRO_OP" },
            { header: "Detalle", width: 200, sortable: true, dataIndex: "DETALLE" },
            { header: "Cantidad", width: 70, sortable: true, dataIndex: "CANTIDAD" , editor: {
                xtype: 'numberfield',
                }
            },
            { header: "Importe", width: 70, sortable: true, dataIndex: "COSTO" , editor: {
                xtype: 'numberfield',
                allowDecimals : true,
                decimalSeparator : '.',
                }
            },
            { header: "Total", width: 70, sortable: true, dataIndex: "TOTAL" },
            

        ];
    },
});

