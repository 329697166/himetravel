/**
 * Created by Administrator on 2015/12/16.
 */
define(['mmState','util'],function(){
  /* router 跳转 */
	avalon.state('airportTransfer', {
		url: '/airportTransfer',
		views: {
			'contain': {
				templateUrl: 'tpl/product/airportTransfer.html',
				controllerUrl: 'controller/product/airportTransfer'
			}
		}
	})
	avalon.state('car', {
		url: '/car',
		views: {
			'contain': {
				templateUrl: 'tpl/product/car.html',
				controllerUrl: 'controller/product/car'
			}
		}
	})
	avalon.state('carpool', {
		url: '/carpool',
		views: {
			'contain': {
				templateUrl: 'tpl/product/carpool.html',
				controllerUrl: 'controller/product/carpool'
			}
		}
	})
	avalon.state('pedestrianism', {
		url: '/pedestrianism',
		views: {
			'contain': {
				templateUrl: 'tpl/product/pedestrianism.html',
				controllerUrl: 'controller/product/pedestrianism'
			}
		}
	})
	avalon.state('climbing', {
		url: '/climbing',
		views: {
			'contain': {
				templateUrl: 'tpl/product/climbing.html',
				controllerUrl: 'controller/product/climbing'
			}
		}
	})
	avalon.state('classical', {
		url: '/classical',
		views: {
			'contain': {
				templateUrl: 'tpl/product/classical.html',
				controllerUrl: 'controller/product/classical'
			}
		}
	})
	avalon.state('productManage', {
		url: '/productManage',
		views: {
			'contain': {
				templateUrl: 'tpl/orderManage/productManage.html',
				controllerUrl: 'controller/orderManage/productManage'
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