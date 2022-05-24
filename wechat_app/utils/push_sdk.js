var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

!function(t, e) {
    "object" == ("undefined" == typeof exports ? "undefined" : n(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Ald = e();
}(void 0, function() {
    function n() {
        return new Promise(function(n) {
            wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function(t) {
                            n(t);
                        },
                        fail: function() {
                            n("");
                        }
                    }) : n("");
                },
                fail: function() {
                    n("");
                }
            });
        });
    }
    function t() {
        return new Promise(function(n) {
            wx.getNetworkType({
                success: function(t) {
                    n(t);
                },
                fail: function() {
                    n("");
                }
            });
        });
    }
    function e() {
        return new Promise(function(n) {
            wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.userLocation"] ? wx.getLocation({
                        type: "wgs84",
                        success: function(t) {
                            n(t);
                        },
                        fail: function(t) {
                            n("");
                        }
                    }) : n("");
                },
                fail: function(t) {
                    n("");
                }
            });
        });
    }
    function o(o) {
        Promise.all([ n(), t(), e() ]).then(function(n) {
            F.user_info = G = n[0].userInfo || {}, F.nt = J = n[1].networkType || "", F.lc = Q = n[2] || {}, 
            o && o();
        });
    }
    function i(n, t) {
        var e = l("page", "methonds", t.eventId);
        e.ti = t.eventId;
        var o = d();
        o["content-type"] = "application/json", wx.requestSubscribeMessage({
            tmplIds: n,
            success: function(n) {
                var i = [];
                for (var u in n) "accept" === n[u] && i.push(u);
                if (!i.length) return z = !1, h("未订阅模版"), void (g(t.fail) && t.fail("未订阅模版"));
                e.tlis = i, wx.request({
                    url: x() + "psi/v1/trigger/sub",
                    data: e,
                    header: o,
                    method: "POST",
                    success: function(n) {
                        z = !1, h("订阅成功"), g(t.success) && t.success("订阅成功");
                    },
                    fail: function(n) {
                        z = !1, h("订阅成功模版上报失败"), g(t.fail) && t.fail("订阅成功模版上报失败", n);
                    }
                });
            },
            fail: function(n) {
                z = !1, h("订阅失败"), g(t.fail) && t.fail("订阅失败", n);
            }
        });
    }
    function u(t) {
        function e() {
            o(function() {
                var n = l("page", "methonds", t.query.xst_tki);
                n.tki = t.query.xst_tki;
                var e = d();
                e["content-type"] = "application/json", wx.request({
                    url: x() + "psi/v1/trigger/rtn",
                    data: n,
                    header: e,
                    method: "POST",
                    success: function(n) {}
                });
            });
        }
        X = t, Y = m(), G || n().then(function(n) {
            G = n;
        }), 1107 != t.scene && 1014 != t.scene || !t.query.xst_tki || (S() ? e() : Z.push(e));
    }
    function r() {}
    function c(n) {}
    function a() {}
    function f(n) {
        var t = {};
        for (var e in n) "onShow" !== e && "onHide" !== e && (t[e] = n[e]);
        return t.onShow = function(t) {
            u.call(this, t), n.onShow && "function" == typeof n.onShow && n.onShow.call(this, t);
        }, t.onHide = function() {
            r.call(this), n.onHide && "function" == typeof n.onHide && n.onHide.call(this);
        }, t;
    }
    function s(n) {
        var t = {};
        for (var e in n) "onLoad" !== e && "onShow" !== e && (t[e] = n[e]);
        return t.onLoad = function(t) {
            c.call(this, t), "function" == typeof n.onLoad && n.onLoad.call(this, t);
        }, t.onShow = function(t) {
            a.call(this, t), "function" == typeof n.onLoad && n.onShow.call(this, t);
        }, t;
    }
    function l(n, t, e) {
        var o = y();
        return o.ev = n, o.life = t, o.st = Date.now(), o.wsr = X, o.v = C, o.ak = N, o.ifo = W, 
        o.reqid = p(e), o;
    }
    function d() {
        return E || S(), {
            M_openid: E || "",
            M_name: U,
            M_appid: V,
            M_icon: R
        };
    }
    function p(n) {
        return O(Date.now() + N + B + n);
    }
    function h(n) {
        T.debug && wx.showModal({
            title: "小神推提示",
            content: n
        });
    }
    function g(n) {
        return "function" == typeof n;
    }
    function v() {
        return void 0 !== F.sdv && parseInt(F.sdv.split(".").join("")) >= 282;
    }
    function y() {
        var n = {};
        for (var t in F) n[t] = F[t];
        return n;
    }
    function w(n, t) {
        Object.defineProperty(wx, n, {
            value: t,
            writable: !1,
            enumerable: !0,
            configurable: !0
        });
    }
    function S() {
        var n = "";
        try {
            E = n = wx.getStorageSync("ald_push_openid");
        } catch (t) {
            E = n = wx.getStorageSync("ald_push_openid");
        }
        return n;
    }
    function _() {
        function n() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        }
        return n() + n() + n() + n() + n() + n() + n() + n();
    }
    function m() {
        return "" + Date.now() + Math.floor(1e7 * Math.random());
    }
    function x() {
        return 1 === K ? "https://plogtest.xiaoshentui.com/" : "https://plog.xiaoshentui.com/";
    }
    function b(n, t, e) {
        if (n[t]) {
            var o = n[t];
            n[t] = function(n) {
                e.call(this, n, t), o.call(this, n);
            };
        } else n[t] = function(n) {
            e.call(this, n, t);
        };
    }
    function I(n, t) {
        var e = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (e >> 16) << 16 | 65535 & e;
    }
    function P(n, t) {
        return n << t | n >>> 32 - t;
    }
    function k(n, t, e, o, i, u) {
        return I(P(I(I(t, n), I(o, u)), i), e);
    }
    function M(n, t, e, o, i, u, r) {
        return k(t & e | ~t & o, n, t, i, u, r);
    }
    function D(n, t, e, o, i, u, r) {
        return k(t & o | e & ~o, n, t, i, u, r);
    }
    function q(n, t, e, o, i, u, r) {
        return k(t ^ e ^ o, n, t, i, u, r);
    }
    function A(n, t, e, o, i, u, r) {
        return k(e ^ (t | ~o), n, t, i, u, r);
    }
    function L(n) {
        for (var t = 1732584193, e = -271733879, o = -1732584194, i = 271733878, u = 0; u < n.length; u += 16) {
            var r = t, c = e, a = o, f = i;
            e = A(e = A(e = A(e = A(e = q(e = q(e = q(e = q(e = D(e = D(e = D(e = D(e = M(e = M(e = M(e = M(e, o = M(o, i = M(i, t = M(t, e, o, i, n[u + 0], 7, -680876936), e, o, n[u + 1], 12, -389564586), t, e, n[u + 2], 17, 606105819), i, t, n[u + 3], 22, -1044525330), o = M(o, i = M(i, t = M(t, e, o, i, n[u + 4], 7, -176418897), e, o, n[u + 5], 12, 1200080426), t, e, n[u + 6], 17, -1473231341), i, t, n[u + 7], 22, -45705983), o = M(o, i = M(i, t = M(t, e, o, i, n[u + 8], 7, 1770035416), e, o, n[u + 9], 12, -1958414417), t, e, n[u + 10], 17, -42063), i, t, n[u + 11], 22, -1990404162), o = M(o, i = M(i, t = M(t, e, o, i, n[u + 12], 7, 1804603682), e, o, n[u + 13], 12, -40341101), t, e, n[u + 14], 17, -1502002290), i, t, n[u + 15], 22, 1236535329), o = D(o, i = D(i, t = D(t, e, o, i, n[u + 1], 5, -165796510), e, o, n[u + 6], 9, -1069501632), t, e, n[u + 11], 14, 643717713), i, t, n[u + 0], 20, -373897302), o = D(o, i = D(i, t = D(t, e, o, i, n[u + 5], 5, -701558691), e, o, n[u + 10], 9, 38016083), t, e, n[u + 15], 14, -660478335), i, t, n[u + 4], 20, -405537848), o = D(o, i = D(i, t = D(t, e, o, i, n[u + 9], 5, 568446438), e, o, n[u + 14], 9, -1019803690), t, e, n[u + 3], 14, -187363961), i, t, n[u + 8], 20, 1163531501), o = D(o, i = D(i, t = D(t, e, o, i, n[u + 13], 5, -1444681467), e, o, n[u + 2], 9, -51403784), t, e, n[u + 7], 14, 1735328473), i, t, n[u + 12], 20, -1926607734), o = q(o, i = q(i, t = q(t, e, o, i, n[u + 5], 4, -378558), e, o, n[u + 8], 11, -2022574463), t, e, n[u + 11], 16, 1839030562), i, t, n[u + 14], 23, -35309556), o = q(o, i = q(i, t = q(t, e, o, i, n[u + 1], 4, -1530992060), e, o, n[u + 4], 11, 1272893353), t, e, n[u + 7], 16, -155497632), i, t, n[u + 10], 23, -1094730640), o = q(o, i = q(i, t = q(t, e, o, i, n[u + 13], 4, 681279174), e, o, n[u + 0], 11, -358537222), t, e, n[u + 3], 16, -722521979), i, t, n[u + 6], 23, 76029189), o = q(o, i = q(i, t = q(t, e, o, i, n[u + 9], 4, -640364487), e, o, n[u + 12], 11, -421815835), t, e, n[u + 15], 16, 530742520), i, t, n[u + 2], 23, -995338651), o = A(o, i = A(i, t = A(t, e, o, i, n[u + 0], 6, -198630844), e, o, n[u + 7], 10, 1126891415), t, e, n[u + 14], 15, -1416354905), i, t, n[u + 5], 21, -57434055), o = A(o, i = A(i, t = A(t, e, o, i, n[u + 12], 6, 1700485571), e, o, n[u + 3], 10, -1894986606), t, e, n[u + 10], 15, -1051523), i, t, n[u + 1], 21, -2054922799), o = A(o, i = A(i, t = A(t, e, o, i, n[u + 8], 6, 1873313359), e, o, n[u + 15], 10, -30611744), t, e, n[u + 6], 15, -1560198380), i, t, n[u + 13], 21, 1309151649), o = A(o, i = A(i, t = A(t, e, o, i, n[u + 4], 6, -145523070), e, o, n[u + 11], 10, -1120210379), t, e, n[u + 2], 15, 718787259), i, t, n[u + 9], 21, -343485551), 
            t = I(t, r), e = I(e, c), o = I(o, a), i = I(i, f);
        }
        return [ t, e, o, i ];
    }
    function H(n) {
        for (var t = "0123456789abcdef", e = "", o = 0; o < 4 * n.length; o++) e += t.charAt(15 & n[o >> 2] >> o % 4 * 8 + 4) + t.charAt(15 & n[o >> 2] >> o % 4 * 8);
        return e;
    }
    function j(n) {
        for (var t = 1 + (n.length + 8 >> 6), e = Array(16 * t), o = 0; o < 16 * t; o++) e[o] = 0;
        for (o = 0; o < n.length; o++) e[o >> 2] |= (255 & n.charCodeAt(o)) << o % 4 * 8;
        return e[o >> 2] |= 128 << o % 4 * 8, e[16 * t - 2] = 8 * n.length, e;
    }
    function O(n) {
        return H(L(j(n)));
    }
    var T = require("./push_conf");
    h("SDK引入成功"), T.app_key && 32 === T.app_key.length || h("app_key配置有误");
    var C = "4.2.0", K = 0, N = T.app_key, R = __wxConfig.accountInfo.icon, U = escape(__wxConfig.accountInfo.nickname), V = __wxConfig.accountInfo.appId, W = !1, z = !1, B = function() {
        var n = "";
        try {
            n = wx.getStorageSync("ald_push_uuid");
        } catch (t) {
            n = "ald_push_uuid";
        }
        if (n) W = !1; else {
            n = _();
            try {
                wx.setStorageSync("ald_push_uuid", n), W = !0;
            } catch (n) {
                wx.setStorageSync("ald_push_uuid", "ald_push_uuid");
            }
        }
        return n;
    }(), E = S(), F = {}, G = {}, J = "", Q = "", X = {}, Y = "", Z = [];
    try {
        var $ = wx.getSystemInfoSync();
        F.wv = $.version, F.pb = $.brand, F.pm = $.model, F.pr = $.pixelRatio, F.ww = $.screenWidth, 
        F.wh = $.screenHeight, F.lang = $.language, F.sv = $.system, F.pv = $.platform, 
        F.sdv = $.SDKVersion;
    } catch (n) {}
    o();
    var nn = [ "aldPushSendOpenid", "aldPushSubscribeMessage" ], tn = {
        aldPushSendOpenid: function(n) {
            if ("" === n || !n || 28 !== n.length) return h("openId不合法");
            if (h("openId上报成功"), wx.getStorageSync("ald_push_openid") || 28 === n.length) {
                try {
                    wx.setStorageSync("ald_push_openid", n);
                } catch (t) {
                    wx.setStorageSync("ald_push_openid", n);
                }
                for (var t = 0; t < Z.length; t++) Z[t]();
                Z = [];
            }
        },
        aldPushSubscribeMessage: function(n) {
            function t() {
                var t = l("page", "methonds", n.eventId);
                t.ti = n.eventId;
                var e = d();
                e["content-type"] = "application/json", wx.request({
                    url: x() + "psi/v1/trigger/clk",
                    data: t,
                    header: e,
                    method: "POST",
                    success: function(t) {
                        0 === t.data.code ? t.data.data.tlis.length ? i(t.data.data.tlis, n) : (z = !1, 
                        h("获取的模版ID为空"), g(n.fail) && n.fail("获取的模版ID为空")) : (z = !1, h("模版ID获取失败"), g(n.fail) && n.fail("模版ID获取失败", t.data.code));
                    },
                    fail: function(t) {
                        z = !1, h("获取模版ID请求失败"), g(n.fail) && n.fail("获取模版ID请求失败", t);
                    }
                });
            }
            if (!z) {
                if (z = !0, !v()) return z = !1, h("基础库版本不支持订阅消息"), void (g(n.fail) && n.fail("基础库版本不支持订阅消息"));
                S() ? t() : Z.push(t);
            }
        }
    };
    if (function() {
        for (var n = 0; n < nn.length; n++) w(nn[n], tn[nn[n]]);
    }(), T.plugin) return {
        App: function(n) {
            return App(f(n));
        },
        Page: function(n) {
            return Page(s(n));
        }
    };
    !function() {
        var n = App, t = Page;
        App = function(t) {
            b(t, "onShow", u), b(t, "onHide", r), n(t);
        }, Page = function(n) {
            b(n, "onLoad", c), b(n, "onShow", a), t(n);
        };
    }();
});