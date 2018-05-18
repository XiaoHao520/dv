// zh_tcwq/pages/redbag/sent.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: ['全部', '进行中', '已结束'],
    index: 0,
    activeIndex: 0,
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
    that.setData({
      user_id:options.user_id
    })
    that.reload()
  },
  reload: function (e) {
    var that = this
    var user_id = that.data.user_id
    var url = wx.getStorageSync('url')
    //---------------------------------- 集合----------------------------------
    app.util.request({
      'url': 'entry/wxapp/MyPost2',
      'cachetime': '0',
      data: { user_id: user_id },
      success: function (res) {
        var store = res.data
        var slide = []
        var slide1 = []
        var slide2 = []
        for (let i in store) {
          store[i].time = that.ormatDate(store[i].time).slice(0, 16);
          store[i].img = store[i].img.split(",")
          if (store[i].img.length >= 3) {
            store[i].img = store[i].img.splice(0, 3)
          } else {
            store[i].img = store[i].img
          }
          var moneys = 0
          if (store[i].hb_random==1){
            moneys = Number(store[i].hb_money)
          }else{
            moneys = Number(store[i].hb_money) * Number(store[i].hb_num)
          }
          store[i].moneys = moneys
          if (store[i].hb_money != 0) {
            app.util.request({
              'url': 'entry/wxapp/HongList',
              'cachetime': '0',
              data: { id: store[i].id },
              success: function (res) {
                console.log(res)
                var price = 0
                for(let i in res.data){
                 price+= Number(res.data[i].money)
                }
                store[i].price = price.toFixed(2)
                if (Number(store[i].hb_num) == res.data.length) {
                  store[i].rob = false
                  slide2.push(store[i])
                } else {
                  store[i].rob = true
                  slide1.push(store[i])
                }
                store[i].honglist = res.data
                slide.push(store[i])
                console.log(store[i])
                that.setData({
                  slide: slide,
                  url: url,
                  slide1: slide1,
                  slide2: slide2
                })
              }
            })
          }
        }
      },
    })
  },
  header: function (e) {
    var that = this
    console.log(e)
    var index = e.currentTarget.id
    that.setData({
      index: index,
      activeIndex: index
    })
  },
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
  redinfo: function (e) {
    console.log(e)
    var store_id = e.currentTarget.dataset.id
    var logo = e.currentTarget.dataset.logo
    wx: wx.navigateTo({
      url: 'redinfo/redinfo?store_id=' + store_id + '&logo=' + logo,
    })
  },
  fabu:function(e){
    wx:wx.navigateTo({
      url: 'welfare',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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

  }
})