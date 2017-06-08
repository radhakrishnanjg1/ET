'use strict';
(function () {
    var view = app.salessummaryView = kendo.observable();
    var validator;
    var salessummaryViewModel = kendo.observable({
        profile: null,
        onShow: function () {
            if (!app.utils.checkinternetconnection()) {
                return app.navigation.navigateoffline("salessummaryView");
            }
            app.navigation.logincheck();
            if (localStorage.getItem("salessummary_live") == null ||
                localStorage.getItem("salessummary_live") != 1) {
                app.utils.loading(true);
                fun_db_APP_Get_Financial_Year_Sales_Summary($('#hdnLogin_ID').val());
                //fun_db_APP_Get_Financial_Year_Sales_Summary(2723);
            }
        },
    });

    view.set('salessummaryViewModel', salessummaryViewModel);
}());

function load_salessummary_divisions() {
    var alldivision = JSON.parse(localStorage.getItem("salessummary_divisions"));
    var singledivision = JSON.parse(Enumerable.From(alldivision)
          .ToJSON());
    $("#chartpie-salessummary").kendoChart({
        theme: "nova",
        title: {
            text: "Division - Sales Summary (In %)",
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
            data: singledivision,
        },
        series: [{
            type: "pie",
            field: "Sales_Percentage",
            categoryField: "Division_Name",
        }, ],
        seriesDefaults: {
            labels: {
                position: "outsideEnd",
                visible: true,
                background: "transparent",
                labels: {
                    font: "bold 14px HimalayaFont",
                }
            }
        },
        tooltip: {
            visible: true,
            //template: "${ Achv_Percentage } ",
            labels: {
                font: " 10px HimalayaFont",
            }
        }
    });
    load_sales_summary_list();
    //$("#chartbar-salessummary").kendoChart({
    //    theme: "nova",
    //    title: {
    //        text: "Division - Sales Summary",
    //        font: "bold 18px HimalayaFont",
    //        color: "#ff6600",
    //    },
    //    legend: {
    //        position: "bottom",
    //        labels: {
    //            font: "bold 12px HimalayaFont",
    //        }
    //    },
    //    dataSource: {
    //        data: singledivision,  
    //    },

    //    //Target_Value	Achv_Value	Achv_Percentage 
    //    series: [
    //    {
    //        field: "Target_Value",
    //        //categoryField: "Division_Name",
    //        color: "#006666", 
    //    },
    //    { 
    //        field: "Achv_Value",
    //        //categoryField: "Division_Name",
    //        color: "#ff6600",
    //    }
    //    ],
    //    categoryAxis: {
    //        field: "Division_Name",
    //        labels: {
    //            font: "bold 12px HimalayaFont",
    //        }
    //    },
    //    valueAxis: [{
    //        labels: {
    //            format: "{0}"
    //        }
    //    }, ],

    //});
}

function load_sales_summary_list() {
    var alldivision = JSON.parse(localStorage.getItem("salessummary_divisions"));
    var singledivision = JSON.parse(Enumerable.From(alldivision) 
       .ToJSON());
    var holidaydetails = new kendo.data.DataSource({
        data: singledivision, 
    }); 

    $("#grid-salessummary").kendoGrid({
        dataSource: holidaydetails,
        columns: [
           { title: "Division", field: "Division_Name" }, 
           { title: "Target", field: "Target_Value" },
           { title: "Achieved", field: "Achv_Value" }, 
           { width:80, title: "% Achv", field: "Achv_Percentage" },
           //{ width: 80, title: "% Sales", field: "Sales_Percentage" },
            ],
        editable: false
    });
}

function fun_db_APP_Get_Financial_Year_Sales_Summary(LoginID) {
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/wl2tdph1kbl8l9w8/Invoke/SqlProcedures/APP_Get_Financial_Year_Sales_Summary",
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
        }
    });

    datasource.fetch(function () {
        var data = this.data();
        app.utils.loading(false);
        if (data[0][0].SNO > 0) {
            localStorage.setItem("salessummary_divisions", JSON.stringify(data[0])); // division details
            localStorage.setItem("salessummary_live", 1);
            $('#dvsalessummaryView').show();
            load_salessummary_divisions();
        }
        else {
        }
    });

}
