(function () {
    app.navigation = {
        logincheck: function () {
            //alert(app.user );
            if (app.user === undefined)
            {
                return app.mobileApp.navigate('components/authenticationView/view.html');
            }  
        },

        back: function () {
            app.mobileApp.navigate('#:back');
            app.utils.loading(false);
        },

        navigateNoAppId: function () {
            return app.mobileApp.navigate('components/missingSettingsView/noappidView.html');
        },

        navigatedashboard: function () {
            return app.mobileApp.navigate('components/dashboardView/view.html');
        }, 

        navigateholidays: function () {
            return app.mobileApp.navigate('components/holidaysView/view.html');
        },

        navigateAuthentication: function () {
            return app.mobileApp.navigate('components/authenticationView/view.html');
        },

        navigateProfile: function () {
            return app.mobileApp.navigate('components/updateprofileView/view.html');
        },

        navigatechangepassword: function () {
            return app.mobileApp.navigate('components/changepasswordView/view.html');
        },

        navigatesignout: function () {
            var confirmation = "Are you sure you want to log out?";
            app.notify.confirmation(confirmation,function (confirm) {
                if (!confirm) {
                    return;
                }
                return app.mobileApp.navigate('components/authenticationView/view.html?action=logout');

            })
            },

        navigatecoveragedetail: function () {
            return app.mobileApp.navigate('components/coveragedetailView/view.html');
        },
    };
}());