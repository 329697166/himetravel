define(['table','zh-CN','ui','datapicker','zh-CN2'],function(){
    var car = avalon.define({
        $id: "car",
        proNav:"tpl/product/proNav/proNav.html",
        navIndex:0,
        //以下5个是前后端分离表单数据填充对象(不需要可以删);
        essInfo:{
            //基本信息
        },
        serStand:{
            //服务标准
        },
        expExplana:{
            //费用说明
        },
        airportIntro:{
            //当地介绍
        },
        purchaseNotes:{
            //购买数据
        },
        allChecked:function (){
            var bl = $(this).prop("checked");
            if(bl){
                $(".checkObj").prop("checked","checked");
            }else{
                $(".checkObj").removeProp("checked");
            }

        },
        addFun:function (){
            $("#carModal").modal('toggle');
        },
        navAction:function (){
            car.navIndex = $(this).index();
        },
        navPrev:function (){
            car.navIndex--;
        },
        navNext:function (){
            car.navIndex++;
        },
        complete:function (){
            alert("完成");
        },
        statusShow:false,
        showStatusSelect:function (e){
            e.stopPropagation()
            car.statusShow=true;
            $(document).off().click(function (){
                car.statusShow=false;
            })
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
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"已上架",editTime:"2016-06-26 09:10"},
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"已上架",editTime:"2016-06-26 09:10"},
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"未上架",editTime:"2016-06-26 09:10"},
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"未上架",editTime:"2016-06-26 09:10"},
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"未上架",editTime:"2016-06-26 09:10"},
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"热点",editTime:"2016-06-26 09:10"},
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"热点",editTime:"2016-06-26 09:10"},
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"热点",editTime:"2016-06-26 09:10"},
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"已删除",editTime:"2016-06-26 09:10"},
                {proName:'【专车专导】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"已删除",editTime:"2016-06-26 09:10"},
            ]
            $table.bootstrapTable({
                data:data,
                columns: [
                    {checkbox: true},
                    {field: 'proName',title:'产品名',width:200,formatter:proNameFormatter},
                    {field: 'MasterName',title:'达人'},
                    {field: 'time',title:'创建时间'},
                    {field: 'status',title:'状态'},
                    {field: 'editTime',title:'修改时间'},
                    {field: 'operation',title: '操作',events: window.operationEvents,formatter: operationFormatter}
                ],
                pagination: true,//开启翻页
                pageSize: 10,//表格初始行数
                pageList: [5,10,20],//表格行数选择
            });
            function proNameFormatter(value, row, index) {
                return [
                    '<a href="javascript:;">'+row.proName+'</a>',
                ].join('');
            }
            function operationFormatter(value, row, index) {
                return [
                    '<a class="b-mr5" href="javascript:;">热点</a>',
                    '<a class="b-mr5" href="javascript:;">上架</a>',
                    '<a class="b-mr5" href="javascript:;">下架</a>',
                    '<a class="b-mr5" href="javascript:;">编辑</a>',
                    '<a class="b-mr5" href="javascript:;">删除</a>'
                ].join('');
            }


        },
        status:["全部产品","已上架","未上架","已删除","热点"],
        statusChange:function (e){
            e.stopPropagation()
            $(this).children("i").addClass("glyphicon glyphicon-ok b-reg");
            $(this).siblings().children("i").removeClass("glyphicon glyphicon-ok b-reg");
            car.statusShow=false;
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
            $("#nav a").eq(1).addClass("active").siblings().removeClass("active");
        }
        // 视图渲染后，意思是avalon.scan完成 second
        $ctrl.$onRendered = function () {
            main.searchShow=true;
            main.operationShow=true;
            main.proNav = 1;
            $(".searchBtn").click(function (){
                search.searchFun()
            });
            $(".j-status").click(function (){
                alert("aaa");
            })
            car.getTable();
        }
        // 对应的视图销毁前，就是离开当前页面时的操作
        $ctrl.$onBeforeUnload = function () {

        }
    })
})