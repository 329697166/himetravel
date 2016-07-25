/**
 * Created by Administrator on 2015/10/28.
 */
var util = function () {
  function fixCenter(id) {
    var Owidth = $("#" + id).width();
    var Oheight = $("#" + id).height();
    var Cwidth = $(window).width();
    var Cheight = $(window).height();
    var t = (Cheight - Oheight) / 2;
    var l = (Cwidth - Owidth) / 2;
    var top = $(window).scrollTop();
    return {
      'top': (t + top),
      'left': l
    }
  }

  function moveFunc(id) {
    var mouse = {
      x: 0,
      y: 0
    };
    $("#" + id + " .title").mousedown(function (event) {
      var e = window.event || event;
      var offset = $("#" + id).offset();
      mouse.x = e.clientX - offset.left;
      mouse.y = e.clientY - offset.top;
      $(document).bind('mousemove', moveDialog).bind("mouseup", function () {
        $(document).unbind('mousemove', moveDialog);
      });
    });

    function moveDialog(event) {
      var e = window.event || event;
      var top = e.clientY - mouse.y;
      var left = e.clientX - mouse.x;
      $("#" + id).css({
        "top": top,
        "left": left
      });
    };
  }

  function bindFunc(id) {
    // move this window
    moveFunc(id);
    // middle
    $("#" + id).css(fixCenter(id));
    // middle for scroll
    // middle for narrow and expansion
    $(window).scroll(function () {
      $("#" + id).css(fixCenter(id));
    }).resize(function () {
      $("#" + id).css(fixCenter(id));
    });
  }

  //this.getToken = function(){
  //  $.post("/backgroud/customer/getToken",{},function(data,textStatus,jqXHR){
  //    var storageName = "operaterToken"; // localSTorage
  //    localStorage.setItem(storageName, JSON.stringify({"token":jqXHR.getResponseHeader("token")}));
  //  });
  //},
  this.treeFunc = function (menu) {
    var _this = this;
    var animationSpeed = 300;
    $(menu).on('click', 'li a', function (e) {
      //Get the clicked link and the next element
      var $this = $(this);
      var checkElement = $this.next();

      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
          //Fix the layout in case the sidebar stretches over the height of the window
          //_this.layout.fix();
        });
        checkElement.parent("li").removeClass("active");
      }
      //If the menu is not visible
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        //Get the parent menu
        var parent = $this.parents('ul').first();
        //Close all open menus within the parent
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        //Remove the menu-open class from the parent
        ul.removeClass('menu-open');
        //Get the parent li
        var parent_li = $this.parent("li");

        //Open the target menu and add the menu-open class
        checkElement.slideDown(animationSpeed, function () {
          //Add the class active to the parent li
          checkElement.addClass('menu-open');
          parent.find('li.active').removeClass('active');
          parent_li.addClass('active');
          //Fix the layout in case the sidebar stretches over the height of the window
        });
      }
      //if this isn't a link, prevent the page from being redirected
      if (checkElement.is('.treeview-menu')) {
        if (checkElement.attr("href") && checkElement.attr("href").indexOf("#!") <= 0) {
          e.preventDefault();
        }
      }
    });
  };
  this.DateFormat = function (dateObj, format) {
    try {
      /*
       * eg:format="YYYY-MM-dd hh:mm:ss";
       */
      var o = {
        "Y+": dateObj.getFullYear(),
        "M+": dateObj.getMonth() + 1, //month
        "d+": dateObj.getDate(), //day
        "h+": dateObj.getHours(), //hour
        "m+": dateObj.getMinutes(), //minute
        "s+": dateObj.getSeconds(), //second
        "q+": Math.floor((dateObj.getMonth() + 3) / 3), //quarter
        "S": dateObj.getMilliseconds() //millisecond
      }


      if (/(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
      }


      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    } catch (e) {
      return "";
    }
  };
  this.alertBox = function (option) {
    if ($(".m-pc-box").length > 0) {
      $(".m-pc-box").remove();
      $('.m-overlay').remove();
    }
    // confirm only ID
    var customId = DateFormat(new Date(), "YYYYMMddhhmmss") + 'customWindow';
    var option = option || {
        content: '',
        title: '' || '信息框',
        bCall: false
      };
    var btnsL = option.btns.length;
    this.btns = btnsL ? (function () {
      var btn;
      var _btns = "<div class='foot'>";
      for (var i = 0, l = option.btns.length; i < l; i++) {
        if (l == 1) {
          _btns += '<a href="javascript:;" class="f-ib j_alertBtn ab_btn_single">' + option.btns[i].text + "</a>";
        } else {
          _btns += '<a href="javascript:;" class="f-ib j_alertBtn ab_btn' + i + '">' + option.btns[i].text + "</a>";
        }
      }
      _btns += "</div>";
      return _btns;
    })() : "";
    // make string
    var str = '<div class="m-overlay"></div><div class="m-pc-box" id="' + customId + '">';
    str += ' <div class="title"><a href="javascript:;" class="close">\u00d7</a>' + option.title + '</div>';
    str += ' <div class="content">' + option.content + '</div>';
    str += this.btns;
    str += '</div>';
    $('body').append(str);
    $('.m-pc-box').css({
      "width": $(".m-pc-box .content").width()
    });
    bindFunc(customId);
    // close this window
    $("#" + customId + " .close").click(function () {
      var btnFunc = option.btns[$(this).index()].callback || function () {
        };
      if (option.bClose) {
        btnFunc()
      }
      $("#" + customId + ",.m-overlay").fadeOut(500, function () {
        $("#" + customId + ",.m-overlay").remove();
      });
    });
    $(".j_alertBtn").on({
      click: function () {
        var btnFunc = option.btns[$(this).index()].callback || function () {
          };
        if (option.bCall) {
          btnFunc()
          $("#" + customId + " .close").click();
        } else {
          $("#" + customId + " .close").click();
        }
      }
    });
    $(".ab_btn0").click(function () {
      $("#" + customId + " .close").click();
    });
  };
  this.showTip = function (content, time, callback) {
    $(".m-pc-box,.m-overlay2").remove();
    var tipId = DateFormat(new Date(), "YYYYMMddhhmmss") + 'customWindow';
    var time = time || 1000;
    var str = '<div class="m-pc-box" id="' + tipId + '"><div class="content">' + content + '</div><div class="foot"><a href="javascript:;" class="f-ib ab_btn_single">确定</a></div></div>';
    str += '<div class="m-overlay2"></div>';
    $('body').append(str);
    bindFunc(tipId);
    var callback = callback || function () {
      };
    $(".ab_btn_single,.m-overlay2").click(function () {
      callback();
      $('.m-pc-box,.m-overlay2').fadeOut(1000, function () {
        $('.m-pc-box,.m-overlay2').remove();
      });
    });
  };
  this.tip = function (content, time) {
    $(".m-tip,.m-overlay2").remove();
    var tipId = DateFormat(new Date(), "YYYYMMddhhmmss") + 'customWindow';
    var time = time || 1000;
    var str = '<div class="m-pc-tip" id="' + tipId + '">' + content + '</div>';
    str += '<div class="m-overlay2"></div>';
    $('body').append(str);
    bindFunc(tipId);
    setTimeout(function () {
      $('.m-pc-tip,.m-overlay2').fadeOut(1000, function () {
        $('.m-pc-tip,.m-overlay2').remove();
      });
    }, time)
  };
  this.loadingFunc = function () {

    $(".m-loading").remove();
    var str = '<div class="m-loading"><div class="content"><i class="i-loading"></i>';
    str += '<p class="info">正在加载信息...</p></div></div>';
    $("body").append(str)
  },
    this.removeLoading = function () {
      $(".m-loading").remove();
    };
  this.calHeight = function () {
    /*计算content-wrapper的高度*/
    //var h_Body = $("body").height(),
    //  h_Doc = $(document).height();
    //if(h_Body < h_Doc){
    //  $(".content-wrapper").css({'height':(h_Doc -$(".main-footer").outerHeight())});
    //}
  };
  this.DateUtil = function () {
    this.WeekDay;// 星期几
    this.WeekDayStr;
    this.Day;// 当天
    this.Year;// 当年
    this.Month;// 当月
    this.Hours;// 当前小时
    this.Minutes;
    this.Seconds;
    this.Time;// 当前事件
    var Nowdate = new Date();
    this.WeekDay = Nowdate.getDay();
    this.Month = Nowdate.getMonth();
    this.Day = Nowdate.getDate();
    this.Year = Nowdate.getFullYear();
    this.WeekDayStr = '星期' + '日一二三四五六'.charAt(this.WeekDay)
    this.Hours = Nowdate.getHours();
    this.Minutes = Nowdate.getMinutes();
    this.Seconds = Nowdate.getSeconds();
    this.Time = this.Year + "-" + (this.Month + 1) + "-" + this.Day + " "
      + this.Hours + ":" + this.Minutes + ":" + this.Seconds;

    // 今天
    this.showCurrentDay = function () {
      return Nowdate;
    };
    // 本周第一天
    this.showWeekFirstDay = function () {
      var WeekFirstDay = new Date(Nowdate - (this.WeekDay - 1) * 86400000);
      return WeekFirstDay;
    };
    // 本周最后一天
    this.showWeekLastDay = function () {
      var WeekFirstDay = this.showWeekFirstDay();
      var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
      return WeekLastDay;
    };
    // 本月第一天
    this.showMonthFirstDay = function () {
      var MonthFirstDay = new Date(this.Year, this.Month, 1);
      return MonthFirstDay;
    };
    // 本月最后一天
    this.showMonthLastDay = function () {
      var MonthNextFirstDay = new Date(this.Year, this.Month + 1, 1);
      var MonthLastDay = new Date(MonthNextFirstDay - 86400000);
      return MonthLastDay;
    };

    // 当年第一天
    this.showYearFirstDay = function () {
      var YearFirstDay = new Date(this.Year, 0, 1);
      return YearFirstDay;
    };
    // 当年最后一天
    this.showYearLastDay = function () {
      var YearNextFirstDay = new Date(this.Year + 1, 0, 1);
      var YearLastDay = new Date(YearNextFirstDay - 86400000);
      return YearLastDay;
    };

    // 上年第一天
    this.showYearPreviousFirstDay = function () {
      var YearPreviousFirstDay = new Date(this.Year - 1, 0, 1);
      return YearPreviousFirstDay;
    };
    // 上年最后一天
    this.showYearPreviousLastDay = function () {
      var YearFirstDay = this.showYearFirstDay();
      var YearPreviousLastDay = new Date(YearFirstDay - 86400000);
      return YearPreviousLastDay;
    };

    // 下年第一天
    this.showYearNextFirstDay = function () {
      var YearNextFirstDay = new Date(this.Year + 1, 0, 1);
      return YearNextFirstDay;
    };
    // 下年最后一天
    this.showYearNextLastDay = function () {
      var step = new Date(this.Year + 2, 0, 1);
      var YearNextLastDay = new Date(step - 86400000);
      return YearNextLastDay;
    };

    // 上月第一天
    this.showPreviousFirstDay = function () {
      var MonthFirstDay = this.showMonthFirstDay()
      return new Date(MonthFirstDay.getFullYear(), MonthFirstDay.getMonth()
        - 1, 1)
    };
    // 上月最后一天
    this.showPreviousLastDay = function () {
      var MonthFirstDay = this.showMonthFirstDay();
      return new Date(MonthFirstDay - 86400000);
    };
    // 上周第一天
    this.showPreviousFirstWeekDay = function () {
      var WeekFirstDay = this.showWeekFirstDay()
      return new Date(WeekFirstDay - 86400000 * 7)
    };
    // 上周最后一天
    this.showPreviousLastWeekDay = function () {
      var WeekFirstDay = this.showWeekFirstDay()
      return new Date(WeekFirstDay - 86400000)
    };
    // 上一天
    this.showPreviousDay = function () {
      var MonthFirstDay = new Date();
      return new Date(MonthFirstDay - 86400000);
    };
    // 下一天
    this.showNextDay = function () {
      var MonthFirstDay = new Date();
      return new Date((MonthFirstDay / 1000 + 86400) * 1000);
    };
    // 上七天
    this.showPreviousSevenDay = function () {
      var MonthFirstDay = new Date();
      return new Date((MonthFirstDay / 1000 - 86400*7) * 1000);
    };
    // 下周第一天
    this.showNextFirstWeekDay = function () {
      var MonthFirstDay = this.showWeekLastDay()
      return new Date((MonthFirstDay / 1000 + 86400) * 1000)
    };
    // 下周最后一天
    this.showNextLastWeekDay = function () {
      var MonthFirstDay = this.showWeekLastDay()
      return new Date((MonthFirstDay / 1000 + 7 * 86400) * 1000)
    };
    // 下月第一天
    this.showNextFirstDay = function () {
      var MonthFirstDay = this.showMonthFirstDay()
      return new Date(MonthFirstDay.getFullYear(), MonthFirstDay.getMonth()
        + 1, 1)
    };
    // 下月最后一天
    this.showNextLastDay = function () {
      var MonthFirstDay = this.showMonthFirstDay()
      return new Date(new Date(MonthFirstDay.getFullYear(), MonthFirstDay
            .getMonth()
          + 2, 1)
        - 86400000)
    };

    // 返回json
    this.toObject = function (startTime, endTime) {
      var startYear =startTime.getFullYear(),
        startMonth =(startTime.getMonth() + 1)<10 ? ('0'+(startTime.getMonth() + 1)) : (startTime.getMonth() + 1),
        startDate =startTime.getDate()<10 ? ('0'+(startTime.getDate())) : startTime.getDate(),
        endYear =endTime.getFullYear(),
        endMonth =(endTime.getMonth() + 1)<10 ? ('0'+(endTime.getMonth() + 1)) : (endTime.getMonth() + 1),
        endDate =endTime.getDate()<10 ? ('0'+(endTime.getDate())) : endTime.getDate();
      var obj = {
        start: startYear + "-" + startMonth + "-" + startDate,
        end: endYear + "-" + endMonth + "-" + endDate
      };
      return obj;
    };
    // 上一年 {start:2010-01-01 00:00:00,end:2010-12-31 23:59:59}
    this.PreviousYear = function () {
      return this.toObject(this.showYearPreviousFirstDay(), this
        .showYearPreviousLastDay());
    };
    // 本年 {start:2011-01-01 00:00:00,end:2011-12-31 23:59:59}
    this.CurrentYear = function () {
      return this.toObject(this.showYearFirstDay(), this.showYearLastDay());
    };
    // 下一年 {start:2012-01-01 00:00:00,end:2012-12-31 23:59:59}
    this.NextYear = function () {
      return this.toObject(this.showYearNextFirstDay(), this
        .showYearNextLastDay());
    };
    // 上一月 {start:2011-01-01 00:00:00,end:2011-01-31 23:59:59}
    this.PreviousMonth = function () {
      return this.toObject(this.showPreviousFirstDay(), this
        .showPreviousLastDay());
    };
    // 本月 {start:2011-02-01 00:00:00,end:2011-02-28 23:59:59}
    this.CurrentMonth = function () {
      if( this.showPreviousDay()<this.showMonthFirstDay()){
        return false;
      }
      var date = this.toObject(this.showMonthFirstDay(), this.showPreviousDay());
      return date;
    };
    // 下一月 {start:2011-03-01 00:00:00,end:2011-03-31 23:59:59}
    this.NextMonth = function () {
      return this.toObject(this.showNextFirstDay(), this.showNextLastDay());
    };
    // 上一周
    this.PreviousWeekDay = function () {
      return this.toObject(this.showPreviousFirstWeekDay(), this
        .showPreviousLastWeekDay());
    };
    // 本周
    this.CurrentWeekDay = function () {
      return this.toObject(this.showWeekFirstDay(), this.showWeekLastDay());
    };
    // 下一周
    this.NextWeekDay = function () {
      return this.toObject(this.showNextFirstWeekDay(), this
        .showNextLastWeekDay());
    };
    // 上一天
    this.PreviousDay = function () {
      return this.toObject(this.showPreviousDay(), this.showPreviousDay());
    };
    // 今天
    this.CurrentDay = function () {
      return this.toObject(this.showCurrentDay(), this.showCurrentDay());
    };
    // 下一天
    this.NextDay = function () {
      return this.toObject(this.showNextDay(), this.showNextDay());
    };
    // 下一天
    this.recentSevenDay = function () {
      return this.toObject(this.showPreviousSevenDay(), this.showPreviousDay());
    };
    return this;
  }();
  return this;
}();