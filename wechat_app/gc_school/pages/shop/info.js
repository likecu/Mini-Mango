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
        id: 0,
        time: "",
        time_end: ""
    },
    onLoad: function(t) {
        this.getInfo();
    },
    bindTimeChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            time: t.detail.value
        });
    },
    address: function(t) {
        var a = t.detail.value.replace(/\s+/g, "");
        this.setData({
            address: a
        });
    },
    phone: function(t) {
        var a = t.detail.value.replace(/\s+/g, "");
        this.setData({
            phone: a
        });
    },
    bindTimeChange1: function(t) {
        this.setData({
            time_end: t.detail.value
        });
    },
    getInfo: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/storeInfo",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    name: t.data.data.name,
                    id: t.data.data.id,
                    address: t.data.data.address,
                    phone: t.data.data.phone,
                    img: t.data.data.img,
                    time: t.data.data.start_time,
                    time_end: t.data.data.end_time,
                    word_num: t.data.data.name.length
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
        });      
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        var path = 'images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
  
        wx.cloud.uploadFile({
          cloudPath: path,
          filePath: a.tempFilePaths[0],
          config: {
            env: 'cloud-0ggabd9q9ceb4c32'
          }
        }).then(res1 => {
          e.setData({
            img: res1.fileID
        })
        }).catch((e) => {
          console.log("======上传失败======", result);
          wx.hideLoading();
        });

        // wx.uploadFile({
        //     url: t.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
        //     filePath: a.tempFilePaths[0],
        //     header: {
        //         "content-type": "application/x-www-form-urlencoded"
        //     },
        //     name: "file",
        //     success: function(t) {
        //         wx.hideLoading();
        //         var a = JSON.parse(t.data);
        //         console.log(a), 0 == a.errno ? e.setData({
        //             img: a.data
        //         }) : wx.showToast({
        //             title: a.message,
        //             icon: "none"
        //         });
        //     }
        // });
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
        console.log(this.data.cate_id);
        if (!this.data.name) return t.util.message("请输入名称", "", "error"), !1;
        if (!this.data.address) return t.util.message("请输入商家地址", "", "error"), !1;
        var e = /^1[3456789]\d{9}$/;
        return this.data.phone ? e.test(this.data.phone) ? this.data.img ? void t.util.request({
            url: "entry/wxapp/storeEdit",
            data: {
                name: this.data.name,
                address: this.data.address,
                phone: this.data.phone,
                img: this.data.img,
                start_time: this.data.time,
                end_time: this.data.time_end,
                openid: wx.getStorageSync("openid"),
                id: this.data.id
            },
            success: function(t) {
                console.log(t), 0 == t.data.errno && wx.showToast({
                    title: t.data.message
                });
            }
        }) : (t.util.message("请上传图片", "", "error"), !1) : (t.util.message("手机号码格式有误", "", "error"), 
        !1) : (t.util.message("请输入手机号", "", "error"), !1);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});