Ext.define("App.OrdenesProduccion.View.Grids", {
    extend: "App.Config.Abstract.Grid",
    title: 'Ordenes Produccion Registrados',
    criterios: true,
    textBusqueda: 'OP.',
    imprimir: false,
    equipo: 'Ordenes Produccion',
    initComponent: function () {
        var me = this;

        if (me.opcion == "GridOrdenProduccion") {
            me.title = "Registro de Ordenes de Produccion por Cliente/Empresa"
            me.CargarGridOrdenProduccion();
        }
        else if (me.opcion == "GridDetallesOrdenProduccion") {
            me.title = "Detalle De Ordenes de Produccion pro Cliente/Empresa";
            me.CargarGridDetallesOrdenProduccion();
        }
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarGridOrdenProduccion: function () {
        var me = this;
        me.store = Ext.create("App.OrdenesProduccion.Store.OrdenesProduccion");
        me.CargarComponentes();
        me.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Nro Orden", width: 100, sortable: true, dataIndex: 'NRO_ORDEN' },
            { header: "Cliente", width: 100, sortable: true, dataIndex: 'TIPO_CLIENTE' },
            { header: "Monto A <br>Facturar", width: 100, sortable: true, dataIndex: 'SALDO_FACTURADO' },
            { header: "Fecha<br>Recepcion", width: 100, sortable: true, dataIndex: 'FECHA_RECEPCION', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fecha<br>Entrega", width: 100, sortable: true, dataIndex: 'FECHA_ENTREGA', renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Total Bs", width: 100, sortable: true, dataIndex: 'TOTAL' },
            { header: "Total Cant", width: 100, sortable: true, dataIndex: 'CANTIDAD' },
            { header: "Total <br>Entregado", width: 100, sortable: true, dataIndex: 'CANTIDAD_ENTREGADA' },
            { header: "Total <br>Faltante ", width: 100, sortable: true, dataIndex: 'CANTIDAD_FALTANTE' },
            { header: "Responsable Op", width: 100, sortable: true, dataIndex: 'RESPONSABLE_RECEPCION' },
           

        ];
    },
    CargarGridDetallesOrdenProduccion : function(){
    
    this.store = Ext.create('App.OrdenesProduccion.Store.DetallesOrden', { pageSize: 3000 });
        var me = this;
        me.store = Ext.create("App.OrdenesProduccion.Store.DetallesOrdenProduccion");
        me.CargarComponentes();
        me.columns = [
            { xtype: 'rownumberer', width: 30, sortable: false },
            { header: "Nro Orden", width: 70, sortable: true, dataIndex: 'NRO_OP' },
            { header: 'Articulo', sortable: true, dataIndex: 'ARTICULO', width: 200 },
            { header: "Talla", width: 50, sortable: true, dataIndex: 'TALLA' },
            { header: "Cantidad", width: 60, sortable: true, dataIndex: 'CANTIDAD'},
            { header: "Costo <br>Unitario", width: 60, sortable: true, dataIndex: 'COSTO'},
            { header: "Total", width: 60, sortable: true, dataIndex: 'TOTAL'},
            { header: "Cantidad<br>Entregada", width: 50, sortable: true, dataIndex: 'CANTIDAD_ENTREGADA' },
            { header: "Cantidad<br>Faltante", width: 50, sortable: true, dataIndex: 'CANTIDAD_FALTANTE' }];
    },
    CargarGridDetalleEditar: function () {
        var me = this;
        me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        //******************************
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro OT", width: 70, sortable: true, dataIndex: "ID_OT" },
            { header: "Detalle", width: 200, sortable: true, dataIndex: "DETALLE" },
            { header: "Cantidad", width: 70, sortable: true, dataIndex: "CANTIDAD" , editor: {
                xtype: 'numberfield',
                }
            },
            { header: "Importe", width: 70, sortable: true, dataIndex: "IMPORTE" , editor: {
                xtype: 'numberfield',
                }
            },
            { header: "Total", width: 70, sortable: true, dataIndex: "TOTAL" },
            

        ];
    },
});

