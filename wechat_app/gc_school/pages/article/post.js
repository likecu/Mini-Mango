var t = getApp();

Page({
    data: {
        type: "",
        video: "",
        addedCount: 0,
        picList: [],
        images: [],
        content: "",
        cateList: [],
        index: 0,
        is_agree: 0,
        sysparment: {},
        is_click: !0
    },
    onLoad: function(t) {
        this.getCate(), this.getSysparment();
    },
    getSysparment: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(t) {
                a.setData({
                    sysparment: t.data.data.sys
                });
            }
        });
    },
    onReady: function() {},
    checkagree: function() {
        this.setData({
            is_agree: !this.data.is_agree
        }), console.log(this.data.is_agree);
    },
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        });
    },
    getCate: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/articlecate",
            method: "POST",
            data: {
                s_id: wx.getStorageSync("schoolId")
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    cateList: t.data.data
                });
            }
        });
    },
    getCon: function(t) {
        t.detail.value && this.setData({
            content: t.detail.value.replace(/\s+/g, "")
        });
    },
    choose: function() {
        var t = this;
        wx.chooseMedia({
            count: 3 - t.data.addedCount,
            success: function(a) {
                t.setData({
                    type: a.type
                }), "image" == a.type ? t.uploadimg(a.tempFiles, "ImgPost") : t.uploadvideo(a.tempFiles);
            }
        });
    },
    uploadvideo: function(a) {
        wx.showLoading({
            title: "上传中...",
            mask: !0
        });
        var e = this;
        //  wx.uploadFile({
        //     url: t.util.url() + "c=entry&a=wxapp&do=VideoPost&m=gc_school",
        //     filePath: a[0].tempFilePath,
        //     name: "file",
        //     formData: null,
        //     success: function(t) {
        //         console.log(JSON.parse(t.data)), e.setData({
        //             video: JSON.parse(t.data).data
        //         }), wx.hideLoading({});
        //     }
        // });
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      var path = 'images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: path,
        // 指定要上传的文件的小程序临时文件路径
        filePath: a[0].tempFilePath,
        config: {
          env: 'cloud-0ggabd9q9ceb4c32'
        }
      }).then(res1 => {
        e.setData({
          video: res1.fileID
      })
      }).catch((e) => {
        console.log("======上传失败======", result);
        wx.hideLoading();
      });
    },

    uploadimg: function(a, e, i) {
        wx.showLoading({
            title: "上传中...",
            mask: !0
        });
        for (var o = this, s = o.data.addedCount, n = 0; n < a.length; n++) wx.uploadFile({
            url: t.util.url() + "c=entry&a=wxapp&do=" + e + "&m=gc_school",
            filePath: a[n].tempFilePath,
            name: "file",
            formData: null,
            success: function(t) {
                var a = JSON.parse(t.data);
                if (0 == a.errno) {
                    var e = o.data.picList;
                    s++, e.push(a.data);
                    var i = o.data.images.concat(a.data);
                    o.setData({
                        images: i,
                        addedCount: s,
                        picList: e
                    }), console.log("addedCount的值", o.data.addedCount), console.log("count的值", s), console.log("长度", o.data.picList.length), 
                    s == o.data.picList.length && wx.hideLoading({});
                } else wx.showToast({
                    title: a.message,
                    icon: "none"
                });
            }
        });
    },
    delvideo: function() {
        this.setData({
            video: ""
        }), console.log(this.data.video);
    },
    delimg: function(t) {
        var a = t.currentTarget.dataset.index;
        this.data.picList.splice(a, 1), this.setData({
            picList: this.data.picList,
            addedCount: this.data.addedCount - 1
        });
    },
    submit: function() {
        var a = this;
        if ("" == a.data.content) return t.util.message("请输入内容", "", "error"), !1;
        a.data.is_click ? (a.setData({
            is_click: !1
        }), t.util.request({
            url: "entry/wxapp/submitarticle",
            method: "POST",
            data: {
                cate_id: a.data.cateList[a.data.index].id,
                content: a.data.content,
                type: a.data.type,
                video: a.data.video,
                img: JSON.stringify(a.data.picList),
                openid: wx.getStorageSync("openid"),
                s_id: wx.getStorageSync("schoolId"),
                is_anonymous: a.data.is_agree
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    content: ""
                }), wx.showToast({
                    title: "提交成功",
                    icon: "success"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/gc_school/pages/article/my"
                    });
                }, 1e3);
            },
            complete: function() {
                a.setData({
                    is_click: !0
                });
            }
        })) : wx.showToast({
            title: "请勿重复点击",
            icon: "none"
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});