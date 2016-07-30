define(['bootstrap','table','zh-CN','ui','datapicker','zh-CN2'],function(){
    var airportTransfer = avalon.define({
        $id: "airportTransfer",
        navIndex:0,
        essInfo:{

        },
        serStand:{

        },
        expExplana:{

        },
        airportIntro:{

        },
        purchaseNotes:{

        },
        addFun:function (){
          $("#airportModal").modal('toggle');
        },
        navAction:function (){
            airportTransfer.navIndex = $(this).index();
        },
        navPrev:function (){
            airportTransfer.navIndex--;
        },
        navNext:function (){
            airportTransfer.navIndex++;
        },
        getTable: function (url) {
            window.operateEvents = {
                //'click .j-test': function (e, value, row, index) {// 操作按钮事件绑定
                //}
            };
            var data = [
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"},
                {proName:'【接送机】旭川机场至星野度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',editTime:"2016-06-26 09:10"}
            ]
            var $table = $("#bTable");
            $table.bootstrapTable({
                data:data,
                //url: url,
                columns: [
                    //field:后台定义的data的key名,title:表头名字,checkbox:是否需要复选框,events:事件绑定,formatter:调用自定义表格内容;
                    {field: 'state', checkbox: true},
                    {field: 'proName', title: '产品名',formatter:proNameFormatter},
                    {field: 'MasterName', title: '达人姓名'},
                    {field: 'time',title: '创建时间'},
                    {field: 'editTime',title: '修改时间'},
                    {field: 'operation',title: '操作',formatter:operationFormatter,align:"center"}
                ],
                pagination: true,//开启翻页
                pageSize: 10,//表格初始行数
                pageList: [5,10,20],//表格行数选择
                responseHandler: function (res) {
                    //请求url请求成功后的返回事件;
                    //if (res.code) {
                    //    res = {"totalCount": 0, "recordList": []};
                    //    return res;
                    //}
                    return res;
                }

            });
            // sometimes footer render error.
            setTimeout(function () {
                $table.bootstrapTable('resetView');
            }, 200);

            //自定义表格内容
            function proNameFormatter(value, row, index) {
                return [
                    '<a class="tab-proName" href="javascript:void(0)">'+row.proName+'</a>'
                ].join('');
            }
            function operationFormatter(value, row, index) {
                return [
                    '<a class="j-test tab-operation" href="javascript:void(0)">热点</a>',
                    '<a class="j-test tab-operation" href="javascript:void(0)">上架</a>',
                    '<a class="j-test tab-operation" href="javascript:void(0)">下架</a>',
                    '<a class="j-test tab-operation" href="javascript:void(0)">编辑</a>',
                    '<a class="j-test tab-operation" href="javascript:void(0)">删除</a>'
                ].join('');
            }
        },
        datetimeFun: function () {
            $(this).datetimepicker({
                format: 'yyyy-mm-dd hh:ii:ss',
                language: 'zh-CN',
                weekStart: 1,
                autoclose: true,
                todayHighlight: 1,
                container: $(this).parent()
            });
            $(this).focus();
        },
        childSeatBtn:function (){
            $(this).parent().addClass("active").siblings().removeClass("active");
        }
    })
    return avalon.controller(function ($ctrl) {
        // 进入视图 first
        $ctrl.$onEnter = function () {
            $(".nav a").eq(1).addClass("active").siblings().removeClass("active");
        }
        // 视图渲染后，意思是avalon.scan完成 second
        $ctrl.$onRendered = function () {
            airportTransfer.getTable();
            $(".searchBtn").click(function (){
                search.searchFun()
            });
        }
        // 对应的视图销毁前，就是离开当前页面时的操作
        $ctrl.$onBeforeUnload = function () {

        }
    })
})