var t = getApp();

Page({
    data: {
        TabCur: 0,
        scrollLeft: 0,
        page: 1,
        type: 8,
        list: []
    },
    detail: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/order/detail?id=" + this.data.list[t.currentTarget.dataset.index].o_id
        });
    },
    onLoad: function(t) {
        this.getData();
    },
    getData: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/OrderWiteList",
            data: {
                s_id: wx.getStorageSync("schoolId"),
                page: this.data.page,
                status: this.data.type,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                if (t.data.data.order.length < 10) {
                    if (t.data.data.order.length > 0) {
                        for (e = 0; e < t.data.data.order.length; e++) {
                            r = t.data.data.order[e].desc;
                            t.data.data.order[e].desc.replace(/[0-9]*(\.[0-9]*)?/g, function(t) {
                                var a = t;
                                if (Number(t)) {
                                    if (t.toString().length > 3) e = t.substr(0, 2) + "****" + t.substr(6); else var e = t.substr(0, 1) + "**";
                                    r = r.replace(a, e), console.log(r);
                                }
                            }), t.data.data.order[e].desc = r;
                        }
                        a.setData({
                            list: a.data.list.concat(t.data.data.order),
                            hasMoreData: !1
                        });
                    }
                } else {
                    for (var e = 0; e < t.data.data.order.length; e++) {
                        var r = t.data.data.order[e].desc;
                        t.data.data.order[e].desc.replace(/[0-9]*(\.[0-9]*)?/g, function(t) {
                            var a = t;
                            if (Number(t)) {
                                if (t.toString().length > 3) e = t.substr(0, 2) + "****" + t.substr(6); else var e = t.substr(0, 1) + "**";
                                r = r.replace(a, e), console.log(r);
                            }
                        }), t.data.data.order[e].desc = r;
                    }
                    a.setData({
                        list: a.data.list.concat(t.data.data.order),
                        hasMoreData: !0,
                        page: a.data.page + 1
                    });
                }
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
    onReady: function() {
        t.util.footer(this);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.hasMoreData ? this.getData() : wx.showToast({
            title: "没有更多数据",
            icon: "none"
        });
    },
    onShareAppMessage: function() {}
});