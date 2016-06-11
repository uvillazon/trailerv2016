﻿/**
 * @class App.View.Principal.Cabecera
 * @extends Ext.Component
 * requires 
 * @autor Ubaldo Villazon
 * @date 23/07/2013
 *
 * Description
 *
 *
 **/

Ext.define("App.View.Principal.Cabecera", {
    extend: "Ext.panel.Panel",
    height: 60,
    region: 'north',
    layout: 'border',
    tabPanel: null,
    initComponent: function () {
        var me = this;
        me.flash = Ext.create('Ext.flash.Component', {
            url: 'Content/banner/banner.swf',
            region: 'west',
            height: 60,
            width: 400,
        });
        me.cabecera_top = Ext.create('Ext.Component', {
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<h1> Sistema de Manteminiento</h1>',
            height: 30,
            //width : 500,
        });
        me.tb = Ext.create('Ext.toolbar.Toolbar', {
            padding: 0,
            margin: 0,
            cls: 'ux-start-menu-toolbar',
        });

        me.panel_menubar = new Ext.Panel({
            region: 'south',
            //width: 500,
            border: true,
            margins: '0 0 1 0',
            split: false,
            tbar: me.tb
        });
        me.panel_bar = Ext.create('Ext.panel.Panel', {
            height: 60,
            region: 'center',
            layout: 'border',
            items: [me.cabecera_top, me.panel_menubar]
        });
        me.items = [me.flash, me.panel_bar];


        Ext.Ajax.request({
            //url: "MenuJs.js",
            url: "MenuOpciones/ObtenerMenuOpciones",
            method: 'POST',
            //url:'http://localhost:89/demo/extjs/crysfel-Bleextop-7fdca2b/index.php/desktop/config',
            scope: this,
            success: this.buildDesktop,
            failure: this.onError
        });
        //me.CargarBandejaEntrada();
        me.callParent();
    },
    onError: function (data) {

        Ext.Msg.alert("Error!", "Error al Recuperar los Datos de las Opciones del Menu.");
    },
    buildDesktop: function (data) {
        var me = this;
        var data1 = Ext.decode(data.responseText);
        me.configuracion = data1;
        me.CrearMenu(me.tb, data1);
    },
    CrearMenu: function (tb, data) {
        var me = this;
        //alert(me.tabPanel.getId());
        Ext.each(data, function (menu) {
            if (menu.menus) {
                var subMenu = Ext.create('Ext.menu.Menu');
                //alert(menu.text);
                tb.add({
                    text: menu.text,
                    iconCls: menu.iconCls,
                    menu: subMenu,
                    tooltip: menu.tooltip,
                    datos: menu,
                    scope: me,
                    handler: me.CargarClase
                });

                me.CrearMenu(subMenu, menu.menus);
            }
            else {
                tb.add({
                    text: menu.text,
                    iconCls: menu.iconCls,
                    menu: subMenu,
                    tooltip: menu.tooltip,
                    datos: menu,
                    scope: me,
                    handler: me.CargarClase
                });
            }
        });
    },
    CargarClase: function (menu) {
        var me = this;
        //alert(menu.datos.class);
        if (menu.datos.clase) {
            var open = !Ext.getCmp(menu.text);
            if (open) {
               
                var principal = Ext.create(menu.datos.clase);
                var tab = new Ext.Panel({
                    id: menu.text,
                    autoHeigth: true,
                    autoWidht: true,
                    title: menu.text,
                    autoScroll: true,
                    iconCls: menu.iconCls,
                    tooltip: menu.tooltip,
                    viewConfig: {
                        forceFit: true,
                    },
                    items: principal,
                    closable: true,

                });
                me.tabPanel.add(tab);
                tab.show();
            }
            else {
                me.tabPanel.setActiveTab(menu.text);
            }
        }
    },
    CargarBandejaEntrada: function () {
        var me = this;
        var principal = Ext.create("App.View.BandejasEntrada.Principal");
        var tab = new Ext.Panel({
            id: "BandejaPrincipal",
            autoHeigth: true,
            autoWidht: true,
            title: "Bandeja de Entrada",
            autoScroll: true,
            iconCls: "email",
            tooltip: "Bandeja de Entrada por Usuario",
            viewConfig: {
                forceFit: true,
            },
            items: principal,
            closable: true,

        });
        me.tabPanel.add(tab);
        tab.show();
    }
});
