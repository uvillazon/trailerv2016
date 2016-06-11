Ext.define('App.OrdenBordado.Store.OrdenBordado', {
    extend: 'Ext.data.Store',
    model: 'App.OrdenBordado.Model.OrdenBordado',
    remoteSort: false,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: host+'OrdenBordado/GetAllOrdenBordado',
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