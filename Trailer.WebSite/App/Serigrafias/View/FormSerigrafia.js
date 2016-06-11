Ext.define("App.Serigrafias.View.FormSerigrafia", {
    extend: "App.Config.Abstract.Form",
    title: "Registro de Orden de Serigrafiado",
    initComponent: function () {
        var me = this;
        
        me.CargarStore();
        me.CargarComponentes();
        me.AgregarEventos();
        this.callParent(arguments);

    },
    CargarStore : function(){
        var me= this;
        me.store_proveedor = Ext.create("App.Proveedores.Store.Proveedores");
        me.store_proveedor.setExtraParam("codigo","SERIGRAFIA");
        me.store_proveedor.setExtraParam("condicion","SERIGRAFIA");

//        me.store_empresa = Ext.create("App.Empresas.Store.Empresas");

//        me.store_banco = Ext.create("App.Listas.Store.StoreDinamico");
//        me.store_banco.proxy.extraParams["condicion"] = "BANCO";

        me.store_recibido_por = Ext.create("App.Empleados.Store.Empleados");

        
//        me.store_orden.proxy.extraParams['codigo'] = 'CODIGO';
    },
    CargarComponentes : function(){
        var me= this;
         me.cbx_proveedor = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Buscar Proveedor',
            displayField: 'NOMBRE',
            valueField: 'NOMBRE',
            name : 'PROVEEDOR',
            store: me.store_proveedor,
            textoTpl: function () {
                return '<h3>{NOMBRE}  Dir: {DIRECCION}</h3>';
            },
        });
        me.txt_id_proveedor = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_PROVEEDOR",
            hidden: true,
        });

         me.txt_id_serigrafia = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SERIGRAFIA",
            hidden: true,
        });

       
        me.num_nota = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Nota",
            name: "NRO_NOTA",
            allowNegative: false,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase",{
            fieldLabel: 'Fecha',
            name: 'FECHA_RECEPCION',
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
//            opcion :'sinfecha',
        });
        me.cbx_responsable = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Responsable",
            displayField: 'NOMBRE',
            name: "RESPONSABLE",
            store : me.store_recibido_por,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            colspan:2,
         });
         
        me.txt_observaciones= Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: 'Observaciones',
            name: 'OBSERVACION',
            colspan: 2,
            height:70,
            width :480,
            labelAlign: 'top',
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
        });
        

        me.dat_fechaEntrega = Ext.create("App.Config.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Entrega',
            name: 'FECHA_ENTREGA',
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            sinMaxFecha : true,
//            opcion :'sinfecha',
        });
        
        //Definimos datefield para la fecha de baja del documento 
        me.grid = Ext.create("App.Serigrafias.View.Grids",{colspan :2  , opcion : 'GridDetalleEditar' , height : 250});
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_addDetalleOT', 'Agregar Por Detalle OT', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_elimiarDetalleOT', 'Eliminar Detalle', Constantes.ICONO_BAJA, me.EliminarItem, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        me.grid.on('edit', me.CargarValoresGrid, this);
        me.items = [
             me.txt_id_serigrafia,
             me.txt_id_proveedor,
             me.cbx_proveedor,
             me.dat_fecha,
             me.num_nota,
             me.dat_fechaEntrega,
             me.cbx_responsable,
             me.txt_observaciones,
             me.grid
        ];
        
      
    },
    CargarValoresGrid : function(editor, e){
        var me = this;
        if (e.field == "CANTIDAD") {
                e.record.set('TOTAL',e.value * e.record.get('PRECIO_UNITARIO'));
//                me.CargarTotalesImporte();
        }
        else if (e.field == "PRECIO_UNITARIO") {
                e.record.set('TOTAL',e.value * e.record.get('CANTIDAD'));
//                me.CargarTotalesImporte();
        }
    },
    EventosBoton : function (btn){
        var me = this;
        
        if(btn.getItemId() == 'btn_addDetalleOT'){
                if(me.winDetalleOT == null){
                    me.winDetalleOT = Ext.create("App.Config.Abstract.Window");
                    me.gridDetalleOT = Ext.create("App.OrdenesProduccion.View.Grids",{opcion : 'GridDetallesOrdenProduccion' , width : 450,height : 400 });
                    me.winDetalleOT.add(me.gridDetalleOT);
                    me.gridDetalleOT.on('celldblclick',me.AgregarItemGridDetalle,this);
                    me.winDetalleOT.show();
                    
                }
                else{
//                    me.gridDetalleOT.getStore().setExtraParams({CODIGO : me.cbx_cliente.getValue() != null ?'FACTURACLIENTE' : 'FACTURAEMPRESA' , condicion :me.cbx_cliente.getValue() != null ?me.txt_id_cliente.getValue() : me.txt_id_empresa.getValue() });
                    me.gridDetalleOT.getStore().load();
                    me.winDetalleOT.show();
                }
            
        
        }
//        GridDetallesOrdenProduccion
        else{
            alert("No Existe una accion para ese botton")
        }
    },
   
    AgregarEventos : function(){
        var me = this;
        me.cbx_proveedor.on('select', function (cmb, record, index) {
            
            me.txt_id_proveedor.setValue(record[0].get('ID_PROVEEDOR'));
        });
        
        
    },
    
    EliminarItem : function(){
        var me = this;
         var data = me.grid.getSelectionModel().getSelection()[0];
        if (data != null) {
                me.grid.getStore().remove(data);
//                me.grid.getView().refresh();
                me.CargarTotalesImporte();
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro para Eliminar');
        }
        
    },
    ParametrosGrid : function(){
        var me = this;
        var modified = me.grid.getStore().getModifiedRecords(); //step 1
        if (!Ext.isEmpty(modified)) {
            var recordsToSend = [];
            Ext.each(modified, function (record) { //step 2
                recordsToSend.push(Ext.apply( record.data));
                   
            });
            recordsToSend = Ext.JSON.encode(recordsToSend);
            return recordsToSend;
        }
        else{
            alert('no hy restro')
            return null;
        }
    },
    AgregarItemGridDetalle : function(grd,td,cell,record){
        var me = this;
         if (me.grid.getStore().existeRecord('ID_DETALLE_ORDEN', record.get('ID_DETALLE_ORDEN'))) {
            Ext.MessageBox.alert('Error', "Ya Selecciono ese Detalle de OP");
        }
        else {
            var rec = Ext.create("App.Serigrafias.Store.DetallesSerigrafia",{
                ID_DETALLE  : 0 ,
                ID_DETALLE_ORDEN : record.get('ID_DETALLE_ORDEN'),
                ID_ORDEN_PRODUCCION  : record.get('ID_ORDEN_PRODUCCION'),
                ID_SERIGRAFIA : 0,
                DETALLE : record.get('ARTICULO'),
                NRO_OP: record.get('NRO_OP'),
                CANTIDAD  : 1,
                PRECIO_UNITARIO :  1,
                TOTAL : 1,
                OBSERVACION : 'sin Observacion'
            });
            me.grid.getStore().insert(0, rec);
            me.grid.getView().refresh();
        }
//        me.CargarTotalesImporte();
    }
    
});
