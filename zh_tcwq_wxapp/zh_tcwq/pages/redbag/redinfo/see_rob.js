// zh_tcwq/pages/redbag/redinfo/see_rob.js
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
    var user_info = wx.getStorageSync('users')
    console.log(user_info)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: "#d95940",
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    var url = wx.getStorageSync('url')
    that.setData({
      id:options.id,
      user_info: user_info,
      url:url,
    })
    that.refresh()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  refresh: function (e) {
    var that = this
    app.util.request({
      'url': 'entry/wxapp/PostInfo',
      'cachetime': '0',
      data: { id: that.data.id },
      success: function (res) {
        console.log(res)
        var store = res.data.tz
        var hb_num = Number(res.data.tz.hb_num)
        store.img = store.img.split(",")
        if (store.hb_random == 1) {
          store.hb_money = Number(store.hb_money)
        } else {
          store.hb_money = Number(store.hb_money) * Number(store.hb_num)
        }
        if (store.hb_keyword == '') {
          that.setData({
            sure: true
          })
        } else {
          that.setData({
            sure: false
          })
        }
        app.util.request({
          'url': 'entry/wxapp/HongList',
          'cachetime': '0',
          data: { id: res.data.tz.id },
          success: function (res) {
            console.log(res)
            var hongbao = res.data
            var z_money = 0
            for (let i in hongbao) {
              hongbao[i].time = app.ormatDate(hongbao[i].time).slice(5, 16)
              z_money += Number(hongbao[i].money)
            }
            var total_comment = store.hb_money-z_money
            console.log(total_comment)
            console.log(z_money)
            that.setData({
              hongbao: hongbao,
              total_comment: total_comment.toFixed(2),
              total_num:hongbao.length
            })
          },
        })
        console.log(res.data.pl)
        store.hb_money = Number(store.hb_money).toFixed(2)
        store.trans1 = 1
        store.trans2 = 1
        store.dis1 = 'block'
        store.trans_1 = 2
        store.trans_2 = 1
        that.setData({
          store: store,
          criticism: res.data.pl,
          label: res.data.label
        })
      }
    })
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