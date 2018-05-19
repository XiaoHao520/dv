//logs.js
const util = require('../../utils/util.js')
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
   var userinfo=wx.getStorageSync('users');
  
    that.setData({
      userinfo:userinfo
    })
 
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
 
 
  my_post: function (e) {
    wx: wx.navigateTo({
      url: '../mypost/mypost',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  } ,
 
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
   fabu:function(e){

     wx.navigateTo({
       url: 'fabu/index',
     })

   }

  ,

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
