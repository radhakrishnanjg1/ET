
'use strict';

(function () {
    var view = app.dashboardView = kendo.observable();
    var dashboardViewModel = kendo.observable({
        onShow: function () {
            if (!app.utils.checkinternetconnection()) {
                app.navigation.navigateoffline("dashboardView");
            }
            app.navigation.logincheck();
            app.utils.loading(true); 
            fun_db_APP_Get_Permited_Divisions(app.user.Login_ID);
           
        },

    });

    view.set('dashboardViewModel', dashboardViewModel);
}());

function fun_db_APP_Get_Permited_Divisions(LoginID) {
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Get_Permited_Divisions",
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
        if (data[0].SNO >0 ) { 
            localStorage.setItem("divisiondetails", JSON.stringify(data)); // division details 
            $('#dvvisionsummary').show();
            loaddivs(1);
            app.utils.loading(false);
        }
        else {
            //app.notify.error(data[0][0].Output_Message);
            //app.utils.loading(false);
        }
    });

}

function loaddivs(filterid) {
    var alldivision = JSON.parse(localStorage.getItem("divisiondetails"));
    var singledivision = JSON.parse(Enumerable.From(alldivision)
         .Where("$.SNO==" + filterid + " && $.GroupByName =='Employee Activity Details'")
         .ToJSON());//.slice(0, 10)
    $("#spanDivision_Name").html(singledivision[0].Division_Name);
    $("#hdnSLNO").val(singledivision[0].SNO);

    var divisionsource = new kendo.data.DataSource({
        data: singledivision,
        group: { field: "GroupByName" },
        sort: [
        { "field": "OrderByValue", "dir": "asc" }
        ], 
    }); 
    $("#divisionlist-listview").kendoMobileListView({
        dataSource: divisionsource,
        template: $("#template-divisionlist").html(),
    });

    //$('#divisionlist-listview .km-group-title').hide();
    //$('#divisionlist-listview .km-group-title')
    //   .css({ "border": "0", "background-color": "#DDD", "text-align": "left", "color": "#333" });
     
    $('#divisionlist-listview li[class="km-group-container"]').wrap('<div class="row " ><div class="col-xs-12" style="padding:0"/></div>').contents().unwrap();
    $('#divisionlist-listview ul[class="km-list"] li').wrap('<div class="col-xs-4"/>').contents().unwrap();
    var employeeheadcount = JSON.parse(Enumerable.From(alldivision)
         .Where("$.SNO==" + filterid + " && $.GroupByName =='Employee Head Count'")
         .ToJSON());
    $("#chartpieemployeeheadcountdetails").kendoChart({
        theme: "nova",
        title: {
            text: "Employee Head Count Details",
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
            data: employeeheadcount,
            group: { field: "GroupByName" }, 
        }, 
        series: [{
            type: "pie", 
            field: "ParameterValue",
            categoryField: "Parameter",
        }],
        seriesDefaults: {
            labels: { 
                position: "outsideEnd",
                visible: true,
                background: "transparent",
                labels: {
                    font: "bold 12px HimalayaFont",
                }
            }
        },
        tooltip: { 
            visible: true,
            template: "${ category } - ${ value }",
            labels: {
                font: " 10px HimalayaFont",
            }
        } 
    });
}

function gotonextrecord(e) {
    var data = e.button.data();
    var direction = data.direction;
    var filterid = parseInt($('#hdnSLNO').val());  
    filterid =finddirection(direction, filterid);
    loaddivs(filterid); 
}

function gotoswipedirection(e) { 
    var direction = e.direction; 
    var filterid = parseInt($('#hdnSLNO').val());
    filterid= finddirection(direction, filterid);
    loaddivs(filterid);
}

function finddirection(direction, filterid) {
    if (direction == "right") {
        if (filterid != 1) {
            filterid = parseInt(filterid) - 1;
        }
        else
        {
            app.notify.warning('No more records.!');
        }
    }
    else {
        // Assigining distinct division in local
        var totalSLNO = Enumerable
            .From(JSON.parse(localStorage.getItem("divisiondetails")))
            .Select("$.SNO")
            .Distinct().ToArray();
        if (filterid != totalSLNO.length) {
            filterid = parseInt(filterid) + 1;
        } else {
            app.notify.warning('No more records.!');
        }
    }
    return filterid;
}

 