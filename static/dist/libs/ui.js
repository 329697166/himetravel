var ui = {};
//弹窗
ui.alertBox = function(p, callback){
    if ($('.m-box').length) {
        $('.m-box').remove();
        $(".ab_cover").remove();
    }
    ui.title = p.title || "";
    var conL = p.cons.length;
    ui.cons = conL ? (function () {
        var con;
        var _cons = "";
        if (conL > 1) {
            // console.log(p.cons);
            for (i in p.cons) {
                var className = p.cons[i].name?p.cons[i].name:'smallCon';
                _cons += "<div class='"+className+"'>"+p.cons[i].text+"</div>";
            }
        } else {
            var className = p.cons[0].name?p.cons[0].name:'smallCon';
            _cons += "<div class='"+className+"'>"+p.cons[0].text+"</div>";
        }
        return _cons;
    })() : "";
    //ui.content = p.content || "";
    var btnsL = p.btns.length;
    ui.btns = btnsL ? (function () {
        var btn;
        var _btns = "<div class='ab_btn_wrap'>";
        if (btnsL > 1) {
            for (i in p.btns) {
                if (p.btns[i].text === 'false'){
                    _btns += '';
                }
                else
                    _btns += "<a href='javascript:;' class='btn btn-default ab_btn ab_btn" + i + "'>" + p.btns[i].text + "</a>";
            }
        } else {
            if (p.btns[0].text === false){
                _btns += '';
            }
            else
                _btns += "<a href='javascript:;' class='btn btn-default ab_btn single'>" + p.btns[0].text + "</a>";
        }
        _btns += "</div>";
        return _btns;
    })() : "";
    ui.style = p.style || '';
    ui.callback = callback || function () {};

    init = function () {
        $('.m-box,.ab_cover').remove();

        var htmlstr = "<div class='ab_cover'>";
        htmlstr += "<div class='m-box'>";
        htmlstr += "<a href='javascript:;' class='ab_x'>&times;</a>";
        htmlstr += "<div class='center-box'>"
        htmlstr += ui.cons;
        htmlstr += ui.btns;
        htmlstr += "</div></div></div>";

        $('body').append(htmlstr);
        if (ui.style) {
            $(".m-box").addClass(ui.style);
        }

        $('.ab_x').on('click', function () {
            if(p.cols!=undefined){
                p.cols();
            }
            $('.m-box,.ab_cover').remove();
        });
        // $('.ab_x,.ab_cover').on('click', function () {
        //     if(p.cols!=undefined){
        //         p.cols();
        //     }
        //     $('.m-box,.ab_cover').remove();
        // });
        $(".m-box").click(function(e){
            e.stopPropagation()
        })
        $(".ab_btn").on({
            click: function () {
                var btnFunc = p.btns[$(this).index()].callback || function () {
                    };
                btnFunc();
                if (p.btns[$(this).index()].close) {
                    $('.m-box,.ab_cover').remove();
                }
            }
        })
        // callback
        ui.callback();
    }
    return init();
}
