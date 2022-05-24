var t = getApp();

Page({
    data: {
        markers: [ {
            iconPath: "/wx_tx/resource/images/location.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.32452,
            width: 50,
            height: 50
        } ],
        detail: {}
    },
    onLoad: function(t) {
        console.log(t), this.getData(t);
    },
    formSubmit: function(a) {
        console.log(a), t.util.request({
            url: "entry/wxapp/OrderGet",
            data: {
                id: this.data.options.id,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(t) {
                wx.showToast({
                    title: t.data.message
                }), wx.navigateTo({
                    url: "/wx_tx/pages/myorder/index"
                });
            }
        });
    },
    getData: function(a) {
        var o = this;
        this.setData({
            options: a
        }), t.util.request({
            url: "entry/wxapp/Orderinfo",
            data: {
                id: a.id,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(t) {
                console.log(t.data.data), o.setData({
                    detail: t.data.data,
                    markers: [ {
                        iconPath: "/wx_tx/resource/images/location.png",
                        id: 0,
                        latitude: t.data.data.latitude,
                        longitude: t.data.data.longitude,
                        width: 50,
                        height: 50
                    } ],
                    polyline: [ {
                        points: [ {
                            latitude: t.data.data.latitude,
                            longitude: t.data.data.longitude
                        }, {
                            latitude: t.data.data.latitude - 10,
                            longitude: t.data.data.longitude
                        } ],
                        color: "#FF0000DD",
                        width: 2,
                        dottedLine: !0
                    } ]
                });
            }
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