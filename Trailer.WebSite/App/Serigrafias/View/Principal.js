Ext.define("App.Serigrafias.View.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
//    alias: "widget.PanelPrincipal",
    initComponent: function () {
        var me = this;


        me.grid = Ext.create("App.Serigrafias.View.GridSerigrafias", {
            region: 'center',
            width: '100%',
            height: '100%'
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Crear Orden de Serigrafiado', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_Baja', 'Eliminar Orden de Serigrafiado', Constantes.ICONO_BAJA, me.EventosBoton, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        this.items = [me.grid];
        this.callParent(arguments);
    },
    EventosBoton: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_Crear") {
            if (me.winFactura == null) {
                me.winFactura = Ext.create("App.Config.Abstract.Window", { botones: true });
                me.formFactura = Ext.create("App.Serigrafias.View.FormSerigrafia", { botones: false });
                me.winFactura.add(me.formFactura);
                me.winFactura.btn_guardar.on('click', me.GuardarSerigrafiado, this);
                me.winFactura.show();
            }
            else {
                me.formFactura.getForm().reset();
                me.formFactura.grid.getStore().removeAll();
                me.winFactura.show();
            }
        }
        else if (btn.getItemId() == "btn_Baja") {
            var data = me.grid.getSelectionModel().getSelection()[0];
            if (data != null) {
                Funciones.AjaxRequestGrid("Serigrafias", "EliminarSerigrafia", me.grid, "Esta Seguro de Eliminar el Detalle de Factura", { ID_DETALLE: data.get('ID_DETALLE') }, me.grid);
            }
            else {
                Ext.Msg.alert("Error", "Seleccione una Factura");
            }

        }
        else {
            alert("Seleccione otro menu");
        }
    },
    GuardarSerigrafiado: function () {
        var me = this;
        Funciones.AjaxRequestWin("Serigrafias", "CrearSerigrafiado", me.winFactura, me.formFactura, me.grid, "esta Seguro de Guardar el Formulario?", { detalles: Funciones.convertirJson(me.formFactura.grid) }, me.winFactura);
    }
});