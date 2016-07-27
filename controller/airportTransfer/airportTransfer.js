define(['bootstrap','table','zh-CN','ui'],function(){
    var airportTransfer = avalon.define({
        $id: "airportTransfer",
    })
    return avalon.controller(function ($ctrl) {
        // 进入视图 first
        $ctrl.$onEnter = function () {

        }
        // 视图渲染后，意思是avalon.scan完成 second
        $ctrl.$onRendered = function () {

        }
        // 对应的视图销毁前，就是离开当前页面时的操作
        $ctrl.$onBeforeUnload = function () {

        }
    })
})