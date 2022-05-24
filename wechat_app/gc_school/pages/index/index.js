function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = getApp();

Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        showText: !0,
        getUseInfo: !1,
        status: 0,
        page: 1,
        url: e.siteInfo.appimg,
        schoolInfo: {},
        school: [ {} ],
        index: 0,
        address: {},
        schooindex: 0,
        s_id: "",
        top: wx.getStorageSync("CustomBar"),
        StatusBar: wx.getStorageSync("StatusBar")
    },
    openview: function(t) {
        console.log(t), wx.previewImage({
            current: t.currentTarget.dataset.url,
            urls: [ t.currentTarget.dataset.url ]
        });
    },
    onChangeShowText: function() {
        this.setData({
            showText: !this.data.showText
        });
    },
    onGoodsInfo: function(t) {
        this.setData({
            note: t.detail.value
        });
    },
    onJsEvent: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/public/index?type=" + t.currentTarget.dataset.type + "&showText=" + this.data.note
        });
    },
    PickerChange: function(t) {
        console.log(t), this.setData({
            index: t.detail.value,
            schoolInfo: this.data.school[parseInt(t.detail.value)],
            s_id: this.data.school[parseInt(t.detail.value)].s_id
        }), wx.setStorageSync("schoolId", this.data.school[parseInt(t.detail.value)].s_id), 
        wx.setStorageSync("schoolIndex", parseInt(t.detail.value)), this.getSchoolInfo(this.data.school[parseInt(t.detail.value)].s_id);
    },
    onLoad: function(t) {
        console.log(e.siteInfo.appimg);
        var a = this;
        a.getPage(), a.setData({
            address: wx.getStorageSync("city")
        }), this.getSysparment(), wx.getStorage({
            key: "useInfo",
            success: function(t) {
                "true" == t.data && a.setData({
                    getUseInfo: !1
                }), wx.getStorageSync("openid") ? a.getPage() : a.getGetUid(t.data);
            },
            fail: function() {
                a.setData({
                    getUseInfo: !0
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.removeStorage({
            key: "json"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        this.getOrderData();
    },
    detail: function(t) {
        console.log(t.currentTarget.dataset.index), wx.navigateTo({
            url: "/gc_school/pages/order/detail?id=" + this.data.list[t.currentTarget.dataset.index].o_id
        });
    },
    getSysparment: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Sysparment",
            data: {
                page: this.data.page,
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {
                t.setData({
                    sysparment: e.data.data
                });
            }
        });
    },
    getList: function() {
        var a = this;
        e.util.request({
            url: "entry/wxapp/IndexList",
            data: {
                page: this.data.page,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(e) {
                if (console.log("11111", e), 1 == this.data.page) a.setData({
                    list: e.data.data.list
                }); else for (var o = 0; o < e.data.data.list.length; o++) a.setData({
                    list: [].concat(t(a.data.list), [ e.data.data.list[o] ])
                });
            }
        });
    },
    getLocation: function(t) {
        var e = this;
        wx.getLocation({
            success: function(a) {
                console.log(a), wx.request({
                    url: "https://api.map.baidu.com/geocoder/v2/?ak=p3ksM8ObxtYWHUsGWo8CWNqI&location=" + a.latitude + "," + a.longitude + "&output=json",
                    header: {
                        "Content-Type": "application/json"
                    },
                    success: function(a) {
                        var a = a.data.result;
                        wx.setStorageSync("city", a), e.setData({
                            city: a.addressComponent.city
                        }), t();
                    }
                });
            }
        });
    },
    getUsetInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg ? (this.setData({
            getUseInfo: !0
        }), wx.setStorage({
            key: "useInfo",
            data: "true"
        }), this.getGetUid(t.detail.userInfo)) : this.setData({
            getUseInfo: !0
        });
    },
    getSchool: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/SchoolList",
            data: {
                openid: wx.getStorageSync("openid") ? wx.getStorageSync("openid") : "nologinuser",
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(e) {
                var a = wx.getStorageSync("schoolIndex") ? wx.getStorageSync("schoolIndex") : 0;
                t.setData({
                    school: e.data.data.list,
                    index: wx.getStorageSync("schoolIndex") ? wx.getStorageSync("schoolIndex") : 0,
                    s_id: e.data.data.list[a].s_id
                }), wx.setStorageSync("schoolId", e.data.data.list[a].s_id), t.getSchoolInfo(e.data.data.list[a].s_id);
            }
        });
    },
    getSchoolInfo: function(t) {
        var a = this;
        e.util.request({
            url: "entry/wxapp/SchoolIndex",
            data: {
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat,
                s_id: t
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    schoolInfo: t.data.data
                }), a.getOrderData();
            }
        });
    },
    getPage: function() {
        var t = this;
        t.getLocation(function() {
            e.util.request({
                url: "entry/wxapp/UserInfoUpdate",
                data: {
                    openid: wx.getStorageSync("openid"),
                    nickname: wx.getStorageSync("userinfo").nickName,
                    avatar: wx.getStorageSync("userinfo").avatarUrl
                },
                success: function(a) {
                    e.util.footer(t), t.setData({
                        userInfo: wx.getStorageSync("userinfo")
                    }), t.getSchool();
                }
            });
        });
    },
    getGetUid: function(t) {
        var a = this;
        wx.login({
            success: function(t) {
                t.code && e.util.request({
                    url: "entry/wxapp/GetUid",
                    data: {
                        code: t.code
                    },
                    success: function(t) {
                        console.log(t.data.data.openid), a.setData({
                            getUseInfo: !1
                        }), wx.setStorageSync("openid", t.data.data.openid), wx.getUserInfo({
                            success: function(t) {
                                var e = t.userInfo;
                                wx.setStorageSync("userinfo", e), a.getPage();
                            }
                        });
                    }
                });
            }
        });
    },
    getDateDiff: function(t, e) {
        var a = "", o = new Date().getTime() - t;
        if (!(o < 0)) {
            var n = o / 2592e6, s = o / 6048e5, i = o / 864e5, r = o / 36e5, c = o / 6e4;
            return a = n >= 1 ? parseInt(n) + "月前" : s >= 1 ? parseInt(s) + "周前" : i >= 1 ? parseInt(i) + "天前" : r >= 1 ? parseInt(r) + "小时前" : c >= 1 ? parseInt(c) + "分钟前" : "刚刚", 
            console.log(a), console.log(e), "" == a ? e : a;
        }
    },
    getDateTimeStamp: function(t) {
        t = t;
        var e = Date.parse(t.replace(/-/gi, "/"));
        return this.getDateDiff(e, t);
    },
    getOrderData: function() {
        var a = this;
        e.util.request({
            url: "entry/wxapp/OrderWiteList",
            data: {
                s_id: wx.getStorageSync("schoolId"),
                page: this.data.page,
                status: this.data.type,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(e) {
                for (o = 0; o < e.data.data.order.length; o++) e.data.data.order[o].createtime = a.getDateTimeStamp(e.data.data.order[o].createtime);
                if (1 == this.data.page) a.setData({
                    list: e.data.data.order
                }); else for (var o = 0; o < e.data.data.order.length; o++) a.setData({
                    list: [].concat(t(a.data.list), [ e.data.data.list[o] ])
                });
            }
        });
    }
});