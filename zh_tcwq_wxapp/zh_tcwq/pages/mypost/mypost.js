// pages/mypost/mypost.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "审核中", "已通过", "已拒绝"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 15,
  },
  tabClick: function (e) {
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarColor({
      frontColor: 'black',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    that.reload()
  },
  reload: function (e) {
    var that = this
    var user_id = wx.getStorageSync('users').id
    var url = wx.getStorageSync('url')
    var user_img = wx.getStorageSync('users').img
    console.log(user_img)
    //---------------------------------- 获取轮播图集合----------------------------------
    app.util.request({
      'url': 'entry/wxapp/MyPost',
      'cachetime': '0',
      data: { user_id: user_id },
      success: function (res) {
        console.log(res)
        var audit = [], adopt = [], refuse = [], slide = []
        for (let i in res.data) {
          res.data[i].time = that.ormatDate(res.data[i].time).slice(0, 16);
          res.data[i].img = res.data[i].img.split(",").slice(0, 4)
          // if (res.data[i].type_name != null){
          //   slide.push(res.data[i])
          // }
          slide.push(res.data[i])
          // 1为待审核------------------2为已通过--------------------------3为已拒绝
          if (res.data[i].state == 1) {
            audit.push(res.data[i])
          } else if (res.data[i].state == 2) {
            adopt.push(res.data[i])
          } else if (res.data[i].state == 3) {
            refuse.push(res.data[i])
          }

        }
        that.setData({
          slide: slide,
          user_img: user_img,
          url: url,
          audit: audit,
          adopt: adopt,
          refuse: refuse
        })
      },
    })
  },
  //---------------------------------- 点击跳转详情----------------------------------
  see: function (e) {
    var that = this
    console.log(e)
    console.log(that.data)
    var classification_info = that.data.slide
    var id = e.currentTarget.dataset.id
    for (let i in classification_info) {
      if (classification_info[i].id == id) {
        var my_post = classification_info[i]
      }
    }
    console.log(my_post)
    wx: wx.navigateTo({
      url: '../infodetial/infodetial?id=' + my_post.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // -----------------------------时间戳转换日期时分秒--------------------------------
  ormatDate: function (dateNum) {
    var date = new Date(dateNum * 1000);
    return date.getFullYear() + "-" + fixZero(date.getMonth() + 1, 2) + "-" + fixZero(date.getDate(), 2) + " " + fixZero(date.getHours(), 2) + ":" + fixZero(date.getMinutes(), 2) + ":" + fixZero(date.getSeconds(), 2);
    function fixZero(num, length) {
      var str = "" + num;
      var len = str.length;
      var s = "";
      for (var i = length; i-- > len;) {
        s += "0";
      }
      return s + str;
    }
  },
  bianji: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx: wx.navigateTo({
      url: 'modify?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    // wx: wx.showModal({
    //   title: '提示',
    //   content: '程序员努力开发中',
    //   showCancel: true,
    //   cancelText: '取消',
    //   cancelColor: '',
    //   confirmText: '确定',
    //   confirmColor: '',
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  cancel: function (e) {
    var that = this
    wx: wx.showModal({
      title: '提示',
      content: '是否删除帖子',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var id = e.currentTarget.dataset.id
          app.util.request({
            'url': 'entry/wxapp/DelPost',
            'cachetime': '0',
            data: {
              id: id
            },
            success: function (res) {
              console.log(res)
              // -----------------------------------发布成功跳转到首页-----------------------------------------
              if (res.data == 1) {
                that.reload()
              }
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.reload()
    wx: wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})