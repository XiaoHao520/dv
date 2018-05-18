// zh_tcwq/pages/sellerinfo/place_order.js
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
    var url = wx.getStorageSync('url')
    var cost = options.price * options.num
    that.setData({
      id: options.id,
      url: url,
      price: options.price,
      num: options.num,
      cost: cost.toFixed(2),
      name1: options.name1,
      name2: options.name2,
      name3: options.name3,
      store_id: options.store_id
    })
    console.log(options+'这是商家的id')
    that.user_infos()
    that.refresh()
  },

  refresh: function (e) {
    var that = this
    var id = that.data.id
    app.util.request({
      'url': 'entry/wxapp/GoodInfo',
      'cachetime': '0',
      data: { id: id },
      success: function (res) {
        console.log(res)
        var spec = res.data.spec
        var jmap = {};
        var result = [];
        spec.forEach(function (al) {
          var key = al.spec_id + '_' + al.spec_name;
          if (typeof jmap[key] === 'undefined') {
            jmap[key] = [];
          }
          jmap[key].push(al);
        })

        var keys = Object.keys(jmap);
        for (var i = 0; i < keys.length; i++) {
          var rs = keys[i].split('_');
          result.push({ spec_id: rs[0], spec_name: rs[1], value: jmap[keys[i]] });
        }
        console.log(result)
        res.data.good.imgs = res.data.good.imgs.split(",")
        res.data.good.lb_imgs = res.data.good.lb_imgs.split(",")
        var cost = Number(that.data.cost)
        var freight = Number(res.data.good.freight)
        var cost2 = cost + freight
        cost2 = cost2.toFixed(2)
        that.setData({
          store_good: res.data.good,
          cost2: cost2,
          freight: freight,
          result: result
        })
      },
    })
    app.util.request({
      'url': 'entry/wxapp/StoreInfo',
      'cachetime': '0',
      data: { id: that.data.store_id },
      success: function (res) {
        console.log(res)
        that.setData({
          store: res.data.store[0]
        })
      },
    })
  },
  user_infos: function (e) {
    var that = this
    wx.login({
      success: function (res) {
        var code = res.code
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
                    console.log('这是用户的登录信息')
                    console.log(res)
                    that.setData({
                      user_info: res.data,
                      openid: openid
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
  // 选择收货地址
  address: function (e) {
    var that = this
    var user_id = that.data.user_info.id
    console.log(user_id)
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
            that.user_infos()
          },
        })
      }
    })
  },
  // 添加商品数量
  add: function (e) {
    var that = this
    var num = that.data.num + 1
    var cost = that.data.cost1
    cost = cost * num.toFixed(2)
    var cost2 = cost + that.data.freight
    that.setData({
      num: num,
      cost: cost,
      cost2: cost2
    })
  },
  // 减去商品数量
  subtraction: function (e) {
    var that = this
    var num = that.data.num
    num = num - 1
    var cost = that.data.cost1
    cost = cost * num.toFixed(2)
    var cost2 = cost + that.data.freight
    that.setData({
      num: num,
      cost: cost,
      cost2: cost2
    })
  },
  note: function (e) {
    console.log(e)
    this.setData({
      note: e.detail.value
    })
  },
  // -------------------------提交订单-----------------------------
  order: function (e) {
    var that = this
    console.log(that.data)
    var store_good = that.data.store_good
    var user_id = that.data.user_info.id
    var user_info = that.data.user_info
    var openid = that.data.openid
    var freight = Number(store_good.freight)
    var goods_cost = Number(store_good.goods_cost)
    var money = that.data.cost2
    var note = that.data.note
    var result = that.data.result
    if(result.length==1){
      var good_spec = result[0].spec_name+':'+that.data.name1
    }
    if (result.length == 2) {
      var good_spec = result[0].spec_name + ':' + that.data.name1 + ';' + result[1].spec_name + ':' + that.data.name2
    }
    if (result.length == 3) {
      var good_spec = result[0].spec_name + ':' + that.data.name1 + ';' + result[1].spec_name + ':' + that.data.name2 + ';' + result[2].spec_name + ':' + that.data.name3
    }
    console.log(result)
    console.log(String(good_spec))
    if (note == null) {
      note = ''
    } else {
      note = that.data.note
    }
    if (user_info.user_name == '') {
      wx: wx.showModal({
        title: '提示',
        content: '您还没有填写收货地址喔',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '',
        confirmText: '确定',
        confirmColor: '',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      console.log(note)
      app.util.request({
        'url': 'entry/wxapp/addorder',
        'cachetime': '0',
        data: {
          user_id: user_id,
          store_id: store_good.store_id,
          money: money,
          user_name: user_info.user_name,
          address: user_info.user_address,
          tel: user_info.user_tel,
          good_id: store_good.id,
          good_name: store_good.goods_name,
          good_img: store_good.imgs[0],
          good_money: that.data.price,
          good_spec: String(good_spec),
          freight: freight,
          good_num: that.data.num,
          note: note
        },
        success: function (res) {
          console.log(res)
          var order_id = res.data
          console.log(money)
          app.util.request({
            'url': 'entry/wxapp/Pay',
            'cachetime': '0',
            data: { openid: openid, money: money, order_id: order_id },
            success: function (res) {
              console.log(res)
              wx.requestPayment({
                'timeStamp': res.data.timeStamp,
                'nonceStr': res.data.nonceStr,
                'package': res.data.package,
                'signType': res.data.signType,
                'paySign': res.data.paySign,
                'success': function (res) {
                  console.log('这里是支付成功')
                  console.log(res)
                  app.util.request({
                    'url': 'entry/wxapp/PayOrder',
                    'cachetime': '0',
                    data: { order_id: order_id },
                    success: function (res) {
                      console.log('改变订单状态')
                      console.log(res)
                      wx: wx.redirectTo({
                        url: '../logs/order',
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                    },
                  })

                },

                'fail': function (res) {
                  console.log('这里是支付失败')
                  console.log(res)
                  wx.showToast({
                    title: '支付失败',
                    duration: 1000
                  })
                  wx: wx.redirectTo({
                    url: '../logs/order',
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                },
              })
            },
          })
        },
      })
    }



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
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
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