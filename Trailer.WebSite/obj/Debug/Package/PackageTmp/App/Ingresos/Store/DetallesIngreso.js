Ext.define('App.Ingresos.Store.DetallesIngreso', {
    extend: 'Ext.data.Store',
    model: 'App.Ingresos.Model.DetallesIngreso',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: '../Ingresos/GetAllDetallesIngreso',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'ID_DEATLLE_INGRESO',
            direction: 'DESC',
        }]
});