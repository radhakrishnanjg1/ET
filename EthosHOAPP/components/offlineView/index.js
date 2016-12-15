
'use strict';

(function () {
    var view = app.offlineView = kendo.observable();
    var offlineViewModel = kendo.observable({
        onShow: function (e) {
            var pageid = e.view.params.pageid;
            $('#hdncurrentpage').val(pageid); 
           // alert(e.view.params.pageid);
        },

    });

    view.set('offlineViewModel', offlineViewModel);
}());
 
 
function gotoonlinepage() { 
    if (app.utils.checkinternetconnection()) {
        var page = $('#hdncurrentpage').val(); 
        app.mobileApp.navigate('components/' + page + '/view.html');
    }
};