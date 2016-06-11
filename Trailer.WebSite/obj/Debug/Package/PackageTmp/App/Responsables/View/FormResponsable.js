﻿Ext.define("App.Responsables.View.FormResponsable", {
    extend: "Ext.form.Panel",
    title: "Datos Generales del Responsable",
    layout: {
        type: 'table',
        columns: 2
    },
    iconCls : 'application_form_add',
    bodyPadding: 10,
    fieldDefaults : {
        margin: '2',
        align:'left',
        labelWidth: 70,
    },
    initComponent: function () {
        var me = this;
       
        this.bto_limpiar = Ext.create('Ext.Button', {
             text: 'Limpiar',
             itemId :'limpiar_rec',
             width: 120,
             textAlign: 'center',
             iconCls: 'cross',
             margin : 10,
             hidden : true

        });
        this.bto_guardar = Ext.create('Ext.Button', {
             text: 'Guardar',
             itemId:'guardar_rec',
             width: 120,
             textAlign: 'center',
             iconCls: 'disk',
             margin : 10,
             hidden : true

        });

        this.txt_id = Ext.create("App.Utils.Componente.TextFieldBase", {
            name: 'ID_RESPONSABLE',
            hidden: true
        });
        
        
        //Definimos serie 
        me.txt_nombre = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Nombre',
            name: 'NOMBRE',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width: 220
        });

        me.txt_apellido = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Apellido',
            name: 'APELLIDO',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width: 220
        });

        me.txt_direccion = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Direccion',
            name: 'DIRECCION',
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: false,
            width: 450,
            colspan :2
        });

        me.txt_telefono = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Telefono',
            name: 'TELEFONO',
            selectOnFocus: false,
            width: 220
        });
        me.txt_email = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'Correo Electronico',
            name: 'EMAIL',
            selectOnFocus: false,
            width: 220
        });
        me.txt_nit = Ext.create("App.Utils.Componente.TextFieldBase", {
            fieldLabel: 'NIT',
            name: 'NIT',
            selectOnFocus: false,
            width: 220
        });
        me.txt_descripcion= Ext.create("App.Utils.Componente.TextAreaBase", {
            fieldLabel: 'Descripcion',
            name: 'DESCRIPCION',
            height:100,
            width :450,
            colspan :2
            
        });

        me.store_ciudad = Ext.create('App.Listas.Store.StoreDinamico');
        me.store_ciudad.setExtraParam('condicion', 'CIUDAD');
        me.cbx_ciudad = Ext.create("App.Utils.Componente.ComboBase", {
            store: me.store_ciudad,
            fieldLabel: 'Ciudad',
            name: 'CIUDAD',
            width: 220,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            selectOnFocus: true,
           // forceSelection: true,
      //      margin: '10'
        });
        //////////////////////////////
        this.items = [
            this.txt_id,
            me.txt_nombre,
            me.txt_apellido,
            me.txt_direccion,
            me.txt_nit,
            me.txt_email,
            me.txt_telefono,
            me.cbx_ciudad,
            me.txt_descripcion
            ];
        this.buttons = [this.bto_guardar,this.bto_limpiar];
        this.callParent(arguments);

    } ,
    getBotonGuardar : function (){return this.bto_guardar;},
    getBotonLimpiar : function (){return this.bto_limpiar;},
    Limpiar : function(win){
        var me = this;
        me.getForm().reset();
        win.hide();
       
    },
    Bloquear: function () {
        var me = this;
        BloquearForm(me);
        this.bto_guardar.hide();
        this.bto_limpiar.hide()
    },
    Desbloquear: function () {
        var me = this;
        DesbloquearForm(me);
        this.bto_guardar.show();
        this.bto_limpiar.show()
       
    },
});
