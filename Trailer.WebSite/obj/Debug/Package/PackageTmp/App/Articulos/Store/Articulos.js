Ext.define('App.Articulos.Store.Articulos', {
    extend: 'Ext.data.Store',
    model: 'App.Articulos.Model.Articulos',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: '../Articulos/GetAllArticulos',
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