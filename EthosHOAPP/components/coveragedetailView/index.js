
'use strict';

(function () {
    var view = app.coveragedetailView = kendo.observable();
    var coveragedetailViewModel = kendo.observable({
        onShow: function () {
            if (!app.utils.checkinternetconnection()) {
                return app.navigation.navigateoffline("coveragedetailView");
            }
            app.navigation.logincheck();
            if (localStorage.getItem("coveragedetails_live") == null || localStorage.getItem("coveragedetails_live") != 1) {
                var user = JSON.parse(localStorage.getItem("userdata"));
                app.utils.loading(true);
                fun_db_APP_Get_MSL_Coverage_Details(parseInt(user.Login_ID));
            }
        },
        onRefresh: function () {
            var Division_ID = $('#hdn_coverage_division_id').val();
            app.utils.loading(true);
            fun_db_APP_Get_Current_MSL_Coverage_Details_By_Division_ID(parseInt(Division_ID));
        },
    });

    view.set('coveragedetailViewModel', coveragedetailViewModel);
}());

function load_coveragedetails_divisions(filterid) {
    var alldivision = JSON.parse(localStorage.getItem("coveragedetails_divisions"));
    var singledivision = JSON.parse(Enumerable.From(alldivision)
         .Where("$.SNO==" + filterid)
         .ToJSON());//.slice(0, 10) 
    $("#span_coverage_chartdivisionname").html(singledivision[0].Division_Name);
    $("#hdn_coverage_chartslno").val(singledivision[0].SNO);
    $("#hdn_coverage_division_id").val(singledivision[0].Division_ID);

}

function load_coveragedetails_chart(filterid) { 
    var localdata = JSON.parse(localStorage.getItem("coveragedetails"));
    var objdate = new Date(),
    locale = "en-us",
    currentmonname = objdate.toLocaleString(locale, { month: "short" });
    var chartdata = JSON.parse(Enumerable.From(localdata)
        .Where("$.SNO==" + filterid + " && $.DataMonth != '" + currentmonname + "'")
        .ToJSON()); 

    $("#chartbarcoveragedetails").kendoChart({
        theme: "nova",
        title: {
            text: "Coverage and Average Details",
            font: "bold 18px HimalayaFont",
            color: "#ff6600",
        },
        legend: {
            position: "bottom",
            labels: {
                font: "bold 12px HimalayaFont",
            },
        },
        dataSource: {
            data: chartdata,
            group: { field: "Parameter" },
            sort: [
                 { "field": "OrderByChart", "dir": "asc" },
            ],

        },
        series: [{
            field: "ParameterValue",
        }],
        categoryAxis: {
            field: "DataMonth",
            labels: {
                font: "bold 12px HimalayaFont",
            }
        },
        valueAxis: [{
            labels: {
                format: "{0}"
            }
        }, ],
        tooltip: {
            visible: true
        },
    });

}

function load_coveragedetails_currentmonth(newfilterid) {
    var objdate1 = new Date(),
    locale1 = "en-us",
    currentmonname1 = objdate1.toLocaleString(locale1, { month: "short" });
    var localdata1 = JSON.parse(localStorage.getItem("coveragedetails"));
    var currentmonthdata = JSON.parse(Enumerable.From(localdata1)
    .Where("$.SNO==" + newfilterid + " && $.DataMonth == '" + currentmonname1 + "'")
    .ToJSON()); 
    var divisionsource = new kendo.data.DataSource({
        data: currentmonthdata,
        group: { field: "GroupByName" },
        sort: [
                 { "field": "OrderByValue", "dir": "asc" },
        ],
    });
    $("#chartdivisionlist-listview").kendoMobileListView({
        dataSource: divisionsource,
        template: $("#template-chartdivisionlist").html(),
    });

    $('#chartdivisionlist-listview .km-group-title').hide();
    $('#chartdivisionlist-listview li[class="km-group-container"]').wrap('<div class="row " ><div class="col-xs-12" style="padding:0"/></div>').contents().unwrap();
    $('#chartdivisionlist-listview ul[class="km-list"] li').wrap('<div class="col-xs-4"/>').contents().unwrap();
    $('#chartdivisionlist-listview div ul div[class="col-xs-4"]')
        .css({ "background-color": "#006666 !important", "color": "#33404E" });

}

function goto_coveragedetails_nextrecord(e) {
    var data = e.button.data();
    var direction = data.direction;
    var filterid = parseInt($('#hdn_coverage_chartslno').val());
    var newfilterid = goto_coveragedetails_finddirection(direction, filterid);
    if (newfilterid != filterid) { 
        load_coveragedetails_divisions(newfilterid); 
        load_coveragedetails_chart(newfilterid);
        var Division_ID = parseInt($('#hdn_coverage_division_id').val());
        //app.utils.loading(true);
        //fun_db_APP_Get_Current_MSL_Coverage_Details_By_Division_ID(Division_ID); 
         
        app.utils.loading(true);
        fun_db_APP_Get_MSL_Coverage_Details_By_Division_ID(Division_ID);
    }
}

