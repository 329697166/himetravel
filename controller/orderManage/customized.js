define(['table','zh-CN','ui','datapicker','zh-CN2'],function(){
    var customized = avalon.define({
        $id: "customized",
        orderNav:'tpl/orderManage/orderNav/orderNav.html',
        navIndex:0,
        allChecked:function (){
            var bl = $(this).prop("checked");
            if(bl){
                $(".checkObj").prop("checked","checked");
            }else{
                $(".checkObj").removeProp("checked");
            }

        },
        orderInfoShow:function (){
            $("#orderModal").modal("toggle");
        },
        getTable: function (url) {
            window.operationEvents = {
                'click .j-examine': function (e, value, row, index) {

                },
                'click .j-edit': function (e, value, row, index) {

                }
            };
            var $table = $(".table");
            var data = [
                {Destination:'北欧，美国',time:'2016-6-23  09:00',number:5},
                {Destination:'北欧，美国',time:'2016-6-23  09:00',number:5},
                {Destination:'北欧，美国',time:'2016-6-23  09:00',number:5},
                {Destination:'北欧，美国',time:'2016-6-23  09:00',number:5},
                {Destination:'北欧，美国',time:'2016-6-23  09:00',number:5}
            ]
            $table.bootstrapTable({
                data:data,
                columns: [
                    {checkbox: true},
                    {field: 'Destination',title:'目的地'},
                    {field: 'time',title:'出行日期'},
                    {field: 'number',title:'人数'},
                    {field: 'operation',title: '操作',events: window.operationEvents,formatter: operationFormatter}
                ],
                pagination: true,//开启翻页
                pageSize: 10,//表格初始行数
                pageList: [5,10,20],//表格行数选择
            });
            function operationFormatter(value, row, index) {
                return [
                    '<a class="b-mr5" href="javascript:;">查看</a>',
                    '<a class="b-mr5" href="javascript:;">确认</a>',
                    '<a class="b-mr5" href="javascript:;">删除</a>'
                ].join('');
            }


        },
        addScenicSpot:function (){
            $(this).addClass("b-mt20");
            var html= '<li class="b-mt20"><i class="building"></i><input placeholder="请输入景点、餐馆等" /></li>'
            $(".scenicSpot").append(html);
        }
    })
    return avalon.controller(function ($ctrl) {
        // 进入视图 first
        $ctrl.$onEnter = function () {
            $(".nav a").eq(2).addClass("active").siblings().removeClass("active");
        }
        // 视图渲染后，意思是avalon.scan完成 second
        $ctrl.$onRendered = function () {
            main.searchShow=true;
            main.operationShow=true;
            main.orderNav = 1;
            $(".searchBtn").click(function (){
                search.searchFun()
            });
            $(".j-status").click(function (){
                alert("aaa");
            })
            customized.getTable();
        }
        // 对应的视图销毁前，就是离开当前页面时的操作
        $ctrl.$onBeforeUnload = function () {

        }
    })
})