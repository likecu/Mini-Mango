function t(t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t;
}

require("../../../wxParse/showdown").setFlavor;

var a, e = getApp();

Page({
  data: (a = {
      img_url: [],
      count: 4,
      canphoto: 4,
      imgurl: [],
      name: "",
      newprice: "",
      oldprice: "",
      desc: "",
      phone: "",
      stock: 0,
      array: ["全新", "9成新", "8成新", "7成新", "6成新", "5成新以下"],
      index: 0,
      cateList: [],
      indexs: 0,
      images: []
    }, t(a, "count", 3), t(a, "addedCount", 0), t(a, "picList", []), t(a, "sys", {}),
    t(a, "is_click", !0), a),
  onLoad: function (t) {
    this.getCate();
    var a = this;
    e.util.request({
      url: "entry/wxapp/Sysparment",
      success: function (t) {
        console.log("获取配置", t.data.data), a.setData({
          sys: t.data.data.sys
        });
      }
    });
  },
  getCate: function () {
    var t = this;
    e.util.request({
      url: "entry/wxapp/secondCate",
      data: {
        sid: wx.getStorageSync("schoolId")
      },
      success: function (a) {
        console.log(a.data.data), t.setData({
          cateList: a.data.data.cate
        });
      }
    });
  },
  bindPickerChange: function (t) {
    this.setData({
      index: t.detail.value
    });
  },
  bindPickerChanges: function (t) {
    this.setData({
      indexs: t.detail.value
    });
  },
  chooseImages: function () {
    console.log("执行几级");
    var t = this;
    wx.chooseImage({
      count: 3 - t.data.addedCount,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function (a) {
        t.setData({}), t.uploadimg({
          path: a.tempFilePaths
        });
      }
    });
  },
  uploadimg: function (t) {
    wx.showLoading({
      title: "上传中...",
      mask: !0
    }), console.log("上传中");
    // for (var a = this, i = a.data.addedCount, s = 0; s < t.path.length; s++) wx.uploadFile({
    //     url: e.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
    //     filePath: t.path[s],
    //     name: "file",
    //     formData: null,
    //     success: function(t) {
    //         var e = JSON.parse(t.data);
    //         if (0 == e.errno) {
    //             i++;
    //             var s = a.data.picList;
    //             s.push(e.data);
    //             var o = a.data.images.concat(e.data);
    //             a.setData({
    //                 images: o,
    //                 addedCount: i,
    //                 picList: s
    //             }), console.log(a.data.addedCount), i == a.data.picList.length && wx.hideLoading({});
    //         } else wx.showToast({
    //             title: e.message,
    //             icon: "none"
    //         });
    //     }
    // });
    for (var a = this, i = a.data.addedCount, s = 0; s < t.path.length; s++) {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      //上传图片
      //你的域名下的/images/文件下的/当前年月日文件下的/图片.png
      //图片路径可自行修改
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      var path = 'images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: path,
        // 指定要上传的文件的小程序临时文件路径
        filePath: t.path[s],
        config: {
          env: 'cloud-0ggabd9q9ceb4c32'
        }
      }).then(res1 => {
        i++;
        var s = a.data.picList;
        s.push(res1.fileID);
        a.setData({
          images: s,
          addedCount: i,
          picList: s
        }), console.log(a.data.addedCount), i == a.data.picList.length && wx.hideLoading({});
      }).catch((e) => {
        console.log("======上传失败======", result);
        wx.hideLoading();
      });
    }
  },
  deleteImage: function (t) {
    this.data.images.splice(t.detail, 1), this.data.picList.splice(t.detail, 1), this.setData({
      images: this.data.images,
      picList: this.data.picList,
      addedCount: this.data.addedCount - 1
    }), console.log("删除后的", this.data.picList);
  },
  upload: function () {
    var t = this,
      a = this.data.img_url;
    console.log(a), wx.showLoading();
    for (var i = 0; i < a.length; i++) {
      // wx.uploadFile({
      //   url: e.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
      //   filePath: a[i],
      //   header: {
      //     "content-type": "application/x-www-form-urlencoded"
      //   },
      //   name: "file",
      //   success: function (a) {
      //     var e = a.data;
      //     e = JSON.parse(e).data, t.data.imgurl.push(e), console.log(t.data.imgurl), wx.hideLoading();
      //   }
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
        filePath: a[i],
        config: {
          env: 'cloud-0ggabd9q9ceb4c32'
        }
      }).then(res1 => {
        t.data.imgurl.push(res1.fileID)
      }).catch((e) => {
        console.log("======上传失败======", result);
        wx.hideLoading();
      });
    }
  },
  save: function () {
    var t = this;
    return console.log("长度", t.data.picList.length), t.data.newprice <= 0 ? (e.util.message("现价必须大于0", "", "error"),
      !1) : t.data.cateList.length <= 0 ? (e.util.message("请选择分类", "", "error"), !1) : "" == t.data.name || "" == t.data.oldprice || "" == t.data.newprice || "" == t.data.desc || "" == t.data.phone ? (e.util.message("不能有空值", "", "error"),
      !1) : (console.log("库存", t.data.stock), t.data.stock <= 0 ? (e.util.message("请填写库存", "", "error"),
      !1) : 0 == t.data.picList.length ? (e.util.message("请上传图片", "", "error"), !1) : /^1[3456789]\d{9}$/.test(t.data.phone) ? void wx.showModal({
      title: "提示",
      content: "允许接收订阅消息",
      success: function (a) {
        a.confirm && wx.requestSubscribeMessage({
          tmplIds: [t.data.sys.second_template_id],
          success: function (t) {
            console.log("已授权接收订阅消息");
          },
          complete: function (a) {
            t.data.is_click ? (t.setData({
              is_click: !1
            }), e.util.request({
              url: "entry/wxapp/submitSecond",
              method: "POST",
              data: {
                name: t.data.name,
                phone: t.data.phone,
                stock: t.data.stock,
                oldprice: t.data.oldprice,
                newprice: t.data.newprice,
                content: t.data.desc,
                degree: t.data.array[t.data.index],
                cate_id: t.data.cateList[t.data.indexs].id,
                img: JSON.stringify(t.data.picList),
                openid: wx.getStorageSync("openid"),
                s_id: wx.getStorageSync("schoolId")
              },
              success: function (t) {
                console.log(t.data.data), wx.redirectTo({
                  url: "/gc_school/pages/secondhand/my"
                });
              },
              complete: function () {
                t.setData({
                  is_click: !0
                });
              }
            })) : wx.showToast({
              title: "请勿重复点击",
              icon: "none"
            });
          }
        });
      }
    }) : (e.util.message("手机号码格式有误", "", "error"), !1));
  },
  bookNameInput: function (t) {
    this.setData({
      name: t.detail.value
    });
  },
  oldpriceInput: function (t) {
    this.setData({
      oldprice: t.detail.value
    });
  },
  newpriceInput: function (t) {
    this.setData({
      newprice: t.detail.value
    });
  },
  phone: function (t) {
    this.setData({
      phone: t.detail.value
    });
  },
  stock: function (t) {
    this.setData({
      stock: t.detail.value
    });
  },
  descInput: function (t) {
    this.setData({
      desc: t.detail.value
    });
  },
  onReady: function () {},
  chooseimage: function () {
    var t = this;
    this.setData({
      imgurl: []
    }), wx.chooseImage({
      count: t.data.canphoto,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (a) {
        if (a.tempFilePaths, a.tempFilePaths.length > 0) {
          var e = t.data.img_url;
          e = e.concat(a.tempFilePaths), t.setData({
            img_url: e,
            canphoto: t.data.canphoto - a.tempFilePaths.length
          }), t.data.img_url.length >= t.data.count ? (t.setData({
            hideAdd: 1
          }), wx.showToast({
            title: "最多上传4张照片",
            icon: "none"
          })) : t.setData({
            hideAdd: 0
          }), t.upload(t.data.img_url);
        }
      }
    });
  },
  deleteImg: function (t) {
    var a = this.data.img_url,
      e = t.target.dataset.index;
    a.splice(e, 1), this.setData({
      img_url: a,
      hideAdd: !(this.data.img_url.length < this.data.count)
    });
  },
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {}
});