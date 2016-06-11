function ConvertImagen(value, record) {
    if (record.data.ESTADO == 'CONTABILIZADO') {    // Evalua si el valor campo “estado” es “A”
        str = "<img data-qtip='Ingreso Contabilizado' src='../Content/Iconos/tick.png'/>";    // Asigna imagen en código html a una variable
    }
    else {        // En caso el estado no sea “A”
        //alert(record.data.FUNCIONES_OK);
        str = "<img data-qtip='Ingreso Sin Contabilizar' src='../Content/Iconos/error.png'/";     // Asigna imagen en código html a una variable
    }
    return str;
    //return record.data.MARCA; 
}
Ext.define("App.Ingresos.Model.Ingresos", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'ID_INGRESO', type: 'int' },
        { name: 'IMAGEN', convert: ConvertImagen},
        { name: 'NRO_INGRESO', type: 'int' },
        { name: 'PROVEEDOR', type: 'string' },
        { name: 'RESPONSABLE', type: 'string' },
        { name: 'DOCUMENTO', type: 'string' },
        { name: 'NRO_DOCUMENTO', type: 'string' },
        { name: 'CARACTERISTICA', type: 'string' },
        { name: 'ESTADO', type: 'string' },
        { name: 'FECHA_REG', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'FECHA_INGRESO', type: 'date', dateFormat: 'd-m-Y', convert: convertDate },
        { name: 'TOTAL', type: 'float' },
        { name: 'TOTAL_CANT', type: 'float' }
    ]
});