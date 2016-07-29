/**
 * Created by Administrator on 2015/12/16.
 */
define(['mmState','util'],function(){
  /* router 跳转 */
	avalon.state('test', {
	    url: '/test',
	    views: {
	      'contain': {
	        templateUrl: 'tpl/test.html',
	        controllerUrl: 'controller/test'
	      }
	    }
	})
	avalon.state('airportTransfer', {
		url: '/airportTransfer',
		views: {
			'contain': {
				templateUrl: 'tpl/airportTransfer/index.html',
				controllerUrl: 'controller/airportTransfer/airportTransfer'
			}
		}
	})
	
	avalon.state.config({
	    onUnload:function(){
	      util.loadingFunc();
	    },
	    onError: function (err) {
	      console.log(err)
	    },
	    onLoad: function () {
	      require(['app'],function(){
	        util.removeLoading();
	      });
	      console.log('state is loaded')
	    }
	});
	avalon.router.errorback = function () {
	    //util.showTip('暂未开放');
	};
	avalon.history.start({
	    basepath: "/"
	    //html5Mode: true,//加了这个后，一直avalon.router.errorback
	});
})