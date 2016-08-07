define(["zh-CN"],function(){
  var index = avalon.define({
    $id: 'index'
  })
  return avalon.controller(function ($ctrl) {
      // 进入视图 first
      $ctrl.$onEnter = function () {
          $("#nav a").eq(0).addClass("active").siblings().removeClass("active");
      }
      // 视图渲染后，意思是avalon.scan完成 second
      $ctrl.$onRendered = function () {
        
      }
      // 对应的视图销毁前
      $ctrl.$onBeforeUnload = function () {

      }
    }
  )
})
