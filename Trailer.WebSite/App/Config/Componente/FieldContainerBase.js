Ext.define("App.Config.Componente.FieldContainerBase", {
    extend: "Ext.form.FieldContainer",
    alias: 'widget.FieldContainerBase',
    layout: {
        type: 'table',
        columns: 2
    },
    btn_titulo: '',
    btn_iconCls : '',
    btn_tooltip : 'Buscar',
    componente : null,
    initComponent: function () {
        var me = this;
        
         me.btn = Ext.create('Ext.Button', {
            iconCls: me.btn_iconCls,
            tooltip: me.btn_tooltip,
            text: me.btn_titulo,
        });
        me.items = [me.componente,me.btn]
        //        

        me.callParent(arguments);
    }

});
