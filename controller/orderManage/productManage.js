define(['table','zh-CN','ui','datapicker','zh-CN2'],function(){
    var productManage = avalon.define({
        $id: "productManage",
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
        getTable: function (url) {
            window.operationEvents = {
                'click .j-orderInfo': function (e, value, row, index) {
                    e.stopPropagation()
                    $("#orderModal").modal("toggle");
                }
            };
            var $table = $(".table");
            var data = [
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"},
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"},
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"},
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"},
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"},
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"},
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"},
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"},
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"},
                {orderId:'125842369514',proName:"宝格丽奢华浪漫水上婚礼",time:'2016-6-23  09:00',MasterName:"樊旻妤"}
            ]
            $table.bootstrapTable({
                data:data,
                columns: [
                    {checkbox: true},
                    {field: 'orderId',title:'订单号',formatter:orderIdFormatter,events: window.operationEvents,},
                    {field: 'proName',title:'产品名'},
                    {field: 'time',title:'下单时间'},
                    {field: 'MasterName',title:'达人'},
                    {field: 'operation',title: '操作',events: window.operationEvents,formatter: operationFormatter}
                ],
                pagination: true,//开启翻页
                pageSize: 10,//表格初始行数
                pageList: [5,10,20],//表格行数选择
            });
            function orderIdFormatter(value, row, index) {
                return [
                    '<a class="j-orderInfo" href="javascript:;">'+row.orderId+'</a>',
                ].join('');
            }
            function operationFormatter(value, row, index) {
                return [
                    '<a class="b-mr5" href="javascript:;">不通过</a>',
                    '<a class="b-mr5" href="javascript:;">通过</a>',
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
            $("#nav a").eq(2).addClass("active").siblings().removeClass("active");
        }
        // 视图渲染后，意思是avalon.scan完成 second
        $ctrl.$onRendered = function () {
            main.searchShow=true;
            main.operationShow=true;
            main.orderNav = 0;
            $(".searchBtn").click(function (){
                search.searchFun()
            });
            $(".j-status").click(function (){
                alert("aaa");
            })
            productManage.getTable();
        }
        // 对应的视图销毁前，就是离开当前页面时的操作
        $ctrl.$onBeforeUnload = function () {

        }
    })
})