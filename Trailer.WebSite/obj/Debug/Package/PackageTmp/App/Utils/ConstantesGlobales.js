c_requerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
c_UnidadPTension = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[kV]</span>';
c_UnidadPCorriente = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[A]</span>'
c_UnidadCorriente = '<span style="color:blue" data-qtip="Required">[A]</span>';
c_UnidadCapImpulso = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[kV]</span>';
c_UnidadCapRuptura = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[kA]</span>';
c_UnidadTiempo = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[s]</span>';
c_UnidadCapRupturaN = '<span style="color:blue" data-qtip="Required">[kA]</span>';
c_UnidadPTensionN = '<span style="color:blue" data-qtip="Required">[kV]</span>';
c_UnidadLitros = '<span style="color:blue" data-qtip="Required">[L]</span>'; //litros
c_UnidadAceiteR = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[L]</span>';
c_UnidadOhmioRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[ohm Ω]</span>';
c_UnidadOhmio = '<span style="color:blue" data-qtip="Required">[ohm Ω]</span>';
c_UnidadTensionRefRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[V]</span>';
c_UnidadPorcentajeRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[%]</span>';
c_UnidadOhmioSiglaRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[Ω]</span>';
c_UnidadPotenciaRequerido = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span><span style="color:blue" data-qtip="Required">[kVAr]</span>';
c_UnidadPotencia = '<span style="color:blue" data-qtip="Required">[KVA]</span>';
c_UnidadPeso = '<span style="color:blue" data-qtip="Required">[Kg]</span>';
c_UnidadCCircuito = '<span style="color:blue" data-qtip="Required">[%]</span>';
c_UnidadPerdidas = '<span style="color:blue" data-qtip="Required">[W]</span>';
//ohmio, Ω
//Meotodo para Habilitar los metodos del store 
//setExtraParams

function convertDate(value, record) {
    if (value == null) {
        return null;
    }
    else {
        var milli = value.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));
        return d;
    }
}

Ext.override(Ext.data.Store, {
    setExtraParams: function (params) {
        this.proxy.extraParams = this.proxy.extraParams || {};
        for (var x in params) {
            this.proxy.extraParams[x] = params[x];
        }
        this.proxy.applyEncoding(this.proxy.extraParams);
    },
    setExtraParam: function (name, value) {
        this.proxy.extraParams = this.proxy.extraParams || {};
        //        this.proxy.extraParams = {};
        //        alert(value);
        //        this.proxy.extraParams = null;
        //this.proxy.extraParams.clear();
        this.proxy.extraParams[name] = value;
        this.proxy.applyEncoding(this.proxy.extraParams);
    }
});

 function BloquearForm (form){
        var els=form.query('.field');
        Ext.each(els,function(o){
            o.setDisabled(true);
        });
    }
function DesbloquearForm  (form){
        var els=form.query('.field');
        Ext.each(els,function(o){
            o.setDisabled(false);
        });
    }