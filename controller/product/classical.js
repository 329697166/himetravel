define(["controller/product/proNav/proNav",'ui','datapicker','zh-CN2'],function(proNav){
    var classical = avalon.define({
        $id: "classical",
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
            $("#airportModal").modal('toggle');
        },
        navAction:function (){
            classicaling.navIndex = $(this).index();
        },
        navPrev:function (){
            classicaling.navIndex--;
        },
        navNext:function (){
            classicaling.navIndex++;
        },
        complete:function (){
            alert("完成");
        },
        statusShow:false,
        showStatusSelect:function (e){
            e.stopPropagation()
            classicaling.statusShow=true;
            $(document).off().click(function (){
                classicaling.statusShow=false;
            })
        },
        tableData:[
            //模拟表格数据
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"已上架",editTime:"2016-06-26 09:10"},
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"已上架",editTime:"2016-06-26 09:10"},
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"未上架",editTime:"2016-06-26 09:10"},
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"未上架",editTime:"2016-06-26 09:10"},
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"未上架",editTime:"2016-06-26 09:10"},
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"热点",editTime:"2016-06-26 09:10"},
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"热点",editTime:"2016-06-26 09:10"},
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"热点",editTime:"2016-06-26 09:10"},
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"已删除",editTime:"2016-06-26 09:10"},
            {proName:'【经典行程】旭川机场至星野 度假村单程接/送机',MasterName:"大宝宝-Jally",time:'2016-06-26 09:00',status:"已删除",editTime:"2016-06-26 09:10"},
        ],
        status:["全部产品","已上架","未上架","已删除","热点"],
        statusChange:function (e){
            e.stopPropagation()
            $(this).children("i").addClass("glyphicon glyphicon-ok b-reg");
            $(this).siblings().children("i").removeClass("glyphicon glyphicon-ok b-reg");
            classicaling.statusShow=false;
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
            $(".nav a").eq(1).addClass("active").siblings().removeClass("active");
            for(var i= 0,l=proNav.nav.length;i<l;i++){
                proNav.nav[i].active = false;
            }
            proNav.nav[5].active = true;
        }
        // 视图渲染后，意思是avalon.scan完成 second
        $ctrl.$onRendered = function () {
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