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
        orderList: [],
        tab_index: 0,
        is_loadmore: !0,
        page: 1
    },
    onLoad: function(t) {
        this.getOrder();
    },
    getOrder: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/storeOrder",
            data: {
                page: this.data.page,
                type: this.data.tab_index,
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                a.data.data.length < 5 && e.setData({
                    is_loadmore: !1
                });
                var r = [].concat(t(e.data.orderList), t(a.data.data));
                e.setData({
                    orderList: r
                });
            }
        });
    },
    changeTab: function(t) {
        this.setData({
            tab_index: t.currentTarget.dataset.index,
            page: 1,
            orderList: [],
            is_loadmore: !0
        }), this.getOrder();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.is_loadmore && (this.setData({
            page: this.data.page + 1
        }), this.getOrder());
    }
});