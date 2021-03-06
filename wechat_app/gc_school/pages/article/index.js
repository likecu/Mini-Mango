var t = getApp();

Page({
    data: {
        url: "",
        info: [ 1, 2, 3 ],
        index_swiperCurrent: 0,
        cateList: [],
        cate_index: 0,
        dataList: [],
        type: 2,
        is_loadmore: !0,
        page: 1,
        slideList: [],
        freshen: !0
    },
    onLoad: function(t) {
        wx.getStorageSync("schoolId") || t.s_id && wx.setStorageSync("schoolId", t.s_id), 
        this.getCate(), this.getSlide();
    },
    getSlide: function() {
        var e = this;
        t.util.request({
            url: "entry/wxapp/articleslide",
            method: "POST",
            data: {
                s_id: wx.getStorageSync("schoolId")
            },
            success: function(t) {
                console.log(t.data.data), e.setData({
                    slideList: t.data.data
                });
            }
        });
    },
    play: function() {},
    toDetail: function(t) {
        console.log(t.currentTarget.dataset.id), wx.navigateTo({
            url: "/gc_school/pages/article/detail?id=" + t.currentTarget.dataset.id
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
    getCate: function() {
        var e = this;
        t.util.request({
            url: "entry/wxapp/articlecate",
            method: "POST",
            data: {
                s_id: wx.getStorageSync("schoolId")
            },
            success: function(t) {
                console.log(t.data.data), e.setData({
                    cateList: t.data.data
                }), e.getLst(t.data.data[0].id);
            }
        });
    },
    preview: function(t) {
        this.setData({
            freshen: !1
        }), wx.previewImage({
            current: t.currentTarget.dataset.img,
            urls: t.currentTarget.dataset.list
        });
    },
    getLst: function(e) {
        var a = this;
        t.util.request({
            url: "entry/wxapp/articlelst",
            method: "POST",
            data: {
                s_id: wx.getStorageSync("schoolId"),
                cate_id: e,
                type: a.data.type,
                page: a.data.page
            },
            success: function(t) {
                console.log(t.data.data), t.data.data.length < 5 && a.setData({
                    is_loadmore: !1
                });
                for (var e = 0; e < t.data.data.length; e++) a.data.dataList.push(t.data.data[e]), 
                a.setData({
                    dataList: a.data.dataList
                });
            }
        });
    },
    changetype: function(t) {
        this.setData({
            type: t.currentTarget.dataset.type,
            page: 1,
            is_loadmore: !0,
            dataList: []
        }), this.getLst(this.data.cateList[this.data.cate_index].id);
    },
    cateChange: function(t) {
        this.setData({
            cate_index: t.currentTarget.dataset.index,
            page: 1,
            is_loadmore: !0,
            dataList: []
        }), this.getLst(this.data.cateList[t.currentTarget.dataset.index].id);
    },
    upload: function() {
        var t = this;
        wx.chooseMedia({
            success: function(e) {
                console.log(e), console.log(e.type), console.log(e.tempFiles[0].tempFilePath), t.setData({
                    url: e.tempFiles[0].tempFilePath
                });
            }
        });
    },
    index_swiperChange: function(t) {
        this.setData({
            index_swiperCurrent: t.detail.current
        });
    },
    jump: function(t) {
        if (console.log(t), "" == wx.getStorageSync("openid")) return wx.showToast({
            title: "请先登录",
            icon: "none"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/gc_school/pages/user/index"
            });
        }, 1e3);
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log("返回"), console.log("是否需要重新加载", t.globalData.isload), t.globalData.isload = !1;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.is_loadmore ? (this.setData({
            page: this.data.page + 1
        }), this.getLst(this.data.cateList[this.data.cate_index].id)) : wx.showToast({
            title: "没有更多数据了~",
            icon: "none"
        });
    },
    onShareAppMessage: function() {
        return {
            path: "/gc_school/pages/article/index?s_id=" + wx.getStorageSync("schoolId")
        };
    },
    onShareTimeline: function() {
        return {
            title: "校园圈子",
            query: "s_id=" + wx.getStorageSync("schoolId")
        };
    }
});