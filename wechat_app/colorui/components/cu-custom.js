var t = getApp();

Component({
    options: {
        addGlobalClass: !0,
        multipleSlots: !0
    },
    properties: {
        bgColor: {
            type: String,
            default: ""
        },
        isCustom: {
            type: [ Boolean, String ],
            default: !1
        },
        isBack: {
            type: [ Boolean, String ],
            default: !1
        },
        bgImage: {
            type: String,
            default: ""
        }
    },
    data: {
        StatusBar: wx.getStorageSync("StatusBar") ? wx.getStorageSync("StatusBar") : 64,
        CustomBar: wx.getStorageSync("CustomBar") ? wx.getStorageSync("CustomBar") : 20,
        Custom: t.globalData.Custom,
        style: ""
    },
    ready: function() {},
    methods: {
        BackPage: function() {
            wx.navigateBack({
                delta: 1,
                success: function() {
                    wx.removeStorage({
                        key: "json"
                    });
                },
                fail: function() {
                    wx.switchTab({
                        url: "/gc_school/pages/home/index"
                    });
                }
            });
        },
        toHome: function() {
            wx.reLaunch({
                url: "/pages/index/index"
            });
        }
    }
});