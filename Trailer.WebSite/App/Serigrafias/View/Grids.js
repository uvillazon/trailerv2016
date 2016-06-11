Ext.define("App.Serigrafias.View.Grids", {
    extend: "Ext.grid.Panel",
    //width: 250,
    margins: '0 2 0 0',
    loadMask: true,
    opcion: '',
    pieTitulo: '',
    initComponent: function () {
        var me = this;

        if (me.opcion == "GridDetalleEditar") {
            me.title = "Detalle De Serigrafiado";
            me.CargarGridDetalleEditar();
        }
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarGridDetalleEditar: function () {
        var me = this;
        me.store = Ext.create('App.Serigrafias.Store.DetallesSerigrafia');
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
            { header: "Detalle", width: 150, sortable: true, dataIndex: "DETALLE" },
            { header: "Cantidad", width: 60, sortable: true, dataIndex: "CANTIDAD" , editor: {
                xtype: 'numberfield',
                }
            },
            { header: "Precio <br>Unitario", width: 60, sortable: true, dataIndex: "PRECIO_UNITARIO" , editor: {
                xtype: 'numberfield',
                allowDecimals : true,
                decimalSeparator : '.',
                }
            },
            { header: "Total", width: 60, sortable: true, dataIndex: "TOTAL" },
            { header: "Observaciones", width: 100, sortable: true, dataIndex: "OBSERVACION" , editor: {
                xtype: 'textfield',
                }
            },
            

        ];
    },
});

