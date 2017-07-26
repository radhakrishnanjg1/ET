
'use strict';

(function () {
    var view = app.coveragedetailView = kendo.observable();
    var coveragedetailViewModel = kendo.observable({
        onShow: function () {
            if (!app.utils.checkinternetconnection()) {
                app.navigation.navigateoffline("coveragedetailView");
            }
            app.navigation.logincheck();
            if (localStorage.getItem("coveragedetails_live") == null || localStorage.getItem("coveragedetails_live") != 1) {
                app.utils.loading(true);
                fun_db_APP_Get_Current_MSL_Coverage_Details($('#hdnLogin_ID').val());
            }
        },
        onRefresh: function () {
            app.utils.loading(true);
            fun_db_APP_Get_Current_MSL_Coverage_Details($('#hdnLogin_ID').val());
        },
    });

    view.set('coveragedetailViewModel', coveragedetailViewModel);
}());


function fun_db_APP_Get_Current_MSL_Coverage_Details(LoginID) {
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Get_Current_MSL_Coverage_Details",
                type: "POST",
                dataType: "json",
                data: {
                    "LoginID": LoginID
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
        if (data[0].SNO > 0) {
            localStorage.setItem("coveragedetails", JSON.stringify(data)); // coverage details 
            localStorage.setItem("coveragedetails_live", 1);
            $('#dvvisionsummarycoveragedetails').show();
            loadchart(1);
            app.utils.loading(false);
        }
        else {
            //app.notify.error(data[0][0].Output_Message);
            //app.utils.loading(false);
        }
    });

}


function loadchart(filterid) {
    var localdata = JSON.parse(localStorage.getItem("coveragedetails"));
    var objdate = new Date(),
    locale = "en-us",
    currentmonname = objdate.toLocaleString(locale, { month: "short" });
    var chartdata = JSON.parse(Enumerable.From(localdata)
        .Where("$.SNO==" + filterid + " && $.DataMonth != '" + currentmonname + "'")
        .ToJSON());
    $("#spanchartdivisionname").html(chartdata[0].Division_Name);
    $("#hdnchartslno").val(chartdata[0].SNO);

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
            }
        },
        dataSource: {
            data: chartdata,
            group: { field: "Parameter" },
            sort: [
            { "field": "OrderByValue", "dir": "asc" },
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
        }
    });

    loadcurrentmonthdata(filterid, currentmonname);
}

function loadcurrentmonthdata(filterid, currentmonname) {
    var localdata = JSON.parse(localStorage.getItem("coveragedetails"));
    var currentmonthdata = JSON.parse(Enumerable.From(localdata)
       .Where("$.SNO==" + filterid + " && $.DataMonth == '" + currentmonname + "'")
       .ToJSON());
    var divisionsource = new kendo.data.DataSource({
        data: currentmonthdata,
        group: { field: "GroupByName" },
        sort: [
        { "field": "OrderByValue", "dir": "asc" }
        ],
    });
    $("#chartdivisionlist-listview").kendoMobileListView({
        dataSource: divisionsource,
        template: $("#template-chartdivisionlist").html(),
    });

    $('#chartdivisionlist-listview .km-group-title').hide();
    //$('#chartdivisionlist-listview .km-group-title')
    //   .css({ "border": "0", "background-color": "#006666", "text-align": "left", "color": "#fff" });//"background-color": "#006666"

    $('#chartdivisionlist-listview li[class="km-group-container"]').wrap('<div class="row " ><div class="col-xs-12" style="padding:0"/></div>').contents().unwrap();
    $('#chartdivisionlist-listview ul[class="km-list"] li').wrap('<div class="col-xs-4"/>').contents().unwrap();
    $('#chartdivisionlist-listview div ul div[class="col-xs-4"]')
        .css({ "background-color": "#006666 !important", "color": "#33404E" });
}
function gotochartnextrecord(e) {
    var data = e.button.data();
    var direction = data.direction;
    var filterid = parseInt($('#hdnchartslno').val());
    filterid = findchartdirection(direction, filterid);
    loadchart(filterid);
}
function gotoswipedirectioncoveragedetails(e) {
    var direction = e.direction;
    var filterid = parseInt($('#hdnchartslno').val());
    filterid = finddirection(direction, filterid);
    loadchart(filterid);
}
function findchartdirection(direction, filterid) {
    if (direction == "right") {
        if (filterid != 1) {
            filterid = parseInt(filterid) - 1;
        }
        else {
            app.notify.warning('No more records.!');
        }
    }
    else {
        var totalSLNO = Enumerable
            .From(JSON.parse(localStorage.getItem("coveragedetails")))
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
