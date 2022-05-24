var e = require("../../../utils/push_conf.js"), t = !1, a = "https://openapi2.xiaoshentui.com/";

Page({
    data: {},
    onShow: function() {
        wx.getStorageSync("push_avatarurl") && wx.getStorageSync("push_nickname") && this.setData({
            avatarurl: wx.getStorageSync("push_avatarurl"),
            nickname: wx.getStorageSync("push_nickname")
        });
    },
    onGotUserInfo: function(e) {
        this.setData({
            avatarurl: e.detail.userInfo.avatarUrl,
            nickname: e.detail.userInfo.nickName
        }), wx.setStorageSync("push_avatarurl", e.detail.userInfo.avatarUrl), wx.setStorageSync("push_nickname", e.detail.userInfo.nickName);
    },
    subscribe: function(n) {
        if (!wx.getStorageSync("ald_push_openid")) return this.debugModel("openid未上报");
        if (!t) {
            if (t = !0, !this.isSubscribe()) return this.debugModel("基础库版本不支持订阅消息");
            var i = this, r = {
                avatarurl: this.data.avatarurl,
                nickname: this.data.nickname,
                app_key: e.app_key,
                openid: wx.getStorageSync("ald_push_openid")
            };
            wx.request({
                url: a + "api/v1/getpt",
                data: {
                    app_key: e.app_key
                },
                method: "POST",
                success: function(e) {
                    var n = e.data.data.list.map(function(e) {
                        return e.template_id;
                    });
                    wx.requestSubscribeMessage({
                        tmplIds: n,
                        success: function(e) {
                            var n = [];
                            for (var s in e) "accept" === e[s] && n.push(s);
                            if (!n.length) return t = !1, i.debugModel("未订阅模版");
                            r.tlis = n, wx.request({
                                url: a + "api/v1/reportdt",
                                data: r,
                                method: "POST",
                                success: function(e) {
                                    t = !1, i.debugModel("订阅成功");
                                },
                                fail: function(e) {
                                    t = !1, i.debugModel("订阅成功模版上报失败");
                                }
                            });
                        },
                        fail: function(e) {
                            t = !1, i.debugModel("订阅失败");
                        }
                    });
                },
                fail: function(e) {
                    t = !1, i.debugModel("获取模版ID请求失败");
                }
            });
        }
    },
    isSubscribe: function() {
        var e = wx.getSystemInfoSync();
        if (void 0 !== e.SDKVersion) {
            var t = parseInt(e.SDKVersion.split(".").join(""));
            return console.log("版本", t), t >= 282;
        }
        return !1;
    },
    debugModel: function(e) {
        wx.showModal({
            title: "小神推提示",
            content: e
        });
    }
});