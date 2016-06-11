Ext.define("App.Facturas.View.Principal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: 950,
    resizable: true,
    height: 550,
    frame: true,
    layout: 'border',
    //    title: 'Adminsitracion Cortes',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;


        me.grid = Ext.create("App.Facturas.View.GridFacturas", {
            region: 'center',
            width: '100%',
            height: '100%'
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Crear Factura', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_Baja', 'Anular Factura', Constantes.ICONO_BAJA, me.EventosBoton, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        this.items = [me.grid];
        this.callParent(arguments);
    },
    EventosBoton: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_Crear") {
            if (me.winFactura == null) {
                me.winFactura = Ext.create("App.Config.Abstract.Window", { botones: true });
                me.formFactura = Ext.create("App.Facturas.View.FormFactura", { botones: false });
                me.winFactura.add(me.formFactura);
                me.winFactura.btn_guardar.on('click', me.GuardarFactura, this);
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
                Funciones.AjaxRequestGrid("Facturas", "EliminarFactura", me.grid, "Esta Seguro de Anular la Factura", {ID_FACTURA : data.get('ID_FACTURA')}, me.grid);
            }
            else {
                Ext.Msg.alert("Error", "Seleccione una Factura");
            }

        }
        else {
            alert("Seleccione otro menu");
        }
    },
    GuardarFactura: function () {
        var me = this;
        Funciones.AjaxRequestWin("Facturas", "CrearFactura", me.winFactura, me.formFactura, me.grid, "esta Seguro de Guardar la Factura?", { detalles: Funciones.convertirJson(me.formFactura.grid) }, me.winFactura);
    }
});