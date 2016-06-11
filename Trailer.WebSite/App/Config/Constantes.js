/**
 * @class App.Config.Constantes
 * @extends 
 * @autor Ubaldo Villazon
 * @date 23/07/2013
 *
 * Variables Globales Comunes 
 *
 **/
Ext.define("App.Config.Constantes", {
    alternateClassName  : ["Constantes","Lista"],
    singleton           : true,
    /* Aqui Defino todas mis contanstantes */
    HOST                : '../',
    //HOST                : 'http://elfpre02/SisMan/',
    REQUERIDO           : '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>',
    PIEPAGINA: '<font color="black"><h2  style="font-size:12px;height:14px">Copyright &copy;   2013  -  Version 1.0</h2></font>',
    ALTO: 600,
    ICONO_CREAR: 'application_form_add',
    ICONO_EDITAR: 'application_form_edit',
    ICONO_BAJA: 'application_form_delete',
    ICONO_VER: 'application_view_detail',
    LiSTAS: null,
    URLLISTAS: 'Listas/ObtenerTodasLasListas',
    URLIMAGEN : "Imagenes/VerImagen?",
    UnidadesRequeridas: function (unidad, requerido) {
        if (requerido) {
            return '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span><span style="color:blue" data-qtip="Requerido">[' + unidad + ']</span>';
        }
        else {
            return '<span style="color:blue" data-qtip="'+unidad+'">['+unidad+']</span>';
        }
    },
    CargarCssEstados: function (estado, tipo) {
        if (tipo == 'SM') {
            if (estado == 'NUEVA') return 'Verde';
            else if (estado == 'RECH_INSP') return 'Rojo';
            else if (estado == 'APROBADA') return 'Amarillo';
            else if (estado == 'RECHAZADA') return 'RojoFuerte'; 
            else if (estado == 'APR_JF_MN') return 'AmarilloFuerte';
            return '';
        }
        else if (tipo == 'OT') {
            if (estado == 'ASIGNADA') return 'Amarillo';
            else if (estado == 'EJECUTADA') return 'Verde';
            else if (estado == 'APROBADA') return 'Amarillo';
            else if (estado == 'CERRADA') return 'RojoFuerte';
            //else if (estado == 'CON_OIT') return 'AmarilloFuerte';
        }
        else {
            return '';
        }
    },
    Buscar: function (lista) {
        var idLista = 0;
        Ext.each(this.LiSTAS, function (item) {
            if (lista == item.LISTA) {
                idLista = item.ID_LISTA;
                return false;
            }
        });
        return idLista;
    }
});