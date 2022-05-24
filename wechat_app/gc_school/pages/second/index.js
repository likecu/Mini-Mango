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
        indicatorDots: !0,
        common: "通用",
        currentIndex: 0,
        cateList: [],
        goodsList: [],
        islog: !1,
        page: 1,
        loadmore: !0
    },
    onLoad: function() {},
    onShow: function() {
        this.getCate(), this.setData({
            currentIndex: 0,
            goodsList: [],
            page: 1,
            loadmore: !0
        }), wx.getStorageSync("openid") && this.setData({
            islog: !0
        });
    },
    getCate: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/secondCate",
            data: {
                sid: wx.getStorageSync("schoolId")
            },
            success: function(a) {
                console.log(a.data.data), t.setData({
                    cateList: a.data.data
                }), t.getGoods();
            }
        });
    },
    getGoods: function() {
        var e = this;
        console.log("分类", e.data.cateList), a.util.request({
            url: "entry/wxapp/secondGoods",
            data: {
                page: e.data.page,
                sid: wx.getStorageSync("schoolId"),
                cid: e.data.cateList[e.data.currentIndex].id
            },
            success: function(a) {
                if (a.data.data.length < 8 && e.setData({
                    loadmore: !1
                }), console.log(a.data.data), 1 == this.data.page) e.setData({
                    goodsList: a.data.data
                }); else for (var o = 0; o < a.data.data.length; o++) e.setData({
                    goodsList: [].concat(t(e.data.goodsList), [ a.data.data[o] ])
                });
            }
        });
    },
    cateSelect: function(t) {
        this.setData({
            currentIndex: t.currentTarget.dataset.index,
            page: 1,
            loadmore: !0
        }), this.getGoods();
    },
    toDetail: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/seconddetail/index?id=" + t.currentTarget.dataset.id
        });
    },
    showlist: function() {
        this.data.showList ? this.setData({
            showList: !1
        }) : this.setData({
            showList: !0
        });
    },
    publish: function() {
        wx.navigateTo({
            url: "/gc_school/pages/addsecond/index"
        });
    },
    my: function() {
        wx.navigateTo({
            url: "/gc_school/pages/mysecond/index"
        });
    },
    search: function() {
        wx.navigateTo({
            url: "/gc_school/pages/search/index"
        });
    },
    onReachBottom: function() {
        this.setData({
            page: this.data.page + 1
        }), this.data.loadmore && this.getGoods();
    }
});