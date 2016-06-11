Ext.define("App.Config.Abstract.PanelPrincipal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: '100%',
    height: Constantes.ALTO,
    frame: true,
    layout: 'border',
    fixed: true,
    defaults: {
        split: true
    },
    controlador: '',
    accionCrear: '',
    accionBaja: '',
    accionCambioEstado: '',
    idTabla: '',
    tabla: '',
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.formulario.CargarDatos(record);

    },
    CargarPanelImagen : function( verReporte){
        var me = this;
      
        me.ViewImagen = Ext.create("App.View.Imagenes.ViewImagenes");
        if (verReporte == null) {
            me.ViewImagen.on('selectionchange', me.onIconSelect, this);
        }
        else { alert("Otro Evento");}
        me.panelImagen = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,
            height: 400,
            title: 'Visor de Imagenes',
            items: [me.ViewImagen]
        });
    },
    CargarImagen: function (btn) {
        var me = this;
        if (me.formulario.record != null) {
            me.formImagen = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen' });
            me.formImagen.MostrarWindowImagen(me.tabla, me.formulario.record.get(me.idTabla), me.ViewImagen.store);
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un Registro");
        }
    },
    onIconSelect: function (dataview, selections) {
        var me = this;
        var selected = selections[0];

        if (selected) {
            alert(selected.get('ID_IMG'));
            //me.panelInfo.loadRecord(selected);
            //this.down('infopanel').loadRecord(selected);
        }
    },
});
