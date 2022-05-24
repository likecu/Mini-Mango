var t = getApp();

Page({
    data: {
        markers: [ {
            iconPath: "/gc_school/resource/images/location.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.32452,
            width: 50,
            height: 50
        } ],
        polyline: [ {
            points: [ {
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.32452,
                latitude: 23.21229
            } ],
            color: "#FF0000DD",
            width: 6,
            dottedLine: !0
        } ],
        detail: {},
        good_details: [],
        id: ""
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            options: t,
            id: t.id
        }), this.getData(t), this.getconfig();
    },
    getconfig: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(t) {
                console.log(t.data.data.sys.logo), a.setData({
                    sysparment: t.data.data.sys
                });
            }
        });
    },
    formSubmit: function(a) {
        console.log(a), t.util.request({
            url: "entry/wxapp/OrderInfo",
            data: {
                o_id: this.data.options.id,
                openid: wx.getStorageSync("openid")
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
    proof: function() {
        wx.navigateTo({
            url: "/gc_school/pages/order/proof?id=" + this.data.detail.order.o_id
        }), console.log(this.data.detail.order.o_id);
    },
    down: function() {
        console.log("下载文件"), wx.showLoading({
            title: "文件下载中"
        }), wx.downloadFile({
            url: this.data.detail.order.attach_file,
            success: function(t) {
                console.log(t), wx.hideLoading({});
                var a = t.tempFilePath;
                wx.openDocument({
                    showMenu: !0,
                    filePath: a,
                    success: function(t) {
                        console.log(t);
                    }
                }), t.statusCode;
            }
        });
    },
    copy: function(t) {
        console.log(t), wx.setClipboardData({
            data: t.currentTarget.dataset.content
        });
    },
    preview: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.index;
        console.log(this.data.detail.order.image), wx.previewImage({
            current: this.data.detail.order.image[a],
            urls: this.data.detail.order.image
        });
    },
    previews: function(t) {
        console.log(t), wx.previewImage({
            current: t.currentTarget.dataset.src,
            urls: [ t.currentTarget.dataset.src ]
        });
    },
    changes: function(t, a) {
        for (var e = t.substr(0, a), o = 0; o < t.length - a; o++) e += "*";
        return e;
    },
    getData: function(a) {
        var e = this;
        this.setData({
            options: a
        }), t.util.request({
            url: "entry/wxapp/Orderinfo",
            data: {
                o_id: a.id,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                if (console.log("12323321", t.data.data.order), 0 == t.data.data.order.is_watch) {
                    var a = t.data.data.order.desc;
                    t.data.data.order.desc.replace(/[0-9]*(\.[0-9]*)?/g, function(t) {
                        var e = t;
                        if (Number(t)) {
                            if (t.toString().length > 3) o = t.substr(0, 2) + "****" + t.substr(6); else var o = t.substr(0, 1) + "**";
                            a = a.replace(e, o), console.log(a);
                        }
                    }), t.data.data.order.sh_phone = t.data.data.order.sh_phone.substr(0, 3) + "****" + t.data.data.order.sh_phone.substr(7), 
                    t.data.data.order.ordersn = t.data.data.order.ordersn.substr(0, 4) + "**************" + t.data.data.order.ordersn.substr(18), 
                    t.data.data.order.sh_name = t.data.data.order.sh_name.substr(0, 1) + t.data.data.order.sh_name.substr(1, t.data.data.order.sh_name.length).replace(/./g, "*"), 
                    t.data.data.order.desc = a, console.log();
                }
                var o = (o = t.data.data.order.good_details).split(",");
                console.log("11111", o), e.setData({
                    detail: t.data.data,
                    good_details: o,
                    markers: [ {
                        iconPath: "/gc_school/resource/images/location.png",
                        id: 0,
                        latitude: t.data.data.order.sh_latitude,
                        longitude: t.data.data.order.sh_longitude,
                        width: 50,
                        height: 50
                    } ],
                    polyline: [ {
                        points: [ {
                            latitude: t.data.data.order.sh_latitude,
                            longitude: t.data.data.order.sh_longitude
                        }, {
                            latitude: t.data.data.order.qu_latitude,
                            longitude: t.data.data.order.qu_longitude
                        } ],
                        color: "#FF0000DD",
                        width: 6,
                        dottedLine: !0
                    } ]
                });
            }
        });
    },
    handleQd: function() {
        var a = this;
        wx.requestSubscribeMessage({
            tmplIds: [ a.data.sysparment.template_id, a.data.sysparment.cancel_template_id ],
            success: function(t) {
                console.log("已授权接收订阅消息");
            },
            complete: function() {
                t.util.request({
                    url: "entry/wxapp/OrderGet",
                    data: {
                        o_id: a.data.detail.order.o_id,
                        openid: wx.getStorageSync("openid"),
                        lon: wx.getStorageSync("city").location.lng,
                        lat: wx.getStorageSync("city").location.lat
                    },
                    success: function(t) {
                        wx.showToast({
                            title: "抢单成功",
                            duration: 2e3
                        }), wx.navigateTo({
                            url: "/gc_school/pages/mygrab/index"
                        });
                    }
                });
            }
        });
    },
    makecall: function(t) {
        console.log(t.currentTarget.dataset.phone), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.phone
        });
    },
    handleZF: function() {
        t.util.request({
            url: "entry/wxapp/Pay",
            data: {
                o_id: this.data.detail.order.o_id
            },
            success: function(a) {
                wx.requestPayment({
                    timeStamp: a.data.data.wdata.timeStamp.toString(),
                    nonceStr: a.data.data.wdata.nonceStr,
                    package: a.data.data.wdata.package,
                    signType: "MD5",
                    paySign: a.data.data.wdata.sign,
                    success: function(a) {
                        console.log("success"), t.globalData.issub = !0, wx.switchTab({
                            url: "/gc_school/pages/order/index"
                        });
                    },
                    fail: function(t) {
                        console.log("fail");
                    }
                });
            }
        });
    },
    handleQh: function() {
        t.util.request({
            url: "entry/wxapp/OrderChangeStatus",
            data: {
                o_id: this.data.detail.order.o_id,
                status: 7,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(t) {
                wx.showToast({
                    title: "取货成功",
                    duration: 2e3
                }), wx.navigateTo({
                    url: "/gc_school/pages/mygrab/index"
                });
            }
        });
    },
    agree: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/agree",
            data: {
                o_id: e.data.detail.order.o_id,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                0 == t.data.errno && (wx.showToast({
                    title: t.data.message
                }), console.log("订单id", e.data.detail.order.o_id), e.getData(e.data.options));
            }
        });
    },
    cancel: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/order/reason?id=" + this.data.detail.order.o_id + "&type=" + t.currentTarget.dataset.type
        });
    },
    handleQX: function() {
        t.util.request({
            url: "entry/wxapp/cancelorder",
            data: {
                o_id: this.data.detail.order.o_id,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(t) {
                wx.showToast({
                    title: "取消成功",
                    duration: 2e3
                }), wx.switchTab({
                    url: "/gc_school/pages/order/index"
                });
            }
        });
    },
    handleWc: function() {
        t.util.request({
            url: "entry/wxapp/OrderOver",
            data: {
                o_id: this.data.detail.order.o_id,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(t) {
                wx.showToast({
                    title: "确认完成",
                    duration: 2e3
                }), wx.switchTab({
                    url: "/gc_school/pages/order/index"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function(t) {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "快来接单，轻松赚零花钱！",
            path: "/gc_school/pages/order/detail?id=" + this.data.id,
            imageUrl: "https://gcwe7.link1024.com/web/img/share.png"
        };
    }
});