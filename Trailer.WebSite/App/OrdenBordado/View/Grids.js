Ext.define("App.OrdenBordado.View.Grids", {
    extend: "Ext.grid.Panel",
    //width: 250,
    margins: '0 2 0 0',
    loadMask: true,
    opcion: '',
    pieTitulo: '',
    initComponent: function () {
        var me = this;

        if (me.opcion == "GridDetalle") {
            me.title = "Detalle De Orden Bordado";
            me.CargarGridDetalleEditar();
        }
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarGridDetalleEditar: function () {
        var me = this;
//        me.store = Ext.create('App.Serigrafias.Store.DetallesSerigrafia');
        me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        //******************************
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro OP", width: 70, sortable: true, dataIndex: "NRO_OP" },
            { header: "Detalle", width: 150, sortable: true, dataIndex: "DETALLE" },
            { header: "Kardex", width: 150, sortable: true, dataIndex: "KARDEX" },
            { header: "Observaciones", width: 100, sortable: true, dataIndex: "OBSERVACION" , editor: {
                xtype: 'textfield',
                }
            },
            

        ];
    },
});

