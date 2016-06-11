Ext.define("App.Facturas.View.FormFactura", {
    extend: "App.Config.Abstract.Form",
    title: "Registro de Facturas",
    initComponent: function () {
        var me = this;
        
        me.CargarStore();
        me.CargarComponentes();
        me.AgregarEventos();
        this.callParent(arguments);

    },
    CargarStore : function(){
        var me= this;
        me.store_cliente = Ext.create("App.Clientes.Store.Clientes");
        me.store_empresa = Ext.create("App.Empresas.Store.Empresas");

        me.store_banco = Ext.create("App.Listas.Store.StoreDinamico");
        me.store_banco.proxy.extraParams["condicion"] = "BANCO";

        me.store_recibido_por = Ext.create("App.Empleados.Store.Empleados");

        
//        me.store_orden.proxy.extraParams['codigo'] = 'CODIGO';
    },
    CargarComponentes : function(){
        var me= this;
         me.cbx_empresa = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Buscar Empresa',
            displayField: 'NOMBRE',
            valueField: 'NOMBRE',
            name : 'EMPRESA',
            store: me.store_empresa,
            textoTpl: function () {
                return '<h3>{NOMBRE}  Desc: {RESPONSABLE}</h3>';
            },
        });
        me.cbx_cliente = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Buscar Cliente',
            name : 'CLIENTE',
            store: me.store_cliente,
            displayField: 'NOMBRE',
            valueField: 'NOMBRE',
            textoTpl: function () {
                return '<h3>{NOMBRE} {APELLIDO} - Telf : {TELEFONO}</h3>';
            },
        });
        me.txt_id_cliente = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_CLIENTE",
            hidden: true,
        });

         me.txt_id_empresa = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_EMPRESA",
            hidden: true,
        });

        me.txt_razon_social = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Razon Social',
            name: 'RAZON_SOCIAL',
            width: 480,
            colspan :2,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            //margin: '10'
        });
        me.txt_nit = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Nit',
            name: 'NIT',
            width: 480,
            colspan :2,
            //margin: '10'
        });
        me.num_factura = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Factura",
            name: "NRO_FACTURA",
            allowNegative: false,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Emision',
            name: 'FECHA',
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
//            opcion :'sinfecha',
        });
        me.cbx_responsable = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Responsable Emision",
            displayField: 'NOMBRE',
            name: "EMITIDO_POR",
            store : me.store_recibido_por,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
         });
         me.num_monto = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Facturado",
            name: "MONTO",
            maxLength: 11,
            decimalSeparator: ".",
            decimalPrecision: 2,
            allowNegative: false,
            allowDecimals: true,
            readOnly : true,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
        });
        me.txt_observaciones= Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: 'Por Concepto de ',
            name: 'OBSERVACION',
            colspan: 2,
            height:70,
            width :480,
            labelAlign: 'top',
            allowBlank: false,
            afterLabelTextTpl: c_requerido,
        });
        me.num_tiempoAproximado = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Tiempo Aprox. Cancelacion",
            name: "TIEMPO_APROX",
            allowNegative: false,
        });

        me.dat_fechaAproximado = Ext.create("App.Config.Componente.DateFieldBase",{
            fieldLabel: 'Fecha Aprox. Pago',
            name: 'FECHA_APROX',
            width: 240,
            afterLabelTextTpl: c_requerido,
            allowBlank: false,
            sinMaxFecha : true,
//            opcion :'sinfecha',
        });
        
        //Definimos datefield para la fecha de baja del documento 
        me.grid = Ext.create("App.Facturas.View.Grids",{colspan :2  , opcion : 'GridDetalleEditar' , height : 250});
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_addOT', 'Agregar Por OT', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_addDetalleOT', 'Agregar Por Detalle OT', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_elimiarDetalleOT', 'Eliminar Detalle', Constantes.ICONO_BAJA, me.EliminarItem, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        me.grid.on('edit', me.CargarValoresGrid, this);
        me.items = [
             me.txt_id_cliente,
             me.txt_id_empresa,
             me.cbx_empresa,
             me.cbx_cliente,
             me.txt_razon_social,
             me.txt_nit,
             me.num_factura,
             me.dat_fecha,
             me.cbx_responsable,
             me.num_monto,
             me.num_tiempoAproximado,
             me.dat_fechaAproximado,
             me.txt_observaciones,
             me.grid
        ];
        
      
    },
    CargarValoresGrid : function(editor, e){
        var me = this;
        if (e.field == "CANTIDAD") {
                e.record.set('TOTAL',e.value * e.record.get('COSTO'));
                me.CargarTotalesImporte();
        }
        else if (e.field == "COSTO") {
                e.record.set('TOTAL',e.value * e.record.get('CANTIDAD'));
                me.CargarTotalesImporte();
        }
    },
    EventosBoton : function (btn){
        var me = this;
        if(btn.getItemId() == 'btn_addOT'){
            if(me.cbx_cliente.getValue() != null ||me.cbx_empresa.getValue() != null){ 
                if(me.winOT == null){
                    me.winOT = Ext.create("App.Config.Abstract.Window");
                    me.gridOT = Ext.create("App.OrdenesProduccion.View.Grids",{opcion : 'GridOrdenProduccion' , width : 450,height : 400 , paramsStore : {CODIGO : me.cbx_cliente.getValue() != null ?'FACTURACLIENTE' : 'FACTURAEMPRESA' , condicion :me.cbx_cliente.getValue() != null ?me.txt_id_cliente.getValue() : me.txt_id_empresa.getValue() }});
                    me.gridOT.on('celldblclick',me.AgregarItemGrid,this);
                    me.winOT.add(me.gridOT);
                    me.winOT.show();
                    
                }
                else{
                    me.gridOT.getStore().setExtraParams( {CODIGO : me.cbx_cliente.getValue() != null ?'FACTURACLIENTE' : 'FACTURAEMPRESA' , condicion :me.cbx_cliente.getValue() != null ?me.txt_id_cliente.getValue() : me.txt_id_empresa.getValue() });
                    me.gridOT.getStore().load();
                    me.winOT.show();
                }
            }
            else{
                 Ext.MessageBox.alert('Error', 'Seleccione Un Cliente o Empresa');
            }
        }
        else if(btn.getItemId() == 'btn_addDetalleOT'){
            if(me.cbx_cliente.getValue() != null ||me.cbx_empresa.getValue() != null){ 
                if(me.winDetalleOT == null){
                    me.winDetalleOT = Ext.create("App.Config.Abstract.Window");
                    me.gridDetalleOT = Ext.create("App.OrdenesProduccion.View.Grids",{opcion : 'GridDetallesOrdenProduccion' , width : 450,height : 400 , paramsStore : {CODIGO : me.cbx_cliente.getValue() != null ?'FACTURACLIENTE' : 'FACTURAEMPRESA' , condicion :me.cbx_cliente.getValue() != null ?me.txt_id_cliente.getValue() : me.txt_id_empresa.getValue() }});
                    me.winDetalleOT.add(me.gridDetalleOT);
                    me.gridDetalleOT.on('celldblclick',me.AgregarItemGridDetalle,this);
                    me.winDetalleOT.show();
                    
                }
                else{
                    me.gridDetalleOT.getStore().setExtraParams({CODIGO : me.cbx_cliente.getValue() != null ?'FACTURACLIENTE' : 'FACTURAEMPRESA' , condicion :me.cbx_cliente.getValue() != null ?me.txt_id_cliente.getValue() : me.txt_id_empresa.getValue() });
                    me.gridDetalleOT.getStore().load();
                    me.winDetalleOT.show();
                }
            }
            else{
                 Ext.MessageBox.alert('Error', 'Seleccione Un Cliente o Empresa');
            }
        
        }
//        GridDetallesOrdenProduccion
        else{
            alert("No Existe una accion para ese botton")
        }
    },
    CargarTotalesImporte : function(){
        var me = this;
        var total = 0;
        me.num_monto.reset();
        me.grid.getStore().each(function (record) {
            total += record.get('TOTAL');
        });
//        alert(total);
        me.num_monto.setValue(total);
//        me.grid.setTitle('Detalles De OP Pendientes de Saldo , Total Deuda Pendiente ='+total);
    },
    AgregarEventos : function(){
        var me = this;
        me.cbx_cliente.on('select', function (cmb, record, index) {
            
            me.txt_id_cliente.setValue(record[0].get('ID_CLIENTE'));
            me.txt_id_empresa.setValue('');
            me.cbx_empresa.clearValue();
            me.txt_razon_social.setValue(record[0].get('RAZON_SOCIAL'));
            me.txt_nit.setValue(record[0].get('NIT'));
            me.grid.getStore().removeAll();
            me.num_monto.reset();
//            me.grid.getStore().setExtraParam('Codigo','RECIBO');
//            me.grid.getStore().setExtraParam('condicion',record[0].get('NOMBRE'));
//            me.grid.getStore().load();
        });
         me.cbx_empresa.on('select', function (cmb, record, index) {
            me.txt_id_empresa.setValue(record[0].get('ID_EMPRESA'));
            me.txt_id_cliente.setValue('');
            me.cbx_cliente.clearValue();
            me.txt_razon_social.setValue(record[0].get('RAZON_SOCIAL'));
            me.txt_nit.setValue(record[0].get('NIT'));
            me.grid.getStore().removeAll();
            me.num_monto.reset();
//            me.grid.getStore().setExtraParam('Codigo','RECIBO');
//            me.grid.getStore().setExtraParam('condicion',record[0].get('NOMBRE'));
//            me.grid.getStore().load();
        });
//         me.grid.store.on('load', me.CargarTotalesImporte, this);

         me.num_monto.on('specialkey',me.CargarImportes,this);
         me.num_tiempoAproximado.on('change',function(num, newValue,oldValue, eOpts){
//            me.new Date().add(Date.DAY, -1);
//            alert("asdas");
            var dt = me.dat_fecha.getValue()  == null? new Date() :  me.dat_fecha.getValue();
            dt = Ext.Date.add(dt , Ext.Date.DAY, newValue);
            me.dat_fechaAproximado.setValue(dt);

//            .setValue('');
//              me.dat_fecha.setValue(new Date());
         });
//         me.grid.btn_eliminar.on('click',me.EliminarItem,this);
      

        
    },
    CargarImportes : function(field, e){
        var me = this;
        if (e.getKey() == e.ENTER) {
         
            var total = field.getValue();
            me.grid.getStore().each(function(record){
                 record.set('A_CUENTA',0);
                 record.set('SALDO',0);
            });
            me.grid.getStore().each(function(record){
                if(total > 0){
                    if(record.get('TOTAL_POR_COBRAR') <= total){
                        record.set('A_CUENTA',record.get('TOTAL_POR_COBRAR'));
                        record.set('SALDO',0);
                        
                    }
                    else{
//                        record.set('IMPORTE_TOTAL',total);
                        record.set('A_CUENTA',total);
                        record.set('SALDO',record.get('TOTAL_POR_COBRAR') - total);

                    }
                    total = total - record.get('TOTAL_POR_COBRAR') ;
                 }
//               record.get('TOTAL_ADEUDADO').set(field.getValue());
//               record.save();                
//                totalCantidad+=record.get('TOTAL_CANCELADO');
            });
        }
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
    AgregarItemGrid : function(grd,td,cell,record){
        var me = this;
         if (me.grid.getStore().existeRecord('ID_ORDEN_PRODUCCION', record.get('ID_ORDEN_PRODUCCION'))) {
            Ext.MessageBox.alert('Error', "Ya Selecciono esa OP");
        }
        else {
            var rec = Ext.create("App.Facturas.Store.DetallesFactura",{
                ID_DETALLE  : 0 ,
                ID_DETALLE_ORDEN : 0,
                ID_ORDEN_PRODUCCION  : record.get('ID_ORDEN_PRODUCCION'),
                ID_FACTURA : 0,
                DETALLE : "Nro Orden : "+record.get('NRO_ORDEN'),
                NRO_OP: record.get('NRO_ORDEN'),
                CANTIDAD  : 1,
                COSTO :  record.get('SALDO_FACTURADO'),
                TOTAL : record.get('SALDO_FACTURADO')
            });
            me.grid.getStore().insert(0, rec);
            me.grid.getView().refresh();
        }
        me.CargarTotalesImporte();
    },
    AgregarItemGridDetalle : function(grd,td,cell,record){
        var me = this;
         if (me.grid.getStore().existeRecord('ID_DETALLE_ORDEN', record.get('ID_DETALLE_ORDEN'))) {
            Ext.MessageBox.alert('Error', "Ya Selecciono ese Detalle de OP");
        }
        else {
            var rec = Ext.create("App.Facturas.Store.DetallesFactura",{
                ID_DETALLE  : 0 ,
                ID_DETALLE_ORDEN : record.get('ID_DETALLE_ORDEN'),
                ID_ORDEN_PRODUCCION  : record.get('ID_ORDEN_PRODUCCION'),
                ID_FACTURA : 0,
                DETALLE : record.get('ARTICULO'),
                NRO_OP: record.get('NRO_OP'),
                CANTIDAD  : record.get('CANTIDAD'),
                COSTO :  record.get('COSTO'),
                TOTAL : record.get('TOTAL')
            });
            me.grid.getStore().insert(0, rec);
            me.grid.getView().refresh();
        }
        me.CargarTotalesImporte();
    }
    
});
