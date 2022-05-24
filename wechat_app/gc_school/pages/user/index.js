var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, e = getApp();

Page({
    data: {
        userInfo: {
            coupu: 0,
            money: 0
        },
        islogin: !1,
        loginuserinfo: [],
        color: "#FF6444"
    },
    onLoad: function(t) {
        wx.getStorageSync("userinfo") && (console.log("用户信息", wx.getStorageSync("userinfo")), 
        this.setData({
            loginuserinfo: wx.getStorageSync("userinfo"),
            islogin: !0
        }));
    },
    link: function(t) {
        console.log(this.data.userInfo.runerStatus), 0 != this.data.userInfo.runerStatus && 3 != this.data.userInfo.runerStatus || wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    yue: function() {
        console.log(this.data.sysparment.is_pay_open), wx.navigateTo({
            url: "/gc_school/pages/replay/index?type=" + this.data.sysparment.is_pay_open
        });
    },
    link2: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    onReady: function() {},
    getUser: function() {
        var o = this;
        e.util.request({
            url: "entry/wxapp/MyMoney",
            data: {
                openid: wx.getStorageSync("openid"),
                s_id: wx.getStorageSync("schoolId")
            },
            success: function(e) {
                o.setData({
                    userInfo: t({}, o.data.userInfo, {
                        money: e.data.data.money,
                        coupu: e.data.data.coupon,
                        runerStatus: e.data.data.status,
                        has_store: e.data.data.has_store,
                        store_id: e.data.data.store_id
                    })
                }), "" == e.data.data.logo ? o.setData({
                    logo: "/images/code/c17.png"
                }) : o.setData({
                    logo: e.data.data.logo
                });
            }
        });
    },
    getUserCoupu: function() {
        var o = this;
        e.util.request({
            url: "entry/wxapp/MyCouponList",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {
                o.setData({
                    userInfo: t({}, o.data.userInfo, {
                        coupu: e.data.data.list.length
                    })
                }), o.getUseRunerStatus();
            }
        });
    },
    getUseRunerStatus: function() {
        var o = this;
        e.util.request({
            url: "entry/wxapp/RunerStatus",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {
                console.log("65897879987", e), o.setData({
                    userInfo: t({}, o.data.userInfo, {
                        runerStatus: e.data.data
                    })
                });
            }
        });
    },
    wxlogin: function() {
        wx.getUserProfile({
            desc: "用于获取用户信息",
            success: function(t) {
                console.log(t);
            }
        });
    },
    bindgetuserinfo: function(t) {
        console.log("打印", t);
        var e = this;
        wx.getUserProfile({
            desc: "用于获取用户信息",
            success: function(t) {
                console.log("dd", t), "getUserProfile:ok" == t.errMsg ? (e.setData({
                    getUseInfo: !0
                }), wx.setStorage({
                    key: "useInfo",
                    data: "true"
                }), e.getGetUid(t.userInfo)) : e.setData({
                    getUseInfo: !0
                });
            }
        });
    },
    getGetUid: function(t) {
        var o = this;
        wx.login({
            success: function(a) {
                a.code && e.util.request({
                    url: "entry/wxapp/GetUid",
                    data: {
                        code: a.code
                    },
                    success: function(e) {
                        return o.setData({
                            getUseInfo: !1
                        }), console.log(e), console.log("这里的"), wx.aldPushSendOpenid(e.data.data.openid), 
                        wx.setStorageSync("openid", e.data.data.openid), wx.setStorageSync("userinfo", t), 
                        o.setData({
                            loginuserinfo: t,
                            islogin: !0
                        }), o.toUserInfo(e.data.data.openid, t), o.getUser(), !1;
                    }
                });
            }
        });
    },
    toUserInfo: function(t, o) {
        console.log(o);
        e.util.request({
            url: "entry/wxapp/UserInfoUpdate",
            data: {
                openid: t,
                nickname: o.nickName,
                avatar: o.avatarUrl
            },
            success: function(t) {
                console.log(t.data);
            }
        });
    },
    onShow: function() {
        wx.getStorageSync("openid") && this.getUser(), this.getconfig(), console.log("1221221", wx.getStorageSync("userinfo")), 
        this.setData({
            userInfo: wx.getStorageSync("userinfo")
        });
    },
    getconfig: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(e) {
                console.log(e.data.data.sys.logo), t.setData({
                    sysparment: e.data.data.sys
                }), "" == e.data.data.sys.logo ? t.setData({
                    logo: "/images/code/c17.png"
                }) : t.setData({
                    logo: e.data.data.sys.logo
                }), t.msg();
            }
        });
    },
    msg: function() {
        console.log("弹出框");
        var t = this;
        wx.getSetting({
            withSubscriptions: !0,
            success: function(t) {
                console.log("设置", t), console.log(t.subscriptionsSetting);
            }
        }), wx.requestSubscribeMessage({
            tmplIds: [ t.data.sysparment.template_id, t.data.sysparment.cancel_template_id ],
            success: function(t) {
                console.log("已授权接收订阅消息");
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});