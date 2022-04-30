// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heightConfig: 0,
    navTop: 0,
    theme_id: -1,
    themeMessage: [],
    articleMessage: [],
    new_article: [], //最新的几篇文章
    new_end: false, //是否加载完成
    new_page: 1, //当前page页数
    theme_name:'',
    is_group:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options);
    this.setData({
      navTop: getApp().globalData.navTop,
      heightConfig: getApp().globalData.windowHeight,
      theme_id: options.theme_id,
      theme_name:options.name,
      is_group:options.is_group,
      themeMessage: wx.getStorageSync("themeMessage")
    })
    if(this.data.theme_name!='' && this.data.theme_id==''){
      this.getThemeId(this.data.theme_name)
      console.log("加载小组全都为空:",this.data.theme_id)
    }
    else if(this.data.theme_name!=''){
      this.getThemeId(this.data.theme_name)
      console.log("加载小组只有名字为空:id为",this.data.theme_id)
    }
    else{
      this.loadMessage(this.data.theme_id, this.data.new_page)
    }

  },


  getThemeId(name){
    let that=this;
    wx.request({
      url: getApp().globalData.url + '/api/getThemeId/' + name,
      method: 'GET',
      success: (result) => {
        console.log("当前点击小组的id：  ",result.data.data)
        if(result.data.data!=null){
          that.setData({
            theme_id:result.data.data,
          })
        }
        that.loadMessage(that.data.theme_id, that.data.new_page)
      },

    });
  },

  
  newArticleLoadMessage() {
wx.showLoading({
  title: '加载中',
})

    this.loadMessage(this.data.theme_id, ++this.data.new_page);
    wx.hideLoading({  })
  },

  loadMessage(theme_id, index) {
    let that = this;

    if (this.data.new_end) {
      return;
    }


    wx.request({
      url: getApp().globalData.url + '/api/getNewArticleByThemeId/' + theme_id + "/" + index,
      method: 'GET',
      success: (result) => {
        if (that.data.new_page > result.data.data.pages) {
          that.setData({
            new_end: true
          })
          return
        }

        if (that.data.new_page == 1) {
          that.setData({
            new_article: result.data.data.list
          })
        } else {
          that.setData({
            new_article: that.data.new_article.concat(result.data.data.list)
          })
        }

      },

    });
  },

  //查看用户信息
  check_user_message(e) {
    wx.navigateTo({
      url: '/pages/me/me?id=' + e.currentTarget.id
    });
  },
  /**
   * 
   * @param {跳转帖子详情} e 
   */
  message_detail(e) {
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?article_id=' + e.currentTarget.id,
    });
  },

  adds() {
    wx.navigateTo({
      url: '/pages/add_detail/index/index?theme_id=' + this.data.theme_id,
    });
  },
})