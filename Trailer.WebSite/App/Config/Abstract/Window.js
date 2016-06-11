Ext.define("App.Config.Abstract.Window", {
    extend: "Ext.Window",
    layout: 'fit',
    //width: 550,
    //height: 390,
    maxWidth: 1024,
    maxHeight  : 650,
    resizable: true,
    draggable: false,
    modal: true,
    closable: false,
    autoScroll: true,
    //iconCls: 'application_form_add',
    botones: true,
    y: 20,
    constrain: true,
    botones: false,
    mostrarBotonCerrar : false,
    buttons: '',
    textGuardar: 'Guardar',
    textCerrar : 'Cerrar',
    initComponent: function () {
        var me = this;
        if (!me.botones) {
            if (this.buttons == '') {
                this.buttons = [{
                    xtype: 'button',
                    text: me.textCerrar,
                    iconCls: 'cross',
                    maxWidth: 250,
                    minWidth : 120,
                    hidden : me.mostrarBotonCerrar,
                    handler: function () {
                        //this.up('form').getForm().reset();
                        this.up('window').hide();
                        //this.up('window').maximize();
                        //this.maximize();
                        //this.toFront();
                    }

                }
                ];
            }
            else {
                this.buttons = this.buttons;
            }
        }
        else {
            this.btn_cerrar = Ext.create('Ext.Button', {
                text: me.textCerrar,
                minWidth: 120,
                maxWidth: 250,
                itemId: 'cerrar',
                textAlign: 'center',
                margin: 10,
                iconCls: 'cross',
                handler: function () {
                    this.up('window').hide();


                }

            });
            this.btn_guardar = Ext.create('Ext.Button', {
                text: me.textGuardar,
                minWidth: 120,
                maxWidth: 250,
                itemId: 'guardar',
                textAlign: 'center',
                iconCls: 'disk',
                margin: 10,

            });

            this.buttons = [this.btn_guardar, this.btn_cerrar];
        }
        //       var me = this;
        //        me.on('minimize', me.minimizar,this);
        this.callParent(arguments);
    }
});