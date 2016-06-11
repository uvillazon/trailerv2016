Ext.define("App.Utils.Componente.ComboBase", {
    extend: "Ext.form.ComboBox",
    alias: 'widget.comboBase',
    typeAhead: true,
    queryMode: 'local',
    editable: true, //permite controlar lo de la lista dinamica para busqueda inteligente
    forceSelection: false,
    margin: '0 0 0 10',
    emptyText: 'Seleccione...',
    disabledCls: 'DisabledClase',
    displayField: 'VALOR',
    width: 180,
    selectOnFocus: true,
    labelWidth: 80,
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

        me.on('assertValue', function () {
            var me = this;
            if (!me.forceSelection) {
                me.collapse();
            } else {
                me.callParent();
            }
        });
        me.on('expand', function () {
            this.clearValue();
        });
        me.callParent(arguments);//y
    }
});
