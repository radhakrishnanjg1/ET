(function () {
    $.noty.defaults = _.extend({}, $.noty.defaults, {
        layout: 'bottom',
        type: 'alert',
        timeout: 2500
    });

    app.notify = {
        error: function (error) {
            app.utils.loading(false);
            //console.error(error);
            //console.trace();
            var message = error || error //JSON.stringify(error);
            noty({ text: message, type: 'error', layout: 'bottom' })
        },
        info: function (text) {
            noty({ text: text });
        },
        success: function (text) {
            noty({ text: text, type: 'success', layout: 'bottom' })
        },
        warning: function (text) {
            noty({ text: text, type: 'warning', layout: 'bottom' })
        },
        confirmation: function (text,callback) {
            text = text || 'Are you sure?';

            noty({
                text: text,
                buttons: [
                  {
                      addClass: 'btn btn-success', text: 'Confirm', onClick: function ($noty) {
                          $noty.close();
                          return callback(1);
                      }
                  },
                  {
                      addClass: 'btn btn-primary', text: 'Cancel', onClick: function ($noty) {
                          $noty.close();
                         // noty({ text: 'You clicked "Cancel" button', type: 'error' });
                      }
                  }
                ]
            });
        }
    };
}());
