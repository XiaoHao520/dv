// pages/infodetial/infodetial.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reply: false,
    comment: false,
    select: 0,
    arrow: 1,
    sure: false,
    receive: false,
    rob_redbag: false,
    share: false,
    hb_share: false,
    share_red: false
  },
show:function(){

  this.setData({
    display:'show'
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
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
    wx.setNavigationBarColor({
      frontColor: 'black',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth / 2
        var windowHeight = windowWidth * 1.095
        that.setData({
          width: windowWidth,
          height: windowHeight
        })
      }
    })
    var url = wx.getStorageSync('url')
    var user_id = wx.getStorageSync('users').id
    if (options.type != null) {
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
                        user_name: name
                      })
                      that.reload()
                    },
                  })
                },
              })
            }
          })
        }
      })
      that.setData({
        url: url,
        post_info_id: options.my_post
      })
    } else {
      that.setData({
        url: url,
        user_id: user_id,
        post_info_id: options.id,
        user_name: wx.getStorageSync('users').name,
      })
      that.reload()
    }



    
  },
  reload: function (e) {
    var that = this
    // ============================帖子id=============================
    var post_info_id = that.data.post_info_id
    // ----------------------------------查看是否收藏
    // IsCollection
    app.util.request({
      'url': 'entry/wxapp/IsCollection',
      'cachetime': '0',
      data: { information_id: post_info_id, user_id: that.data.user_id },
      success: function (res) {
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
    // ============================平台信息=============================
    var system = wx.getStorageSync('System')
    that.setData({
      system_name: system.pt_name
    })

    // ------------------------------获取帖子信息-------------------------
    app.util.request({
      'url': 'entry/wxapp/PostInfo',
      'cachetime': '0',
      data: { id: post_info_id },
      success: function (res) {
        console.log(res)
        if (res.data.tz.type2_name == null) {
          var type2_name = ''
        } else {
          var type2_name = res.data.tz.type2_name
        }
        wx.setNavigationBarTitle({
          title: '详情'
        })
        var time1 = that.ormatDate(res.data.tz.sh_time)
        res.data.tz.time2 = time1.slice(0, 16)
        for (let i in res.data.pl) {
          res.data.pl[i].time = that.ormatDate(res.data.pl[i].time)
          res.data.pl[i].time = res.data.pl[i].time.slice(0, 16)
        }
        var givelike = res.data.tz.givelike
        res.data.tz.img = res.data.tz.img.split(",")
        function rgb() {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
          return rgb;
        }
        for (let i in res.data.label) {
          res.data.label[i].number = rgb()
        }

        var hb_num = Number(res.data.tz.hb_num)
        var hb_random = Number(res.data.tz.hb_random)
        var hb_type = Number(res.data.tz.hb_type)
        if (hb_random == 1) {
          res.data.tz.hb_money = res.data.tz.hb_money
        } else {
          res.data.tz.hb_money = Number(res.data.tz.hb_money) * hb_num
        }
        app.util.request({
          'url': 'entry/wxapp/HongList',
          'cachetime': '0',
          data: { id: res.data.tz.id },
          success: function (res) {
            var hongbao = res.data
            var price = 0
            function isInArray(arr, value) {
              for (var i = 0; i < arr.length; i++) {
                if (value === arr[i].user_id) {
                  return true;
                }
              }
              return false;
            }
            var hongbao_use = isInArray(hongbao, that.data.user_id)
            if (hongbao_use == true) {
              var hongbao_use = 2
            } else {
              if (hb_num == hongbao.length) {
                var hongbao_use = 1
              } else {
                var hongbao_use = 3
              }
            }
            // 计算随机分配和平均分的金额
            for (let i in hongbao) {
              price += Number(hongbao[i].money)
            }
            that.setData({
              price: price.toFixed(2),
              hongbao_use: hongbao_use,
              hongbao_len: res.data.length,
              hongbao: hongbao
            })
          },
        })
        res.data.tz.trans1 = 1
        res.data.tz.trans2 = 1
        res.data.tz.dis1 = 'block'
        res.data.tz.trans_1 = 2
        res.data.tz.trans_2 = 1


        var timeStr = parseInt(res.data.tz.sh_time);
        console.log(timeStr)
        var date = new Date(timeStr * 1000);
        let M = ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1))
        let D = (date.getDate() > 10 ? date.getDate() : '0' + date.getDate())
        let toDay = M + '-' + D
        res.data.tz.sh_time = toDay;

        var lat2 = res.data.tz.latitude;
        var lng2 = res.data.tz.longitude;
        var lat1 = Number(wx.getStorageSync('Location').latitude)
        var lng1 = Number(wx.getStorageSync('Location').longitude)
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000 / 1000;
        var s = s.toFixed(2)
        res.data.tz.distance = s
        that.setData({
          post: res.data.tz,
          dianzan: res.data.dz,
          // user_name: res.data.tz.user_name,
          givelike: givelike,
          post_info_id: post_info_id,
          tei_id: res.data.tz.id,
          criticism: res.data.pl,
          label: res.data.label
        })
      },
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
  // 点击显示红包
  rob_redbag: function (e) {
    var that = this
    var rob_redbag = that.data.rob_redbag
    var hongbao_use = that.data.hongbao_use
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

  trans1: function (e) {
    var that = this
    var store = that.data.post
    var num = that.data.num
    if (that.data.system.is_hbzf == 2) {
      if (num == null) {
        num = 1
      } else {

      }
      if (num == 1) {
        store.trans1 = 'trans1'
        store.trans2 = 'trans2'
        var user_id = wx.getStorageSync('users').id
        var id = that.data.post_info_id
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
            url: '../redbag/redinfo/see_rob?id=' + that.data.post_info_id,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })

          that.setData({
            rob_redbag: false
          })
        }, 1300)
      }
      that.setData({
        post: store,
        num: num + 1
      })
    } else {
      that.setData({
        share_red: true,
        rob_redbag: false
      })
    }

  },
  trans2: function (e) {
    var that = this
    var store = that.data.store
    wx: wx.navigateTo({
      url: '../redbag/redinfo/see_rob?id=' + that.data.post_info_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    that.setData({
      rob_redbag: false
    })
  },
  weixin: function (e) {
    this.setData({
      hb_share: false
    })
  },
  // ------------------------------------点击回到首页
  shouye: function (e) {
    wx: wx.reLaunch({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // -------------------------------------领取红包-----------------------
  // gethong: function (e) {
  //   var that = this
  //   var user_id = wx.getStorageSync('users').id
  //   var id = that.data.post_info_id
  //   app.util.request({
  //     'url': 'entry/wxapp/GetHong',
  //     'cachetime': '0',
  //     data: { id: id, user_id: user_id },
  //     success: function (res) {
  //       that.reload()
  //       that.setData({
  //         receive: true
  //       })
  //     },
  //   })
  // },
  // ----------------------------点击取消红包显示-------------------
  receive1: function (e) {
    var that = this
    this.setData({
      receive: false
    })
  },
  // ------------------------------------点击入驻商家
  fabu: function (e) {
    var that = this
    wx: wx.reLaunch({
      url: '../fabu/fabu/fabu',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // --------------------------------------------图片预览
  previewImage: function (e) {
    var that = this
    var url = that.data.url
    var urls = []
    var inde = e.currentTarget.dataset.inde
    var pictures = that.data.post.img

    for (let i in pictures) {
      urls.push(url + pictures[i]);
    }
    wx.previewImage({
      current: url + pictures[inde],
      urls: urls
    })
  },
  // -----------------------------------------------点赞-----------------------------------------------
  // thumbs_up: function (e) {
  //   var that = this
  //   var post_info_id = that.data.tei_id
  //   var user_id = wx.getStorageSync('users').id
  //   var thumbs_up = Number(that.data.givelike)
  //   app.util.request({
  //     'url': 'entry/wxapp/Like',
  //     'cachetime': '0',
  //     data: { information_id: post_info_id, user_id: user_id },
  //     success: function (res) {
  //       if (res.data != 1) {
  //         wx: wx.showModal({
  //           title: '提示',
  //           content: '不能重复点赞',
  //           showCancel: true,
  //           cancelText: '取消',
  //           cancelColor: '',
  //           confirmText: '确认',
  //           confirmColor: '',
  //           success: function (res) { },
  //           fail: function (res) { },
  //           complete: function (res) { },
  //         })
  //       } else {
  //         that.reload()
  //         that.setData({
  //           thumbs_ups: true,
  //           thumbs_up: thumbs_up + 1
  //         })
  //       }
  //     },
  //   })

  // },
  // -----------------------------------------------收藏-----------------------------------------------
  Collection: function (e) {
    var that = this
    var post_info_id = that.data.tei_id
    var user_id = wx.getStorageSync('users').id
    app.util.request({
      'url': 'entry/wxapp/Collection',
      'cachetime': '0',
      data: { information_id: post_info_id, user_id: user_id },
      success: function (res) {
        if (res.data == 1) {
          that.setData({
            Collection: true
          })
          wx: wx.showToast({
            title: '收藏成功',
            icon: '',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx: wx.showToast({
            title: '取消收藏成功',
            icon: 'fail',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          that.setData({
            Collection: false
          })
        }
      },
    })

  },
  // ----------------------------------判断口令输入的是否正确-------------------------------
  hb_keyword: function (e) {
    var that = this
    var value = e.detail.value
    var post = that.data.post
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
        confirmText: '确定',
        success: function (res) {
          e.detail.value == ''
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  // ---------------------------------------点击评论弹出评论框
  comment: function (e) {
     this.setData({
       display:'hide'
     })
    var that = this
    var user_id = wx.getStorageSync('users').id
    app.util.request({
      'url': 'entry/wxapp/GetUserInfo',
      'cachetime': '0',
      data: { user_id: user_id },
      success: function (res) {
        console.log(res)
        if (res.data.state == 1) {
          that.setData({
            comment: true,
          })
        } else {
          wx: wx.showModal({
            title: '提示',
            content: '您的账号异常，请尽快联系管理员',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
              // wx: wx.navigateBack({
              //   delta: 1,
              // })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
    })

  },
  // ------------------------------发表评论的内容
  complete: function (e) {
    this.setData({
      complete: e.detail.value
    })
  },
  // ------------------------------商家回复的内容
  complete1: function (e) {
    this.setData({
      complete1: e.detail.value
    })
  },
  // ---------------------------------------发表评论
  formid_two: function (e) {
    console.log(e)
    app.util.request({
      'url': 'entry/wxapp/SaveFormid',
      'cachetime': '0',
      data: {
        user_id: wx.getStorageSync('users').id,
        form_id: e.detail.formId,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {

      },
    })
    var that = this
    var form_id = e.detail.formId
    var details = that.data.complete
    var user_id = that.data.user_id
    var post_info_id = that.data.post_info_id
    var tz_user_id = that.data.post.user_id
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
    function fun_submit(arg) {
      var date1 = new Date();
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + 7);
      var times = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
      return times
    }
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
          if (res.data != 'error') {
            wx.showToast({
              title: '评论成功',
            })
            setTimeout(function () {
              that.reload()
            }, 1000)
            var pl_id = res.data
            // 搜索formid
            app.util.request({
              'url': 'entry/wxapp/GetFormid',
              'cachetime': '0',
              data: { user_id: tz_user_id },
              success: function (res) {
                console.log(res)
                var formid_array = []
                for (let i in res.data) {
                  res.data[i].hours = res.data[i].time.slice(10, 19)
                  res.data[i].time = fun_submit(res.data[i].time, 7) + res.data[i].hours
                  console.log(res.data[i].time)
                  console.log(time)
                  if (time <= res.data[i].time) {
                    formid_array.push(res.data[i])
                  } else {
                    app.util.request({
                      'url': 'entry/wxapp/DelFormid',
                      'cachetime': '0',
                      data: {
                        user_id: res.data[i].user_id,
                        form_id: res.data[i].form_id
                      },
                      success: function (res) { },
                    })
                  }
                }
                console.log(formid_array)
                // 发送模板消息
                app.util.request({
                  'url': 'entry/wxapp/TzhfMessage',
                  'cachetime': '0',
                  data: {
                    pl_id: pl_id,
                    form_id: formid_array[0].form_id,
                    user_id: formid_array[0].user_id,
                    openid: formid_array[0].openid
                  },
                  success: function (res) {
                    console.log(res)
                    app.util.request({
                      'url': 'entry/wxapp/DelFormid',
                      'cachetime': '0',
                      data: {
                        form_id: formid_array[0].form_id,
                        user_id: formid_array[0].user_id,
                      },
                      success: function (res) {
                        console.log(res)
                      },
                    })
                  },
                })
              },
            })
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

    this.setData({
           display:'hide'
    })
    // 要回复的id
    var id = e.currentTarget.dataset.reflex_id
    var reflex_name = e.currentTarget.dataset.name
    var user_id = that.data.user_id
    var post_user_id = that.data.post.user_id
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
  formid_one: function (e) {
    // this.setData({
    //   display:'show'
    // })
    app.util.request({
      'url': 'entry/wxapp/SaveFormid',
      'cachetime': '0',
      data: {
        user_id: wx.getStorageSync('users').id,
        form_id: e.detail.formId,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {

      },
    })
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

             that.show()
          }
        },
      })
    }

  },
  // -----------------------------------拨打电话
  phone: function (e) {
    var that = this
    var post = that.data.post
    wx.makePhoneCall({
      phoneNumber: post.user_tel
    })
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
  formSubmit: function (e) {
    app.util.request({
      'url': 'entry/wxapp/SaveFormid',
      'cachetime': '0',
      data: {
        user_id: wx.getStorageSync('users').id,
        form_id: e.detail.formId,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {

      },
    })
    var form_id = e.detail.formId
    console.log('用户的form——id是' + form_id)
    console.log(this.data)
    var openid = wx.getStorageSync("openid")
    console.log(openid)
    var that = this
    var post_info_id = that.data.tei_id
    var user_id = wx.getStorageSync('users').id
    var thumbs_up = Number(that.data.givelike)
    var tz_user_id = that.data.post.user_id
    app.util.request({
      'url': 'entry/wxapp/Like',
      'cachetime': '0',
      data: { information_id: post_info_id, user_id: user_id },
      success: function (res) {
        console.log(res)
        if (res.data == '1') {
          wx.showToast({
            title: '点赞成功',
            duration:1000,
          })
          that.reload()
          that.setData({
            thumbs_ups: true,
            thumbs_up: thumbs_up + 1
          })
        }
        if (res.data == '不能重复点赞!') {
          wx: wx.showModal({
            title: '提示',
            content: '不能重复点赞',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确认',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          that.setData({
            thumbs_ups: true,
          })
        }
      },
    })
  },
  shou: function (e) {
    wx: wx.switchTab({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  post: function (e) {
    wx: wx.switchTab({
      url: '../fabu/fabu/fabu',
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.reload()
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
    wx.stopPullDownRefresh()
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
    console.log(res)
    var that = this
    console.log(that.data)
    that.setData({
      share: true,
    })
    var name = that.data.post.user_name
    var my_post = that.data.post_info_id
    var hb_money = Number(that.data.post.hb_money)
    var hb_content = that.data.system.hb_content
    console.log(hb_money,hb_content)
    if (hb_content==''){
      var title = that.data.user_name + '邀您一起拆' + name + '的红包'
    }
    else{
      var title=that.data.system.hb_content.replace('name', that.data.user_name)
      title = title.replace('type', '【' + that.data.post.type_name + '】')
    }
    if (hb_money > 0 && res.from == "button") {
      return {
        title: title,
        path: '/zh_tcwq/pages/infodetial/infodetial?user_id=' + that.data.user_id + '&my_post=' + my_post + '&type=' + 1,
        imageUrl: that.data.url + that.data.system.hb_img,
        success: function (res) {
          console.log('这是转发成功')
          app.util.request({
            'url': 'entry/wxapp/HbFx',
            'cachetime': '0',
            data: { information_id: that.data.post.id },
            success: function (res) {
              console.log(res)
            },
          })
          console.log(res)
          that.setData({
            share_red: false
          })
          var user_id = that.data.user_id
          var id = that.data.post_info_id
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
            url: '../redbag/redinfo/see_rob?id=' + that.data.post_info_id,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          that.setData({
            share: true,
            hb_share: false,
            rob_redbag: false
          })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
    else if (hb_money > 0 && res.from == "menu") {
      return {
        title: title,
        path: '/zh_tcwq/pages/infodetial/infodetial?user_id=' + that.data.user_id + '&my_post=' + my_post + '&type=' + 1,
        success: function (res) {
          console.log('这是转发成功')
          app.util.request({
            'url': 'entry/wxapp/HbFx',
            'cachetime': '0',
            data: { information_id: that.data.post.id },
            success: function (res) {
              console.log(res)
            },
          })
          console.log(res)
          that.setData({
            share_red: false
          })
          // that.setData({
          //   share: true,
          //   hb_share: false,
          //   rob_redbag: true
          // })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
    else {
      return {
        title: '【' + that.data.post.type_name + '】' + ' ' + that.data.post.details,
        path: '/zh_tcwq/pages/infodetial/infodetial?user_id=' + that.data.user_id + '&my_post=' + my_post + '&type=' + 1,
        success: function (res) {
          console.log('这是转发成功')
          app.util.request({
            'url': 'entry/wxapp/HbFx',
            'cachetime': '0',
            data: { information_id: that.data.post.id },
            success: function (res) {
              console.log(res)
            },
          })
          console.log(res)
          that.setData({
            share_red: false
          })
          // that.setData({
          //   share: true,
          //   hb_share: false,
          //   rob_redbag: true
          // })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  },
})