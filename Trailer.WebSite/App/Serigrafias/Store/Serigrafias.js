Ext.define('App.Serigrafias.Store.Serigrafias', {
    extend: 'Ext.data.Store',
    model: 'App.Serigrafias.Model.Serigrafias',
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