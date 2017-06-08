
'use strict';

(function () {
    var view = app.salesperformanceView = kendo.observable();
    var salesperformanceViewModel = kendo.observable({
        onShow: function () {
            //if (!app.utils.checkinternetconnection()) {
            //    return app.navigation.navigateoffline("salesperformanceView");
            //}
            //app.navigation.logincheck();
            //if (localStorage.getItem("salesdetails_live") == null ||
            //    localStorage.getItem("salesdetails_live") != 1) {
            //    app.utils.loading(true); 
            //    fun_db_APP_Get_Financial_Year_Sales_Details($('#hdnLogin_ID').val());

            //}
        }, 
    });

    view.set('salesperformanceViewModel', salesperformanceViewModel);
}());
 
//function load_salesdetails_divisions(filterid) {
//    var alldivision = JSON.parse(localStorage.getItem("salesdetails_divisions"));
//    var singledivision = JSON.parse(Enumerable.From(alldivision)
//         .Where("$.SNO==" + filterid)
//         .ToJSON());//.slice(0, 10)
//    $("#span_sales_performance_division_name").html(singledivision[0].Division_Name);
//    $("#hdn_sales_performance_slno").val(singledivision[0].SNO);
//    $("#hdn_sales_performance_division_id").val(singledivision[0].Division_ID);
//}

//function load_salesdetails_targetvalues() { 
//    var targets = JSON.parse(localStorage.getItem("salesdetails_targetvalues"));
//    var target = JSON.parse(Enumerable.From(targets)
//         .ToJSON());//.slice(0, 10)
//    $("#span_sales_target_value").html(targets[0].Target_Value);

//    $("#span_sales_achv_value").html(targets[0].Achv_Value);

//    $("#span_sales_achv_percentage").html(targets[0].Achv_Percentage);
//}

//function load_team_members() {
//    var ethosmastervaluesdata = JSON.parse(localStorage.getItem("salesdetails_team_members"));
//    var records = JSON.parse(Enumerable.From(ethosmastervaluesdata)
//   .ToJSON());
//    $("#ddl_team_members").kendoDropDownList({
//        index: 0,
//        dataTextField: "Employee_Name",
//        dataValueField: "Employee_ID",
//        dataSource: records, 
//        optionLabel: "---Select---",
//        change: function (e) {
//            var value = this.value();
//            app.utils.loading(true);
//            fun_db_APP_Get_Financial_Year_Sales_Details_By_Employee_ID(value);

//        }
//    });
//}

//function load_chart_financialyeardetails() {
//    var localdata = JSON.parse(localStorage.getItem("salesdetails_financialyeardetails"));
//    var chartdata = JSON.parse(Enumerable.From(localdata)
//        .ToJSON());
//    $("#chart-bar-financialyeardetails").kendoChart({
//        theme: "nova",
//        title: {
//            text: "Financial Year Strategy Details",
//            font: "bold 18px HimalayaFont",
//            color: "#ff6600",
//        },
//        legend: {
//            position: "bottom",
//            labels: {
//                font: "bold 12px HimalayaFont",
//            },
//        },
//        dataSource: {
//            data: chartdata,
//            //group: { field: "Parameter" },
//            sort: [
//                 { "field": "SNO", "dir": "asc" },
//            ],

//        },
//        series: [{
//            field: "ParameterValue",
//            color: "#006666"
//        }],
//        categoryAxis: {
//            field: "Parameter",
//            labels: {
//                font: "bold 12px HimalayaFont",
//            }
//        },
//        valueAxis: [{
//            labels: {
//                format: "{0}"
//            }
//        }, ],
//        tooltip: {
//            visible: true
//        },
//    });
//}

