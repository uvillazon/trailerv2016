Ext.define('App.Clientes.Store.Clientes', {
    extend: 'Ext.data.Store',
    model: 'App.Clientes.Model.Clientes',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: '../Clientes/GetAllClientes',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'NOMBRE',
            direction: 'ASC',
        }]
});