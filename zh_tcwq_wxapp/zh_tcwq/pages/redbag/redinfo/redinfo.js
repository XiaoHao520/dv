// zh_tcwq/pages/redbag/redinfo/redinfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sure: false,
    receive: false,
    loadText: '加载更多',
    duanziInfo: [],
    reply: false,
    comment: false,
    select: 0,
    arrow: 1,
    sure: false,
    receive: false,
    rob_redbag: false,
    share: false,
    share_red: false
  },
  dizhi: function (e) {
    var that = this
    var lat2 = Number(that.data.store.coordinates.split(',')[0])
    var lng2 = Number(that.data.store.coordinates.split(',')[1])
    wx.openLocation({
      latitude: lat2,
      longitude: lng2,
      name: that.data.store.user_name,
      address: that.data.store.address
    })
  },
  // ------------------------------------点击回到首页
  shouye: function (e) {
    wx: wx.reLaunch({
      url: '../../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  phone: function (e) {
    var that = this
    var tel = that.data.store.user_tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  jrsj: function () {
    var that = this;
    wx.redirectTo({
      url: '../../sellerinfo/sellerinfo?id=' + that.data.store.store_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var system = wx.getStorageSync('System')
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    var store_id = options.store_id
    var url = wx.getStorageSync('url')
    var logo = options.logo
    that.setData({
      url: url,
      store_id: store_id,
      logo: logo,
    })
    app.util.request({
      'url': 'entry/wxapp/System',
      'cachetime': '0',
      success: function (res) {
        console.log(res)
        that.setData({
          system: res.data,
        })
      }
    })
    wx.login({
      success: function (res) {
        var code = res.code
        wx.setStorageSync("code", code)
        wx.getUserInfo({
          success: function (res) {
            // ----------------------------------异步保存用户登录信息----------------------------------
            wx.setStorageSync("user_info", res.userInfo)
            // ----------------------------------用户登录的名字----------------------------------
            var nickName = res.userInfo.nickName
            // ----------------------------------用户登录的头像----------------------------------
            var avatarUrl = res.userInfo.avatarUrl
            app.util.request({
              'url': 'entry/wxapp/openid',
              'cachetime': '0',
              data: { code: code },
              success: function (res) {
                // 异步保存session-key
                wx.setStorageSync("key", res.data.session_key)
                //  -------------------------需要上传给后台的值 包括名字和头像----------------------------------
                var img = avatarUrl
                var name = nickName
                // 异步7保存用户openid
                wx.setStorageSync("openid", res.data.openid)
                var openid = res.data.openid
                //---------------------------------- 获取用户登录信息----------------------------------
                app.util.request({
                  'url': 'entry/wxapp/Login',
                  'cachetime': '0',
                  data: { openid: openid, img: img, name: name },
                  success: function (res) {
                    // ----------------------------------异步保存用户信息----------------------------------
                    wx.setStorageSync('users', res.data)
                    wx.setStorageSync('uniacid', res.data.uniacid)
                    that.setData({
                      user_id: res.data.id,
                      name: name
                    })
                  },
                })
              },
            })
          }
        })
      }
    })
    that.reload()
  },
  reload: function (e) {
    var that = this
    var user_id = wx.getStorageSync('users').id
    var store_id = that.data.store_id
    app.util.request({
      'url': 'entry/wxapp/IsCollection',
      'cachetime': '0',
      data: { information_id: store_id, user_id: user_id },
      success: function (res) {
        console.log(res)
        if (res.data == 1) {
          that.setData({
            Collection: true
          })
        } else {
          that.setData({
            Collection: false
          })
        }
      },
    })
    app.util.request({
      'url': 'entry/wxapp/PostInfo',
      'cachetime': '0',
      data: { id: store_id },
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
            console.log(hongbao)
            function isInArray(arr, value) {
              for (var i = 0; i < arr.length; i++) {
                if (value === arr[i].user_id) {
                  return true;
                }
              }
              return false;
            }
            var z_money = 0
            for (let i in hongbao) {
              z_money += Number(hongbao[i].money)
            }
            z_money = z_money.toFixed(2)
            console.log(z_money)
            var hongbao_use = isInArray(hongbao, user_id)
            console.log(z_money)
            if (hongbao_use == true) {
              var hongbao_use1 = 2
            } else if (hongbao_use == false) {
              if (hb_num == hongbao.length) {
                console.log('红包已经抢完')
                var hongbao_use1 = 1
              } else {
                console.log('红包还没抢完')
                var hongbao_use1 = 3
              }
            }
            console.log(hongbao_use1)
            that.setData({
              hongbao_use1: hongbao_use1,
              hongbao_len: res.data.length,
              hongbao: hongbao,
              z_money: z_money
            })
          },
        })
        console.log(res.data.pl)
        for (let i in res.data.pl) {
          res.data.pl[i].time = app.ormatDate(res.data.pl[i].time)
        }
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
  rob_redbag: function (e) {
    var that = this
    var rob_redbag = that.data.rob_redbag
    if (rob_redbag == true) {
      that.setData({
        rob_redbag: false
      })
    } else {
      that.setData({
        rob_redbag: true
      })
    }
  },
  gethong: function (e) {
    var that = this
    var user_id = wx.getStorageSync('users').id
    var id = that.data.store_id
    app.util.request({
      'url': 'entry/wxapp/GetHong',
      'cachetime': '0',
      data: { id: id, user_id: user_id },
      success: function (res) {
        console.log('领取红包')
        console.log(res)
        that.reload()
        that.setData({
          receive: true,
          sure: false
        })
      },
    })
  },// ----------------------------点击取消红包显示-------------------
  receive1: function (e) {
    var that = this
    this.setData({
      receive: false,
      sure: false
    })
  },
  // ----------------------------------判断口令输入的是否正确-------------------------------
  hb_keyword: function (e) {
    console.log(e)
    var that = this
    var value = e.detail.value
    var post = that.data.store
    if (post.hb_keyword == value) {
      that.setData({
        sure: true
      })
    } else {
      wx: wx.showModal({
        title: '提示',
        content: '输入的口令错误，请重新输入',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '',
        confirmText: '确定',
        confirmColor: '',
        success: function (res) {
          e.detail.value == ''
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  trans1: function (e) {
    var that = this
    var store = that.data.store
    var system = that.data.system
    if (system.is_hbzf == 2) {
      store.trans1 = 'trans1'
      store.trans2 = 'trans2'
      var user_id = wx.getStorageSync('users').id
      var id = that.data.store_id
      app.util.request({
        'url': 'entry/wxapp/GetHong',
        'cachetime': '0',
        data: { id: id, user_id: user_id },
        success: function (res) {
          console.log('领取红包')
          console.log(res)
          if (res.data == 'error') {
            wx.showModal({
              title: '提示',
              content: '手慢了，红包被抢光了',
            })
          }
        },
      })
      setTimeout(function () {
        store.trans_1 = 1
        store.trans_2 = 2
        store.dis1 = 'none'
        store.dis2 = 'block'
        that.setData({
          store: store
        })
      }, 500)
      setTimeout(function () {
        store.trans_1 = 2
        store.trans_2 = 1
        store.dis1 = 'block'
        store.dis2 = 'none'
        that.setData({
          store: store
        })
      }, 1000)
      setTimeout(function () {
        store.trans_1 = 1
        store.trans_2 = 2
        store.dis1 = 'none'
        store.dis2 = 'block'
        that.setData({
          store: store
        })
      }, 1500)
      setTimeout(function () {
        wx: wx.navigateTo({
          url: 'see_rob?id=' + that.data.store_id,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })

        that.setData({
          rob_redbag: false
        })
      }, 1300)
      that.setData({
        store: store
      })
    } else {
      that.setData({
        share_red: true,
        rob_redbag: false
      })
    }

  },
  hb_text: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  trans2: function (e) {
    var that = this
    var store = that.data.store
    wx: wx.navigateTo({
      url: 'see_rob?id=' + that.data.store_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    that.setData({
      rob_redbag: false
    })
  },
  // trans2: function (e) {
  //   var that = this
  //   var store = that.data.store
  //   store.trans2 = 'trans2'
  //   that.setData({
  //     store: store
  //   })
  // },
  // ---------------------------------------点击评论弹出评论框
  comment: function (e) {
    this.setData({
      comment: true
    })
  },
  // ------------------------------发表评论的内容
  complete: function (e) {
    console.log(e)
    this.setData({
      complete: e.detail.value
    })
  },
  // ------------------------------商家回复的内容
  complete1: function (e) {
    console.log(e)
    this.setData({
      complete1: e.detail.value
    })
  },
  // ---------------------------------------发表评论
  publish: function (e) {
    var that = this
    var details = that.data.complete
    // var details = '3215315'
    var user_id = that.data.user_id
    console.log(user_id)
    console.log(details)
    var post_info_id = that.data.store_id
    if (details == '' || details == null) {
      wx.showToast({
        title: '内容为空',
        icon: 'loading',
        duration: 1000,
      })
    } else {
      that.setData({
        replay: false,
        comment: false
      })
      app.util.request({
        'url': 'entry/wxapp/Comments',
        'cachetime': '0',
        data: { information_id: post_info_id, details: details, user_id: user_id },
        success: function (res) {
          console.log(res)
          if (res.data != 'error') {
            wx.showToast({
              title: '评论成功',
            })
            setTimeout(function () {
              that.reload()
            }, 1000)
          }
          else {
            wx.showToast({
              title: '评论失败',
              icon: 'loading',
            })
          }
        },
      })
    }

  },
  // ————————————————点击回复，弹出回复框——————————————————————
  reply1: function (e) {
    var that = this
    // 要回复的id
    var id = e.currentTarget.dataset.reflex_id
    var reflex_name = e.currentTarget.dataset.name
    var user_id = that.data.user_id
    var post_user_id = that.data.store.user_id
    if (post_user_id == user_id) {
      that.setData({
        reply: true,
        reflex_id: id,
        reflex_name: '回复' + reflex_name
      })
    }
    else {
      wx.showToast({
        title: '管理员可回复',
        icon: 'loading',
        duration: 1000,
      })
    }
  },
  reply2: function (e) {
    var that = this
    that.setData({
      reply: false,
      comment: false
    })
  },
  // ------------------------------商家回复
  reply3: function (e) {
    var that = this
    // 商家要回复的评论id
    var reflex_id = that.data.reflex_id
    // 商家要回复的内容
    var details = that.data.complete1
    console.log(reflex_id)
    console.log(details)
    if (details == '' || details == null) {
      wx.showToast({
        title: '内容为空',
        icon: 'loading',
        duration: 1000,
      })
    } else {
      that.setData({
        reply: false
      })
      app.util.request({
        'url': 'entry/wxapp/reply',
        'cachetime': '0',
        data: { id: reflex_id, reply: details },
        success: function (res) {
          console.log(res)
          if (res.data == 1) {
            wx.showToast({
              title: '回复成功',
            })
            setTimeout(function () {
              that.reload()
            }, 1000)
          }
        },
      })
    }

  },
  // ----------------------------------动态改变样式
  move: function (e) {
    var that = this
    var select = that.data.select
    var arrow = that.data.arrow
    if (arrow == 1) {
      setTimeout(function () {
        that.setData({
          arrow: 2
        })
      }, 1500)
    } else {
      setTimeout(function () {
        that.setData({
          arrow: 1
        })
      }, 1500)
    }
    if (select == 1) {
      that.setData({
        select: 0
      })
    } else {
      that.setData({
        select: 1
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.reload()
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
  onShareAppMessage: function (res) {
    var that = this
    var hb_content = that.data.system.hb_content
    console.log(hb_content)
    if (hb_content == '') {
      var title = that.data.name + '邀您一起抢红包'
    }
    else {
      var title = that.data.system.hb_content.replace('name', that.data.name)
      title = title.replace('type', '')
    }
    if (res.from == "button") {
      return {
        title: title,
        path: '/zh_tcwq/pages/redbag/redinfo/redinfo?store_id=' + that.data.store_id,
        imageUrl: that.data.url + that.data.system.hb_img,
        success: function (res) {
          console.log('这是转发成功')
          app.util.request({
            'url': 'entry/wxapp/HbFx',
            'cachetime': '0',
            data: { information_id: that.data.store.id },
            success: function (res) {
              console.log(res)
            },
          })
          console.log(res)
          that.setData({
            share_red: false
          })
          var user_id = that.data.user_id
          var id = that.data.store_id
          app.util.request({
            'url': 'entry/wxapp/GetHong',
            'cachetime': '0',
            data: { id: id, user_id: user_id },
            success: function (res) {
              console.log('领取红包')
              console.log(res)
              if (res.data == 'error') {
                wx.showModal({
                  title: '提示',
                  content: '手慢了，红包被抢光了',
                })
              }
            },
          })
          wx: wx.navigateTo({
            url: 'see_rob?id=' + that.data.store_id,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
    else{
      return {
        title: title,
        path: '/zh_tcwq/pages/redbag/redinfo/redinfo?store_id=' + that.data.store_id,
        imageUrl: that.data.url + that.data.system.hb_img,
        success: function (res) {
          console.log('这是转发成功')
          app.util.request({
            'url': 'entry/wxapp/HbFx',
            'cachetime': '0',
            data: { information_id: that.data.store.id },
            success: function (res) {
              console.log(res)
            },
          })
          console.log(res)
          that.setData({
            share_red: false
          })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  }
})