//function load_top10_sales(filterid) {
//    var alldivision = JSON.parse(localStorage.getItem("salesdetails_top10"));
//    var singledivision = JSON.parse(Enumerable.From(alldivision)
//        .Where("$.SNO==" + filterid)
//       .ToJSON());
//    var holidaydetails = new kendo.data.DataSource({
//        data: singledivision,
//        //sort: [
//        //{ "field": "HolidayDate", "dir": "asc" }
//        //],
//    });
//    $("#listview-top10sales").kendoMobileListView({
//        dataSource: holidaydetails,
//        dataBound: function (e) {
//            if (this.dataSource.data().length == 0) {
//                //custom logic
//                $("#listview-top10sales").append("<li>No employees in this division!</li>");
//            }
//        },
//        template: $("#template-top10sales").html(),
//    });
//}

//function load_bottom10_sales(filterid) {
//    var alldivision = JSON.parse(localStorage.getItem("salesdetails_bottom10"));
//    var singledivision = JSON.parse(Enumerable.From(alldivision)
//        .Where("$.SNO==" + filterid)
//       .ToJSON());
//    var holidaydetails = new kendo.data.DataSource({
//        data: singledivision,
//        //sort: [
//        //{ "field": "HolidayDate", "dir": "asc" }
//        //],
//    });
//    $("#listview-bottom10sales").kendoMobileListView({
//        dataSource: holidaydetails,
//        dataBound: function (e) {
//            if (this.dataSource.data().length == 0) {
//                //custom logic
//                $("#listview-bottom10sales").append("<li>No employees in this division!</li>");
//            }
//        },
//        template: $("#template-bottom10sales").html(),
//    });
//}

//function goto_sales_nextrecord(e) {
//    var data = e.button.data();
//    var direction = data.direction;
//    var filterid = parseInt($('#hdn_sales_SLNO').val()); 
//    var newfilterid = goto_sales_finddirection(direction, filterid);
//    if (newfilterid != filterid) {
//        load_salesdetails_divisions(newfilterid);
//        var division_id = parseInt($('#hdn_sales_Division_ID').val());
//        app.utils.loading(true);
//        fun_db_APP_Get_Financial_Year_Sales_By_Division_ID(division_id, filterid);
//    }
//} 
 
//function goto_sales_swipedirection(e) {
//    var direction = e.direction;
//    var filterid = parseInt($('#hdn_sales_SLNO').val());
//    var newfilterid = goto_sales_finddirection(direction, filterid);
//    if (newfilterid != filterid) {
//        load_salesdetails_divisions(newfilterid);
//        var division_id = parseInt($('#hdn_sales_Division_ID').val());
//        app.utils.loading(true);
//        fun_db_APP_Get_Financial_Year_Sales_By_Division_ID(division_id, filterid);
//    }
//}

//function goto_sales_finddirection(direction, filterid) {
//    if (direction == "right") {
//        if (filterid != 1) {
//            filterid = parseInt(filterid) - 1;
//        }
//        else {
//            app.notify.warning('No more records.!');
//        }
//    }
//    else {
//        // Assigining distinct division in local
//        var totalSLNO = Enumerable
//            .From(JSON.parse(localStorage.getItem("salesdetails_divisions")))
//            .Select("$.SNO")
//            .Distinct().ToArray();
//        if (filterid != totalSLNO.length) {
//            filterid = parseInt(filterid) + 1;
//        }
//        else {
//            app.notify.warning('No more records.!');
//        }
//    }
//    return filterid;
//}

//function fun_db_APP_Get_Financial_Year_Sales_Details(LoginID) {
//    var datasource = new kendo.data.DataSource({
//        transport: {
//            read: {
//                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Get_Financial_Year_Sales_Details",
//                type: "POST",
//                dataType: "json",
//                data: {
//                    "LoginID": LoginID
//                }
//            }
//        },
//        schema: {
//            parse: function (response) {
//                var getdata = response.Result.Data;
//                return getdata;
//            }
//        },
//        error: function (e) {
//            app.utils.loading(false);
//            app.notify.error('Error loading data please try again later.!');
//        }
//    });

