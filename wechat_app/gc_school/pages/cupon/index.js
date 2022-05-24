var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, e = getApp();

Page({
    data: {
        showNodata: !1,
        erranderId: 2,
        address: {
            available: []
        }
    },
    onLoad: function(t) {
        console.log("接收的金额", t.fee), this.setData({
            fee: Number(t.fee).toFixed(2)
        }), this.getData();
    },
    getData: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/MyCouponList",
            data: {
                openid: wx.getStorageSync("openid"),
                s_id: wx.getStorageSync("schoolId")
            },
            success: function(e) {
                console.log("21222", e), t.setData({
                    mylist: e.data.data.list
                }), t.getDataCupon();
            }
        });
    },
    getDataCupon: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/CouponList",
            data: {
                openid: wx.getStorageSync("openid"),
                s_id: wx.getStorageSync("schoolId"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(e) {
                t.setData({
                    list: e.data.data.list
                });
            }
        });
    },
    handleGet: function(t) {
        var a = this;
        e.util.request({
            url: "entry/wxapp/CouponGet",
            data: {
                co_id: t.currentTarget.dataset.id,
                openid: wx.getStorageSync("openid"),
                s_id: wx.getStorageSync("schoolId")
            },
            success: function(t) {
                a.getData();
            }
        });
    },
    handleUser: function(e) {
        var a = getCurrentPages(), n = a[a.length - 2];
        "gc_school/pages/public/index" == n.route ? (console.log(this.data.fee), console.log("所选优惠券", e.currentTarget.dataset.y_money), 
        this.data.fee < e.currentTarget.dataset.y_money ? wx.showToast({
            title: "优惠券不可用",
            icon: "none"
        }) : (n.setData({
            form: t({}, n.data.form, {
                co_id: e.currentTarget.dataset.id,
                y_money: e.currentTarget.dataset.y_money,
                co_title: e.currentTarget.dataset.title
            })
        }), wx.navigateBack({
            cupon: e.currentTarget.dataset.id
        }))) : wx.navigateBack({
            id: id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});