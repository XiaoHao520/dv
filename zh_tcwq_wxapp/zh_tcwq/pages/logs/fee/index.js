//logs.js
const util = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Return: false,
    display: 'hide',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var pages = getCurrentPages();
    var prevPage = pages
    prevPage.route = 'zh_tcwq/pages/logs/index'
    if (that.data.Return == true) {
      prevPage.setData({
        Return: true
      })
    }
    wx.setNavigationBarColor({
      frontColor: 'black',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    var support = wx.getStorageSync('System').bq_name
    var bq_logo = wx.getStorageSync('System').bq_logo
    var user_info = wx.getStorageSync('user_info')
    console.log("-----------------------------");
    console.log(user_info)
    var store = wx.getStorageSync('store')
    var url = wx.getStorageSync('url')
    console.log(store)
    that.setData({
      store: store,
      url: url,
      System: wx.getStorageSync('System'),
      support: support,
      bq_logo: bq_logo
    })
    console.log(user_info.avatarUrl);

    that.setData({
      avatarUrl: user_info.avatarUrl,
      nickName: user_info.nickName
    })
  },
  collection: function (e) {
    wx: wx.navigateTo({
      url: '../Collection/Collection',
    })
  },
  //我要入驻跳转页面
  settled: function (e) {
    wx: wx.navigateTo({
      url: '../settled/settled',
    })
  },
  yellow_page: function (e) {
    wx: wx.navigateTo({
      url: '../yellow_page/mine_yellow',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 
  my_post: function (e) {
    wx: wx.navigateTo({
      url: '../mypost/mypost',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  content: function (e) {
    wx: wx.navigateTo({
      url: '../content/content',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  logs_store: function (e) {
    var users_info = wx.getStorageSync('users')
    var user_id = users_info.id
    var store_info = wx.getStorageSync('store_info')
    console.log(store_info)
    if (store_info == null || store_info == '') {
      wx: wx.navigateTo({
        url: 'bbaa',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx: wx.navigateTo({
        url: '../redbag/merchant?id=' + store_info.id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  // --------------------------跳转订单---------------------------
  order: function (e) {
    wx: wx.navigateTo({
      url: 'order',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------待付款----------------
  payment: function (e) {
    wx: wx.navigateTo({
      url: 'order?activeIndex=' + 0,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------代发货----------------
  payment_one: function (e) {
    wx: wx.navigateTo({
      url: 'order?activeIndex=' + 1,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------待收货----------------
  payment_two: function (e) {
    wx: wx.navigateTo({
      url: 'order?activeIndex=' + 2,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------已完成----------------
  payment_three: function (e) {
    wx: wx.navigateTo({
      url: 'order?activeIndex=' + 3,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------售后----------------
  payment_four: function (e) {
    wx: wx.navigateTo({
      url: 'order?activeIndex=' + 4,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ----------------------------------帮助中心----------------------------------
  help: function (e) {
    wx: wx.navigateTo({
      url: '../store/help',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // --------------------跳转我的钱包-------------------
  wallet: function (e) {
    wx: wx.navigateTo({
      url: 'income',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // -----------------------------跳转我发布的拼车--------------
  mine_car: function (e) {
    wx: wx.navigateTo({
      url: 'mine_car',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ----------------------------收货地址---------------
  address: function (e) {
    var users_info = wx.getStorageSync('users')
    var user_id = users_info.id
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        app.util.request({
          'url': 'entry/wxapp/UpdAdd',
          'cachetime': '0',
          data: {
            user_id: user_id,
            user_name: res.userName,
            user_tel: res.telNumber,
            user_address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          },
          success: function (res) {
            console.log(res)
          },
        })
      }
    })
  },
  // ----------------------------------------------------跳转小程序------------------------------
  jump: function (e) {
    wx.navigateToMiniProgram({
      appId: wx.getStorageSync('System').tz_appid,
      path: '',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log('跳转成功')
        console.log(res)
      }
    })
  },
  about: function (e) {
    wx: wx.navigateTo({
      url: 'system',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  jizhe: function () {
    var jizhe = wx.getStorageSync('jizhe');
    console.log(jizhe);
    if (jizhe == '') {
      this.setData({
        display: 'show'
      })
    }
  },
  login: function (e) {
    console.log(e.detail.value);


    //登录成功  跳到记者管理这里  
    this.setData({
      display: 'hide'
    })
    wx.navigateTo({
      url: 'jizhe/index',
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
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

  },
  bindgetuserinfo: function (e) {

  }
})