//    datasource.fetch(function () {
//        var data = this.data();
//        if (data[0][0].SNO > 0) {
//            localStorage.setItem("salesdetails_divisions", JSON.stringify(data[0])); // division details

//            localStorage.setItem("salesdetails_team_members", JSON.stringify(data[1])); // team list level employee details

//            localStorage.setItem("salesdetails_targetvalues", JSON.stringify(data[2])); // division target details

//            localStorage.setItem("salesdetails_financialyeardetails", JSON.stringify(data[3])); // division month wise target  details 

//            localStorage.setItem("salesdetails_top10", JSON.stringify(data[4])); // division top10 sales  details 

//            localStorage.setItem("salesdetails_bottom10", JSON.stringify(data[5])); // division bottom 10 sales details 

//            localStorage.setItem("salesdetails_live", 1);
//            $('#dvsalesdetailView').show();
//            load_salesdetails_divisions(1);
//            load_salesdetails_targetvalues();
//            load_team_members();
//            load_chart_financialyeardetails();
//            load_top10_sales(1);
//            load_bottom10_sales(1);
//            //load_salesdetails_divisions(1);
//        }
//        else {
//        } 
//        app.utils.loading(false);
//    });

//}

//function fun_db_APP_Get_Financial_Year_Sales_By_Division_ID(Division_ID, filterid) {
//    var datasource = new kendo.data.DataSource({
//        transport: {
//            read: {
//                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/fun_db_APP_Get_Financial_Year_Sales_By_Division_ID",
//                type: "POST",
//                dataType: "json",
//                data: {
//                    "Division_ID": Division_ID
//                }
//            }
//        },
//        schema: {
//            parse: function (response) {
//                var getdata = response.Result.Data;
//                return getdata;
//            }
//        },
//        error: function (e) {
//            app.utils.loading(false);
//            app.notify.error('Error loading data please try again later.!');
//        }
//    });

//    datasource.fetch(function () {
//        var data = this.data();
//        if (data[2][0].SNO > 0) {
//            localStorage.setItem("salesdetails_team_members", JSON.stringify(data[0])); // team list level employee details

//            localStorage.setItem("salesdetails_targetvalues", JSON.stringify(data[1])); // division target details

//            localStorage.setItem("salesdetails_financialyeardetails", JSON.stringify(data[2])); // division month wise target  details 
//            load_team_members();
//            load_salesdetails_targetvalues();
//            load_chart_financialyeardetails();
//            load_top10_sales(filterid);
//            load_bottom10_sales(filterid);
//            app.utils.loading(false);
//        }
//        else { 
//            app.utils.loading(false);
//        } 
//    });

//}

//function fun_db_APP_Get_Financial_Year_Sales_Details_By_Employee_ID(Employee_ID) {
//    var datasource = new kendo.data.DataSource({
//        transport: {
//            read: {
//                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Get_Financial_Year_Sales_Details_By_Employee_ID",
//                type: "POST",
//                dataType: "json",
//                data: {
//                    "Employee_ID": Employee_ID
//                }
//            }
//        },
//        schema: {
//            parse: function (response) {
//                var getdata = response.Result.Data;
//                return getdata;
//            }
//        },
//        error: function (e) {
//            app.utils.loading(false);
//            app.notify.error('Error loading data please try again later.!');
//        }
//    });

//    datasource.fetch(function () {
//        var data = this.data();
//        if (data[1][0].SNO > 0) { 
//            localStorage.setItem("salesdetails_targetvalues", JSON.stringify(data[0])); // division target details

//            localStorage.setItem("salesdetails_financialyeardetails", JSON.stringify(data[1])); // division month wise target  details 

//            load_salesdetails_targetvalues();
//            load_chart_financialyeardetails(); 
//            app.utils.loading(false);
//        }
//        else {
//            app.utils.loading(false);
//        }
//    });

//}


