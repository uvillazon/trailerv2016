//objeto formulario
Ext.define("App.OrdenesProduccion.View.FormDetalle", {
    extend: "Ext.form.Panel",
    alias: "widget.formpanelDetalle",
    id: 'multiColumnFormDetalle',
    collapsible: false,
    frame: false,

    title: 'Detalle',
    bodyPadding: '5 5 5 5',
    grid: '',
    fieldDefaults: {
        labelAlign: 'top',
        msgTarget: 'side'
    },

    initComponent: function () {
        
        var storeEstado = Ext.create('Ext.data.Store', {
            fields: ['id', 'estado'],
            data: [
            {
                "id": "completado",
                "estado": "COMPLETADO"
            },

            {
                "id": "pendiente",
                "estado": "PENDIENTE"
            },

            {
                "id": "anulado",
                "estado": "ANULADO"
            }
            ]
        });


        var comboProducto = new Ext.form.ComboBox({

            id: 'comboProducto',
            fieldLabel: 'Producto',
            name: 'data[Producto][idproducto]',
            valueField: 'idproducto',
            displayField: 'nombre',
            typeAhead: true,
            transform: 'stateSelect',
            //hideTrigger:true,
            width: 250,
            //store: storeProductos,
            emptyText: 'SELECCIONE PRODUCTO....',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: false

        });
        this.items = [{
            xtype: 'fieldset',
            id: 'fieldInsertarTallas',
            checkboxToggle: true,
            collapsed: false,
            title: 'Insertar Tallas',
            defaultType: 'textfield',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            }, listeners: {
                'beforecollapse': function () {
                    Ext.getCmp('modoGuardar').setValue(false);
                    // console.log( Ext.getCmp('modoGuardar').getValue());
                },
                'beforeexpand': function () {
                    Ext.getCmp('modoGuardar').setValue(true);
                    // console.log( Ext.getCmp('modoGuardar').getValue());
                }
            },
            items: [{//inicia fielset tallas numericas
                xtype: 'fieldset',
                title: 'Cantidad Tallas Numericas',
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 8,
                    tableAttrs: {
                        style: {
                            width: '100%'
                        }
                    }
                },
                defaults: {
                    frame: true,
                    width: 50,
                    bodyStyle: 'padding:20px'
                },
                defaultType: 'numberfield',
                items: [{
                    fieldLabel: '2',
                    id: 'tn2'
                }, {
                    fieldLabel: '4',
                    id: 'tn4'
                }, {
                    fieldLabel: '6',
                    id: 'tn6'
                }, {
                    fieldLabel: '8',
                    id: 'tn8'
                },
            {
                fieldLabel: '10',
                id: 'tn10'
            }, {
                fieldLabel: '12',
                id: 'tn12'
            }, {
                fieldLabel: '14',
                id: 'tn14'
            }, {
                fieldLabel: '36',
                id: 'tn36'
            }, {
                fieldLabel: '38',
                id: 'tn38'
            }, {
                fieldLabel: '40',
                id: 'tn40'
            }, {
                fieldLabel: '42',
                id: 'tn42'
            }, {
                fieldLabel: '44',
                id: 'tn44'
            }, {
                fieldLabel: '46',
                id: 'tn46'
            }, {
                fieldLabel: '48',
                id: 'tn48'
            }, {
                fieldLabel: '50',
                id: 'tn50'
            }, {
                fieldLabel: '52',
                id: 'tn52'
            }, {
                fieldLabel: '54',
                id: 'tn54'
            }
            ]
            }, //finaliza tallas numericas
         {//inicia tallas literales
         xtype: 'fieldset',
         title: 'Cantidad Tallas Literales',
         collapsible: true,
         layout: {
             type: 'table',
             columns: 8,
             tableAttrs: {
                 style: {
                     width: '100%'
                 }
             }
         },
         defaults: {
             frame: true,
             width: 50,
             bodyStyle: 'padding:20px'
         },
         defaultType: 'numberfield',
         items: [{
             fieldLabel: 'XS',
             id: 'tlxs'
         }, {
             fieldLabel: 'S',
             id: 'tls'
         }, {
             fieldLabel: 'M',
             id: 'tlm'
         }, {
             fieldLabel: 'L',
             id: 'tll'
         },
            {
                fieldLabel: 'XL',
                id: 'tlxl'
            }, {
                fieldLabel: 'XXL',
                id: 'tlxxl'
            }, {
                fieldLabel: 'XXXL',
                id: 'tlxxxl'
            }, {
                fieldLabel: 'ESPECIALES',
                id: 'tlespecial'
            }, {
                fieldLabel: 'UNICA',
                id: 'tlunica'
            },
            {
                xtype: 'hidden',
                id: 'tallas',
                name: 'data[Producto][tallas]'
            },
            {
                xtype: 'hidden',
                id: 'cantidades',
                name: 'data[Producto][cantidades]'
            },
            {
                xtype: 'hidden',
                id: 'detalle',
                name: 'data[Producto][detalle]'
            }, {
                xtype: 'hidden',
                id: 'ordenproduccion',
                name: 'data[Producto][ordenproduccion]'
            }, {
                xtype: 'hidden',
                id: 'modoGuardar',
                name: 'data[Producto][insertar]',
                value: true
            }
            ]
     }//finaliza tallas literales
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Detalle',
            collapsible: true,
            layout: {
                type: 'table',
                columns: 2,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            defaults: {
                frame: true,
                bodyStyle: 'padding:20px'
            },
            defaultType: 'textfield',
            items: [comboProducto, {
                xtype: 'combo',
                id: 'comboTela',
                name: 'data[Producto][idtela]',
               // store: storeTela,
                fieldLabel: 'Tela',
                valueField: 'idmateriaprima',
                displayField: 'nombre',
                typeAhead: true,
                transform: 'stateSelect',
                //hideTrigger:true,
                width: 250,
                emptyText: 'SELECCIONE TELA....',
                queryMode: 'local',
                forceSelection: true,
                allowBlank: false

            }, {
                xtype: 'textarea',
                id: 'detalleitem',
                name: 'data[Producto][detalleitem]',
                fieldLabel: 'Detalle Item',
                height: 80,
                width: 200
            }, {
                xtype: 'textarea',
                id: 'detallebordado',
                name: 'data[Producto][detallebordado]',
                fieldLabel: 'Detalle Bordado',
                height: 80,
                width: 200
            }, {
                xtype: 'textarea',
                id: 'detallecostura',
                name: 'data[Producto][detallecostura]',
                fieldLabel: 'Detalle Costura',
                height: 80,
                width: 200
            }, {
                xtype: 'combo',
                id: 'comboEstado',
                name: 'data[producto][estado]',
                store: storeEstado,
                fieldLabel: 'Estado',
                queryMode: 'local',
                emptyText: 'Seleccione Estado....',
                displayField: 'estado',
                valueField: 'id',
                allowBlank: false

            }
            ]
        }];
        

        comboProducto.on('select', function (cmb, record, index) {
            this.cambiarValor(record[0].data.nombre);
        }, this);


        this.callParent(arguments);
    },
    contraer: function () {
        //alert('contraer');
        Ext.getCmp('fieldInsertarTallas').collapse();
    },
    expandir: function () {
        Ext.getCmp('fieldInsertarTallas').expand();
    },
    cambiarValor: function (value) {
        Ext.getCmp('detalle').setValue(value);
    },
    mostrarDatos: function (idorden) {
        var gridStore = Ext.getCmp('multiColumnFormDetalle').grid.store;
        Ext.getCmp('multiColumnFormDetalle').getForm().reset();
        gridStore.clearFilter();
        gridStore.load();
        gridStore.on('load', function () {
            gridStore.filterBy(function (record, id) {
                return record.get('idordenproduccion') == idorden; //mayores a 30 años
            });
            gridStore.each(function (record) {                //imprimir en el “log”

                Ext.getCmp('comboProducto').setValue(record.get('idproducto'));
                Ext.getCmp('comboTela').setValue(record.get('idtela'));
                Ext.getCmp('comboEstado').setValue(record.get('estado'));
                Ext.getCmp('detalleitem').setValue(record.get('detalleitem'));
                Ext.getCmp('detallebordado').setValue(record.get('detallebordado'));
                Ext.getCmp('detallecostura').setValue(record.get('detallecostura'));
                Ext.getCmp('detalle').setValue(record.get('detalle'));
            }, this);
            Ext.getCmp('btnDetalleCancelar').setDisabled(false);
            Ext.getCmp('btnDetalleGuardar').setDisabled(false);
            //si mostramos los datos cambiamos el modo de  guardar a insertar0false-> para se modificque los datos y no se inserte
            Ext.getCmp('multiColumnFormDetalle').contraer();

        });



    },
    onCancelar: function () {
        var form = Ext.getCmp('multiColumnFormDetalle').getForm();
        // Ext.getCmp('multiColumnFormResumen').getForm().reset();
        var gridStore = Ext.getCmp('multiColumnFormDetalle').grid.store;
        gridStore.clearFilter();
        gridStore.filter("idordenproduccion", 0);
        form.reset();
        //form.expandir();
        Ext.getCmp('fieldInsertarTallas').expand();

    },

    onGuardar: function () {
        var form = Ext.getCmp('multiColumnFormDetalle').getForm();
        var gridStore = Ext.getCmp('multiColumnFormDetalle').grid.store;

        form.method = 'POST';
        if (form.isValid()) {
            Ext.getCmp('multiColumnFormDetalle').enviarTallas();
            form.submit(
            {
                waitTitle: 'Espere por favor',
                waitMsg: 'Enviando datos...',
                url: '../productos/guardar_detalle',
                success: function (form, action) {
                    gridStore.load();
                    gridStore.clearFilter();
                    gridStore.on('load', function () {
                        gridStore.filterBy(function (record, id) {
                            return record.get('idordenproduccion') == action.result.idordenproduccion
                        });
                    });
                    form.reset();
                    //form.contraer();
                    Ext.getCmp('fieldInsertarTallas').collapse();
                    //Ext.example.msg('Guardar Cambios', action.result.msg);
                },
                failure: function (form, action) {
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: action.result.msg,
                        buttons: Ext.MessageBox.OK,
                        // activeItem :0,
                        animEl: 'mb9',
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
            );
        }
    },
    enviarTallas: function () {
        var array_cantidades, array_tallas;
        array_cantidades = new Array();
        array_tallas = new Array();

        if (Ext.getCmp('tn2').getValue() != '' && Ext.getCmp('tn2').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn2').getValue());
            array_tallas.push(2);
        }
        if (Ext.getCmp('tn4').getValue() != '' && Ext.getCmp('tn4').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn4').getValue());
            array_tallas.push(4);
        }
        if (Ext.getCmp('tn6').getValue() != '' && Ext.getCmp('tn6').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn6').getValue());
            array_tallas.push(6);
        }
        if (Ext.getCmp('tn8').getValue() != '' && Ext.getCmp('tn8').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn8').getValue());
            array_tallas.push(8);
        }
        if (Ext.getCmp('tn10').getValue() != '' && Ext.getCmp('tn10').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn10').getValue());
            array_tallas.push(10);
        }
        if (Ext.getCmp('tn12').getValue() != '' && Ext.getCmp('tn12').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn12').getValue());
            array_tallas.push(12);
        }
        if (Ext.getCmp('tn14').getValue() != '' && Ext.getCmp('tn14').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn14').getValue());
            array_tallas.push(14);
        }
        if (Ext.getCmp('tn36').getValue() != '' && Ext.getCmp('tn36').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn36').getValue());
            array_tallas.push(36);
        }
        if (Ext.getCmp('tn38').getValue() != '' && Ext.getCmp('tn38').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn38').getValue());
            array_tallas.push(38);
        }
        if (Ext.getCmp('tn40').getValue() != '' && Ext.getCmp('tn40').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn40').getValue());
            array_tallas.push(40);
        }
        if (Ext.getCmp('tn42').getValue() != '' && Ext.getCmp('tn42').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn42').getValue());
            array_tallas.push(42);
        }
        if (Ext.getCmp('tn44').getValue() != '' && Ext.getCmp('tn44').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn44').getValue());
            array_tallas.push(44);
        }
        if (Ext.getCmp('tn46').getValue() != '' && Ext.getCmp('tn46').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn46').getValue());
            array_tallas.push(46);
        }
        if (Ext.getCmp('tn48').getValue() != '' && Ext.getCmp('tn48').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn48').getValue());
            array_tallas.push(48);
        }
        if (Ext.getCmp('tn50').getValue() != '' && Ext.getCmp('tn50').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn50').getValue());
            array_tallas.push(50);
        }
        if (Ext.getCmp('tn52').getValue() != '' && Ext.getCmp('tn52').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn52').getValue());
            array_tallas.push(52);
        }
        if (Ext.getCmp('tn54').getValue() != '' && Ext.getCmp('tn54').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tn54').getValue());
            array_tallas.push(54);
        }
        if (Ext.getCmp('tlxs').getValue() != '' && Ext.getCmp('tlxs').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tlxs').getValue());
            array_tallas.push('XS');
        }
        if (Ext.getCmp('tls').getValue() != '' && Ext.getCmp('tls').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tls').getValue());
            array_tallas.push('S');
        }
        if (Ext.getCmp('tlm').getValue() != '' && Ext.getCmp('tlm').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tlm').getValue());
            array_tallas.push('M');
        }
        if (Ext.getCmp('tll').getValue() != '' && Ext.getCmp('tll').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tll').getValue());
            array_tallas.push('L');
        }
        if (Ext.getCmp('tlxl').getValue() != '' && Ext.getCmp('tlxl').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tlxl').getValue());
            array_tallas.push('XL');
        }
        if (Ext.getCmp('tlxxl').getValue() != '' && Ext.getCmp('tlxxl').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tlxxl').getValue());
            array_tallas.push('XXL');
        }
        if (Ext.getCmp('tlxxxl').getValue() != '' && Ext.getCmp('tlxxxl').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tlxxxl').getValue());
            array_tallas.push('XXXL');
        }
        if (Ext.getCmp('tlespecial').getValue() != '' && Ext.getCmp('tlespecial').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tlespecial').getValue());
            array_tallas.push('ESPECIALES');
        }
        if (Ext.getCmp('tlunica').getValue() != '' && Ext.getCmp('tlunica').getValue() != null) {
            array_cantidades.push(Ext.getCmp('tlunica').getValue());
            array_tallas.push('UNICA');
        }
        //console.log(array_tallas);
        //console.log(array_cantidades);
        Ext.getCmp('tallas').setValue(array_tallas);
        Ext.getCmp('cantidades').setValue(array_cantidades);
        //obtenemos la orden de producicon delform top y lo colocamos en el campo hiddenn respectivo

        Ext.getCmp('ordenproduccion').setValue(Ext.getCmp('txtOrdenP').getValue());
    }

});