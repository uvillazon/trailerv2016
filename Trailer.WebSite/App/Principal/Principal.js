Ext.define("App.Principal.Principal", {
    extend: "Ext.Viewport",
    alias: "widget.PanelPrincipal",
    requires: [
        "App.Config.Constantes",
        "App.Config.Funciones"
    ],
    title: 'Principal',
    layout: 'border',
    frame: false,
    defaults: {
        split: true
    },
    initComponent: function() {
        var me = this;
        //creamos un componente
        Funciones.cargarValidaciones();
        me.store_tree = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true
            },
            proxy: {
                type: 'ajax',
                url: 'JsonInventario.js'
            },
            sorters: [{
                property: 'leaf',
                direction: 'ASC'
            }, {
                property: 'text',
                direction: 'ASC'
            }]
        });
        me.treePanel = Ext.create('Ext.tree.Panel', {
            region: 'west',
            collapsible: true,
            split: true,
            title: 'Administracion',
            width: 250,
            rootVisible: false,
            autoScroll: true,
            store: me.store_tree,
        });
        me.treePanel.on('itemclick', me.CargarArbol, this);
        me.bbar_pie = new Ext.Toolbar({
            iconCls: 'an-icon',
            statusAlign: 'right',
            items: [
                {
                    iconCls: 'calendar',
                    text: Ext.Date.format(new Date(), 'd/n/Y'),
                }, '-', {
                    id: 'clock',
                    //                iconCls         : 'time',
                    text: Ext.Date.format(new Date(), 'g:i:s A')
                },
                {
                    xtype: 'label',
                    width: 800,
                    autoHeight: true,
                    html: Constantes.PIEPAGINA,
                    border: false

                }
            ]

        });
        me.panel_centro = new Ext.TabPanel({
            activeItem: 0,
            region: 'center',
            margins: '1 0 0 0',
            autoHeigth: true,
            enableTabScroll: true,
            plain: true,
            defaults: {autoScroll: true, layout: 'fit'},
            items: [{
                    title: 'SisMan',
                    iconCls: 'application_home',
                    //items : panelprincipalrec
                }]

        });
//        me.panel_cabecera = Ext.create("App.View.Principal.Cabecera", {tabPanel: me.panel_centro});
        me.panel_pie = new Ext.Panel({
            region: 'south',
            border: true,
            margins: '0 0 1 0',
            split: false,
            //height: 30,
            bbar: me.bbar_pie

        });
        me.items = [
            {
                xtype: 'box',
                id: 'header',
                region: 'north',
                html: '<h1> Modo Administrador </h1>',
                height: 30
            }, me.treePanel,
            , me.panel_centro, me.panel_pie];
        me.InicializarRunner();
        this.callParent();
    },
    CargarArbol: function(view, rec, item, index, e) {
        var me = this;
//        alert(rec.get('text'));
        if (rec.get('iconCls') == "application_side_expand") {
            me.mostrarTab(rec.get('url'), rec.get('text'), rec);
        }
//        if(rec.get('iconCls')==""){
//                    mostrarTab(rec.get('url'), rec.get('text'), rec);
//                }
    },
    InicializarRunner: function() {
        var me = this;
        me.runner = new Ext.util.TaskRunner();
        me.task = me.runner.newTask({
            run: Funciones.ActualizarReloj,
            interval: 1000
        });

        me.task.start();
    },
    mostrarTab: function(nombre, titulo, n) {
        var me = this;
        if(titulo==null)
            titulo=nombre;
     
        
        var open = !Ext.getCmp(titulo);
       
        if(open){//Con esto funciona en Explorer y en Firefox
        //if(!tab || (Ext.isIE && open)){
        //if(open){
           if(Ext.util.Format.substr(n.get('cls'),0,3) == 'App')
            {
             var ban = '';
                var principal = Ext.create(n.get('cls'),{view : ban});
                    tab = new Ext.Panel({
                        contentEl:nombre,
                        id:titulo,
                        autoHeigth:true,
                        autoWidht:true,
                        title: titulo,
                        autoScroll:true,
                        iconCls: n.get('iconCls'),
                        viewConfig: {
                        forceFit: true
                        },
                        items : principal,
                        //                autoLoad:'page.html'
                        //                autoLoad:{url:+n.get('id'),scripts:true, params: 'foo=bar&wtf=1'},
                        closable:true,
            //                    html : '<iframe name="'+n.get('id')+'frame" src="'+n.get('id')+'" frameborder="0" width=100% height="100%" scrolling="yes"></iframe>'
                
                    });
            }
            else{
                    tab = new Ext.Panel({
                        contentEl:nombre,
                        id:titulo,
                        autoHeigth:true,
                        autoWidht:true,
                        title: titulo,
                        autoScroll:true,
                        iconCls: n.get('iconCls'),
                        //iconCls: n.get('id'),
                        viewConfig: {
                            forceFit: true
                        },
                        //autoLoad:{url:nombre,scripts:true, params: 'foo=bar&wtf=1'},
                        closable:true,
                        html : '<iframe name="'+n.get('id')+'frame" src="'+n.get('id')+'" frameborder="0" width=100% height="100%" scrolling="yes"></iframe>'

                    });
            }
            
            me.panel_centro.add(tab);
            
            tab.show();
            // tab.doLayout();
            return;
        }

        tab = me.panel_centro.setActiveTab(titulo);
        tab.show();
        return;
    }
});














