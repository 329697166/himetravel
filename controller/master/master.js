define(['table','zh-CN','ui','datapicker','zh-CN2'],function(){
    var master = avalon.define({
        $id: "master",
        getTable: function (url) {
            window.operationEvents = {
                'click .j-examine': function (e, value, row, index) {
                    $("#examineModal").modal("toggle");
                }
            };
            var $table = $(".table");
            var data = [
                {master:'大宝宝-Jaesy',icon:["葡","闽","客","葡","闽","客"],project:'安提瓜与巴布达 · 圣约翰',star:5,time:"2016-06-26 09:00",editTime:"2016-06-26 09:00",status:"未审核"},
                {master:'大宝宝-Jaesy',icon:["葡","闽","客","葡","闽","客"],project:'安提瓜与巴布达 · 圣约翰',star:5,time:"2016-06-26 09:00",editTime:"2016-06-26 09:00",status:"未审核"},
                {master:'大宝宝-Jaesy',icon:["葡","闽","客","葡","闽","客"],project:'安提瓜与巴布达 · 圣约翰',star:5,time:"2016-06-26 09:00",editTime:"2016-06-26 09:00",status:"未审核"},
                {master:'大宝宝-Jaesy',icon:["葡","闽","客","葡","闽","客"],project:'安提瓜与巴布达 · 圣约翰',star:5,time:"2016-06-26 09:00",editTime:"2016-06-26 09:00",status:"未审核"},
                {master:'大宝宝-Jaesy',icon:["葡","闽","客","葡","闽","客"],project:'安提瓜与巴布达 · 圣约翰',star:5,time:"2016-06-26 09:00",editTime:"2016-06-26 09:00",status:"未审核"}
            ]
            $table.bootstrapTable({
                data:data,
                columns: [
                    {checkbox: true},
                    {field: 'master',title:'达人',formatter:masterFormatter},
                    {field: 'time',title:'创建时间'},
                    {field: 'editTime',title:'修改时间'},
                    {field: 'status',title:'状态'},
                    {field: 'operation',title: '操作',events: window.operationEvents,formatter: operationFormatter}
                ],
                pagination: true,//开启翻页
                pageSize: 10,//表格初始行数
                pageList: [5,10,20],//表格行数选择
            });
            function masterFormatter(value, row, index) {
                var str = '<div class="m-icon-wrap">',star = '<div class="star">';
                for(var i= 0,l=row.icon.length;i<l;i++){
                    str += '<i class="m-icon">'+row.icon[i]+'</i>'
                }
                str += '</div>';
                for(var i= 0,l=row.star;i<l;i++){
                    star += '<i class="glyphicon glyphicon-star"></i>'
                }
                star += '</div>';
                return [
                    '<div>' + row.master + str + '</div><div>' + row.project + star + '</div>'
                ].join('');
            }
            function operationFormatter(value, row, index) {
                return [
                    '<a class="b-mr5 j-examine" href="javascript:;">审核</a>',
                    '<a class="b-mr5" href="javascript:;">编辑</a>',
                    '<a class="b-mr5" href="javascript:;">删除</a>'
                ].join('');
            }


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
            master.getTable();
        }
        // 对应的视图销毁前，就是离开当前页面时的操作
        $ctrl.$onBeforeUnload = function () {

        }
    })
})