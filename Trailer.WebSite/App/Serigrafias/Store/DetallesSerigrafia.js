Ext.define('App.Serigrafias.Store.DetallesSerigrafia', {
    extend: 'Ext.data.Store',
    model: 'App.Serigrafias.Model.DetallesSerigrafia',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'Serigrafias/GetAllSerigrafias',
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