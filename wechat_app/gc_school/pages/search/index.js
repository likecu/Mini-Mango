var t = getApp();

Page({
    data: {
        indicatorDots: !0,
        common: "通用",
        currentIndex: 0,
        goodsList: [],
        kwd: ""
    },
    onLoad: function() {},
    search: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/secondSearch",
            data: {
                sid: wx.getStorageSync("schoolId")
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    goodsList: t.data.data
                });
            }
        });
    },
    kwdinput: function(t) {
        console.log(t.detail.value), this.setData({
            kwd: t.detail.value
        });
    },
    searchs: function() {
        var a = this;
        "" != a.data.kwd ? t.util.request({
            url: "entry/wxapp/secondSearch",
            data: {
                keywords: a.data.kwd,
                sid: wx.getStorageSync("schoolId")
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    goodsList: t.data.data
                });
            }
        }) : wx.showToast({
            title: "请输入要搜索的内容",
            icon: "none"
        });
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
    }
});