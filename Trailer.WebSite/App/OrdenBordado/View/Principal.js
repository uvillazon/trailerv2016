Ext.define("App.OrdenBordado.View.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
//    alias: "widget.PanelPrincipal",
    initComponent: function () {
        var me = this;


        me.grid = Ext.create("App.OrdenBordado.View.GridOrdenBordado", {
            region: 'center',
            width: '100%',
            height: '100%'
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Crear Orden de Bordado', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_Baja', 'Eliminar Orden de Bordado', Constantes.ICONO_BAJA, me.EventosBoton, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        this.items = [me.grid];
        this.callParent(arguments);
    },
    EventosBoton: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_Crear") {
            if (me.winFactura == null) {
                me.winFactura = Ext.create("App.Config.Abstract.Window", { botones: true });
                me.formFactura = Ext.create("App.OrdenBordado.View.FormOrdenBordado", { botones: false });
                me.winFactura.add(me.formFactura);
                me.winFactura.btn_guardar.on('click', me.GuardarBordado, this);
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
                Funciones.AjaxRequestGrid("OrdenBordado", "EliminarBordado", me.grid, "Esta Seguro de Eliminar el Detalle de Bordado", { ID_DETALLE: data.get('ID_DETALLE') }, me.grid);
            }
            else {
                Ext.Msg.alert("Error", "Seleccione una Factura");
            }

        }
        else {
            alert("Seleccione otro menu");
        }
    },
    GuardarBordado: function () {
        var me = this;
        Funciones.AjaxRequestWin("OrdenBordado", "CrearBordado", me.winFactura, me.formFactura, me.grid, "esta Seguro de Guardar el Formulario?", { detalles: Funciones.convertirJson(me.formFactura.grid) }, me.winFactura);
    }
});