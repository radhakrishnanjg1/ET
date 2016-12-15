'use strict';
 
(function () {

    var view = app.authenticationView = kendo.observable({
        onShow: function (e) {
            var actionvalue = e.view.params.action;
            if (actionvalue == "logout")
            {
                var deviceinformation = "action:Logout|" +
                "model:" + device.model + "|"
                   + "cordova:" + device.cordova + "|"
               + "platform:" + device.platform + "|"
               + "uuid:" + device.uuid + "|"
               + "version:" + device.version + "|"
               + "manufacturer:" + device.manufacturer + "|"
               + "serial:" + device.serial;
                app.utils.loading(true);
                fun_db_APP_User_Logout(app.user.Login_ID, app.user.Employee_ID, deviceinformation);
                view.set('authenticationViewModel', vm);
            }
            app.user = null;
            localStorage.clear();
            if (!app.utils.checkinternetconnection()) {
                app.navigation.navigateoffline("authenticationView");
            } 
        },
        afterShow: function () { 
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
            //username: 'doss',
            //password: 'jerome',
            email: ''
        },
        loginValidator: null,
        registerValidator: null,
        signin: function (username, password) {
            this.loginValidator = app.validate.getValidator('#login-form');
            if (!this.loginValidator.validate()) {
                //$(".k-invalid-msg").show();
                return;
            }

            var model = vm.user;
            if (typeof username !== 'string') {
                username = model.username;

            }

            if (typeof password !== 'string') {
                password = model.password;
            }


            var deviceinformation = "action:Login|" +
                "model:" + device.model + "|"
                   + "cordova:" + device.cordova + "|"
               + "platform:" + device.platform + "|"
               + "uuid:" + device.uuid + "|"
               + "version:" + device.version + "|"
               + "manufacturer:" + device.manufacturer + "|"
               + "serial:" + device.serial;
            app.utils.loading(true);
            fun_dbchecklogin(username, password, deviceinformation); 
        },

    });

    view.set('authenticationViewModel', vm);
}());


function fun_dbchecklogin(username, password, deviceinfo) {
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
            app.user = data[0][0];
            $('#dvusername').html(app.user.Username)
            //localStorage.setItem("divisiondetails", JSON.stringify(data[1])); // division details 

            //localStorage.setItem("coveragedetails", JSON.stringify(data[2])); // coverage details 

            //localStorage.setItem("holidaydetails", JSON.stringify(data[3])); // holiday details 

            //redirect dashboard page 
            app.navigation.navigatedashboard();
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
        }
        else {
            app.notify.error(data[0].Output_Message);
            app.utils.loading(false);
        }
    });

}
 
