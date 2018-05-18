// zh_tcwq/pages/logs/income.js
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
    
    this.Refresh()
  },
  Refresh:function(e){
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
        console.log('这是登录所需要的code')
        console.log(res.code)
        var code = res.code
        wx.setStorageSync("code", code)
        wx.getUserInfo({
          success: function (res) {
            var nickName = res.userInfo.nickName
            var avatarUrl = res.userInfo.avatarUrl
            app.util.request({
              'url': 'entry/wxapp/openid',
              'cachetime': '0',
              data: { code: code },
              success: function (res) {
                var img = avatarUrl
                var name = nickName
                var openid = res.data.openid
                app.util.request({
                  'url': 'entry/wxapp/Login',
                  'cachetime': '0',
                  data: { openid: openid, img: img, name: name },
                  success: function (res) {
                    console.log(res)
                    var user = res.data
                    app.util.request({
                      'url': 'entry/wxapp/MyTiXian',
                      'cachetime': '0',
                      data: {
                        user_id: res.data.id
                      },
                      success: function (res) {
                        console.log(res)
                        var money = 0
                        for(let i in res.data){
                          money+=Number(res.data[i].tx_cost)
                        }
                        console.log(money)
                        var price = Number(user.money) 
                        price = price.toFixed(2)
                        console.log(price)
                        that.setData({
                          money: price
                        })
                      }
                    })
                  },
                })
              },
            })
          }
        })
      }
    })
   
    
  },
  detailed2:function(e){
    wx:wx.navigateTo({
      url: 'detailed?state=' + 2,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  detailed3:function(e){
    wx: wx.navigateTo({
      url: 'detailed?state='+1,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // --------------------去提现
  cash:function(e){
    wx:wx.navigateTo({
      url: 'cash?state='+1,
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
    this.Refresh()
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