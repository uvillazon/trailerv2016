Ext.define('App.OrdenesProduccion.Store.OrdenesProduccion', {
    extend: 'Ext.data.Store',
    model: 'App.OrdenesProduccion.Model.OrdenesProduccion',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: '../OrdenesProduccion/GetAllOrdenesProduccion',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NRO_ORDEN',
            direction: 'DESC',
        }]
});