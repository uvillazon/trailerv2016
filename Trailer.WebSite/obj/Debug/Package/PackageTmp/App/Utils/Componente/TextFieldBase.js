validaciones = Ext.create('App.Utils.Validaciones');
validaciones.cargarValidaciones();
Ext.define("App.Utils.Componente.TextFieldBase", {
    extend: "Ext.form.TextField",
    alias: 'widget.TextFieldBase',
    margin: '10 0 10 0',
    disabledCls: 'DisabledClase',
    vtype: "uppercase",
    maxLength: 20,
    emptyText: 'Introduzca...',
    enforceMaxLength: true,
    width: 180,
    labelWidth: 80,
    selectOnFocus: true,
    mensaje: '',
    titulo: '',
    initComponent: function () {
        var me = this;
        if (me.titulo != '') {
            me.on('render', function (obj) {
                obj.tip = Ext.create('Ext.tip.ToolTip', {
                    target: me.getEl(),
                    title: me.titulo,
                    html: me.mensaje
                });
            });
        }
      
        me.callParent(arguments);
    }

});
