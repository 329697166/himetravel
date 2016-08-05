/**
 * Created by Administrator on 2015/11/21.
 */


// 初始化声明变量
var main,
  api_path,
  lStorage = window.localStorage,
  sStorage = window.sessionStorage,
  lStoragecache,
  sStorageCache,
  storageName;

// 轮询
var checkLogin = function (callback) {
  console.log('checking login...')
  setTimeout(function () {
    if (false) {
      checkLogin(callback);
    } else {
      callback();
    }
  }, 500)
};


// 后退
var back = function () {
  avalon.router.navigate(avalon.router.getLastPath());
};

// 主函数
require(['avalon','util','tree'], function (avalon) {
  main = avalon.define({
    $id: 'main',
    bgClass:'hold-transition skin-blue-light sidebar-mini ms-controller',
    header: 'tpl/header.html',
    search: "tpl/search.html",
    tree: "tpl/tree.html",
    footer: "tpl/footer.html",
    searchShow:false,
    operationShow:false,
    proNav:0,
    orderNav:0,

  });
  require(['router'],function(){
    avalon.scan();
  });
  avalon.ready(function () {// avalon加载完执行
    var lhash = location.href;
    if(lhash == '' || lhash == "#!/"){
      main.searchShow=false;
      main.operationShow=false;
    }
  });
});
