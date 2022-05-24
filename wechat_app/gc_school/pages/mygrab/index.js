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
        type: 3,
        loadmore: !0
    },
    detail: function(t) {
        var a = this;
        1 == wx.getStorageSync("user_identity") ? wx.requestSubscribeMessage({
            tmplIds: [ wx.getStorageSync("template_id"), wx.getStorageSync("cancel_template_id") ],
            success: function(t) {
                console.log("已授权接收订阅消息");
            },
            complete: function() {
                wx.navigateTo({
                    url: "/gc_school/pages/order/detail?id=" + a.data.list[t.currentTarget.dataset.index].o_id
                });
            }
        }) : wx.navigateTo({
            url: "/gc_school/pages/order/detail?id=" + a.data.list[t.currentTarget.dataset.index].o_id
        });
    },
    onLoad: function(t) {
        this.getData();
    },
    getData: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/OrderGetGoodList",
            data: {
                page: this.data.page,
                status: this.data.type,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(a) {
                if (1 == this.data.page) e.setData({
                    list: a.data.data.order
                }); else for (var o = 0; o < a.data.data.order.length; o++) e.setData({
                    list: [].concat(t(e.data.list), [ a.data.data.order[o] ])
                });
                0 == a.data.data.order.length && e.setData({
                    loadmore: !1
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
            page: 1,
            loadmore: !0
        }), this.getData();
    },
    onReady: function() {
        a.util.footer(this);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.setData({
            page: this.data.page + 1
        }), this.data.loadmore && this.getData();
    },
    onShareAppMessage: function() {}
});