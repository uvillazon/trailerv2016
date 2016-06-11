Ext.define('App.Facturas.Store.DetallesFactura', {
    extend: 'Ext.data.Store',
    model: 'App.Facturas.Model.DetallesFactura',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Facturas/GetAllDetallesFactura',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_DETALLE',
            direction: 'DESC',
        }]
});