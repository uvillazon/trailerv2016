Ext.define('App.Busqueda.Store.EquiposElemento', {
    extend: 'Ext.data.Store',
    model: 'App.Busqueda.Model.EquiposElemento',
    remoteSort: false,
    autoLoad: false,
    groupField: 'EQUIPOELEMENTO',
    proxy: {
         type: 'jsonp',
         url: '../Busqueda/GetAllEquiposElementos',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
            property: 'EQUIPOELEMENTO',
            direction: 'ASC',
        }]
});