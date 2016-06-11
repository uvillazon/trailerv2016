Ext.define("App.OrdenBordado.View.FormOrdenBordado", {
    extend: "App.Config.Abstract.Form",
    title: "Registro de Orden de Bordado",
    initComponent: function () {
        var me = this;
        
        me.CargarStore();
        me.CargarComponentes();
        me.AgregarEventos();
        this.callParent(arguments);

    },
    CargarStore : function(){
        var me= this;
        me.store_bordado = Ext.create("App.Bordados.Store.Bordados");
//        me.store_proveedor.setExtraParam("codigo","SERIGRAFIA");
//        me.store_proveedor.setExtraParam("condicion","SERIGRAFIA");

//        me.store_empresa = Ext.create("App.Empresas.Store.Empresas");

//        me.store_banco = Ext.create("App.Listas.Store.StoreDinamico");
//        me.store_banco.proxy.extraParams["condicion"] = "BANCO";

//        me.store_recibido_por = Ext.create("App.Empleados.Store.Empleados");

        
//        me.store_orden.proxy.extraParams['codigo'] = 'CODIGO';
    },
    CargarComponentes : function(){
        var me= this;
//         me.cbx_bordado = Ext.create("App.Config.Componente.ComboAutoBase", {
//            fieldLabel: 'Buscar Bordado',
//            displayField: 'KARDEX',
//            valueField: 'KARDEX',
//            name : 'KARDEX',
//            store: me.store_bordado,
//            width : 480,
//            colspan: 2,
//            textoTpl: function () {
//                return '<h3>{KARDEX}  Desc: {EMPRESA} - {DESCRIPCION}</h3>';
//            },
//        });
        
        me.cbx_bordado = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Buscar Bordado',
            displayField: 'KARDEX',
            valueField: 'KARDEX',
            name: 'KARDEX',
            colspan: 2,
            width : 480,
            store: me.store_bordado,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '{ID_IMAGEN1}<h3>{COD_UC} - {DESCRIPCION}</h3>';
            },
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
        

       
        //Definimos datefield para la fecha de baja del documento 
        me.grid = Ext.create("App.OrdenBordado.View.Grids",{colspan :2  , opcion : 'GridDetalle' , height : 250});
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_addDetalleOT', 'Agregar Por Detalle OT', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_elimiarDetalleOT', 'Eliminar Detalle', Constantes.ICONO_BAJA, me.EliminarItem, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        me.grid.on('edit', me.CargarValoresGrid, this);
        me.items = [
           
             me.cbx_bordado,
             me.txt_observaciones,
             me.grid
        ];
        
      
    },
   
    EventosBoton : function (btn){
        var me = this;
        
        if(btn.getItemId() == 'btn_addDetalleOT'){
                if(me.cbx_bordado.getValue() == null){
                    Ext.Msg.alert("Aviso","Seleccione un Bordado");
                }
                else{
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
            
        
        }
//        GridDetallesOrdenProduccion
        else{
            alert("No Existe una accion para ese botton")
        }
    },
   
    AgregarEventos : function(){
        var me = this;
//        me.cbx_bordado.on('select', function (cmb, record, index) {
//            
//            me.txt_id_proveedor.setValue(record[0].get('ID_PROVEEDOR'));
//        });
        
        
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
        var reb = me.cbx_bordado.datos; 
        if (me.grid.getStore().existeRecord('ID_DETALLE_ORDEN', record.get('ID_DETALLE_ORDEN'))) {
            
            Ext.MessageBox.alert('Error', "Ya Selecciono ese Detalle de OP con el mismo Bordado");
        }
        else {
          
//            alert(me.cbx_bordado.getValue());
            var rec = Ext.create("App.OrdenBordado.Model.DetallesOrdenBordado",{
                ID_DETALLE  : 0 ,
                ID_DETALLE_ORDEN : record.get('ID_DETALLE_ORDEN'),
                ID_ORDEN_PRODUCCION  : record.get('ID_ORDEN_PRODUCCION'),
                ID_BORDADO : reb.get('ID_BORDADO'),
                DETALLE : record.get('ARTICULO'),
                NRO_OP: record.get('NRO_OP'),
                KARDEX : reb.get('KARDEX'),
                OBSERVACION : me.txt_observaciones.getValue() == "" ? 'Sin Observaciones' :  me.txt_observaciones.getValue()
            });
            me.grid.getStore().insert(0, rec);
            me.grid.getView().refresh();
        }
//        me.CargarTotalesImporte();
    }
    
});
