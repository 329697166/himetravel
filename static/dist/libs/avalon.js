!function (e, t) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document)throw new Error("Avalon requires a window with a document");
    return t(e)
  } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
  function n() {
    e.console && avalon.config.debug && Function.apply.call(console.log, console, arguments)
  }

  function r() {
  }

  function i(e, t) {
    "string" == typeof e && (e = e.match(Dt) || []);
    for (var n = {}, r = void 0 !== t ? t : 1, a = 0, i = e.length; i > a; a++)n[e[a]] = r;
    return n
  }

  function o() {
    if (e.VBArray) {
      var t = document.documentMode;
      return t ? t : e.XMLHttpRequest ? 7 : 6
    }
    return 0 / 0
  }

  function l(e) {
    return Bt.test(Vt.call(e))
  }

  function s(e, t) {
    return e = Math.floor(e) || 0, 0 > e ? Math.max(t + e, 0) : Math.min(e, t)
  }

  function c(e) {
    if (!e)return !1;
    var t = e.length;
    if (t === t >>> 0) {
      var n = Vt.call(e).slice(8, -1);
      if (/(?:regexp|string|function|window|global)$/i.test(n))return !1;
      if ("Array" === n)return !0;
      try {
        return {}.propertyIsEnumerable.call(e, "length") === !1 ? /^\s?function/.test(e.item || e.callee) : !0
      } catch (r) {
        return !e.window
      }
    }
    return !1
  }

  function u(e, t, n) {
    var r = "for(var " + e + "i=0,n = this.length; i < n; i++){" + t.replace("_", "((i in this) && fn.call(scope,this[i],i,this))") + "}" + n;
    return Function("fn,scope", r)
  }

  function f(e, t) {
    try {
      for (; t = t.parentNode;)if (t === e)return !0;
      return !1
    } catch (n) {
      return !1
    }
  }

  function p() {
    return (new XMLSerializer).serializeToString(this)
  }

  function d(e, t) {
    if (e && e.childNodes)for (var n, r = e.childNodes, a = 0; n = r[a++];)if (n.tagName) {
      var i = Nt.createElementNS(un, n.tagName.toLowerCase());
      zt.forEach.call(n.attributes, function (e) {
        i.setAttribute(e.name, e.value)
      }), d(n, i), t.appendChild(i)
    }
  }

  function v(e) {
    var t = {};
    for (var n in e)t[n] = e[n];
    var r = t.target = e.srcElement;
    if (0 === e.type.indexOf("key"))t.which = null != e.charCode ? e.charCode : e.keyCode; else if (pn.test(e.type)) {
      var a = r.ownerDocument || Nt, i = "BackCompat" === a.compatMode ? a.body : a.documentElement;
      t.pageX = e.clientX + (i.scrollLeft >> 0) - (i.clientLeft >> 0), t.pageY = e.clientY + (i.scrollTop >> 0) - (i.clientTop >> 0), t.wheelDeltaY = t.wheelDelta, t.wheelDeltaX = 0
    }
    return t.timeStamp = new Date - 0, t.originalEvent = e, t.preventDefault = function () {
      e.returnValue = !1
    }, t.stopPropagation = function () {
      e.cancelBubble = !0
    }, t
  }

  function h(e) {
    for (var t in e)if (It.call(e, t)) {
      var n = e[t];
      "function" == typeof h.plugins[t] ? h.plugins[t](n) : "object" == typeof h[t] ? avalon.mix(h[t], n) : h[t] = n
    }
    return this
  }

  function m(e) {
    return (e + "").replace(wn, "\\$&")
  }

  function g(e, t, n) {
    if (Array.isArray(e)) {
      var r = e.concat();
      e.length = 0;
      var a = O(e);
      return a.pushArray(r), a
    }
    if (!e || e.$id && e.$events || e.nodeType > 0 && e.nodeName)return e;
    var i = Array.isArray(e.$skipArray) ? e.$skipArray : [];
    i.$special = t || {};
    var o = {};
    n = n || {};
    var l = {}, s = {}, c = [];
    An.forEach(function (t) {
      delete e[t]
    });
    var u = Object.keys(e);
    u.forEach(function (t, r) {
      var a = e[t];
      if (n[t] = a, E(t, a, i)) {
        l[t] = [];
        var o = avalon.type(a);
        "object" === o && Qt(a.get) && Object.keys(a).length <= 2 ? (r = x(t, a), c.push(r)) : r = Pt.test(o) ? w(t, a, o, l[t], n) : b(t, a), s[t] = r
      }
    }), o = Nn(o, jn(s), e);
    for (var f = 0; f < u.length; f++) {
      var p = u[f];
      s[p] || (o[p] = e[p])
    }
    y(o, "$id", Jt()), y(o, "$model", n), y(o, "$events", l), _n ? y(o, "hasOwnProperty", function (e) {
      return e in o.$model
    }) : o.hasOwnProperty = function (e) {
      return e in o.$model && "hasOwnProperty" !== e
    };
    for (f in En)y(o, f, En[f].bind(o));
    return o.$reinitialize = function () {
      c.forEach(function (e) {
        delete e._value, delete e.oldArgs, e.digest = function () {
          e.call(o)
        }, Pn.begin({
          callback: function (t, n) {
            var r = n._name;
            if (n !== e) {
              var a = t.$events[r];
              S(a, e.digest)
            }
          }
        });
        try {
          e.get.call(o)
        } finally {
          Pn.end()
        }
      })
    }, o.$reinitialize(), o
  }

  function y(e, t, n) {
    _n ? Object.defineProperty(e, t, {value: n, writable: !0, enumerable: !1, configurable: !0}) : e[t] = n
  }

  function b(e, t) {
    function n(e) {
      var t = n._value;
      return arguments.length > 0 ? (Ht || Mn(e, t) || (n.updateValue(this, e), n.notify(this, e, t)), this) : (Pn.collectDependency(this, n), t)
    }

    return T(n, e), n._value = t, n
  }

  function x(e, t) {
    function n(t) {
      var r = n._value, a = "_value"in n;
      if (arguments.length > 0) {
        if (Ht)return this;
        if ("function" == typeof n.set && n.oldArgs !== t) {
          n.oldArgs = t;
          var i = this.$events, o = i[e];
          i[e] = [], n.set.call(this, t), i[e] = o, t = n.get.call(this), t !== r && (n.updateValue(this, t), n.notify(this, t, r))
        }
        return this
      }
      return t = n.get.call(this), n.updateValue(this, t), a && r !== t && n.notify(this, t, r), t
    }

    return n.set = t.set, n.get = t.get, T(n, e), n
  }

  function w(e, t, n, r, a) {
    function i(t) {
      var r = i._value, a = i._vmodel;
      if (arguments.length > 0) {
        if (Ht)return this;
        if ("array" === n) {
          var o = a, l = t, s = o.length, c = l.length;
          o.$lock = !0, s > c ? o.splice(c, s - c) : c > s && o.push.apply(o, l.slice(s));
          for (var u = Math.min(s, c), f = 0; u > f; f++)o.set(f, l[f]);
          delete o.$lock, o._fire("set")
        } else if ("object" === n) {
          t = t.$model ? t.$model : t;
          var p = this.$events[e] || [], d = avalon.mix(!0, {}, t);
          for (f in a)a.hasOwnProperty(f) && It.call(d, f) && (a[f] = d[f]);
          a = i._vmodel = g(t), a.$events[Lt] = p, p.length && p.forEach(function (e) {
            e.type && (e.rollback && e.rollback(), tn[e.type](e, e.vmodels))
          })
        }
        return i.updateValue(this, a.$model), i.notify(this, this._value, r), this
      }
      return Pn.collectDependency(this, i), a
    }

    T(i, e), a[e] = Array.isArray(t) ? t : a[e] || {};
    var o = i._vmodel = g(t, 0, a[e]);
    return o.$events[Lt] = r, i
  }

  function $(e, t) {
    e.$model[this._name] = this._value = t
  }

  function C(e, t, n) {
    var r = this._name, a = e.$events[r];
    a && (M(a), En.$fire.call(e, r, t, n))
  }

  function T(e, t) {
    e._name = t, e.updateValue = $, e.notify = C
  }

  function E(e, t, n) {
    if (Qt(t) || t && t.nodeName && t.nodeType > 0)return !1;
    if (-1 !== n.indexOf(e))return !1;
    var r = n.$special;
    return e && "$" === e.charAt(0) && !r[e] ? !1 : !0
  }

  function k(e) {
    for (var t = Object.keys(e.$model ? e.$model : e), n = 0; n < An.length; n++) {
      var r = t.indexOf(An[n]);
      -1 !== r && t.splice(r, 1)
    }
    return t
  }

  function A(e, t, n, r) {
    var a = t[n];
    return 4 !== arguments.length ? a.call(e) : void a.call(e, r)
  }

  function O(e) {
    var t = [];
    t.$id = Jt(), t.$model = e, t.$events = {}, t.$events[Lt] = [], t._ = g({length: e.length}), t._.$watch("length", function (e, n) {
      t.$fire("length", e, n)
    });
    for (var n in En)t[n] = En[n];
    return avalon.mix(t, Dn), t
  }

  function _(e, t, n, r, a, i, o) {
    for (var l = this.length, s = 2; --s;) {
      switch (e) {
        case"add":
          var c = this.$model.slice(t, t + n).map(function (e) {
            return Pt.test(avalon.type(e)) ? e.$id ? e : g(e, 0, e) : e
          });
          Hn.apply(this, [t, 0].concat(c)), this._fire("add", t, n);
          break;
        case"del":
          var u = this._splice(t, n);
          this._fire("del", t, n)
      }
      a && (e = a, t = i, n = o, s = 2, a = 0)
    }
    return this._fire("index", r), this.length !== l && (this._.length = this.length), u
  }

  function N(e, t) {
    for (var n = {}, r = 0, a = t.length; a > r; r++) {
      n[r] = e[r];
      var i = t[r];
      i in n ? (e[r] = n[i], delete n[i]) : e[r] = e[i]
    }
  }

  function S(e, t) {
    t.oneTime || e && avalon.Array.ensure(e, t) && t.element && (L(t, e), new Date - In > 444 && H())
  }

  function M(e) {
    if (e && e.length) {
      new Date - In > 444 && "object" == typeof e[0] && H();
      for (var t, n = Ut.call(arguments, 1), r = e.length; t = e[--r];) {
        var a = t.element;
        if (a && a.parentNode)try {
          var i = t.evaluator;
          if (t.$repeat)t.handler.apply(t, n); else if ("$repeat"in t || !i)tn[t.type](t, t.vmodels); else if ("on" !== t.type) {
            var o = i.apply(0, t.args || []);
            t.handler(o, a, t)
          }
        } catch (l) {
          console.log(l)
        }
      }
    }
  }

  function j(e, t) {
    return e.uuid || t || (e.uuid = ++Bn), e.uuid
  }

  function L(e, t) {
    var n = e.element;
    e.uuid || (e.uuid = 1 !== n.nodeType ? e.type + j(n.parentNode) + "-" + ++Bn : e.name + "-" + j(n));
    var r = e.lists || (e.lists = []);
    avalon.Array.ensure(r, t), t.$uuid = t.$uuid || Jt(), Rn[e.uuid] || (Rn[e.uuid] = 1, Rn.push(e))
  }

  function H(e) {
    if (!avalon.optimize) {
      for (var t = Rn.length, n = t, r = [], a = {}, i = {}; e = Rn[--t];) {
        var o = e.type;
        i[o] ? i[o]++ : (i[o] = 1, r.push(o))
      }
      var l = !1;
      if (r.forEach(function (e) {
          Vn[e] !== i[e] && (a[e] = 1, l = !0)
        }), t = n, l)for (; e = Rn[--t];)if (null !== e.element) {
        if (a[e.type] && P(e.element)) {
          Rn.splice(t, 1), delete Rn[e.uuid];
          for (var s, c = e.lists, u = 0; s = c[u++];)avalon.Array.remove(c, s), avalon.Array.remove(s, e);
          D(e)
        }
      } else Rn.splice(t, 1);
      Vn = i, In = new Date
    }
  }

  function D(e) {
    delete Rn[e.uuid], e.element = null, e.rollback && e.rollback();
    for (var t in e)e[t] = null
  }

  function P(e) {
    try {
      {
        e.parentNode.nodeType
      }
    } catch (t) {
      return !0
    }
    return e.ifRemove && !Wt.contains(e.ifRemove) && Mt === e.parentNode ? (e.parentNode && e.parentNode.removeChild(e), !0) : e.msRetain ? 0 : 1 === e.nodeType ? !Wt.contains(e) : !avalon.contains(Wt, e)
  }

  function F(e) {
    var t = e.nodeName;
    return t.toLowerCase() === t && e.scopeName && "" === e.outerText
  }

  function B(e) {
    "url(#default#VML)" !== e.currentStyle.behavior && (e.style.behavior = "url(#default#VML)", e.style.display = "inline-block", e.style.zoom = 1)
  }

  function R(e) {
    return e.replace(/([a-z\d])([A-Z]+)/g, "$1-$2").toLowerCase()
  }

  function I(e) {
    return !e || e.indexOf("-") < 0 && e.indexOf("_") < 0 ? e : e.replace(/[-_][^-_]/g, function (e) {
      return e.charAt(1).toUpperCase()
    })
  }

  function V(e) {
    if (!("classList"in e)) {
      e.classList = {node: e};
      for (var t in Zn)e.classList[t.slice(1)] = Zn[t]
    }
    return e.classList
  }

  function z(e) {
    try {
      if ("object" == typeof e)return e;
      e = "true" === e ? !0 : "false" === e ? !1 : "null" === e ? null : +e + "" === e ? +e : Qn.test(e) ? avalon.parseJSON(e) : e
    } catch (t) {
    }
    return e
  }

  function U(e) {
    return e.window && e.document ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
  }

  function q(e, t) {
    if (e.offsetWidth <= 0) {
      if (dr.test(rr["@:get"](e, "display"))) {
        var n = {node: e};
        for (var r in pr)n[r] = e.style[r], e.style[r] = pr[r];
        t.push(n)
      }
      var a = e.parentNode;
      a && 1 === a.nodeType && q(a, t)
    }
  }

  function W(e) {
    var t = e.tagName.toLowerCase();
    return "input" === t && /checkbox|radio/.test(e.type) ? "checked" : t
  }

  function X(e, t, n, r) {
    for (var a, i = [], o = " = " + n + ".", l = e.length; a = e[--l];)t.hasOwnProperty(a) && (i.push(a + o + a), r.vars.push(a), "duplex" === r.type && (e.get = n + "." + a), e.splice(l, 1));
    return i
  }

  function Y(e) {
    for (var t = [], n = {}, r = 0; r < e.length; r++) {
      var a = e[r], i = a && "string" == typeof a.$id ? a.$id : a;
      n[i] || (n[i] = t.push(a))
    }
    return t
  }

  function G(e, t) {
    return t = t.replace(_r, "").replace(Nr, function () {
        return "],|"
      }).replace(Sr, function (e, t) {
        return "[" + gr(t)
      }).replace(Mr, function () {
        return '"],["'
      }).replace(jr, function () {
        return '",'
      }) + "]", "return this.filters.$filter(" + e + ", " + t + ")"
  }

  function J(e, t, a) {
    var i = a.type, o = a.filters || "", l = t.map(function (e) {
        return String(e.$id).replace(Or, "$1")
      }) + e + i + o, s = Er(e).concat(), c = [], u = [], f = [], p = "";
    t = Y(t), a.vars = [];
    for (var d = 0, v = t.length; v > d; d++)if (s.length) {
      var h = "vm" + _t + "_" + d;
      u.push(h), f.push(t[d]), c.push.apply(c, X(s, t[d], h, a))
    }
    if (c.length || "duplex" !== i) {
      "duplex" !== i && (e.indexOf("||") > -1 || e.indexOf("&&") > -1) && a.vars.forEach(function (t) {
        var n = new RegExp("\\b" + t + "(?:\\.\\w+|\\[\\w+\\])+", "ig");
        e = e.replace(n, function (n, r) {
          var a = n.charAt(t.length), i = e.slice(r + n.length), o = /^\s*\(/.test(i);
          if ("." === a || "[" === a || o) {
            var l = "var" + String(Math.random()).replace(/^0\./, "");
            if (o) {
              var s = n.split(".");
              if (s.length > 2) {
                var u = s.pop();
                return c.push(l + " = " + s.join(".")), l + "." + u
              }
              return n
            }
            return c.push(l + " = " + n), l
          }
          return n
        })
      }), a.args = f, delete a.vars;
      var m = kr.get(l);
      if (m)return void(a.evaluator = m);
      if (p = c.join(", "), p && (p = "var " + p), /\S/.test(o)) {
        if (!/text|html/.test(a.type))throw Error("ms-" + a.type + "不支持过滤器");
        e = "\nvar ret" + _t + " = " + e + ";\r\n", e += G("ret" + _t, o);
        try {
          m = Function.apply(r, u.concat("'use strict';\n" + p + e)), a.evaluator = kr.put(l, function () {
            return m.apply(avalon, arguments)
          })
        } catch (g) {
          n("debug: parse error," + g.message)
        }
        return void(s = c = u = null)
      }
      if ("duplex" === i) {
        var y = "'use strict';\nreturn function(vvv){\n	" + p + ";\n	if(!arguments.length){\n		return " + e + "\n	}\n	" + (Ar.test(e) ? e : s.get) + "= vvv;\n} ";
        try {
          m = Function.apply(r, u.concat(y)), a.evaluator = kr.put(l, m)
        } catch (g) {
          n("debug: parse error," + g.message)
        }
        return void(s = c = u = null)
      }
      if ("on" === i) {
        -1 === e.indexOf("(") ? e += ".call(this, $event)" : e = e.replace("(", ".call(this,"), u.push("$event"), e = "\nreturn " + e + ";";
        var b = e.lastIndexOf("\nreturn"), x = e.slice(0, b), w = e.slice(b);
        e = x + "\n" + w
      } else e = "\nreturn " + e + ";";
      try {
        m = Function.apply(r, u.concat("'use strict';\n" + p + e)), a.evaluator = kr.put(l, m)
      } catch (g) {
        n("debug: parse error," + g.message)
      }
      s = c = u = null
    }
  }

  function Z(e) {
    var t = yn.test(e);
    if (t) {
      var n = st(e);
      return 1 === n.length ? n[0].value : n.map(function (e) {
        return e.expr ? "(" + e.value + ")" : gr(e.value)
      }).join(" + ")
    }
    return e
  }

  function Q(e, t, n, r) {
    e = e || "", J(e, t, n), n.evaluator && !r && (n.handler = nn[n.handlerName || n.type], avalon.injectBinding(n))
  }

  function K(e, t, n) {
    var r = setTimeout(function () {
      var a = e.innerHTML;
      clearTimeout(r), a === n ? t() : K(e, t, a)
    })
  }

  function et(e, t) {
    var n = e.getAttribute("avalonctrl") || t.$id;
    e.setAttribute("avalonctrl", n), t.$events.expr = e.tagName + '[avalonctrl="' + n + '"]'
  }

  function tt(e, t) {
    for (var n, r = 0; n = e[r++];)n.vmodels = t, tn[n.type](n, t), n.evaluator && n.element && 1 === n.element.nodeType && n.element.removeAttribute(n.name);
    e.length = 0
  }

  function nt(e, t) {
    return e.priority - t.priority
  }

  function rt(e, t, r) {
    var a = !0;
    if (t.length) {
      for (var i, o = Gr ? Gr(e) : e.attributes, l = [], s = [], c = {}, u = {}, f = 0; i = o[f++];)if (i.specified && (r = i.name.match(Fr))) {
        var p = r[1], d = r[2] || "", v = i.value, h = i.name;
        if (u[h])continue;
        if (u[h] = 1, Rr[p] ? (d = p, p = "on") : Ir[p] && ("enabled" === p && (n("warning!ms-enabled或ms-attr-enabled已经被废弃"), p = "disabled", v = "!(" + v + ")"), d = p, p = "attr", h = "ms-" + p + "-" + d, s.push([i.name, h, v])), c[h] = v, "function" == typeof tn[p]) {
          var m = v.replace(Pr, ""), g = v !== m, y = {
            type: p,
            param: d,
            element: e,
            name: h,
            value: m,
            oneTime: g,
            uuid: h + "-" + j(e),
            priority: (Br[p] || 10 * p.charCodeAt(0)) + (Number(d.replace(/\D/g, "")) || 0)
          };
          if ("html" === p || "text" === p) {
            var b = lt(v);
            avalon.mix(y, b), y.filters = y.filters.replace(Jr, function () {
              return y.type = "html", y.group = 1, ""
            })
          } else if ("duplex" === p)var x = h; else"ms-if-loop" === h && (y.priority += 100);
          l.push(y), "widget" === p && (e.msData = e.msData || c)
        }
      }
      if (l.length) {
        for (l.sort(nt), s.forEach(function (t) {
          n("warning!请改用" + t[1] + "代替" + t[0] + "!"), e.removeAttribute(t[0]), e.setAttribute(t[1], t[2])
        }), x && c["ms-attr-value"] && !e.scopeName && "text" === e.type && n("warning!一个控件不能同时定义ms-attr-value与" + x), f = 0; y = l[f]; f++) {
          if (p = y.type, Vr.test(p))return tt(l.slice(0, f + 1), t);
          a && (a = !zr.test(p))
        }
        tt(l, t)
      }
    }
    a && !Lr[e.tagName] && xn.test(e.innerHTML.replace(Qr, "<").replace(Kr, ">")) && (Dr && Dr(e), at(e, t))
  }

  function at(e, t) {
    var n = avalon.slice(e.childNodes);
    it(n, t)
  }

  function it(e, t) {
    for (var n, r = 0; n = e[r++];)switch (n.nodeType) {
      case 1:
        ot(n, t), n.msCallback && (n.msCallback(), n.msCallback = void 0);
        break;
      case 3:
        yn.test(n.nodeValue) && ct(n, t, r)
    }
  }

  function ot(e, t, r) {
    var a = e.getAttribute("ms-skip");
    if (!e.getAttributeNode)return n("warning " + e.tagName + " no getAttributeNode method");
    var i = e.getAttributeNode("ms-important"), o = e.getAttributeNode("ms-controller");
    if ("string" != typeof a) {
      if (r = i || o) {
        var l = avalon.vmodels[r.value];
        if (!l)return;
        t = r === i ? [l] : [l].concat(t);
        var s = r.name;
        e.removeAttribute(s), avalon(e).removeClass(s), et(e, l)
      }
      rt(e, t)
    }
  }

  function lt(e) {
    if (e.indexOf("|") > 0) {
      var t = e.replace(ea, function (e) {
        return Array(e.length + 1).join("1")
      }), n = t.replace(Zr, "ᄢ㍄").indexOf("|");
      if (n > -1)return {filters: e.slice(n), value: e.slice(0, n), expr: !0}
    }
    return {value: e, filters: "", expr: !0}
  }

  function st(e) {
    for (var t, n, r = [], a = 0; ;) {
      if (n = e.indexOf(mn, a), -1 === n)break;
      if (t = e.slice(a, n), t && r.push({
          value: t,
          filters: "",
          expr: !1
        }), a = n + mn.length, n = e.indexOf(gn, a), -1 === n)break;
      t = e.slice(a, n), t && r.push(lt(t)), a = n + gn.length
    }
    return t = e.slice(a), t && r.push({value: t, expr: !1, filters: ""}), r
  }

  function ct(e, t) {
    var n = [], r = st(e.data);
    if (r.length) {
      for (var a, i = 0; a = r[i++];) {
        var o = Nt.createTextNode(a.value);
        a.expr && (a.value = a.value.replace(Pr, function () {
          return a.oneTime = !0, ""
        }), a.type = "text", a.element = o, a.filters = a.filters.replace(Jr, function () {
          return a.type = "html", ""
        }), n.push(a)), Xt.appendChild(o)
      }
      e.parentNode.replaceChild(Xt, e), n.length && tt(n, t)
    }
  }

  function ut(e, t, n) {
    var r = e.templateCache && e.templateCache[t];
    if (r) {
      for (var a, i = Nt.createDocumentFragment(); a = r.firstChild;)i.appendChild(a);
      return i
    }
    return avalon.parseHTML(n)
  }

  function ft(e) {
    return null == e ? "" : e
  }

  function pt(e, t, n) {
    return t.param.replace(/\w+/g, function (r) {
      var a = avalon.duplexHooks[r];
      a && "function" == typeof a[n] && (e = a[n](e, t))
    }), e
  }

  function dt() {
    for (var e = fa.length - 1; e >= 0; e--) {
      var t = fa[e];
      t() === !1 && fa.splice(e, 1)
    }
    fa.length || clearInterval(ua)
  }

  function vt(e) {
    var t = 0 / 0, n = 0 / 0;
    if (e.setSelectionRange)t = e.selectionStart, n = e.selectionEnd; else {
      var r = document.selection.createRange();
      t = 0 - r.duplicate().moveStart("character", -1e5), n = t + r.text.length
    }
    return {start: t, end: n}
  }

  function ht(e, t, n) {
    if (e.value && !e.readOnly)if (e.createTextRange) {
      var r = e.createTextRange();
      r.collapse(!0), r.moveStart("character", t), r.select()
    } else e.selectionStart = t, e.selectionEnd = n
  }

  function mt(e, t, n, r) {
    var a = e.template.cloneNode(!0), i = avalon.slice(a.childNodes);
    a.insertBefore(Nt.createComment(e.signature), a.firstChild), t.appendChild(a);
    var o = [n].concat(e.vmodels), l = {nodes: i, vmodels: o};
    r.push(l)
  }

  function gt(e) {
    for (var t, n = [], r = e.element.parentNode.childNodes, a = 0; t = r[a++];)if (t.nodeValue === e.signature)n.push(t); else if (t.nodeValue === e.signature + ":end")break;
    return n
  }

  function yt(e, t, n) {
    for (; ;) {
      var r = t.previousSibling;
      if (!r)break;
      if (r.parentNode.removeChild(r), n && n.call(r), r === e)break
    }
  }

  function bt() {
    var e = g({
      $key: "", $outer: {}, $host: {}, $val: {
        get: function () {
          return this.$host[this.$key]
        }, set: function (e) {
          this.$host[this.$key] = e
        }
      }
    }, {$val: 1});
    return e.$id = Jt("$proxy$with"), e
  }

  function xt(e, t, n) {
    e = e || ha.pop(), e ? e.$reinitialize() : e = bt();
    var r = n.$repeat;
    return e.$key = t, e.$host = r, e.$outer = n.$outer, r.$events ? e.$events.$val = r.$events[t] : e.$events = {}, e
  }

  function wt(e) {
    $t(e)
  }

  function $t(e) {
    e.forEach(function (e) {
      Et(e, ma)
    }), e.length = 0
  }

  function Ct(e) {
    var t = {$host: [], $outer: {}, $index: 0, $first: !1, $last: !1, $remove: avalon.noop};
    t[e] = {
      get: function () {
        var t = this.$events, n = t.$index;
        t.$index = t[e];
        try {
          return this.$host[this.$index]
        } finally {
          t.$index = n
        }
      }, set: function (e) {
        try {
          var t = this.$events, n = t.$index;
          t.$index = [], this.$host.set(this.$index, e)
        } finally {
          t.$index = n
        }
      }
    };
    var n = {$last: 1, $first: 1, $index: 1}, r = g(t, n);
    return r.$id = Jt("$proxy$each"), r
  }

  function Tt(e, t) {
    for (var n, r = t.param || "el", a = 0, i = ma.length; i > a; a++) {
      var o = ma[a];
      o && o.hasOwnProperty(r) && (n = o, ma.splice(a, 1))
    }
    n || (n = Ct(r));
    var l = t.$repeat, s = l.length - 1;
    return n.$index = e, n.$first = 0 === e, n.$last = e === s, n.$host = l, n.$outer = t.$outer, n.$remove = function () {
      return l.removeAt(n.$index)
    }, n
  }

  function Et(e, t) {
    for (var n in e.$events) {
      var r = e.$events[n];
      Array.isArray(r) && (r.forEach(function (e) {
        "object" == typeof e && D(e)
      }), r.length = 0)
    }
    e.$host = e.$outer = {}, t.unshift(e) > h.maxRepeatSize && t.pop()
  }

  function kt(e, t) {
    var n = "_" + e;
    if (!kt[n]) {
      var r = Nt.createElement(e);
      Wt.appendChild(r), t = qt ? getComputedStyle(r, null).display : r.currentStyle.display, Wt.removeChild(r), kt[n] = t
    }
    return kt[n]
  }

  function At(e, t, n, r) {
    e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
    var a = isFinite(+e) ? +e : 0, i = isFinite(+t) ? Math.abs(t) : 3, o = r || ",", l = n || ".", s = "", c = function (e, t) {
      var n = Math.pow(10, t);
      return "" + (Math.round(e * n) / n).toFixed(t)
    };
    return s = (i ? c(a, i) : "" + Math.round(a)).split("."), s[0].length > 3 && (s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, o)), (s[1] || "").length < i && (s[1] = s[1] || "", s[1] += new Array(i - s[1].length + 1).join("0")), s.join(l)
  }

  function Ot() {
    try {
      Wt.doScroll("left"), Sa()
    } catch (e) {
      setTimeout(Ot)
    }
  }

  var _t = new Date - 0, Nt = e.document, St = Nt.getElementsByTagName("head")[0], Mt = St.insertBefore(document.createElement("avalon"), St.firstChild);
  Mt.innerHTML = "X<style id='avalonStyle'>.avalonHide{ display: none!important }</style>", Mt.setAttribute("ms-skip", "1"), Mt.className = "avalonHide";
  var jt = /\[native code\]/, Lt = "$" + _t, Ht = !1, Dt = /[^, ]+/g, Pt = /^(?:object|array)$/, Ft = /^\[object SVG\w*Element\]$/, Bt = /^\[object (?:Window|DOMWindow|global)\]$/, Rt = Object.prototype, It = Rt.hasOwnProperty, Vt = Rt.toString, zt = Array.prototype, Ut = zt.slice, qt = e.dispatchEvent, Wt = Nt.documentElement, Xt = Nt.createDocumentFragment(), Yt = Nt.createElement("div"), Gt = {};
  "Boolean Number String Function Array Date RegExp Object Error".replace(Dt, function (e) {
    Gt["[object " + e + "]"] = e.toLowerCase()
  });
  var Jt = function (e) {
    return e = e || "avalon", String(Math.random() + Math.random()).replace(/\d\.\d{4}/, e)
  }, Zt = o();
  avalon = function (e) {
    return new avalon.init(e)
  }, avalon.profile = function () {
    e.console && avalon.config.profile && Function.apply.call(console.log, console, arguments)
  }, avalon.nextTick = new function () {
    function t() {
      for (var e = a.length, t = 0; e > t; t++)a[t]();
      a = a.slice(e)
    }

    var n = e.setImmediate, r = e.MutationObserver;
    if (n)return n.bind(e);
    var a = [];
    if (r) {
      var i = document.createTextNode("avalon");
      return new r(t).observe(i, {characterData: !0}), function (e) {
        a.push(e), i.data = Math.random()
      }
    }
    return e.VBArray ? function (e) {
      a.push(e);
      var n = Nt.createElement("script");
      n.onreadystatechange = function () {
        t(), n.onreadystatechange = null, St.removeChild(n), n = null
      }, St.appendChild(n)
    } : function (e) {
      setTimeout(e, 4)
    }
  }, avalon.init = function (e) {
    this[0] = this.element = e
  }, avalon.fn = avalon.prototype = avalon.init.prototype, avalon.type = function (e) {
    return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? Gt[Vt.call(e)] || "object" : typeof e
  };
  var Qt = "object" == typeof alert ? function (e) {
    try {
      return /^\s*\bfunction\b/.test(e + "")
    } catch (t) {
      return !1
    }
  } : function (e) {
    return "[object Function]" === Vt.call(e)
  };
  avalon.isFunction = Qt, avalon.isWindow = function (e) {
    return e ? e == e.document && e.document != e : !1
  }, l(e) && (avalon.isWindow = l);
  var Kt;
  for (Kt in avalon({}))break;
  var en = "0" !== Kt;
  avalon.isPlainObject = function (e, t) {
    if (!e || "object" !== avalon.type(e) || e.nodeType || avalon.isWindow(e))return !1;
    try {
      if (e.constructor && !It.call(e, "constructor") && !It.call(e.constructor.prototype, "isPrototypeOf"))return !1
    } catch (n) {
      return !1
    }
    if (en)for (t in e)return It.call(e, t);
    for (t in e);
    return void 0 === t || It.call(e, t)
  }, jt.test(Object.getPrototypeOf) && (avalon.isPlainObject = function (e) {
    return "[object Object]" === Vt.call(e) && Object.getPrototypeOf(e) === Rt
  }), avalon.mix = avalon.fn.mix = function () {
    var e, t, n, r, a, i, o = arguments[0] || {}, l = 1, s = arguments.length, c = !1;
    for ("boolean" == typeof o && (c = o, o = arguments[1] || {}, l++), "object" == typeof o || Qt(o) || (o = {}), l === s && (o = this, l--); s > l; l++)if (null != (e = arguments[l]))for (t in e) {
      n = o[t];
      try {
        r = e[t]
      } catch (u) {
        continue
      }
      o !== r && (c && r && (avalon.isPlainObject(r) || (a = Array.isArray(r))) ? (a ? (a = !1, i = n && Array.isArray(n) ? n : []) : i = n && avalon.isPlainObject(n) ? n : {}, o[t] = avalon.mix(c, i, r)) : void 0 !== r && (o[t] = r))
    }
    return o
  }, avalon.mix({
    rword: Dt, subscribers: Lt, version: 1.471, ui: {}, log: n, slice: qt ? function (e, t, n) {
      return Ut.call(e, t, n)
    } : function (e, t, n) {
      var r = [], a = e.length;
      if (void 0 === n && (n = a), "number" == typeof n && isFinite(n)) {
        t = s(t, a), n = s(n, a);
        for (var i = t; n > i; ++i)r[i - t] = e[i]
      }
      return r
    }, noop: r, error: function (e, t) {
      throw(t || Error)(e)
    }, oneObject: i, range: function (e, t, n) {
      n || (n = 1), null == t && (t = e || 0, e = 0);
      for (var r = -1, a = Math.max(0, Math.ceil((t - e) / n)), i = new Array(a); ++r < a;)i[r] = e, e += n;
      return i
    }, eventHooks: [], bind: function (e, t, n, r) {
      var a = avalon.eventHooks, i = a[t];
      "object" == typeof i && (t = i.type || t, r = i.phase || !!r, n = i.fn ? i.fn(e, n) : n);
      var o = qt ? n : function (t) {
        n.call(e, v(t))
      };
      return qt ? e.addEventListener(t, o, r) : e.attachEvent("on" + t, o), o
    }, unbind: function (e, t, n, a) {
      var i = avalon.eventHooks, o = i[t], l = n || r;
      "object" == typeof o && (t = o.type || t, a = o.phase || !!a), qt ? e.removeEventListener(t, l, a) : e.detachEvent("on" + t, l)
    }, css: function (e, t, n) {
      e instanceof avalon && (e = e[0]);
      var r, a = /[_-]/.test(t) ? I(t) : t;
      if (t = avalon.cssName(a) || a, void 0 === n || "boolean" == typeof n) {
        r = rr[a + ":get"] || rr["@:get"], "background" === t && (t = "backgroundColor");
        var i = r(e, t);
        return n === !0 ? parseFloat(i) || 0 : i
      }
      if ("" === n)e.style[t] = ""; else {
        if (null == n || n !== n)return;
        isFinite(n) && !avalon.cssNumber[a] && (n += "px"), r = rr[a + ":set"] || rr["@:set"], r(e, t, n)
      }
    }, each: function (e, t) {
      if (e) {
        var n = 0;
        if (c(e))for (var r = e.length; r > n && t(n, e[n]) !== !1; n++); else for (n in e)if (e.hasOwnProperty(n) && t(n, e[n]) === !1)break
      }
    }, getWidgetData: function (e, t) {
      var n = avalon(e).data(), r = {};
      for (var a in n)0 === a.indexOf(t) && (r[a.replace(t, "").replace(/\w/, function (e) {
        return e.toLowerCase()
      })] = n[a]);
      return r
    }, Array: {
      ensure: function (e, t) {
        return -1 === e.indexOf(t) ? e.push(t) : void 0
      }, removeAt: function (e, t) {
        return !!e.splice(t, 1).length
      }, remove: function (e, t) {
        var n = e.indexOf(t);
        return ~n ? avalon.Array.removeAt(e, n) : !1
      }
    }
  });
  var tn = avalon.bindingHandlers = {}, nn = avalon.bindingExecutors = {}, rn = new function () {
    function e(e) {
      this.size = 0, this.limit = e, this.head = this.tail = void 0, this._keymap = {}
    }

    var t = e.prototype;
    return t.put = function (e, t) {
      var n = {key: e, value: t};
      return this._keymap[e] = n, this.tail ? (this.tail.newer = n, n.older = this.tail) : this.head = n, this.tail = n, this.size === this.limit ? this.shift() : this.size++, t
    }, t.shift = function () {
      var e = this.head;
      e && (this.head = this.head.newer, this.head.older = e.newer = e.older = this._keymap[e.key] = void 0, delete this._keymap[e.key])
    }, t.get = function (e) {
      var t = this._keymap[e];
      if (void 0 !== t)return t === this.tail ? t.value : (t.newer && (t === this.head && (this.head = t.newer), t.newer.older = t.older), t.older && (t.older.newer = t.newer), t.newer = void 0, t.older = this.tail, this.tail && (this.tail.newer = t), this.tail = t, t.value)
    }, e
  };
  if (!"司徒正美".trim) {
    var an = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function () {
      return this.replace(an, "")
    }
  }
  var on = !{toString: null}.propertyIsEnumerable("toString"), ln = function () {
  }.propertyIsEnumerable("prototype"), sn = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], cn = sn.length;
  if (Object.keys || (Object.keys = function (e) {
      var t = [], n = ln && "function" == typeof e;
      if ("string" == typeof e || e && e.callee)for (var r = 0; r < e.length; ++r)t.push(String(r)); else for (var a in e)n && "prototype" === a || !It.call(e, a) || t.push(String(a));
      if (on)for (var i = e.constructor, o = i && i.prototype === e, l = 0; cn > l; l++) {
        var s = sn[l];
        o && "constructor" === s || !It.call(e, s) || t.push(s)
      }
      return t
    }), Array.isArray || (Array.isArray = function (e) {
      return "[object Array]" === Vt.call(e)
    }), r.bind || (Function.prototype.bind = function (e) {
      if (arguments.length < 2 && void 0 === e)return this;
      var t = this, n = arguments;
      return function () {
        var r, a = [];
        for (r = 1; r < n.length; r++)a.push(n[r]);
        for (r = 0; r < arguments.length; r++)a.push(arguments[r]);
        return t.apply(e, a)
      }
    }), jt.test([].map) || avalon.mix(zt, {
      indexOf: function (e, t) {
        var n = this.length, r = ~~t;
        for (0 > r && (r += n); n > r; r++)if (this[r] === e)return r;
        return -1
      },
      lastIndexOf: function (e, t) {
        var n = this.length, r = null == t ? n - 1 : t;
        for (0 > r && (r = Math.max(0, n + r)); r >= 0; r--)if (this[r] === e)return r;
        return -1
      },
      forEach: u("", "_", ""),
      filter: u("r=[],j=0,", "if(_)r[j++]=this[i]", "return r"),
      map: u("r=[],", "r[i]=_", "return r"),
      some: u("", "if(_)return true", "return false"),
      every: u("", "if(!_)return false", "return true")
    }), avalon.contains = f, Nt.contains || (Nt.contains = function (e) {
      return f(Nt, e)
    }), e.SVGElement) {
    Nt.createTextNode("x").contains || (Node.prototype.contains = function (e) {
      return !!(16 & this.compareDocumentPosition(e))
    });
    var un = "http://www.w3.org/2000/svg", fn = Nt.createElementNS(un, "svg");
    fn.innerHTML = '<circle cx="50" cy="50" r="40" fill="red" />', Ft.test(fn.firstChild) || Object.defineProperties(SVGElement.prototype, {
      outerHTML: {
        enumerable: !0,
        configurable: !0,
        get: p,
        set: function (e) {
          var t = this.tagName.toLowerCase(), n = this.parentNode, r = avalon.parseHTML(e);
          if ("svg" === t)n.insertBefore(r, this); else {
            var a = Nt.createDocumentFragment();
            d(r, a), n.insertBefore(a, this)
          }
          n.removeChild(this)
        }
      }, innerHTML: {
        enumerable: !0, configurable: !0, get: function () {
          var e = this.outerHTML, t = new RegExp("<" + this.nodeName + '\\b(?:(["\'])[^"]*?(\\1)|[^>])*>', "i"), n = new RegExp("</" + this.nodeName + ">$", "i");
          return e.replace(t, "").replace(n, "")
        }, set: function (e) {
          if (avalon.clearHTML) {
            avalon.clearHTML(this);
            var t = avalon.parseHTML(e);
            d(t, this)
          }
        }
      }
    })
  }
  !Wt.outerHTML && e.HTMLElement && HTMLElement.prototype.__defineGetter__("outerHTML", p);
  var pn = /^(?:mouse|contextmenu|drag)|click/, dn = avalon.eventHooks;
  if ("onmouseenter"in Wt || avalon.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
      dn[e] = {
        type: t, fn: function (t, n) {
          return function (r) {
            var a = r.relatedTarget;
            return a && (a === t || 16 & t.compareDocumentPosition(a)) ? void 0 : (delete r.type, r.type = e, n.call(t, r))
          }
        }
      }
    }), avalon.each({AnimationEvent: "animationend", WebKitAnimationEvent: "webkitAnimationEnd"}, function (t, n) {
      e[t] && !dn.animationend && (dn.animationend = {type: n})
    }), "oninput"in Nt.createElement("input") || (dn.input = {
      type: "propertychange", fn: function (e, t) {
        return function (n) {
          return "value" === n.propertyName ? (n.type = "input", t.call(e, n)) : void 0
        }
      }
    }), void 0 === Nt.onmousewheel) {
    var vn = void 0 !== Nt.onwheel ? "wheel" : "DOMMouseScroll", hn = "wheel" === vn ? "deltaY" : "detail";
    dn.mousewheel = {
      type: vn, fn: function (e, t) {
        return function (n) {
          n.wheelDeltaY = n.wheelDelta = n[hn] > 0 ? -120 : 120, n.wheelDeltaX = 0, Object.defineProperty && Object.defineProperty(n, "type", {value: "mousewheel"}), t.call(e, n)
        }
      }
    }
  }
  var mn, gn, yn, bn, xn, wn = /[-.*+?^${}()|[\]\/\\]/g, $n = {
    interpolate: function (e) {
      if (mn = e[0], gn = e[1], mn === gn)throw new SyntaxError("openTag===closeTag");
      var t = mn + "test" + gn;
      if (Yt.innerHTML = t, Yt.innerHTML !== t && Yt.innerHTML.indexOf("&lt;") > -1)throw new SyntaxError("此定界符不合法");
      h.openTag = mn, h.closeTag = gn, Yt.innerHTML = "";
      var n = m(mn), r = m(gn);
      yn = new RegExp(n + "(.*?)" + r), bn = new RegExp(n + "(.*?)" + r, "g"), xn = new RegExp(n + ".*?" + r + "|\\sms-")
    }
  };
  h.debug = !0, h.plugins = $n, h.plugins.interpolate(["{{", "}}"]), h.paths = {}, h.shim = {}, h.maxRepeatSize = 100, avalon.config = h;
  var Cn = /(\w+)\[(avalonctrl)="(\S+)"\]/, Tn = Nt.querySelectorAll ? function (e) {
    return Nt.querySelectorAll(e)
  } : function (e) {
    for (var t, n = e.match(Cn), r = Nt.getElementsByTagName(n[1]), a = [], i = 0; t = r[i++];)t.getAttribute(n[2]) === n[3] && a.push(t);
    return a
  }, En = {
    $watch: function (e, t) {
      if ("function" == typeof t) {
        var n = this.$events[e];
        n ? n.push(t) : this.$events[e] = [t]
      } else this.$events = this.$watch.backup;
      return this
    }, $unwatch: function (e, t) {
      var n = arguments.length;
      if (0 === n)this.$watch.backup = this.$events, this.$events = {}; else if (1 === n)this.$events[e] = []; else for (var r = this.$events[e] || [], a = r.length; ~--a < 0;)if (r[a] === t)return r.splice(a, 1);
      return this
    }, $fire: function (e) {
      var t, n, r, a;
      /^(\w+)!(\S+)$/.test(e) && (t = RegExp.$1, e = RegExp.$2);
      var i = this.$events;
      if (i) {
        var o = Ut.call(arguments, 1), l = [e].concat(o);
        if ("all" === t)for (n in avalon.vmodels)r = avalon.vmodels[n], r !== this && r.$fire.apply(r, l); else if ("up" === t || "down" === t) {
          var s = i.expr ? Tn(i.expr) : [];
          if (0 === s.length)return;
          for (n in avalon.vmodels)if (r = avalon.vmodels[n], r !== this && r.$events.expr) {
            var c = Tn(r.$events.expr);
            if (0 === c.length)continue;
            zt.forEach.call(c, function (e) {
              zt.forEach.call(s, function (n) {
                var a = "down" === t ? n.contains(e) : e.contains(n);
                a && (e._avalon = r)
              })
            })
          }
          var u = Nt.getElementsByTagName("*"), f = [];
          for (zt.forEach.call(u, function (e) {
            e._avalon && (f.push(e._avalon), e._avalon = "", e.removeAttribute("_avalon"))
          }), "up" === t && f.reverse(), n = 0; (a = f[n++]) && a.$fire.apply(a, l) !== !1;);
        } else {
          var p = i[e] || [], d = i.$all || [];
          for (n = 0; a = p[n++];)Qt(a) && a.apply(this, o);
          for (n = 0; a = d[n++];)Qt(a) && a.apply(this, arguments)
        }
      }
    }
  }, kn = avalon.vmodels = {};
  avalon.define = function (e, t) {
    var a = e.$id || e;
    if (a || n("warning: vm必须指定$id"), kn[a] && n("warning: " + a + " 已经存在于avalon.vmodels中"), "object" == typeof e)var i = g(e); else {
      var o = {$watch: r};
      t(o), i = g(o), Ht = !0, t(i), Ht = !1
    }
    return i.$id = a, kn[a] = i
  };
  var An = String("$id,$watch,$unwatch,$fire,$events,$model,$skipArray,$reinitialize").match(Dt), On = Object.defineProperty, _n = !0;
  try {
    On({}, "_", {value: "x"});
    var Nn = Object.defineProperties
  } catch (Sn) {
    _n = !1
  }
  var Mn = Object.is || function (e, t) {
      return 0 === e && 0 === t ? 1 / e === 1 / t : e !== e ? t !== t : e === t
    }, jn = qt ? function (e) {
    var t = {};
    for (var n in e)t[n] = {get: e[n], set: e[n], enumerable: !0, configurable: !0};
    return t
  } : function (e) {
    return e
  };
  if (!_n && ("__defineGetter__"in avalon && (On = function (e, t, n) {
      return "value"in n && (e[t] = n.value), "get"in n && e.__defineGetter__(t, n.get), "set"in n && e.__defineSetter__(t, n.set), e
    }, Nn = function (e, t) {
      for (var n in t)t.hasOwnProperty(n) && On(e, n, t[n]);
      return e
    }), Zt)) {
    var Ln = {};
    e.execScript(["Function parseVB(code)", "	ExecuteGlobal(code)", "End Function"].join("\n"), "VBScript"), Nn = function (t, n, r) {
      var a = [];
      a.push("\r\n	Private [__data__], [__proxy__]", "	Public Default Function [__const__](d" + _t + ", p" + _t + ")", "		Set [__data__] = d" + _t + ": set [__proxy__] = p" + _t, "		Set [__const__] = Me", "	End Function");
      for (t in r)n.hasOwnProperty(t) || a.push("	Public [" + t + "]");
      An.forEach(function (e) {
        n.hasOwnProperty(e) || a.push("	Public [" + e + "]")
      }), a.push("	Public [hasOwnProperty]");
      for (t in n)a.push("	Public Property Let [" + t + "](val" + _t + ")", '		Call [__proxy__](Me,[__data__], "' + t + '", val' + _t + ")", "	End Property", "	Public Property Set [" + t + "](val" + _t + ")", '		Call [__proxy__](Me,[__data__], "' + t + '", val' + _t + ")", "	End Property", "	Public Property Get [" + t + "]", "	On Error Resume Next", "		Set[" + t + '] = [__proxy__](Me,[__data__],"' + t + '")', "	If Err.Number <> 0 Then", "		[" + t + '] = [__proxy__](Me,[__data__],"' + t + '")', "	End If", "	On Error Goto 0", "	End Property");
      a.push("End Class");
      var i = a.join("\r\n"), o = Ln[i];
      o || (o = Jt("VBClass"), e.parseVB("Class " + o + i), e.parseVB(["Function " + o + "Factory(a, b)", "	Dim o", "	Set o = (New " + o + ")(a, b)", "	Set " + o + "Factory = o", "End Function"].join("\r\n")), Ln[i] = o);
      var l = e[o + "Factory"](n, A);
      return l
    }
  }
  var Hn = zt.splice, Dn = {
    _splice: Hn, _fire: function (e, t, n) {
      M(this.$events[Lt], e, t, n)
    }, size: function () {
      return this._.length
    }, pushArray: function (e) {
      var t = e.length, n = this.length;
      return t && (zt.push.apply(this.$model, e), _.call(this, "add", n, t, Math.max(0, n - 1))), t + n
    }, push: function () {
      var e, t = [], n = arguments.length;
      for (e = 0; n > e; e++)t[e] = arguments[e];
      return this.pushArray(t)
    }, unshift: function () {
      var e = arguments.length, t = this.length;
      return e && (zt.unshift.apply(this.$model, arguments), _.call(this, "add", 0, e, 0)), e + t
    }, shift: function () {
      if (this.length) {
        var e = this.$model.shift();
        return _.call(this, "del", 0, 1, 0), e
      }
    }, pop: function () {
      var e = this.length;
      if (e) {
        var t = this.$model.pop();
        return _.call(this, "del", e - 1, 1, Math.max(0, e - 2)), t
      }
    }, splice: function (e) {
      var t, n = arguments.length, r = [], a = Hn.apply(this.$model, arguments);
      return a.length && (r.push("del", e, a.length, 0), t = !0), n > 2 && (t ? r.splice(3, 1, 0, "add", e, n - 2) : r.push("add", e, n - 2, 0), t = !0), t ? _.apply(this, r) : []
    }, contains: function (e) {
      return -1 !== this.indexOf(e)
    }, remove: function (e) {
      return this.removeAt(this.indexOf(e))
    }, removeAt: function (e) {
      return e >= 0 ? (this.$model.splice(e, 1), _.call(this, "del", e, 1, 0)) : []
    }, clear: function () {
      return this.$model.length = this.length = this._.length = 0, this._fire("clear", 0), this
    }, removeAll: function (e) {
      if (Array.isArray(e))for (var t = this.length - 1; t >= 0; t--)-1 !== e.indexOf(this[t]) && this.removeAt(t); else if ("function" == typeof e)for (t = this.length - 1; t >= 0; t--) {
        var n = this[t];
        e(n, t) && this.removeAt(t)
      } else this.clear()
    }, ensure: function (e) {
      return this.contains(e) || this.push(e), this
    }, set: function (e, t) {
      if (e < this.length && e > -1) {
        var n = avalon.type(t);
        t && t.$model && (t = t.$model);
        var r = this[e];
        if ("object" === n)for (var a in t)r.hasOwnProperty(a) && (r[a] = t[a]); else"array" === n ? r.clear().push.apply(r, t) : r !== t && (this[e] = t, this.$model[e] = t, this._fire("set", e, t))
      }
      return this
    }
  };
  "sort,reverse".replace(Dt, function (e) {
    Dn[e] = function () {
      var t, n = this.$model, r = n.concat(), a = Math.random(), i = [];
      zt[e].apply(n, arguments);
      for (var o = 0, l = r.length; l > o; o++) {
        var s = n[o], c = r[o];
        if (Mn(s, c))i.push(o); else {
          var u = r.indexOf(s);
          i.push(u), r[u] = a, t = !0
        }
      }
      return t && (N(this, i), this._fire("move", i), this._fire("index", 0)), this
    }
  });
  var Pn = function () {
    var e, t = [];
    return {
      begin: function (n) {
        t.push(e), e = n
      }, end: function () {
        e = t.pop()
      }, collectDependency: function (t, n) {
        e && e.callback(t, n)
      }
    }
  }(), Fn = /^(duplex|on)$/;
  avalon.injectBinding = function (e) {
    var t = e.evaluator;
    if (t) {
      Pn.begin({
        callback: function (t, n) {
          S(t.$events[n._name], e)
        }
      });
      try {
        var r = Fn.test(e.type) ? e : t.apply(0, e.args);
        void 0 === r && delete e.evaluator, e.handler && e.handler(r, e.element, e)
      } catch (a) {
        n("warning:exception throwed in [avalon.injectBinding] ", a), delete e.evaluator;
        var i = e.element;
        if (i && 3 === i.nodeType) {
          var o = i.parentNode;
          h.commentInterpolate ? o.replaceChild(Nt.createComment(e.value), i) : i.data = mn + (e.oneTime ? "::" : "") + e.value + gn
        }
      } finally {
        Pn.end()
      }
    }
  };
  var Bn = 0, Rn = avalon.$$subscribers = [], In = new Date, Vn = {}, zn = {
    area: [1, "<map>", "</map>"],
    param: [1, "<object>", "</object>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table>", "</table>"],
    td: [3, "<table><tr>", "</tr></table>"],
    g: [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">', "</svg>"],
    _default: qt ? [0, "", ""] : [1, "X<div>", "</div>"]
  };
  zn.th = zn.td, zn.optgroup = zn.option, zn.tbody = zn.tfoot = zn.colgroup = zn.caption = zn.thead, String("circle,defs,ellipse,image,line,path,polygon,polyline,rect,symbol,text,use").replace(Dt, function (e) {
    zn[e] = zn.g
  });
  var Un = /<([\w:]+)/, qn = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Wn = qt ? /[^\d\D]/ : /(<(?:script|link|style|meta|noscript))/gi, Xn = i(["", "text/javascript", "text/ecmascript", "application/ecmascript", "application/javascript"]), Yn = /<(?:tb|td|tf|th|tr|col|opt|leg|cap|area)/, Gn = Nt.createElement("script"), Jn = /<|&#?\w+;/;
  avalon.parseHTML = function (e) {
    var t = Xt.cloneNode(!1);
    if ("string" != typeof e)return t;
    if (!Jn.test(e))return t.appendChild(Nt.createTextNode(e)), t;
    e = e.replace(qn, "<$1></$2>").trim();
    var n, r, a = (Un.exec(e) || ["", ""])[1].toLowerCase(), i = zn[a] || zn._default, o = Yt;
    qt || (e = e.replace(Wn, "<br class=msNoScope>$1")), o.innerHTML = i[1] + e + i[2];
    var l = o.getElementsByTagName("script");
    if (l.length)for (var s, c = 0; s = l[c++];)Xn[s.type] && (r = Gn.cloneNode(!1), zt.forEach.call(s.attributes, function (e) {
      e && e.specified && (r[e.name] = e.value, r.setAttribute(e.name, e.value))
    }), r.text = s.text, s.parentNode.replaceChild(r, s));
    if (!qt) {
      var u = "X<div>" === i[1] ? o.lastChild.firstChild : o.lastChild;
      if (u && "TABLE" === u.tagName && "tbody" !== a)for (l = u.childNodes, c = 0; s = l[c++];)if ("TBODY" === s.tagName && !s.innerHTML) {
        u.removeChild(s);
        break
      }
      l = o.getElementsByTagName("br");
      for (var f = l.length; s = l[--f];)"msNoScope" === s.className && s.parentNode.removeChild(s);
      for (l = o.all, c = 0; s = l[c++];)F(s) && B(s)
    }
    for (c = i[0]; c--; o = o.lastChild);
    for (; n = o.firstChild;)t.appendChild(n);
    return t
  }, avalon.innerHTML = function (e, t) {
    if (!qt && !Wn.test(t) && !Yn.test(t))try {
      return void(e.innerHTML = t)
    } catch (n) {
    }
    var r = this.parseHTML(t);
    this.clearHTML(e).appendChild(r)
  }, avalon.clearHTML = function (e) {
    for (e.textContent = ""; e.firstChild;)e.removeChild(e.firstChild);
    return e
  };
  var Zn = {
    _toString: function () {
      var e = this.node, t = e.className, n = "string" == typeof t ? t : t.baseVal;
      return n.split(/\s+/).join(" ")
    }, _contains: function (e) {
      return (" " + this + " ").indexOf(" " + e + " ") > -1
    }, _add: function (e) {
      this.contains(e) || this._set(this + " " + e)
    }, _remove: function (e) {
      this._set((" " + this + " ").replace(" " + e + " ", " "))
    }, __set: function (e) {
      e = e.trim();
      var t = this.node;
      Ft.test(t) ? t.setAttribute("class", e) : t.className = e
    }
  };
  "add,remove".replace(Dt, function (e) {
    avalon.fn[e + "Class"] = function (t) {
      var n = this[0];
      return t && "string" == typeof t && n && 1 === n.nodeType && t.replace(/\S+/g, function (t) {
        V(n)[e](t)
      }), this
    }
  }), avalon.fn.mix({
    hasClass: function (e) {
      var t = this[0] || {};
      return 1 === t.nodeType && V(t).contains(e)
    }, toggleClass: function (e, t) {
      for (var n, r = 0, a = String(e).split(/\s+/), i = "boolean" == typeof t; n = a[r++];) {
        var o = i ? t : !this.hasClass(n);
        this[o ? "addClass" : "removeClass"](n)
      }
      return this
    }, attr: function (e, t) {
      return 2 === arguments.length ? (this[0].setAttribute(e, t), this) : this[0].getAttribute(e)
    }, data: function (e, t) {
      switch (e = "data-" + R(e || ""), arguments.length) {
        case 2:
          return this.attr(e, t), this;
        case 1:
          var n = this.attr(e);
          return z(n);
        case 0:
          var r = {};
          return zt.forEach.call(this[0].attributes, function (t) {
            t && (e = t.name, e.indexOf("data-") || (e = I(e.slice(5)), r[e] = z(t.value)))
          }), r
      }
    }, removeData: function (e) {
      return e = "data-" + R(e), this[0].removeAttribute(e), this
    }, css: function (e, t) {
      if (avalon.isPlainObject(e))for (var n in e)avalon.css(this, n, e[n]); else var r = avalon.css(this, e, t);
      return void 0 !== r ? r : this
    }, position: function () {
      var e, t, n = this[0], r = {top: 0, left: 0};
      if (n)return "fixed" === this.css("position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), "HTML" !== e[0].tagName && (r = e.offset()), r.top += avalon.css(e[0], "borderTopWidth", !0), r.left += avalon.css(e[0], "borderLeftWidth", !0), r.top -= e.scrollTop(), r.left -= e.scrollLeft()), {
        top: t.top - r.top - avalon.css(n, "marginTop", !0),
        left: t.left - r.left - avalon.css(n, "marginLeft", !0)
      }
    }, offsetParent: function () {
      for (var e = this[0].offsetParent; e && "static" === avalon.css(e, "position");)e = e.offsetParent;
      return avalon(e || Wt)
    }, bind: function (e, t, n) {
      return this[0] ? avalon.bind(this[0], e, t, n) : void 0
    }, unbind: function (e, t, n) {
      return this[0] && avalon.unbind(this[0], e, t, n), this
    }, val: function (e) {
      var t = this[0];
      if (t && 1 === t.nodeType) {
        var n = 0 === arguments.length, r = n ? ":get" : ":set", a = hr[W(t) + r];
        if (a)var i = a(t, e); else {
          if (n)return (t.value || "").replace(/\r/g, "");
          t.value = e
        }
      }
      return n ? i : this
    }
  });
  var Qn = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, Kn = /^[\],:{}\s]*$/, er = /(?:^|:|,)(?:\s*\[)+/g, tr = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, nr = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
  avalon.parseJSON = e.JSON ? JSON.parse : function (e) {
    if ("string" == typeof e) {
      if (e = e.trim(), e && Kn.test(e.replace(tr, "@").replace(nr, "]").replace(er, "")))return new Function("return " + e)();
      avalon.error("Invalid JSON: " + e)
    }
    return e
  }, avalon.fireDom = function (e, t, n) {
    if (Nt.createEvent) {
      var r = Nt.createEvent("Events");
      r.initEvent(t, !0, !0), avalon.mix(r, n), e.dispatchEvent(r)
    } else try {
      r = Nt.createEventObject(), avalon.mix(r, n), e.fireEvent("on" + t, r)
    } catch (a) {
    }
  }, avalon.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
    avalon.fn[e] = function (n) {
      var r = this[0] || {}, a = U(r), i = "scrollTop" === e;
      return arguments.length ? void(a ? a.scrollTo(i ? avalon(a).scrollLeft() : n, i ? n : avalon(a).scrollTop()) : r[e] = n) : a ? t in a ? a[t] : Wt[e] : r[e]
    }
  });
  var rr = avalon.cssHooks = {}, ar = ["", "-webkit-", "-o-", "-moz-", "-ms-"], ir = {"float": qt ? "cssFloat" : "styleFloat"};
  if (avalon.cssNumber = i("animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom"), avalon.cssName = function (e, t, n) {
      if (ir[e])return ir[e];
      t = t || Wt.style;
      for (var r = 0, a = ar.length; a > r; r++)if (n = I(ar[r] + e), n in t)return ir[e] = n;
      return null
    }, rr["@:set"] = function (e, t, n) {
      try {
        e.style[t] = n
      } catch (r) {
      }
    }, e.getComputedStyle)rr["@:get"] = function (e, t) {
    if (!e || !e.style)throw new Error("getComputedStyle要求传入一个节点 " + e);
    var n, r = getComputedStyle(e, null);
    return r && (n = "filter" === t ? r.getPropertyValue(t) : r[t], "" === n && (n = e.style[t])), n
  }, rr["opacity:get"] = function (e) {
    var t = rr["@:get"](e, "opacity");
    return "" === t ? "1" : t
  }; else {
    var or = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, lr = /^(top|right|bottom|left)$/, sr = /alpha\([^)]*\)/i, cr = !!e.XDomainRequest, ur = "DXImageTransform.Microsoft.Alpha", fr = {
      thin: cr ? "1px" : "2px",
      medium: cr ? "3px" : "4px",
      thick: cr ? "5px" : "6px"
    };
    rr["@:get"] = function (e, t) {
      var n = e.currentStyle, r = n[t];
      if (or.test(r) && !lr.test(r)) {
        var a = e.style, i = a.left, o = e.runtimeStyle.left;
        e.runtimeStyle.left = n.left, a.left = "fontSize" === t ? "1em" : r || 0, r = a.pixelLeft + "px", a.left = i, e.runtimeStyle.left = o
      }
      return "medium" === r && (t = t.replace("Width", "Style"), "none" === n[t] && (r = "0px")), "" === r ? "auto" : fr[r] || r
    }, rr["opacity:set"] = function (e, t, n) {
      var r = e.style, a = isFinite(n) && 1 >= n ? "alpha(opacity=" + 100 * n + ")" : "", i = r.filter || "";
      r.zoom = 1, r.filter = (sr.test(i) ? i.replace(sr, a) : i + " " + a).trim(), r.filter || r.removeAttribute("filter")
    }, rr["opacity:get"] = function (e) {
      var t = e.filters.alpha || e.filters[ur], n = t && t.enabled ? t.opacity : 100;
      return n / 100 + ""
    }
  }
  "top,left".replace(Dt, function (e) {
    rr[e + ":get"] = function (t) {
      var n = rr["@:get"](t, e);
      return /px$/.test(n) ? n : avalon(t).position()[e] + "px"
    }
  });
  var pr = {position: "absolute", visibility: "hidden", display: "block"}, dr = /^(none|table(?!-c[ea]).+)/;
  "Width,Height".replace(Dt, function (e) {
    var t = e.toLowerCase(), n = "client" + e, r = "scroll" + e, a = "offset" + e;
    rr[t + ":get"] = function (t, n, r) {
      var i = -4;
      "number" == typeof r && (i = r), n = "Width" === e ? ["Left", "Right"] : ["Top", "Bottom"];
      var o = t[a];
      return 2 === i ? o + avalon.css(t, "margin" + n[0], !0) + avalon.css(t, "margin" + n[1], !0) : (0 > i && (o = o - avalon.css(t, "border" + n[0] + "Width", !0) - avalon.css(t, "border" + n[1] + "Width", !0)), -4 === i && (o = o - avalon.css(t, "padding" + n[0], !0) - avalon.css(t, "padding" + n[1], !0)), o)
    }, rr[t + "&get"] = function (e) {
      var n = [];
      q(e, n);
      for (var r, a = rr[t + ":get"](e), i = 0; r = n[i++];) {
        e = r.node;
        for (var o in r)"string" == typeof r[o] && (e.style[o] = r[o])
      }
      return a
    }, avalon.fn[t] = function (i) {
      var o = this[0];
      if (0 === arguments.length) {
        if (o.setTimeout)return o["inner" + e] || o.document.documentElement[n] || o.document.body[n];
        if (9 === o.nodeType) {
          var l = o.documentElement;
          return Math.max(o.body[r], l[r], o.body[a], l[a], l[n])
        }
        return rr[t + "&get"](o)
      }
      return this.css(t, i)
    }, avalon.fn["inner" + e] = function () {
      return rr[t + ":get"](this[0], void 0, -2)
    }, avalon.fn["outer" + e] = function (e) {
      return rr[t + ":get"](this[0], void 0, e === !0 ? 2 : 0)
    }
  }), avalon.fn.offset = function () {
    var e = this[0], t = {left: 0, top: 0};
    if (!e || !e.tagName || !e.ownerDocument)return t;
    var n = e.ownerDocument, r = n.body, a = n.documentElement, i = n.defaultView || n.parentWindow;
    if (!avalon.contains(a, e))return t;
    e.getBoundingClientRect && (t = e.getBoundingClientRect());
    var o = a.clientTop || r.clientTop, l = a.clientLeft || r.clientLeft, s = Math.max(i.pageYOffset || 0, a.scrollTop, r.scrollTop), c = Math.max(i.pageXOffset || 0, a.scrollLeft, r.scrollLeft);
    return {top: t.top + s - o, left: t.left + c - l}
  };
  var vr = /^<option(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s+value[\s=]/i, hr = {
    "option:get": Zt ? function (e) {
      return vr.test(e.outerHTML) ? e.value : e.text.trim()
    } : function (e) {
      return e.value
    }, "select:get": function (e, t) {
      for (var n, r = e.options, a = e.selectedIndex, i = hr["option:get"], o = "select-one" === e.type || 0 > a, l = o ? null : [], s = o ? a + 1 : r.length, c = 0 > a ? s : o ? a : 0; s > c; c++)if (n = r[c], (n.selected || c === a) && !n.disabled) {
        if (t = i(n), o)return t;
        l.push(t)
      }
      return l
    }, "select:set": function (e, t, n) {
      t = [].concat(t);
      for (var r, a = hr["option:get"], i = 0; r = e.options[i++];)(r.selected = t.indexOf(a(r)) > -1) && (n = !0);
      n || (e.selectedIndex = -1)
    }
  }, mr = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\"
  }, gr = e.JSON && JSON.stringify || function (e) {
      return '"' + e.replace(/[\\\"\x00-\x1f]/g, function (e) {
          var t = mr[e];
          return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"'
    }, yr = ["break,case,catch,continue,debugger,default,delete,do,else,false", "finally,for,function,if,in,instanceof,new,null,return,switch,this", "throw,true,try,typeof,var,void,while,with", "abstract,boolean,byte,char,class,const,double,enum,export,extends", "final,float,goto,implements,import,int,interface,long,native", "package,private,protected,public,short,static,super,synchronized", "throws,transient,volatile", "arguments,let,yield,undefined"].join(","), br = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g, xr = /[^\w$]+/g, wr = new RegExp(["\\b" + yr.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"), $r = /\b\d[^,]*/g, Cr = /^,+|,+$/g, Tr = new rn(512), Er = function (e) {
    var t = "," + e.trim(), n = Tr.get(t);
    if (n)return n;
    var r = e.replace(br, "").replace(xr, ",").replace(wr, "").replace($r, "").replace(Cr, "").split(/^$|,+/);
    return Tr.put(t, Y(r))
  }, kr = new rn(128), Ar = /\w\[.*\]|\w\.\w/, Or = /(\$proxy\$[a-z]+)\d+$/, _r = /\)\s*$/, Nr = /\)\s*\|/g, Sr = /\|\s*([$\w]+)/g, Mr = /"\s*\["/g, jr = /"\s*\(/g;
  avalon.parseExprProxy = Q, avalon.scan = function (e, t) {
    e = e || Wt;
    var n = t ? [].concat(t) : [];
    ot(e, n)
  };
  var Lr = i("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase()), Hr = function (e, t, n) {
    var r = e.getAttribute(t);
    if (r)for (var a, i = 0; a = n[i++];)if (a.hasOwnProperty(r) && "function" == typeof a[r])return a[r]
  }, Dr = Zt && e.MutationObserver ? function (e) {
    for (var t, n = e.firstChild; n;) {
      var r = n.nextSibling;
      3 === n.nodeType ? t ? (t.nodeValue += n.nodeValue, e.removeChild(n)) : t = n : t = null, n = r
    }
  } : 0, Pr = /^\s*::/, Fr = /ms-(\w+)-?(.*)/, Br = {
    "if": 10,
    repeat: 90,
    data: 100,
    widget: 110,
    each: 1400,
    "with": 1500,
    duplex: 2e3,
    on: 3e3
  }, Rr = i("animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit"), Ir = i("value,title,alt,checked,selected,disabled,readonly,enabled"), Vr = /^if|widget|repeat$/, zr = /^each|with|html|include$/;
  if (!qt)var Ur = new rn(512), qr = /\s+(ms-[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g, Wr = /^['"]/, Xr = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/i, Yr = /&amp;/g, Gr = function (e) {
    var t = e.outerHTML;
    if ("</" === t.slice(0, 2) || !t.trim())return [];
    var n, r, a, i = t.match(Xr)[0], o = [], l = Ur.get(i);
    if (l)return l;
    for (; r = qr.exec(i);) {
      a = r[2], a && (a = (Wr.test(a) ? a.slice(1, -1) : a).replace(Yr, "&"));
      var s = r[1].toLowerCase();
      n = s.match(Fr);
      var c = {name: s, specified: !0, value: a || ""};
      o.push(c)
    }
    return Ur.put(i, o)
  };
  var Jr = /\|\s*html(?:\b|$)/, Zr = /\|\|/g, Qr = /&lt;/g, Kr = /&gt;/g, ea = /(['"])(\\\1|.)+?\1/g, ta = ["autofocus,autoplay,async,allowTransparency,checked,controls", "declare,disabled,defer,defaultChecked,defaultSelected", "contentEditable,isMap,loop,multiple,noHref,noResize,noShade", "open,readOnly,selected"].join(","), na = {};
  ta.replace(Dt, function (e) {
    na[e.toLowerCase()] = e
  });
  var ra = {
    "accept-charset": "acceptCharset",
    "char": "ch",
    charoff: "chOff",
    "class": "className",
    "for": "htmlFor",
    "http-equiv": "httpEquiv"
  }, aa = ["accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan", "dateTime,defaultValue,frameBorder,longDesc,maxLength,marginWidth,marginHeight", "rowSpan,tabIndex,useMap,vSpace,valueType,vAlign"].join(",");
  aa.replace(Dt, function (e) {
    ra[e.toLowerCase()] = e
  });
  var ia = /<noscript.*?>(?:[\s\S]+?)<\/noscript>/gim, oa = /<noscript.*?>([\s\S]+?)<\/noscript>/im, la = function () {
    return new (e.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP")
  }, sa = avalon.templateCache = {};
  tn.attr = function (e, t) {
    var n = Z(e.value.trim());
    if ("include" === e.type) {
      var r = e.element;
      e.includeRendered = Hr(r, "data-include-rendered", t), e.includeLoaded = Hr(r, "data-include-loaded", t);
      var a = e.includeReplace = !!avalon(r).data("includeReplace");
      avalon(r).data("includeCache") && (e.templateCache = {}), e.startInclude = Nt.createComment("ms-include"), e.endInclude = Nt.createComment("ms-include-end"), a ? (e.element = e.startInclude, r.parentNode.insertBefore(e.startInclude, r), r.parentNode.insertBefore(e.endInclude, r.nextSibling)) : (r.insertBefore(e.startInclude, r.firstChild), r.appendChild(e.endInclude))
    }
    e.handlerName = "attr", Q(n, t, e)
  }, nn.attr = function (t, n, r) {
    var a = r.type, i = r.param;
    if ("css" === a)avalon(n).css(i, t); else if ("attr" === a) {
      var o = t === !1 || null === t || void 0 === t;
      !qt && ra[i] && (i = ra[i]);
      var l = na[i];
      if ("boolean" == typeof n[l] && (n[l] = !!t, t || (o = !0)), o)return n.removeAttribute(i);
      var s = Ft.test(n) ? !1 : Nt.namespaces && F(n) ? !0 : i in n.cloneNode(!1);
      s ? n[i] = t + "" : n.setAttribute(i, t)
    } else if ("include" === a && t) {
      var c = r.vmodels, u = r.includeRendered, f = r.includeLoaded, p = r.includeReplace, d = p ? n.parentNode : n, v = function (e) {
        if (null !== r.vmodels) {
          if (f) {
            var n = f.apply(d, [e].concat(c));
            "string" == typeof n && (e = n)
          }
          u && K(d, function () {
            u.call(d)
          }, 0 / 0);
          var a = r.includeLastID;
          if (r.templateCache && a && a !== t) {
            var i = r.templateCache[a];
            i || (i = r.templateCache[a] = Nt.createElement("div"), Mt.appendChild(i))
          }
          for (r.includeLastID = t; r.startInclude;) {
            var o = r.startInclude.nextSibling;
            if (!o || o === r.endInclude)break;
            d.removeChild(o), i && i.appendChild(o)
          }
          var l = ut(r, t, e), s = avalon.slice(l.childNodes);
          d.insertBefore(l, r.endInclude), it(s, c)
        }
      };
      if ("src" === r.param)if ("string" == typeof sa[t])avalon.nextTick(function () {
        v(sa[t])
      }); else if (Array.isArray(sa[t]))sa[t].push(v); else {
        var h = la();
        h.onreadystatechange = function () {
          if (4 === h.readyState) {
            var e = h.status;
            if (e >= 200 && 300 > e || 304 === e || 1223 === e) {
              for (var n, r = h.responseText, a = 0; n = sa[t][a++];)n(r);
              sa[t] = r
            }
          }
        }, sa[t] = [v], h.open("GET", t, !0), "withCredentials"in h && (h.withCredentials = !0), h.setRequestHeader("X-Requested-With", "XMLHttpRequest"), h.send(null)
      } else {
        var m = t && 1 === t.nodeType ? t : Nt.getElementById(t);
        if (m) {
          if ("NOSCRIPT" === m.tagName && !m.innerHTML && !m.fixIE78) {
            h = la(), h.open("GET", location, !1), h.send(null);
            for (var g = Nt.getElementsByTagName("noscript"), y = (h.responseText || "").match(ia) || [], b = y.length, x = 0; b > x; x++) {
              var w = g[x];
              w && (w.style.display = "none", w.fixIE78 = (y[x].match(oa) || ["", "&nbsp;"])[1])
            }
          }
          avalon.nextTick(function () {
            v(m.fixIE78 || m.value || m.innerText || m.innerHTML)
          })
        }
      }
    } else if (Wt.hasAttribute || "string" != typeof t || "src" !== a && "href" !== a || (t = t.replace(/&amp;/g, "&")), n[a] = t, e.chrome && "EMBED" === n.tagName) {
      var $ = n.parentNode, C = document.createComment("ms-src");
      $.replaceChild(C, n), $.replaceChild(n, C)
    }
  }, "title,alt,src,value,css,include,href".replace(Dt, function (e) {
    tn[e] = tn.attr
  }), tn["class"] = function (e, t) {
    var n, r = e.param, a = e.value;
    if (e.handlerName = "class", !r || isFinite(r)) {
      e.param = "";
      var i = a.replace(bn, function (e) {
        return e.replace(/./g, "0")
      }).indexOf(":");
      if (-1 === i) {
        var o = a;
        n = !0
      } else o = a.slice(0, i), n = a.slice(i + 1);
      o = yn.test(a) ? Z(o) : gr(o), e.expr = "[" + o + "," + n + "]"
    } else e.expr = "[" + gr(r) + "," + a + "]", e.oldStyle = r;
    var l = e.type;
    if ("hover" === l || "active" === l) {
      if (!e.hasBindEvent) {
        var s = e.element, c = avalon(s), u = "mouseenter", f = "mouseleave";
        if ("active" === l) {
          s.tabIndex = s.tabIndex || -1, u = "mousedown", f = "mouseup";
          var p = c.bind("mouseleave", function () {
            e.toggleClass && c.removeClass(e.newClass)
          })
        }
      }
      var d = c.bind(u, function () {
        e.toggleClass && c.addClass(e.newClass)
      }), v = c.bind(f, function () {
        e.toggleClass && c.removeClass(e.newClass)
      });
      e.rollback = function () {
        c.unbind("mouseleave", p), c.unbind(u, d), c.unbind(f, v)
      }, e.hasBindEvent = !0
    }
    Q(e.expr, t, e)
  }, nn["class"] = function (e, t, n) {
    var r = avalon(t);
    n.newClass = e[0], n.toggleClass = !!e[1], n.oldClass && n.newClass !== n.oldClass && r.removeClass(n.oldClass), n.oldClass = n.newClass, "class" === n.type && (n.oldStyle ? r.toggleClass(n.oldStyle, !!e[1]) : r.toggleClass(n.newClass, n.toggleClass))
  }, "hover,active".replace(Dt, function (e) {
    tn[e] = tn["class"]
  }), nn.data = function (e, t, n) {
    var r = "data-" + n.param;
    e && "object" == typeof e ? t[r] = e : t.setAttribute(r, String(e))
  };
  var ca = tn.duplex = function (e, t) {
    var a, o = e.element;
    if (Q(e.value, t, e, 1), e.changed = Hr(o, "data-duplex-changed", t) || r, e.evaluator && e.args) {
      var l = [], s = i("string,number,boolean,checked");
      "radio" === o.type && "" === e.param && (e.param = "checked"), o.msData && (o.msData["ms-duplex"] = e.value), e.param.replace(/\w+/g, function (t) {
        /^(checkbox|radio)$/.test(o.type) && /^(radio|checked)$/.test(t) && ("radio" === t && n("ms-duplex-radio已经更名为ms-duplex-checked"), t = "checked", e.isChecked = !0), "bool" === t ? (t = "boolean", n("ms-duplex-bool已经更名为ms-duplex-boolean")) : "text" === t && (t = "string", n("ms-duplex-text已经更名为ms-duplex-string")), s[t] && (a = !0), avalon.Array.ensure(l, t)
      }), a || l.push("string"), e.param = l.join("-"), e.bound = function (t, n) {
        o.addEventListener ? o.addEventListener(t, n, !1) : o.attachEvent("on" + t, n);
        var r = e.rollback;
        e.rollback = function () {
          o.avalonSetter = null, avalon.unbind(o, t, n), r && r()
        }
      };
      for (var c in avalon.vmodels) {
        var u = avalon.vmodels[c];
        u.$fire("avalon-ms-duplex-init", e)
      }
      var f = e.pipe || (e.pipe = pt);
      f(null, e, "init");
      var p = o.tagName;
      ca[p] && ca[p](o, e.evaluator.apply(null, e.args), e)
    }
  };
  avalon.duplexHooks = {
    checked: {
      get: function (e, t) {
        return !t.element.oldValue
      }
    }, string: {
      get: function (e) {
        return e
      }, set: ft
    }, "boolean": {
      get: function (e) {
        return "true" === e
      }, set: ft
    }, number: {
      get: function (e, t) {
        var n = parseFloat(e);
        if (-e === -n)return n;
        var r = /strong|medium|weak/.exec(t.element.getAttribute("data-duplex-number")) || ["medium"];
        switch (r[0]) {
          case"strong":
            return 0;
          case"medium":
            return "" === e ? "" : 0;
          case"weak":
            return e
        }
      }, set: ft
    }
  };
  var ua, fa = [];
  avalon.tick = function (e) {
    1 === fa.push(e) && (ua = setInterval(dt, 60))
  };
  var pa = r;
  !new function () {
    function e(e) {
      t[this.tagName].call(this, e), !this.msFocus && this.avalonSetter && this.avalonSetter()
    }

    try {
      var t = {}, n = HTMLInputElement.prototype, r = HTMLTextAreaElement.prototype, a = HTMLInputElement.prototype;
      Object.getOwnPropertyNames(a), t.INPUT = Object.getOwnPropertyDescriptor(n, "value").set, Object.defineProperty(n, "value", {set: e}), t.TEXTAREA = Object.getOwnPropertyDescriptor(r, "value").set, Object.defineProperty(r, "value", {set: e})
    } catch (i) {
      pa = avalon.tick
    }
  }, Zt && avalon.bind(Nt, "selectionchange", function () {
    var e = Nt.activeElement || {};
    !e.msFocus && e.avalonSetter && e.avalonSetter()
  });
  var da = /^(file|button|reset|submit|checkbox|radio|range)$/;
  ca.INPUT = function (e, t, r) {
    function a(e) {
      r.changed.call(this, e, r)
    }

    function i() {
      p = !0
    }

    function o() {
      p = !1
    }

    function l(e) {
      setTimeout(function () {
        d(e)
      })
    }

    var s, c = e.type, u = r.bound, f = avalon(e), p = !1, d = function () {
      var n = e.value;
      if (!p && n !== s) {
        var i = r.pipe(n, r, "get");
        f.data("duplexObserve") !== !1 && (s = n, t(i), a.call(e, i))
      }
    };
    if (r.handler = function () {
        var n = r.pipe(t(), r, "set");
        if (n !== s) {
          var a = !1;
          if (e.msFocus)try {
            var i = vt(e);
            i.start === i.end && (i = i.start, a = !0)
          } catch (o) {
          }
          e.value = s = n, a && !e.readyOnly && ht(e, i, i)
        }
      }, r.isChecked || "radio" === c) {
      var v = 6 === Zt;
      d = function () {
        if (f.data("duplexObserve") !== !1) {
          var n = r.pipe(e.value, r, "get");
          t(n), a.call(e, n)
        }
      }, r.handler = function () {
        var n = t(), a = r.isChecked ? !!n : n + "" === e.value;
        e.oldValue = a, v ? setTimeout(function () {
          e.defaultChecked = a, e.checked = a
        }, 31) : e.checked = a
      }, u("click", d)
    } else if ("checkbox" === c)d = function () {
      if (f.data("duplexObserve") !== !1) {
        var i = e.checked ? "ensure" : "remove", o = t();
        Array.isArray(o) || (n("ms-duplex应用于checkbox上要对应一个数组"), o = [o]);
        var l = r.pipe(e.value, r, "get");
        avalon.Array[i](o, l), a.call(e, o)
      }
    }, r.handler = function () {
      var n = [].concat(t()), a = r.pipe(e.value, r, "get");
      e.checked = n.indexOf(a) > -1
    }, u(qt ? "change" : "click", d); else {
      var h = e.getAttribute("data-duplex-event") || "input";
      e.attributes["data-event"] && n("data-event指令已经废弃，请改用data-duplex-event"), h.replace(Dt, function (e) {
        switch (e) {
          case"input":
            Zt ? (Zt > 8 ? (9 === Zt && u("keyup", d), u("input", d)) : u("propertychange", function (e) {
              "value" === e.propertyName && d()
            }), u("dragend", l)) : (u("input", d), u("compositionstart", i), u("compositionend", o), u("DOMAutoComplete", d));
            break;
          default:
            u(e, d)
        }
      }), da.test(e.type) || ("hidden" !== e.type && (u("focus", function () {
        e.msFocus = !0
      }), u("blur", function () {
        e.msFocus = !1
      })), e.avalonSetter = d, pa(function () {
        if (Wt.contains(e))e.msFocus || d(); else if (!e.msRetain)return !1
      }))
    }
    avalon.injectBinding(r), a.call(e, e.value)
  }, ca.TEXTAREA = ca.INPUT, ca.SELECT = function (e, t, r) {
    function a() {
      if (i.data("duplexObserve") !== !1) {
        var n = i.val();
        n = Array.isArray(n) ? n.map(function (e) {
          return r.pipe(e, r, "get")
        }) : r.pipe(n, r, "get"), n + "" !== e.oldValue && t(n), r.changed.call(e, n, r)
      }
    }

    var i = avalon(e);
    r.handler = function () {
      var r = t();
      r = r && r.$model || r, Array.isArray(r) ? e.multiple || n("ms-duplex在<select multiple=true>上要求对应一个数组") : e.multiple && n("ms-duplex在<select multiple=false>不能对应一个数组"), r = Array.isArray(r) ? r.map(String) : r + "", r + "" !== e.oldValue && (i.val(r), e.oldValue = r + "")
    }, r.bound("change", a), e.msCallback = function () {
      avalon.injectBinding(r), r.changed.call(e, t(), r)
    }
  }, nn.html = function (e, t, n) {
    var r = 1 !== t.nodeType, a = r ? t.parentNode : t;
    if (a && (e = null == e ? "" : e, n.oldText !== e)) {
      if (n.oldText = e, 3 === t.nodeType) {
        var i = Jt("html");
        a.insertBefore(Nt.createComment(i), t), n.element = Nt.createComment(i + ":end"), a.replaceChild(n.element, t), t = n.element
      }
      if ("object" != typeof e)var o = avalon.parseHTML(String(e)); else if (11 === e.nodeType)o = e; else if (1 === e.nodeType || e.item) {
        var l = 1 === e.nodeType ? e.childNodes : e.item;
        for (o = Xt.cloneNode(!0); l[0];)o.appendChild(l[0])
      }
      if (l = avalon.slice(o.childNodes), r) {
        for (var s = t.nodeValue.slice(0, -4); ;) {
          var c = t.previousSibling;
          if (!c || 8 === c.nodeType && c.nodeValue === s)break;
          a.removeChild(c)
        }
        a.insertBefore(o, t)
      } else avalon.clearHTML(t).appendChild(o);
      it(l, n.vmodels)
    }
  }, tn["if"] = tn.data = tn.text = tn.html = function (e, t) {
    Q(e.value, t, e)
  }, nn["if"] = function (e, t, n) {
    try {
      if (!t.parentNode)return
    } catch (r) {
      return
    }
    if (e)8 === t.nodeType && (t.parentNode.replaceChild(n.template, t), t.ifRemove = null, t = n.element = n.template), t.getAttribute(n.name) && (t.removeAttribute(n.name), rt(t, n.vmodels)), n.rollback = null; else if (1 === t.nodeType) {
      var a = n.element = Nt.createComment("ms-if");
      t.parentNode.replaceChild(a, t), t.ifRemove = a, n.template = t, Mt.appendChild(t), n.rollback = function () {
        t.parentNode === Mt && Mt.removeChild(t)
      }
    }
  };
  var va = /\(([^)]*)\)/;
  tn.on = function (e, t) {
    var n = e.value;
    e.type = "on";
    var r = e.param.replace(/-\d+$/, "");
    if ("function" == typeof tn.on[r + "Hook"] && tn.on[r + "Hook"](e), n.indexOf("(") > 0 && n.indexOf(")") > -1) {
      var a = (n.match(va) || ["", ""])[1].trim();
      ("" === a || "$event" === a) && (n = n.replace(va, ""))
    }
    Q(n, t, e)
  }, nn.on = function (e, t, n) {
    e = function (e) {
      var t = n.evaluator || r;
      return t.apply(this, n.args.concat(e))
    };
    var a = n.param.replace(/-\d+$/, "");
    if ("scan" === a)e.call(t, {type: a}); else if ("function" == typeof n.specialBind)n.specialBind(t, e); else var i = avalon.bind(t, a, e);
    n.rollback = function () {
      "function" == typeof n.specialUnbind ? n.specialUnbind() : avalon.unbind(t, a, i)
    }
  }, tn.repeat = function (e, t) {
    var n = e.type;
    Q(e.value, t, e, 1), e.proxies = [];
    var a = !1;
    try {
      var i = e.$repeat = e.evaluator.apply(0, e.args || []), o = avalon.type(i);
      "object" !== o && "array" !== o ? (a = !0, avalon.log("warning:" + e.value + "只能是对象或数组")) : e.xtype = o
    } catch (l) {
      a = !0
    }
    var s = e.value.split(".") || [];
    if (s.length > 1) {
      s.pop();
      for (var c, u = s[0], f = 0; c = t[f++];)if (c && c.hasOwnProperty(u)) {
        var p = c[u].$events || {};
        p[Lt] = p[Lt] || [], p[Lt].push(e);
        break
      }
    }
    var d = e.handler;
    e.handler = r, avalon.injectBinding(e), e.handler = d;
    var v = e.element;
    if (1 === v.nodeType) {
      v.removeAttribute(e.name), e.sortedCallback = Hr(v, "data-with-sorted", t), e.renderedCallback = Hr(v, "data-" + n + "-rendered", t);
      var h = Jt(n), m = Nt.createComment(h), g = Nt.createComment(h + ":end");
      if (e.signature = h, e.template = Xt.cloneNode(!1), "repeat" === n) {
        var y = v.parentNode;
        y.replaceChild(g, v), y.insertBefore(m, g), e.template.appendChild(v)
      } else {
        for (; v.firstChild;)e.template.appendChild(v.firstChild);
        v.appendChild(m), v.appendChild(g)
      }
      e.element = g, e.handler = nn.repeat, e.rollback = function () {
        var t = e.element;
        t && e.handler("clear")
      }
    }
    if (!a) {
      e.$outer = {};
      var b = "$key", x = "$val";
      for (Array.isArray(i) && (b = "$first", x = "$last"), f = 0; c = t[f++];)if (c.hasOwnProperty(b) && c.hasOwnProperty(x)) {
        e.$outer = c;
        break
      }
      var w = i.$events, $ = (w || {})[Lt];
      S($, e), "object" === o ? e.handler("append") : i.length && e.handler("add", 0, i.length)
    }
  }, nn.repeat = function (e, t, n) {
    var a = this;
    if (!e && a.xtype) {
      var i = a.$repeat, o = a.evaluator.apply(0, a.args || []);
      if ("array" === a.xtype) {
        if (i.length === o.length) {
          if (!(i !== o && i.length > 0))return;
          nn.repeat.call(this, "clear", t, n)
        }
        e = "add", t = 0, a.$repeat = o, n = o.length
      } else {
        if (k(i).join(";;") === k(o).join(";;"))return;
        e = "append", a.$repeat = o
      }
    }
    if (e) {
      var l, s, c = a.element, u = gt(a), f = c.parentNode, p = a.proxies, d = Xt.cloneNode(!1);
      switch (e) {
        case"add":
          for (var v = t + n, h = [], m = t; v > m; m++) {
            var g = Tt(m, a);
            p.splice(m, 0, g), mt(a, d, g, h)
          }
          for (f.insertBefore(d, u[t] || c), m = 0; s = h[m++];)it(s.nodes, s.vmodels), s.nodes = s.vmodels = null;
          break;
        case"del":
          yt(u[t], u[t + n] || c);
          var y = p.splice(t, n);
          wt(y, "each");
          break;
        case"clear":
          l = u[0], l && (yt(l, c), "object" === a.xtype ? f.insertBefore(l, c) : wt(p, "each"));
          break;
        case"move":
          if (l = u[0]) {
            var b, x = l.nodeValue, w = [], $ = [];
            for (yt(l, c, function () {
              $.unshift(this), this.nodeValue === x && (w.unshift($), $ = [])
            }), N(w, t), N(p, t); $ = w.shift();)for (; b = $.shift();)d.appendChild(b);
            f.insertBefore(d, c)
          }
          break;
        case"index":
          for (var C = p.length - 1; n = p[t]; t++)n.$index = t, n.$first = 0 === t, n.$last = t === C;
          return;
        case"set":
          g = p[t], g && M(g.$events[a.param || "el"]);
          break;
        case"append":
          var T = a.$repeat, E = Array.isArray(p) || !p ? {} : p;
          a.proxies = E;
          var A = [];
          h = [];
          for (var O in E)T.hasOwnProperty(O) || (Et(E[O], ha), delete E[O]);
          for (O in T)T.hasOwnProperty(O) && "hasOwnProperty" !== O && A.push(O);
          if (a.sortedCallback) {
            var _ = a.sortedCallback.call(f, A);
            _ && Array.isArray(_) && _.length && (A = _)
          }
          for (m = 0; O = A[m++];)"hasOwnProperty" !== O && (E[O] = xt(E[O], O, a), mt(a, d, E[O], h));
          for (f.insertBefore(d, c), m = 0; s = h[m++];)it(s.nodes, s.vmodels), s.nodes = s.vmodels = null
      }
      if (!a.$repeat || a.$repeat.hasOwnProperty("$lock"))return;
      "clear" === e && (e = "del");
      var S = a.renderedCallback || r, j = arguments;
      f.oldValue && "SELECT" === f.tagName && avalon(f).val(f.oldValue.split(",")), S.apply(f, j)
    }
  }, "with,each".replace(Dt, function (e) {
    tn[e] = tn.repeat
  });
  var ha = [], ma = [];
  nn.text = function (e, t) {
    if (e = null == e ? "" : e, 3 === t.nodeType)try {
      t.data = e
    } catch (n) {
    } else"textContent"in t ? t.textContent = e : t.innerText = e
  }, avalon.parseDisplay = kt, tn.visible = function (e, t) {
    Q(e.value, t, e)
  }, nn.visible = function (e, t, n) {
    e ? (t.style.display = n.display || "", "none" === avalon(t).css("display") && (t.style.display = n.display = kt(t.nodeName))) : t.style.display = "none"
  }, tn.widget = function (t, a) {
    var i = t.value.match(Dt), o = t.element, l = i[0], s = i[1];
    s && "$" !== s || (s = Jt(l));
    var c = i[2] || l, u = avalon.ui[l];
    if ("function" == typeof u) {
      a = o.vmodels || a;
      for (var f, p = 0; f = a[p++];)if (f.hasOwnProperty(c) && "object" == typeof f[c]) {
        var d = f[c];
        d = d.$model || d;
        break
      }
      if (d) {
        var v = d[l + "Id"];
        "string" == typeof v && (n("warning!不再支持" + l + "Id"), s = v)
      }
      var h = avalon.getWidgetData(o, l);
      t.value = [l, s, c].join(","), t[l + "Id"] = s, t.evaluator = r, o.msData["ms-widget-id"] = s;
      var m = t[l + "Options"] = avalon.mix({}, u.defaults, d || {}, h);
      o.removeAttribute("ms-widget");
      var g = u(o, t, a) || {};
      if (g.$id) {
        avalon.vmodels[s] = g, et(o, g);
        try {
          g.$init(function () {
            avalon.scan(o, [g].concat(a)), "function" == typeof m.onInit && m.onInit.call(o, g, m, a)
          })
        } catch (y) {
          n(y)
        }
        t.rollback = function () {
          try {
            g.$remove(), g.widgetElement = null
          } catch (e) {
          }
          o.msData = {}, delete avalon.vmodels[g.$id]
        }, L(t, ga), e.chrome && o.addEventListener("DOMNodeRemovedFromDocument", function () {
          setTimeout(H)
        })
      } else avalon.scan(o, a)
    } else a.length && (o.vmodels = a)
  };
  var ga = [], ya = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim, ba = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g, xa = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/gi, wa = {
    a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/gi,
    img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/gi,
    form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/gi
  }, $a = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Ca = /([^\#-~| |!])/g, Ta = avalon.filters = {
    uppercase: function (e) {
      return e.toUpperCase()
    }, lowercase: function (e) {
      return e.toLowerCase()
    }, truncate: function (e, t, n) {
      return t = t || 30, n = "string" == typeof n ? n : "...", e.length > t ? e.slice(0, t - n.length) + n : String(e)
    }, $filter: function (e) {
      for (var t = 1, n = arguments.length; n > t; t++) {
        var r = arguments[t], a = avalon.filters[r[0]];
        if ("function" == typeof a) {
          var i = [e].concat(r.slice(1));
          e = a.apply(null, i)
        }
      }
      return e
    }, camelize: I, sanitize: function (e) {
      return e.replace(ya, "").replace(xa, function (e) {
        var t = e.toLowerCase().match(/<(\w+)\s/);
        if (t) {
          var n = wa[t[1]];
          n && (e = e.replace(n, function (e, t, n) {
            var r = n.charAt(0);
            return t + "=" + r + "javascript:void(0)" + r
          }))
        }
        return e.replace(ba, " ").replace(/\s+/g, " ")
      })
    }, escape: function (e) {
      return String(e).replace(/&/g, "&amp;").replace($a, function (e) {
        var t = e.charCodeAt(0), n = e.charCodeAt(1);
        return "&#" + (1024 * (t - 55296) + (n - 56320) + 65536) + ";"
      }).replace(Ca, function (e) {
        return "&#" + e.charCodeAt(0) + ";"
      }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }, currency: function (e, t, n) {
      return (t || "￥") + At(e, isFinite(n) ? n : 2)
    }, number: At
  };
  !new function () {
    function e(e) {
      return parseInt(e, 10) || 0
    }

    function t(e, t, n) {
      var r = "";
      for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t;)e = "0" + e;
      return n && (e = e.substr(e.length - t)), r + e
    }

    function n(e, n, r, a) {
      return function (i) {
        var o = i["get" + e]();
        return (r > 0 || o > -r) && (o += r), 0 === o && -12 === r && (o = 12), t(o, n, a)
      }
    }

    function r(e, t) {
      return function (n, r) {
        var a = n["get" + e](), i = (t ? "SHORT" + e : e).toUpperCase();
        return r[i][a]
      }
    }

    function a(e) {
      var n = -1 * e.getTimezoneOffset(), r = n >= 0 ? "+" : "";
      return r += t(Math[n > 0 ? "floor" : "ceil"](n / 60), 2) + t(Math.abs(n % 60), 2)
    }

    function i(e, t) {
      return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1]
    }

    var o = {
      yyyy: n("FullYear", 4),
      yy: n("FullYear", 2, 0, !0),
      y: n("FullYear", 1),
      MMMM: r("Month"),
      MMM: r("Month", !0),
      MM: n("Month", 2, 1),
      M: n("Month", 1, 1),
      dd: n("Date", 2),
      d: n("Date", 1),
      HH: n("Hours", 2),
      H: n("Hours", 1),
      hh: n("Hours", 2, -12),
      h: n("Hours", 1, -12),
      mm: n("Minutes", 2),
      m: n("Minutes", 1),
      ss: n("Seconds", 2),
      s: n("Seconds", 1),
      sss: n("Milliseconds", 3),
      EEEE: r("Day"),
      EEE: r("Day", !0),
      a: i,
      Z: a
    }, l = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, s = /^\/Date\((\d+)\)\/$/;
    Ta.date = function (t, n) {
      var r, a, i = Ta.date.locate, c = "", u = [];
      if (n = n || "mediumDate", n = i[n] || n, "string" == typeof t)if (/^\d+$/.test(t))t = e(t); else if (s.test(t))t = +RegExp.$1; else {
        var f = t.trim(), p = [0, 0, 0, 0, 0, 0, 0], d = new Date(0);
        f = f.replace(/^(\d+)\D(\d+)\D(\d+)/, function (t, n, r, a) {
          var i = 4 === a.length ? [a, n, r] : [n, r, a];
          return p[0] = e(i[0]), p[1] = e(i[1]) - 1, p[2] = e(i[2]), ""
        });
        var v = d.setFullYear, h = d.setHours;
        f = f.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (t, n, r, a, i) {
          return p[3] = e(n), p[4] = e(r), p[5] = e(a), i && (p[6] = Math.round(1e3 * parseFloat("0." + i))), ""
        });
        var m = 0, g = 0;
        f = f.replace(/Z|([+-])(\d\d):?(\d\d)/, function (t, n, r, a) {
          return v = d.setUTCFullYear, h = d.setUTCHours, n && (m = e(n + r), g = e(n + a)), ""
        }), p[3] -= m, p[4] -= g, v.apply(d, p.slice(0, 3)), h.apply(d, p.slice(3)), t = d
      }
      if ("number" == typeof t && (t = new Date(t)), "date" === avalon.type(t)) {
        for (; n;)a = l.exec(n), a ? (u = u.concat(a.slice(1)), n = u.pop()) : (u.push(n), n = null);
        return u.forEach(function (e) {
          r = o[e], c += r ? r(t, i) : e.replace(/(^'|'$)/g, "").replace(/''/g, "'")
        }), c
      }
    };
    var c = {
      AMPMS: {0: "上午", 1: "下午"},
      DAY: {0: "星期日", 1: "星期一", 2: "星期二", 3: "星期三", 4: "星期四", 5: "星期五", 6: "星期六"},
      MONTH: {
        0: "1月",
        1: "2月",
        2: "3月",
        3: "4月",
        4: "5月",
        5: "6月",
        6: "7月",
        7: "8月",
        8: "9月",
        9: "10月",
        10: "11月",
        11: "12月"
      },
      SHORTDAY: {0: "周日", 1: "周一", 2: "周二", 3: "周三", 4: "周四", 5: "周五", 6: "周六"},
      fullDate: "y年M月d日EEEE",
      longDate: "y年M月d日",
      medium: "yyyy-M-d H:mm:ss",
      mediumDate: "yyyy-M-d",
      mediumTime: "H:mm:ss",
      "short": "yy-M-d ah:mm",
      shortDate: "yy-M-d",
      shortTime: "ah:mm"
    };
    c.SHORTMONTH = c.MONTH, Ta.date.locate = c
  };
  var Ea, ka = avalon.modules = {
    "domReady!": {exports: avalon, state: 3},
    avalon: {exports: avalon, state: 4}
  }, Aa = e.require, Oa = e.define;
  $n.loader = function (t) {
    var n = Ea && t;
    e.require = n ? Ea : Aa, e.define = n ? Ea.define : Oa
  }, ka.exports = ka.avalon, new function () {
    function t(e, t) {
      var r = "js";
      e = e.replace(/^(\w+)\!/, function (e, t) {
        return r = t, ""
      }), "ready" === r && (n("debug: ready!已经被废弃，请使用domReady!"), r = "domReady");
      var a = "";
      e = e.replace(D, function (e) {
        return a = e, ""
      });
      var i = "." + r, o = /js|css/.test(i) ? i : "";
      e = e.replace(/\.[a-z0-9]+$/g, function (e) {
        return e === i ? (o = e, "") : e
      });
      var l = avalon.mix({query: a, ext: o, res: r, name: e, toUrl: m}, t);
      return l.toUrl(e), l
    }

    function i(e) {
      var t = e.name, n = e.res, r = ka[t], a = t && e.urlNoQuery;
      if (r && r.state >= 1)return t;
      if (r = ka[a], r && r.state >= 3)return Ea(r.deps || [], r.factory, a), a;
      if (t && !r) {
        r = ka[a] = {id: a, state: 1};
        var i = function (a) {
          H[n] = a, a.load(t, e, function (e) {
            arguments.length && void 0 !== e && (r.exports = e), r.state = 4, s()
          })
        };
        H[n] ? i(H[n]) : Ea([n], i)
      }
      return t ? a : n + "!"
    }

    function o(e, t) {
      for (var n, r = 0; n = e[r++];)if (4 !== ka[n].state && (n === t || o(ka[n].deps, t)))return !0
    }

    function l(e, t, r) {
      var a = u(e.src);
      return e.onload = e.onreadystatechange = e.onerror = null, t || r && ka[a] && !ka[a].state ? (setTimeout(function () {
        St.removeChild(e), e = null
      }), void n("debug: 加载 " + a + " 失败" + t + " " + !ka[a].state)) : !0
    }

    function s() {
      e:for (var e, t = E.length; e = E[--t];) {
        var n = ka[e], r = n.deps;
        if (r) {
          for (var a, i = 0; a = r[i]; i++)if (4 !== Object(ka[a]).state)continue e;
          4 !== n.state && (E.splice(t, 1), v(n.id, n.deps, n.factory), s())
        }
      }
    }

    function c(e, t, r) {
      function a() {
        var a = k.pop();
        a && a.require(t), r && r(), l(i, !1, !c) && (n("debug: 已成功加载 " + e), t && E.push(t), s())
      }

      var i = Nt.createElement("script");
      i.className = Lt;
      var o, c = "onload"in i, u = c ? "onload" : "onreadystatechange", f = 0;
      i[u] = c ? a : function () {
        L.test(i.readyState) && (++f, 1 === f ? o = setTimeout(a, 500) : (clearTimeout(o), a()))
      }, i.onerror = function () {
        l(i, !0)
      }, St.insertBefore(i, St.firstChild), i.src = e, n("debug: 正准备加载 " + e)
    }

    function u(e) {
      return (e || "").replace(D, "")
    }

    function f(e) {
      return /^(?:[a-z]+:)?\/\//i.test(String(e))
    }

    function p(e, t) {
      return "1"[0] ? e[t] : e.getAttribute(t, 4)
    }

    function d() {
      var t;
      try {
        a.b.c()
      } catch (n) {
        t = n.stack, !t && e.opera && (t = (String(n).match(/of linked script \S+/g) || []).join(" "))
      }
      if (t)return t = t.split(/[@ ]/g).pop(), t = "(" === t[0] ? t.slice(1, -1) : t.replace(/\s/, ""), u(t.replace(/(:\d+)?:\d+$/i, ""));
      for (var r, i = St.getElementsByTagName("script"), o = i.length; r = i[--o];)if (r.className === Lt && "interactive" === r.readyState) {
        var l = p(r, "src");
        return r.className = u(l)
      }
    }

    function v(t, r, a) {
      var i = Object(ka[t]);
      i.state = 4;
      for (var o, l = 0, s = []; o = r[l++];)if ("exports" === o) {
        var c = i.exports || (i.exports = {});
        s.push(c)
      } else s.push(ka[o].exports);
      try {
        var u = a.apply(e, s)
      } catch (f) {
        n("执行[" + t + "]模块的factory抛错： ", f)
      }
      return void 0 !== u && (i.exports = u), P.test(t) && delete ka[t], delete i.factory, u
    }

    function m(e) {
      0 === e.indexOf(this.res + "!") && (e = e.slice(this.res.length + 1));
      var t = e, n = 0, r = this.baseUrl, a = this.parentUrl || r;
      w(e, h.paths, function (e, r) {
        t = t.replace(r, e), n = 1
      }), n || w(e, h.packages, function (e, n, r) {
        t = t.replace(r.name, r.location)
      }), this.mapUrl && w(this.mapUrl, h.map, function (e) {
        w(t, e, function (e, n) {
          t = t.replace(n, e), a = r
        })
      });
      var i = this.ext;
      i && n && t.slice(-i.length) === i && (t = t.slice(0, -i.length)), f(t) || (a = this.built || /^\w/.test(t) ? r : a, t = C(a, t));
      var o = t + i;
      return t = o + this.query, o = t.replace(D, function (e) {
        return this.query = e, ""
      }), w(e, h.urlArgs, function (e) {
        t += (-1 === t.indexOf("?") ? "?" : "&") + e
      }), this.url = t, this.urlNoQuery = o
    }

    function g(e, t, n) {
      var r = x(e, t, n);
      return r.sort($), r
    }

    function y(e) {
      return new RegExp("^" + e + "(/|$)")
    }

    function b(t) {
      return function () {
        var n;
        return t.init && (n = t.init.apply(e, arguments)), n || t.exports && T(t.exports)
      }
    }

    function x(e, t, n) {
      var r = [];
      for (var a in e)if (It.call(e, a)) {
        var i = {name: a, val: e[a]};
        r.push(i), i.reg = "*" === a && t ? /^/ : y(a), n && "*" !== a && (i.reg = new RegExp("/" + a.replace(/^\//, "") + "(/|$)"))
      }
      return r
    }

    function w(e, t, n) {
      t = t || [];
      for (var r, a = 0; r = t[a++];)if (r.reg.test(e))return n(r.val, r.name, r), !1
    }

    function $(e, t) {
      var n = e.name, r = t.name;
      return "*" === r ? -1 : "*" === n ? 1 : r.length - n.length
    }

    function C(e, t) {
      if ("/" !== e.charAt(e.length - 1) && (e += "/"), "./" === t.slice(0, 2))return e + t.slice(2);
      if (".." === t.slice(0, 2)) {
        for (e += t; F.test(e);)e = e.replace(F, "");
        return e
      }
      return "/" === t.slice(0, 1) ? e + t.slice(1) : e + t
    }

    function T(t) {
      if (!t)return t;
      var n = e;
      return t.split(".").forEach(function (e) {
        n = n[e]
      }), n
    }

    var E = [], k = [], A = /\.js$/i, O = [], _ = !1;
    Ea = avalon.require = function (e, n, a, o) {
      if (_) {
        Array.isArray(e) || avalon.error("require方法的第一个参数应为数组 " + e);
        var l = [], c = {}, u = a || "callback" + setTimeout("1");
        o = o || {}, o.baseUrl = h.baseUrl;
        var f = !!o.built;
        if (a && (o.parentUrl = a.substr(0, a.lastIndexOf("/")), o.mapUrl = a.replace(A, "")), f) {
          var p = t(o.defineName, o);
          u = p.urlNoQuery
        } else e.forEach(function (e) {
          var n = t(e, o), r = i(n);
          r && (c[r] || (l.push(r), c[r] = "司徒正美"))
        });
        var d = ka[u];
        d && 4 === d.state || (ka[u] = {
          id: u,
          deps: f ? e.concat() : l,
          factory: n || r,
          state: 3
        }), d || E.push(u), s()
      } else if (O.push(avalon.slice(arguments)), arguments.length <= 2) {
        _ = !0;
        for (var v, m = O.splice(0, O.length); v = m.shift();)Ea.apply(null, v)
      }
    }, Ea.define = function (e, t, n) {
      "string" != typeof e && (n = t, t = e, e = "anonymous"), Array.isArray(t) || (n = t, t = []);
      var r = {built: !_, defineName: e}, a = [t, n, r];
      n.require = function (e) {
        if (a.splice(2, 0, e), ka[e]) {
          ka[e].state = 3;
          var t = !1;
          try {
            t = o(ka[e].deps, e)
          } catch (r) {
          }
          t && avalon.error(e + "模块与之前的模块存在循环依赖，请不要直接用script标签引入" + e + "模块")
        }
        delete n.require, Ea.apply(null, a)
      };
      var i = r.built ? "unknown" : d();
      if (i) {
        var l = ka[i];
        l && (l.state = 2), n.require(i)
      } else k.push(n)
    }, Ea.config = h, Ea.define.amd = ka;
    var N = h["orig.paths"] = {}, S = h["orig.map"] = {}, M = h.packages = [], j = h["orig.args"] = {};
    avalon.mix($n, {
      paths: function (e) {
        avalon.mix(N, e), h.paths = g(N)
      }, map: function (e) {
        avalon.mix(S, e);
        var t = g(S, 1, 1);
        avalon.each(t, function (e, t) {
          t.val = g(t.val)
        }), h.map = t
      }, packages: function (e) {
        e = e.concat(M);
        for (var t, n = {}, r = [], a = 0; t = e[a++];) {
          t = "string" == typeof t ? {name: t} : t;
          var i = t.name;
          if (!n[i]) {
            var o = C(t.location || i, t.main || "main");
            o = o.replace(A, ""), r.push(t), n[i] = t.location = o, t.reg = y(i)
          }
        }
        h.packages = r.sort()
      }, urlArgs: function (e) {
        "string" == typeof e && (e = {"*": e}), avalon.mix(j, e), h.urlArgs = g(j, 1)
      }, baseUrl: function (e) {
        if (!f(e)) {
          var t = St.getElementsByTagName("base")[0];
          t && St.removeChild(t);
          var n = Nt.createElement("a");
          n.href = e, e = p(n, "href"), t && St.insertBefore(t, St.firstChild)
        }
        e.length > 3 && (h.baseUrl = e)
      }, shim: function (e) {
        for (var t in e) {
          var n = e[t];
          Array.isArray(n) && (n = e[t] = {deps: n}), n.exportsFn || !n.exports && !n.init || (n.exportsFn = b(n))
        }
        h.shim = e
      }
    });
    var L = /complete|loaded/, H = Ea.plugins = {
      ready: {load: r}, js: {
        load: function (e, t, n) {
          var r = t.url, a = t.urlNoQuery, i = h.shim[e.replace(A, "")];
          i ? Ea(i.deps || [], function () {
            var e = avalon.slice(arguments);
            c(r, a, function () {
              n(i.exportsFn ? i.exportsFn.apply(0, e) : void 0)
            })
          }) : c(r, a)
        }
      }, css: {
        load: function (e, t, r) {
          var a = t.url, i = Nt.createElement("link");
          i.rel = "stylesheet", i.href = a, St.insertBefore(i, St.firstChild), n("debug: 已成功加载 " + a), r()
        }
      }, text: {
        load: function (e, t, r) {
          var a = t.url, i = la();
          i.onreadystatechange = function () {
            if (4 === i.readyState) {
              var e = i.status;
              e > 399 && 600 > e ? avalon.error(a + " 对应资源不存在或没有开启 CORS") : (n("debug: 已成功加载 " + a), r(i.responseText))
            }
          };
          var o = "_=" + (new Date - 0), l = -1 === a.indexOf("?") ? a + "?" + o : a + "&" + o;
          i.open("GET", l, !0), "withCredentials"in i && (i.withCredentials = !0), i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i.send(), n("debug: 正准备加载 " + a)
        }
      }
    };
    Ea.checkDeps = s;
    var D = /(\?[^#]*)$/, P = /^callback\d+$/, F = /\/\w+\/\.\./, B = Nt.scripts[Nt.scripts.length - 1], R = B.getAttribute("data-main");
    if (R) {
      $n.baseUrl(R);
      var I = h.baseUrl;
      h.baseUrl = I.slice(0, I.lastIndexOf("/") + 1), c(I.replace(A, "") + ".js")
    } else {
      var V = u(p(B, "src"));
      h.baseUrl = V.slice(0, V.lastIndexOf("/") + 1)
    }
  };
  var _a, Na = [], Sa = function (e) {
    _a = !0;
    var t = avalon.require;
    for (t && t.checkDeps && (ka["domReady!"].state = 4, t.checkDeps()); e = Na.shift();)e(avalon)
  };
  if ("complete" === Nt.readyState)setTimeout(Sa); else if (qt)Nt.addEventListener("DOMContentLoaded", Sa); else {
    Nt.attachEvent("onreadystatechange", function () {
      "complete" === Nt.readyState && Sa()
    });
    try {
      var Ma = null === e.frameElement
    } catch (Sn) {
    }
    Wt.doScroll && Ma && e.external && Ot()
  }
  avalon.bind(e, "load", Sa), avalon.ready = function (e) {
    _a ? e(avalon) : Na.push(e)
  }, avalon.config({loader: !0}), avalon.ready(function () {
    avalon.scan(Nt.body)
  }), "function" == typeof define && define.amd && define("avalon", [], function () {
    return avalon
  });
  var ja = e.avalon;
  return avalon.noConflict = function (t) {
    return t && e.avalon === avalon && (e.avalon = ja), avalon
  }, void 0 === t && (e.avalon = avalon), avalon
});