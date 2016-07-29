/**
 * Created by Administrator on 2015/11/21.
 */
// 判断浏览器内核
(function(window){
  if(!window.browser) {

    var userAgent = navigator.userAgent.toLowerCase(), uaMatch;
    window.browser = {}
    /**
     * 判断是否为ie
     */
    function isIE() {
      return ("ActiveXObject" in window);
    }

    /**
     * 判断是否为谷歌浏览器
     */
    if (!uaMatch) {
      uaMatch = userAgent.match(/chrome\/([\d.]+)/);
      if (uaMatch != null) {
        window.browser['name'] = 'chrome';
        window.browser['version'] = uaMatch[1];
      }
    }
    /**
     * 判断是否为火狐浏览器
     */
    if (!uaMatch) {
      uaMatch = userAgent.match(/firefox\/([\d.]+)/);
      if (uaMatch != null) {
        window.browser['name'] = 'firefox';
        window.browser['version'] = uaMatch[1];
      }
    }
    /**
     * 判断是否为opera浏览器
     */
    if (!uaMatch) {
      uaMatch = userAgent.match(/opera.([\d.]+)/);
      if (uaMatch != null) {
        window.browser['name'] = 'opera';
        window.browser['version'] = uaMatch[1];
      }
    }
    /**
     * 判断是否为Safari浏览器
     */
    if (!uaMatch) {
      uaMatch = userAgent.match(/safari\/([\d.]+)/);
      if (uaMatch != null) {
        window.browser['name'] = 'safari';
        window.browser['version'] = uaMatch[1];
      }
    }
    /**
     * 最后判断是否为IE
     */
    if (!uaMatch) {
      if (userAgent.match(/msie ([\d.]+)/) != null) {
        uaMatch = userAgent.match(/msie ([\d.]+)/);
        window.browser['name'] = 'ie';
        window.browser['version'] = uaMatch[1];
      } else {
        /**
         * IE10
         */
        if (isIE() && !!document.attachEvent && (function () {
            "use strict";
            return !this;
          }())) {
          window.browser['name'] = 'ie';
          window.browser['version'] = '10';
        }
        /**
         * IE11
         */
        if (isIE() && !document.attachEvent) {
          window.browser['name'] = 'ie';
          window.browser['version'] = '11';
        }
      }
    }
  }
})(window);
var oUser = {};
//var detect = function(){
//oUser = JSON.parse(sessionStorage.getItem("bossUser"));
//if(oUser){
//  if(window.browser['name']=='ie'){
//    location.href = "#!/test"
//  }
//  //if (!/webkit/.test(navigator.userAgent.toLowerCase())) {
//  //  location.href = "#!/login"
//  //}
//}else{
//  var sUrl = location.href.split("?")[0].split("/"),
//    urlLength = sUrl.length,
//    active = (sUrl[urlLength-1]).split(".")[0];
//  if(active == 'error'){
//    return;
//  }
//  location.href="#!/test"
//}
//}();


// 配置文件
require.config({
  debug: true,
  baseUrl: './',
  paths: {
    avalon: '//cdn.bootcss.com/avalon.js/1.4.7.2/avalon.shim',
    mmHistory: 'static/dist/libs/mmHistory',
    mmRouter: 'static/dist/libs/mmRouter',
    mmPromise: 'static/dist/libs/mmPromise',
    mmState: 'static/dist/libs/mmState',
    mmRequest: 'static/dist/libs/mmRequest',
    jquery: '//cdn.bootcss.com/jquery/1.11.0/jquery.min',
    bootstrap: '//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min',
    tree:'//cdn.bootcss.com/bootstrap-treeview/1.2.0/bootstrap-treeview.min',//bootstrap treeview
    'table': 'static/dist/bootstrap/table/bootstrap-table.min',// bootstrap table
    'zh-CN': 'static/dist/bootstrap/table/locale/bootstrap-table-zh-CN.min',// bootstrap table 中文化
    'datapicker': 'static/dist/bootstrap/datatimepicker/js/bootstrap-datetimepicker',
    'zh-CN2': 'static/dist/bootstrap/datatimepicker/js/locales/bootstrap-datetimepicker.zh-CN',
    util: 'static/dist/libs/util',// 系统工具库
    router: 'router',
    mock: 'static/dist/libs/mock-min',
    app: 'static/dist/libs/app',
    sockjs: 'static/dist/libs/sockjs-0.3.4.min',
    stomp: 'static/dist/libs/stomp.min',
    notify: 'static/dist/libs/iNotify',
    ui:'static/dist/libs/ui'
  },
  shim: {
    notify: {
      exports: 'notify'
    },
    sockjs: {
      exports: 'sockjs'
    },
    stomp: {
      exports: 'stomp'
    },
    app: {
      exports: 'app',
      deps: ['jquery']
    },
    jquery: {
      exports: 'jquery'
    },
    bootstrap: {
      exports: 'bootstrap',
      deps: ['jquery']
    },
    util: {
      exports: 'util',
      deps: ['jquery']
    },
    util: {
      exports: 'ui',
      deps: ['jquery']
    },
    data: {
      exports: 'data',
      deps: ['mock']
    },
    'table': {
      exports: 'table',
      deps: ['bootstrap']
    },
    'tree': {
      exports: 'tree',
      deps: ['bootstrap']
    },
    'zh-CN': {
      exports: 'zh-CN',
      deps: ['table']
    },
    'datapicker': {
      exports: 'datapicker',
      deps: ['bootstrap']
    },
    'zh-CN2': {
      exports: 'zh-CN2',
      deps: ['datapicker']
    }
  }
}); // 配置结束



