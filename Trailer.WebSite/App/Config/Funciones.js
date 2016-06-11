﻿/**
 * @class App.Config.Funciones
 * @extends 
 * @autor Ubaldo Villazon
 * @date 23/07/2013
 *
 * Funciones Comunes 
 *
 **/
Ext.define("App.Config.Funciones", {
    alternateClassName: "Funciones",
    singleton: true,
    Fecha: function (value, record) {
        if (value == null) {
            return null;
        }
        else {
            var milli = value.replace(/\/Date\((-?\d+)\)\//, '$1');
            var d = new Date(parseInt(milli));
            return d;
        }
    },
    BloquearFormulario: function (form, array) {
        var els = form.query('.field');
        //var btn = form.query('.button');
        Ext.each(els, function (o) {
            if (o.hidden == true || Funciones.EsComponenteNombre(o, array)) {
                o.setDisabled(false);
                o.setReadOnly(false);
            }
            else {
                o.setDisabled(true);
                o.setReadOnly(false);
            }

        });
        try {
            var btn = form.query('.button');
            Ext.each(btn, function (o) {
                if (o.isHidden() == false) {
                    o.setDisabled(true);
                }
            });
        }
        catch (e) {
            Console.log(e)
        }
    },
    BloquearFormularioReadOnly: function (form, array) {
        var els = form.query('.field');
        Ext.each(els, function (o) {
            if (Funciones.EsComponenteNombre(o, array)) {
                o.setReadOnly(false);
            }
            else {
                o.setReadOnly(true);
            }

        });
        try {
            var btn = form.query('.button');
            Ext.each(btn, function (o) {
                if (o.isHidden() == false) {
                    o.setDisabled(true);
                }
            });
        }
        catch (e) {
            Console.log(e)
        }
    },
    //Desbloquea todo el Formulario si recibe array
    //solo desbloqueara todos los campos excepto el que se envia en el array
    // en caso de que reciba un readOnly(bool) en ves de bloquear se pondra solo para Leer 
    DesbloquearFormulario: function (form, array, readOnly) {
        var els = form.query('.field');
        Ext.each(els, function (o) {
            if (Funciones.EsComponenteNombre(o, array)) {
                if (readOnly) {
                    o.setReadOnly(readOnly);
                    o.setDisabled(false);
                }
                else {
                    o.setDisabled(true);
                }
            }
            else {
                o.setDisabled(false);
            }

        });
        try {
            var btn = form.query('.button');
            Ext.each(btn, function (o) {
                if (o.isDisabled() == true) {
                    o.setDisabled(false);
                }
            });
        }
        catch (e) {
            Console.log(e)
        }
    },
    EsComponenteNombre: function (cmp, array) {
        for (x in array) {
            if (cmp.getName() == array[x]) {
                return true;
            }

        }
        return false;
    },
    ActualizarReloj: function (reloj) {
        Ext.fly('clock').update(Ext.Date.format(new Date(), 'g:i:s A'));
    },
    CrearMenuBar: function (dock) {
        dock = (dock == null) ? 'top' : dock
        var menuBar = Ext.create("Ext.toolbar.Toolbar", {
            dock: dock,
        });
        return menuBar;
    },
    CrearMenu: function (id, nombre, icono, handler, menu, scope) {
        var boton = Ext.create('Ext.Button', {
            text: nombre,
            iconCls: icono,
            itemId: id,
            cls: 'botones',
            scope: scope,
            handler: handler,
            minHeight: 27,
            minWidth: 80,

        });
        menu.add(boton);
    },
    CrearGrupoBoton: function (column, titulo) {
        var grupo = new Ext.container.ButtonGroup({
            columns: column,
            title: titulo,
            bodyPadding: 5,
        });
        return grupo;
    },
    //Ajax Request Con Confirmacion para los Windows
    AjaxRequestWin: function (controlador, accion, mask, form, grid, msg, param, win) {

        var formSend = form.getForm();
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        if (formSend.isValid()) {

            Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
                if (btn == 'yes') {
                    mask.el.mask('Procesando...', 'x-mask-loading');
                    formSend.submit({
                        submitEmptyText: false,
                        url: Constantes.HOST + '' + controlador + '/' + accion + '',
                        params: param,
                        success: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            //me.Formulario.Bloquear();
                            if (grid != null) {
                                try {
                                    grid.getStore().load();
                                }
                                catch (err) {
                                    grid.load();
                                }
                            }
                            if (win != null) {
                                win.hide();
                            }
                        },
                        failure: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    //ajax para cerrar varias ventanas en un solo evento
    AjaxRequestWinArray: function (controlador, accion, mask, form, grid, msg, param, winArray) {

        var formSend = form.getForm();
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        if (formSend.isValid()) {

            Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
                if (btn == 'yes') {
                    mask.el.mask('Procesando...', 'x-mask-loading');
                    formSend.submit({
                        submitEmptyText: false,
                        url: Constantes.HOST + '' + controlador + '/' + accion + '',
                        params: param,
                        success: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            //me.Formulario.Bloquear();
                            if (grid != null) {
                                try {
                                    grid.getStore().load();
                                }
                                catch (err) {
                                    grid.load();
                                }
                            }

                            if (winArray != null) {
                                for (i = 0 ; i < winArray.length ; i++) {
                                    winArray[i].hide();
                                }
                                //grid.getStore().load();
                            }

                        },
                        failure: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    //Ajax Request Con Confirmacion para los FormPanel
    AjaxRequestForm: function (controlador, accion, mask, form, grid, msg, param, Formulario) {

        var formSend = form.getForm();
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        if (formSend.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
                if (btn == 'yes') {
                    mask.el.mask('Procesando...', 'x-mask-loading');
                    formSend.submit({
                        submitEmptyText: false,
                        url: Constantes.HOST + '' + controlador + '/' + accion + '',
                        params: param,
                        success: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            //me.Formulario.Bloquear();
                            if (grid != null) {
                                grid.getStore().load();
                            }
                            if (Formulario != null) {
                                Formulario.BloquearFormulario();
                            }
                        },
                        failure: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    //Ajax Request Sin Confirmacion para los FormPanel
    AjaxRequestFormSC: function (controlador, accion, mask, form, grid, param, Formulario) {

        var formSend = form.getForm();
        if (formSend.isValid()) {
            mask.el.mask('Procesando...', 'x-mask-loading');
            formSend.submit({
                submitEmptyText: false,
                url: Constantes.HOST + '' + controlador + '/' + accion + '',
                params: param,
                success: function (form, action) {
                    mask.el.unmask();
                    Ext.MessageBox.alert('Exito', action.result.msg);
                    if (grid != null) {
                        grid.getStore().load();
                    }
                    if (Formulario != null) {
                        Formulario.BloquearFormulario();
                    }
                },
                failure: function (form, action) {
                    mask.el.unmask();
                    Ext.MessageBox.alert('Error', action.result.msg);
                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    //para concatenar valores del modelo es necesario enviar un value (defaultValue) separadas por la (,) coma
    //ejm (" - ,NOMBRE,APELLIDO,EDAD") la primera posiicon es el separador y las siguines el orden de como se mostrara en el modelo
    // Ubaldo - Villazon - 30
    //si el nombre no existe en el record mostrara la palabra undifiend
    ConcatenarModelo: function (v, record) {
        var cadena = v.split(",");
        var result = "";
        var separador = "";
        for (x in cadena) {
            if (x == 0) {
                separador = cadena[x];
            }
            else if (x == 1) {
                result = record.get(cadena[x]);
            }
            else {
                result = result + "" + separador + "" + record.get(cadena[x]);
            }
        }
        return result;
    },
    CopiarRecordmodelo: function (v, record) {
        return record.get(v);
    },
    AjaxRequestComponente: function (controlador, accion, mask, cmp, param, win, cmpArray) {
        mask.el.mask('Procesando...', 'x-mask-loading');
        Ext.Ajax.request({
            url: Constantes.HOST + '' + controlador + '/' + accion + '',
            params: param,
            success: function (response) {
                mask.el.unmask();
                var str = Ext.JSON.decode(response.responseText);
                //res = Ext.util.JSON.decode(result.responseText);
                if (str.success == true) {
                    //cmp.setValue(str);
                    try {
                        cmp.loadRecord(str.Result);
                        if (cmpArray != null) {
                            Funciones.loadResultCmpArray(cmpArray, str.Result);
                        }
                    }
                    catch (e) {
                        Funciones.loadRecordCmp(cmp, str.Result);
                        if (cmpArray != null) {
                            Funciones.loadResultCmpArray(cmpArray, str.Result);
                        }
                    }
                    //return true;
                }
                else {
                    if (cmpArray != null) {
                        Funciones.resetCmpArray(cmpArray);
                    }
                    if (win != null) {
                        win.show();
                    }
                    //Ext.MessageBox.alert('Error', "Ocurrio un Error al Procesar la Solicitud.");
                    //return false;
                }


            },
        });
    },
    //Se Recuperar Informacion para Cargar el Resultado a algunos Componentes enviados por el cmpArray
    AjaxRequestComponenteArray: function (controlador, accion, mask, cmpArray, param, win) {
        mask.el.mask('Procesando...', 'x-mask-loading');
        Ext.Ajax.request({
            url: Constantes.HOST + '' + controlador + '/' + accion + '',
            params: param,
            success: function (response) {
                mask.el.unmask();
                var str = Ext.JSON.decode(response.responseText);
                if (str.success == true) {
                    Funciones.loadResultCmpArray(cmpArray, str.Result);
                }
                else {
                    Funciones.resetCmpArray(cmpArray);
                    if (win != null) {
                        win.show();
                    }
                }


            },
        });
    },
    AjaxRequestGrid: function (controlador, accion, mask, msg, param, grid) {
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
            if (btn == 'yes') {
                mask.el.mask('Procesando...', 'x-mask-loading');
                Ext.Ajax.request({
                    url: Constantes.HOST + '' + controlador + '/' + accion + '',
                    params: param,
                    success: function (response) {
                        mask.el.unmask();
                        var str = Ext.JSON.decode(response.responseText);
                        if (str.success == true) {
                            if (grid != null) {
                                grid.getStore().load();
                            }
                            Ext.MessageBox.alert('Exito', str.msg);
                        }
                        else {
                            Ext.MessageBox.alert('Error', str.msg);
                        }
                    },
                });
            }
        });
    },
    AjaxRequestGridArray: function (controlador, accion, mask, msg, param, ArrayGrid) {
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
            if (btn == 'yes') {
                mask.el.mask('Procesando...', 'x-mask-loading');
                Ext.Ajax.request({
                    url: Constantes.HOST + '' + controlador + '/' + accion + '',
                    params: param,
                    success: function (response) {
                        mask.el.unmask();
                        var str = Ext.JSON.decode(response.responseText);
                        if (str.success == true) {
                            if (ArrayGrid != null) {
                                for (i = 0 ; i < ArrayGrid.length ; i++) {
                                    ArrayGrid[i].getStore().load();
                                }
                                //grid.getStore().load();
                            }
                            Ext.MessageBox.alert('Exito', str.msg);
                        }
                        else {
                            Ext.MessageBox.alert('Error', str.msg);
                        }
                    },
                });
            }
        });
    },
    convertirJson: function (grid) {
        var modified = grid.getStore().getModifiedRecords(); //step 1
        var recordsToSend = [];
        if (!Ext.isEmpty(modified)) {
            Ext.each(modified, function (record) { //step 2
                recordsToSend.push(Ext.apply(record.data));
            });
            recordsToSend = Ext.JSON.encode(recordsToSend);
            return recordsToSend;
        }
        else {
            return false;
        }

    },
    //obtener un componente de un formulario 
    cargarValorComponeteForm: function (form, cmp) {
        var els = form.query('.field');
        Ext.each(els, function (o) {
            if (o.getName() == cmp.getName()) {
                o.setValue(cmp.getValue());
                return true;
            }

        });
        return false;
    },
    //cargar formulario de un formulario a otro siempre y cuando los nane son iguales 
    //formulario al que se le va actualizar los componentes del form2
    cargarFormDesdeOtroForm: function (form1, form2) {
        var me = this;
        var els = form2.query('.field');
        Ext.each(els, function (o) {
            if (o.getValue() != null) {
                Funciones.cargarValorComponeteForm(form1, o);
            }

        });
    },
    cargarValidaciones: function () {
        Ext.apply(Ext.form.VTypes, {
            validacionNumero: function (value, field) {
                return /[0-9]/.test(value);
            },
            validacionNumeroText: 'Los datos ingresado no son válidos. Solo números',
            validacionNumeroMask: /[0-9]/i,

            validacionLetrasConEspacios: function (value, field) {
                return /[A-Za-z]/.test(value);
            },
            validacionLetrasConEspaciosText: 'Datos ingresados no válidos. Solo letras',
            validacionLetrasConEspaciosMask: /[A-Za-z]/,

            CodigoEquiposMask: /^[a-z0-9]*[@]?$/i,
            CodigoEquipos: function (val, field) {
                var texto = val;
                if (texto.length == 1) {
                    texto = texto + "-";
                }
                texto = Ext.util.Format.uppercase(texto);

                field.setRawValue(texto);
                return true;
            },
            //convierte a mayuscula
            //CodigoEquiposMask: /^[0-9]*[:]?$/i,
            //HoraMask: /^[0-9]*[:]?$/i,
            HoraMask: /[\d\s:]/i,
            HoraText: "No es una hora valida. Este es el formato 0:00 - 23:59 ",
            Hora: function (value, field) {
                var texto = value;
                if (texto.length == 2) {
                    texto = texto + ":";
                }

                field.setRawValue(texto);
                return /^(1|01|2|02|3|03|4|04|5|05|6|06|7|07|8|08|9|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|00|0):(([0-5][0-9]|[0-9])|([0-5][0-9]|[0-9]):[0-5][0-9])$/.test(value);
            },

            HoraSegMask: /[\d\s:]/i,
            HoraSegText: "No es una hora valida. Este es el formato 00:00:00 - 23:59:59 ",
            HoraSeg: function (value, field) {
                var texto = value;
                if (texto.length == 2 || texto.length == 5) {
                    texto = texto + ":";
                }

                field.setRawValue(texto);
                return /^(1|01|2|02|3|03|4|04|5|05|6|06|7|07|8|08|9|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|00|0):(([0-5][0-9]|[0-9])|([0-5][0-9]|[0-9]):[0-5][0-9])$/.test(value);
            },
            //            Hora: function (val, field) {
            //                var texto = val;
            //                if (texto.length == 2) {
            //                    texto =texto+":";
            //                }
            //                texto = Ext.util.Format.uppercase(texto);

            //                field.setRawValue(texto);
            //                return true;
            //            },


            uppercase: function (value, field) {
                texto = Ext.util.Format.uppercase(value);
                //                field.setValue(value.charAt(0).toUpperCase() + value.slice(1));
                field.setValue(texto);
                return true;
            }
        });
    },
    AjaxRequestRecord: function (controlador, accion, mask, record, recordName, recordId, param, win) {
        mask.el.mask('Procesando...', 'x-mask-loading');
        Ext.Ajax.request({
            url: Constantes.HOST + '' + controlador + '/' + accion + '',
            params: param,
            success: function (response) {
                mask.el.unmask();
                var str = Ext.JSON.decode(response.responseText);
                if (str.success == true) {
                    Ext.each(str.Result, function (name) {
                        record.set(recordName, name[recordName]);
                        record.set(recordId, name[recordId]);
                    });
                }
                else {
                    if (win != null) {
                        win.show();
                    }
                }


            },
        });
    },
    loadRecordCmp: function (cmp, result) {
        var els = cmp.query('.field');
        Ext.Object.each(result, function (key, value, myself) {
            Ext.each(els, function (o) {
                if (o.getName() == key) {
                    o.setValue(value);
                }

            });

        });
    },
    //Carga el Resultar de un Ajax Request a un un Componente Array
    loadResultCmpArray: function (cmpArray, result) {
        Ext.Object.each(result, function (key, value, myself) {
            if (cmpArray != null) {
                for (i = 0 ; i < cmpArray.length ; i++) {
                    if (cmpArray[i].getName() == key) {
                        cmpArray[i].setValue(value);
                    }
                    else {
                        cmpArray[i].reset();
                    }
                }
            }
        });
    },
    //limpiar todos los campos de ese compomente Array
    resetCmpArray: function (cmpArray) {
        if (cmpArray != null) {
            for (i = 0 ; i < cmpArray.length ; i++) {
                cmpArray[i].reset();
            }
        }
    }
});