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
        list: [],
        index_swiperCurrent: 0,
        goods: [],
        cate_index: 0,
        page: 1,
        is_loadmore: !0
    },
    onLoad: function(t) {
        var e = this;
        e.getSlide();
        var o = wx.getStorageSync("schoolId");
        a.util.request({
            url: "entry/wxapp/restaurant",
            data: {
                school_id: o
            },
            success: function(t) {
                console.log("12121", t), 0 == t.data.errno && (e.setData({
                    list: t.data.data
                }), e.getStore());
            }
        });
    },
    cateTab: function(t) {
        this.setData({
            cate_index: t.currentTarget.dataset.index,
            goods: [],
            page: 1,
            is_loadmore: !0
        }), this.getStore();
    },
    getStore: function() {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), a.util.request({
            url: "entry/wxapp/store",
            data: {
                rest_id: e.data.list[e.data.cate_index].id,
                page: e.data.page
            },
            success: function(a) {
                if (wx.hideLoading({}), console.log("12121", a), 0 == a.data.errno) {
                    console.log("good", e.data.goods), a.data.data.length < 6 && e.setData({
                        is_loadmore: !1
                    });
                    var o = [].concat(t(e.data.goods), t(a.data.data));
                    e.setData({
                        goods: o
                    });
                }
            }
        });
    },
    toStore: function(t) {
        console.log(t), wx.navigateTo({
            url: "/gc_school/pages/foold/foold?id=" + t.currentTarget.dataset.id
        });
    },
    index_swiperChange: function(t) {
        this.setData({
            index_swiperCurrent: t.detail.current
        });
    },
    slideJump: function(t) {
        console.log(t), 1 == t.currentTarget.dataset.type ? wx.navigateTo({
            url: t.currentTarget.dataset.url
        }) : 2 == t.currentTarget.dataset.type ? (console.log("appid是", t.currentTarget.dataset.url), 
        wx.navigateToMiniProgram({
            appId: t.currentTarget.dataset.url,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(t) {
                console.log("打开成功");
            }
        })) : wx.navigateTo({
            url: "/gc_school/pages/webview/index?url=" + t.currentTarget.dataset.url
        });
    },
    getSlide: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/articleslide",
            method: "POST",
            data: {
                s_id: wx.getStorageSync("schoolId"),
                type: 5
            },
            success: function(a) {
                console.log(a.data.data), t.setData({
                    slideList: a.data.data
                });
            }
        });
    },
    onShow: function(t) {},
    bank_content: function(t) {
        wx.navigateTo({
            url: "../store/index?id=" + t.currentTarget.dataset.id
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        if (this.data.is_loadmore) {
            var t = this.data.page + 1;
            this.setData({
                page: t
            }), this.getStore();
        }
    },
    onShareAppMessage: function() {}
});