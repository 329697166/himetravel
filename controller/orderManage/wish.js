define(['table','zh-CN','ui','datapicker','zh-CN2'],function(){
    var wish = avalon.define({
        $id: "wish",
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
                'click .j-title': function (e, value, row, index) {
                    e.stopPropagation();
                    $("#orderModal").modal("toggle");
                }
            };
            var $table = $(".table");
            var data = [
                {title:'单身狗的自我朝圣之旅',introduction:"我想去鲜花盛开的昆明。那里有红色的月季，紫色的勿忘我，白色的百…",time:'2016-6-23'},
                {title:'单身狗的自我朝圣之旅',introduction:"我想去鲜花盛开的昆明。那里有红色的月季，紫色的勿忘我，白色的百…",time:'2016-6-23'},
                {title:'单身狗的自我朝圣之旅',introduction:"我想去鲜花盛开的昆明。那里有红色的月季，紫色的勿忘我，白色的百…",time:'2016-6-23'},
                {title:'单身狗的自我朝圣之旅',introduction:"我想去鲜花盛开的昆明。那里有红色的月季，紫色的勿忘我，白色的百…",time:'2016-6-23'},
                {title:'单身狗的自我朝圣之旅',introduction:"我想去鲜花盛开的昆明。那里有红色的月季，紫色的勿忘我，白色的百…",time:'2016-6-23'},
                {title:'单身狗的自我朝圣之旅',introduction:"我想去鲜花盛开的昆明。那里有红色的月季，紫色的勿忘我，白色的百…",time:'2016-6-23'}
            ]
            $table.bootstrapTable({
                data:data,
                columns: [
                    {checkbox: true},
                    {field: 'title',title:'标题',events: window.operationEvents,formatter: titleFormatter},
                    {field: 'introduction',title:'简介',width:250},
                    {field: 'time',title:'下单时间'},
                    {field: 'operation',title: '操作',events: window.operationEvents,formatter: operationFormatter}
                ],
                pagination: true,//开启翻页
                pageSize: 10,//表格初始行数
                pageList: [5,10,20],//表格行数选择
            });
            function titleFormatter(value, row, index){
                return [
                    '<a class="b-mr5 j-title" href="javascript:;">'+row.title+'</a>',
                ].join('');
            }
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
            main.orderNav = 2;
            $(".searchBtn").click(function (){
                search.searchFun()
            });
            $(".j-status").click(function (){
                alert("aaa");
            })
            wish.getTable();
        }
        // 对应的视图销毁前，就是离开当前页面时的操作
        $ctrl.$onBeforeUnload = function () {

        }
    })
})