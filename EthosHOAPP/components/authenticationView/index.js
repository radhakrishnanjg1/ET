'use strict';

(function () {

    var view = app.authenticationView = kendo.observable({
        onShow: function (e) {
            // if (localStorage.getItem("authenticationviewloginmessage_live") == null ||
            //    localStorage.getItem("authenticationviewloginmessage_live") != 1) {
                var Mobile_APP_Name = app.constants.appname.split(':')[1];
                app.utils.loading(true);
                fun_db_APP_Get_Mobile_APP_Login_Message(Mobile_APP_Name);
            //}
            var actionvalue = e.view.params.action;
            if (actionvalue == "logout") {
                var user = JSON.parse(localStorage.getItem("userdata"));
                app.utils.loading(true);
                fun_db_APP_User_Logout(user.Login_ID, user.Employee_ID, app.utils.deviceinformation('Logout'));

            }
            if (app.user != null) {
                return app.navigation.navigatedashboard();
            }
            if (!app.utils.checkinternetconnection()) {
                return app.navigation.navigateoffline("authenticationView");
            }
        },
        afterShow: function () {
            // app.notify.success("Welcome To Ethos App");
        }
    });

    var provider = app.data.defaultProvider;
    var mode = app.constants.authenticationModeSignin;
    var registerRedirect = 'activitiesView';
    var signinRedirect = 'activitiesView';
    var vm = kendo.observable({
        user: {
            displayName: '',
            username: '',
            password: '',
            email: ''
        },
        loginValidator: null,
        registerValidator: null,
        signin: function (username, password) {
            var model = vm.user;
            if ($('#username').val() == '' || model.username == '' || model.username == undefined) {
                username = model.username;
                app.notify.error("Enter username!");
                return false;
            }

            if ($('#password').val() == '' || model.password == '' || model.password == undefined) {
                password = model.password;
                app.notify.error("Enter password!");
                return false;
            }
            else {
                app.utils.loading(true);
                fun_db_APP_Verify_User_Authentication(model.username, model.password, app.utils.deviceinformation('Login'));
            }
        },
    });

    view.set('authenticationViewModel', vm);
}());


function fun_db_APP_Verify_User_Authentication(username, password, deviceinfo) {
    var storelogin = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Verify_User_Authentication",
                type: "POST",
                dataType: "json",
                data: {
                    "Username": username, "Password": password, "DeviceInfo": deviceinfo
                }
            }
        },
        schema: {
            parse: function (response) {
                var getlogin = response.Result.Data;
                return getlogin;
            }
        }
    });

    storelogin.fetch(function () {
        var data = this.data();
        if (data[0][0].Output_ID == 1) {
            //app.user = data[0][0];
            $('#dvusername').html(data[0][0].Username);
            $('#hdnLogin_ID').val(data[0][0].Login_ID);
            localStorage.clear();
            localStorage.setItem("userdata", JSON.stringify(data[0][0])); // userdata details 
            $('#dvlast_visited').html(data[1][0].Last_Visited);
            app.navigation.navigateAppDashboardView();
            app.utils.loading(false);
        } 
        else {
            app.notify.error(data[0][0].Output_Message);
            app.utils.loading(false);
        }
    });

}

function fun_db_APP_User_Logout(Login_ID, Employee_ID, deviceinfo) {
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_User_Logout",
                type: "POST",
                dataType: "json",
                data: {
                    "Login_ID": Login_ID, "Employee_ID": Employee_ID, "DeviceInfo": deviceinfo
                }
            }
        },
        schema: {
            parse: function (response) {
                var getdata = response.Result.Data[0];
                return getdata;
            }
        }
    });

    datasource.fetch(function () {
        var data = this.data();
        if (data[0].Output_ID == 1) {
            app.notify.success(data[0].Output_Message);
            app.utils.loading(false);
            $('#username').val('');
            $('#password').val('');
            app.user = null;
            localStorage.clear();
        }
        else {
            app.notify.error(data[0].Output_Message);
            app.utils.loading(false);
        }
    }); 
}

function fun_db_APP_Get_Mobile_APP_Login_Message(Mobile_APP_Name) {
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Get_Mobile_APP_Login_Message",
                type: "POST",
                dataType: "json",
                data: {
                    "Mobile_APP_Name": Mobile_APP_Name
                }
            }
        },
        schema: {
            parse: function (response) {
                var getdata = response.Result.Data[0];
                return getdata;
            }
        }
    });
    datasource.fetch(function () {
        var data = this.data();
        app.utils.loading(false);
        $('#h6appdescritpion').html(data[0].Login_Message);
        localStorage.setItem("authenticationviewloginmessage_live", 1);
    });
}




