(function () {
    app.navigation = {
        //common start 
        logincheck: function () {
            //alert(app.user);
            if ($('#hdnLogin_ID').val() === 0)
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
        navigateAppDashboardView: function () {
            return app.mobileApp.navigate('components/AppDashboardView/view.html');
        },
        navigateAuthentication: function () {
            return app.mobileApp.navigate('components/authenticationView/view.html');
        },
        navigateoffline: function (redirect) {
            return app.mobileApp.navigate('components/offlineView/view.html?pageid=' + redirect);
        },
        navigatesupport: function () {
            return app.mobileApp.navigate('components/supportView/view.html');
        },
        //common end 

        //left start 
        navigatedashboard: function () {
            return app.mobileApp.navigate('components/dashboardView/view.html');
        },  
        navigatecoveragedetail: function () {
            return app.mobileApp.navigate('components/coveragedetailView/view.html');
        },
        navigatesalessummary: function () {
            return app.mobileApp.navigate('components/salessummaryView/view.html');
        },
        navigatesalesdetail: function () {
            return app.mobileApp.navigate('components/salesdetailView/view.html');
        },
        navigatesalesperformance: function () {
            return app.mobileApp.navigate('components/salesperformanceView/view.html');
        },
        
        navigateholidays: function () {
            return app.mobileApp.navigate('components/holidaysView/view.html');
        }, 
        //left end 

        //right start 
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
        //right end 
    };
}());