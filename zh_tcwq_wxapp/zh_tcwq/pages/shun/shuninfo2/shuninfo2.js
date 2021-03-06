// zh_tcwq/pages/shun/shuninfo2/shuninfo2.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    wx.login({
      success: function (res) {
        var code = res.code
        wx.setStorageSync("code", code)
        wx.getUserInfo({
          success: function (res) {
            wx.setStorageSync("user_info", res.userInfo)
            var nickName = res.userInfo.nickName
            var avatarUrl = res.userInfo.avatarUrl
            app.util.request({
              'url': 'entry/wxapp/openid',
              'cachetime': '0',
              data: { code: code },
              success: function (res) {
                wx.setStorageSync("key", res.data.session_key)
                wx.setStorageSync("openid", res.data.openid)
                var openid = res.data.openid
                app.util.request({
                  'url': 'entry/wxapp/Login',
                  'cachetime': '0',
                  data: { openid: openid, img: avatarUrl, name: nickName },
                  success: function (res) {
                    wx.setStorageSync('users', res.data)
                    wx.setStorageSync('uniacid', res.data.uniacid)
                  },
                })
              },
            })
          },
          fail: function (res) {
            wx.getSetting({
              success: (res) => {
                var authSetting = res.authSetting
                if (authSetting['scope.userInfo'] == false) {
                  wx.openSetting({
                    success: function success(res) {
                    }
                  });
                }
              }
            })
          }
        })
      }
    })
    console.log(options)
    // wx:wx.showModal({
    //   title: '温馨提示',
    //   content: '点击出发地和目的地即可进入导航',
    //   showCancel: true,
    //   cancelText: '取消',
    //   cancelColor: '',
    //   confirmText: '确定',
    //   confirmColor: '',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
    function getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
      return currentdate;
    }
    var time = getNowFormatDate()
    app.util.request({
      'url': 'entry/wxapp/CarInfo',
      'cachetime': '0',
      data: { id: options.id },
      success: res => {
        console.log(res)
        var car = res.data.pc
        var tag = res.data.tag
        car.time = app.ormatDate(car.time).slice(5, 16)
        car.start_time1 = car.start_time.slice(5, 10)
        car.start_time2 = car.start_time.slice(10, 17)
        that.setData({
          pc: car,
          tag: tag
        })
      }
    })
  },
  call_phone: function (e) {
    var that = this
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
  // ------------------------------------点击查看商家详细地址
  dizhi1: function (e) {
    var that = this
    var lat2 = Number(that.data.pc.star_lat)
    var lng2 = Number(that.data.pc.star_lng)
    console.log(lat2)
    console.log(lng2)
    wx.openLocation({
      latitude: lat2,
      longitude: lng2,
      name: that.data.pc.link_name,
      address: that.data.pc.start_place
    })
  },
  dizhi2: function (e) {
    var that = this
    var lat2 = Number(that.data.pc.end_lat)
    var lng2 = Number(that.data.pc.end_lng)
    console.log(lat2)
    console.log(lng2)
    wx.openLocation({
      latitude: lat2,
      longitude: lng2,
      name: that.data.pc.link_name,
      address: that.data.pc.end_place
    })
  },
  shouye: function (e) {
    console.log(e)
    wx: wx.reLaunch({
      url: '../../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  fabu:function(e){
      wx:wx.reLaunch({
        url: '../shun',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
  },
  phone: function (e) {
    var tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
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
    var that = this
    console.log(that.data)
    var user_id = wx.getStorageSync('users').id
    var name = that.data.yellow_info.company_name
    var store_id = that.data.pc.id
    return {
      title: name,
      path: '/zh_tcwq/pages/shun/shuninfo2/shuninfo2?id=' + store_id ,
      success: function (res) {
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})