function goto_coveragedetails_swipedirection(e) {
    var direction = e.direction;
    var filterid = parseInt($('#hdn_coverage_chartslno').val());
    var newfilterid = goto_coveragedetails_finddirection(direction, filterid);
    if (newfilterid != filterid) {
        load_coveragedetails_divisions(newfilterid); 
        load_coveragedetails_chart(newfilterid);
        var Division_ID = parseInt($('#hdn_coverage_division_id').val());
        //app.utils.loading(true);
        //fun_db_APP_Get_Current_MSL_Coverage_Details_By_Division_ID(Division_ID);
        
        app.utils.loading(true);
        fun_db_APP_Get_MSL_Coverage_Details_By_Division_ID(Division_ID);
    }
}

function goto_coveragedetails_finddirection(direction, filterid) {
    if (direction == "right") {
        if (filterid != 1) {
            filterid = parseInt(filterid) - 1;
        }
        else {
            app.notify.warning('No more records.!');
        }
    }
    else {
        // Assigining distinct division in local
        var totalSLNO = Enumerable
            .From(JSON.parse(localStorage.getItem("coveragedetails_divisions")))
            .Select("$.SNO")
            .Distinct().ToArray();
        if (filterid != totalSLNO.length) {
            filterid = parseInt(filterid) + 1;
        }
        else {
            app.notify.warning('No more records.!');
        }
    }
    return filterid;
}

function fun_db_APP_Get_MSL_Coverage_Details(LoginID) {
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Get_MSL_Coverage_Details",
                type: "POST",
                dataType: "json",
                data: {
                    "LoginID": LoginID
                }
            }
        },
        schema: {
            parse: function (response) {
                var getdata = response.Result.Data;
                return getdata;
            }
        },
        error: function (e) {

            app.utils.loading(false); // alert(e);
            app.notify.error('Error loading data please try again later.!');
            if (e.errorThrown == "ERR_EMPTY_RESPONSE") {
                // app.notify.error('Error loading data please try again later.!');
            }
            else if (e.errorThrown == "Unauthorized") {
                // ...navigate("#login");
                //ERR_EMPTY_RESPONSE
            }
            else {

            }
        }
    });

    datasource.fetch(function () {
        var data = this.data();
        if (data[0][0].SNO > 0) {
            localStorage.setItem("coveragedetails_divisions", JSON.stringify(data[0])); // division details 
            localStorage.setItem("coveragedetails", JSON.stringify(data[1])); // coverage details 
            localStorage.setItem("coveragedetails_live", 1);
            $('#dvvisionsummarycoveragedetails').show(); 
            load_coveragedetails_divisions(1);
            load_coveragedetails_currentmonth(1);
            load_coveragedetails_chart(1);
            var Division_ID = $('#hdn_coverage_division_id').val();
            app.utils.loading(true);
            fun_db_APP_Get_Current_MSL_Coverage_Details_By_Division_ID(parseInt(Division_ID));
            //loadcurrentmonthdatafa(1);
            app.utils.loading(false);
        }
        else {
            //app.notify.error(data[0][0].Output_Message);
            app.utils.loading(false);
        }
    });

}

function fun_db_APP_Get_MSL_Coverage_Details_By_Division_ID(Division_ID) {
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Get_MSL_Coverage_Details_By_Division_ID",
                type: "POST",
                dataType: "json",
                data: {
                    "Division_ID": Division_ID
                }
            }
        },
        schema: {
            parse: function (response) {
                var getdata = response.Result.Data;
                return getdata;
            }
        },
        error: function (e) {
            app.utils.loading(false);
            app.notify.error('Error loading data please try again later.!');
        }
    });

    datasource.fetch(function () {
        var data = this.data();
        if (data[0][0].SNO > 0) {
            localStorage.setItem("coveragedetails", JSON.stringify(data[0])); // coverage details 
            load_coveragedetails_chart(1); 
            load_coveragedetails_currentmonth(1);
            app.utils.loading(false);
            app.utils.loading(false);
        }
        else {
            app.utils.loading(false);
        }
    });

}

function fun_db_APP_Get_Current_MSL_Coverage_Details_By_Division_ID(Division_ID ) {
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Get_Current_MSL_Coverage_Details_By_Division_ID",
                type: "POST",
                dataType: "json",
                data: {
                    "Division_ID": Division_ID
                }
            }
        },
        schema: {
            parse: function (response) {
                var getdata = response.Result.Data;
                return getdata;
            }
        },
        error: function (e) {
            app.utils.loading(false);
            app.notify.error('Error loading data please try again later.!');
        }
    });

    datasource.fetch(function () {
        var data = this.data();
        if (data[0][0].SNO > 0) {
            localStorage.setItem("coveragedetails", JSON.stringify(data[0])); // coverage details 

            var currentmonthdata = JSON.parse(Enumerable.From(JSON.stringify(data[0])) 
            .ToJSON());
            load_coveragedetails_currentmonth(1);
            app.utils.loading(false);
        }
        else {
            app.utils.loading(false);
        }
    });

}



