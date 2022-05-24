function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = getApp();

Page({
    data: {
        TabCur: 0,
        scrollLeft: 0,
        page: 1,
        type: 8,
        color: "#FF6444"
    },
    onLoad: function(t) {
        var a = getCurrentPages();
        a[a.length - 2];
        console.log("options", t.type);
    },
    getData: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/MyFbList",
            data: {
                page: this.data.page,
                status: this.data.type,
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                console.log("21212332", a);
                for (n = 0; n < a.data.data.order.length; n++) a.data.data.order[n].createtime = e.getDateTimeStamp(a.data.data.order[n].createtime);
                if (1 == this.data.page) e.setData({
                    list: a.data.data.order
                }); else for (var n = 0; n < a.data.data.order.length; n++) e.setData({
                    list: [].concat(t(e.data.list), [ a.data.data.order[n] ])
                });
            }
        });
    },
    tabSelect: function(t) {
        this.setData({
            TabCur: t.currentTarget.dataset.id,
            scrollLeft: 60 * t.currentTarget.dataset.id,
            type: t.currentTarget.dataset.index
        }), this.setData({
            page: 1
        }), this.getData();
    },
    handleDel: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/OrderDel",
            data: {
                page: this.data.page,
                o_id: this.data.list[t.currentTarget.dataset.index].o_id,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(t) {
                wx.showToast({
                    title: t.data.message
                }), setTimeout(function() {
                    e.setData({
                        page: 1
                    }), e.getData();
                }, 2e3);
            }
        });
    },
    handleQX: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/cancelorder",
            data: {
                o_id: this.data.list[t.currentTarget.dataset.index].o_id,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(t) {
                0 == t.data.errno ? (wx.showToast({
                    title: "取消成功",
                    duration: 2e3
                }), setTimeout(function() {
                    e.setData({
                        page: 1
                    }), e.getData();
                }, 2e3)) : wx.showToast({
                    title: "取消失败",
                    icon: "none"
                });
            }
        });
    },
    detail: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/order/detail?id=" + this.data.list[t.currentTarget.dataset.index].o_id
        });
    },
    onReady: function() {
        a.util.footer(this);
    },
    onShow: function() {
        this.getData(), console.log("全局", a.globalData.issub), a.globalData.issub && (a.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(t) {
                console.log("获取配置", t.data.data), wx.showModal({
                    title: "提示",
                    content: "允许接收订阅消息",
                    success: function(a) {
                        a.confirm && wx.requestSubscribeMessage({
                            tmplIds: [ t.data.data.sys.template_id_user, t.data.data.sys.cancel_template_id ],
                            success: function(t) {
                                console.log("已授权接收订阅消息");
                            }
                        });
                    }
                });
            }
        }), console.log("支付成功的")), a.globalData.issub = !1;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    getDateDiff: function(t) {
        var a = new Date().getTime() - t;
        if (!(a < 0)) {
            var e = a / 2592e6, n = a / 6048e5, o = a / 864e5, s = a / 36e5, i = a / 6e4;
            return e >= 1 ? parseInt(e) + "月前" : n >= 1 ? parseInt(n) + "周前" : o >= 1 ? parseInt(o) + "天前" : s >= 1 ? parseInt(s) + "小时前" : i >= 1 ? parseInt(i) + "分钟前" : "刚刚";
        }
    },
    getDateTimeStamp: function(t) {
        t = t;
        var a = Date.parse(t.replace(/-/gi, "/"));
        return this.getDateDiff(a);
    },
    onReachBottom: function() {
        this.setData({
            page: this.data.page + 1
        }), this.getData();
    },
    onShareAppMessage: function() {}
});