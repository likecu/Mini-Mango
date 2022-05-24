var t = getApp();

Page({
    data: {
        word_num: 0,
        maxTextLen: 20,
        cate: [],
        cate_index: 0,
        img: "",
        name: "",
        price: "",
        cate_id: 0,
        id: 0
    },
    onLoad: function(t) {
        this.getCate(), t.id && (this.setData({
            id: t.id
        }), this.getInfo());
    },
    getInfo: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/goodsInfo",
            data: {
                id: a.data.id
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    name: t.data.data.name,
                    price: t.data.data.price,
                    img: t.data.data.img,
                    cate_id: t.data.data.cate_id,
                    word_num: t.data.data.name.length
                });
                for (var e = 0; e < a.data.cate.length; e++) a.data.cate[e].id == t.data.data.cate_id && a.setData({
                    cate_index: e
                });
            }
        });
    },
    getCate: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/cate",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    cate: t.data.data,
                    cate_id: t.data.data[0].id
                });
            }
        });
    },
    PickerChange: function(t) {
        this.setData({
            cate_index: t.detail.value,
            cate_id: this.data.cate[t.detail.value].id
        });
    },
    choose: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album" ],
            success: function(a) {
                console.log("path", a), t.upload(a);
            }
        });
    },
    upload: function(a) {
        var e = this;
        wx.showLoading({
            title: "上传中"
        }), wx.uploadFile({
            url: t.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
            filePath: a.tempFilePaths[0],
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            name: "file",
            success: function(t) {
                wx.hideLoading();
                var a = JSON.parse(t.data);
                console.log(a), 0 == a.errno ? e.setData({
                    img: a.data
                }) : wx.showToast({
                    title: a.message,
                    icon: "none"
                });
            }
        });
    },
    price: function(t) {
        this.setData({
            price: t.detail.value
        });
    },
    textarea: function(t) {
        var a = t.detail.value.replace(/\s+/g, "");
        this.setData({
            word_num: a.length,
            word_left: 20 - a.length,
            name: a
        });
    },
    submit: function(a) {
        return console.log("状态", a.currentTarget.dataset.status), console.log("价格", this.data.price), 
        console.log(this.data.cate_id), this.data.name ? this.data.price <= 0 ? (t.util.message("请输入价格", "", "error"), 
        !1) : this.data.cate_id ? this.data.img ? void t.util.request({
            url: "entry/wxapp/operateGoods",
            data: {
                img: this.data.img,
                name: this.data.name,
                price: this.data.price,
                cate_id: this.data.cate_id,
                openid: wx.getStorageSync("openid"),
                status: a.currentTarget.dataset.status,
                id: this.data.id
            },
            success: function(t) {
                console.log(t), 0 == t.data.errno && (wx.showToast({
                    title: t.data.message
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/gc_school/pages/shop/goods"
                    });
                }, 1e3));
            }
        }) : (t.util.message("请上传图片", "", "error"), !1) : (t.util.message("请选择分类", "", "error"), 
        !1) : (t.util.message("请输入名称", "", "error"), !1);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});