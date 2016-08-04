define(['ui','datapicker','zh-CN2'],function(){
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
        addFun:function (){
            $("#airportModal").modal('toggle');
        },
        navAction:function (){
            productManage.navIndex = $(this).index();
        },
        navPrev:function (){
            productManage.navIndex--;
        },
        navNext:function (){
            productManage.navIndex++;
        },
        complete:function (){
            alert("完成");
        },
        statusShow:false,
        showStatusSelect:function (e){
            e.stopPropagation()
            productManage.statusShow=true;
            $(document).off().click(function (){
                productManage.statusShow=false;
            })
        },
        tableData:[
            //模拟表格数据
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
        ],
        status:["全部产品","已上架","未上架","已删除","热点"],
        statusChange:function (e){
            e.stopPropagation()
            $(this).children("i").addClass("glyphicon glyphicon-ok b-reg");
            $(this).siblings().children("i").removeClass("glyphicon glyphicon-ok b-reg");
            productManage.statusShow=false;
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
            $(".nav a").eq(2).addClass("active").siblings().removeClass("active");
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
        }
        // 对应的视图销毁前，就是离开当前页面时的操作
        $ctrl.$onBeforeUnload = function () {

        }
    })
})