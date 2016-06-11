Ext.define('App.OrdenesProduccion.Store.DetallesOrdenProduccion', {
    extend: 'Ext.data.Store',
    model: 'App.OrdenesProduccion.Model.DetallesOrden',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'OrdenesProduccion/GetAllDetallesOrdenProduccion',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NRO_OP',
            direction: 'DESC',
        }]
});