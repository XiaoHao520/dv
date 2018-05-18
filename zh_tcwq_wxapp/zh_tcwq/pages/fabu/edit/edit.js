// pages/fabu/edit/edit.js
var app = getApp()
var imgArray1 = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stick_none: false,
    checked: false,
    checked_welfare: false,
    checked_average: false,
    checked_password: false,
    know: false,
    num: 1,
    disabled:false,
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    var array = this.data.stock
    var index = e.detail.value
    var text = array[index]
    this.setData({
      index: e.detail.value,
      text: text
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var user_id = wx.getStorageSync('users').id
    app.util.request({
      'url': 'entry/wxapp/GetUserInfo',
      'cachetime': '0',
      data: { user_id: user_id },
      success: function (res) {
        if (res.data.state == 2) {
          wx: wx.showModal({
            title: '提示',
            content: '您的账号异常，请尽快联系管理员',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
              wx: wx.navigateBack({
                delta: 1,
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
    })
    wx.setNavigationBarColor({
      frontColor: 'black',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    var node = wx.getStorageSync('System')
    that.setData({
      node: wx.getStorageSync('System').ft_xuz
    })
    var info = options.info
    var money = options.money
    var type_id = options.type_id
    var type2_id = options.type2_id
    var procedures = wx.getStorageSync('System')
    // 红包手续费
    wx.setNavigationBarTitle({
      title: info
    })
    var uniacid = wx.getStorageSync('uniacid')
    console.log(wx.getStorageSync('users'))
    that.setData({
      type_id: type_id,
      type2_id: type2_id,
      info: info,
      procedures: Number(procedures.hb_sxf),
      money: money,
      url: wx.getStorageSync('url2'),
      url1: wx.getStorageSync('url'),
      name: wx.getStorageSync('users').name
    })
    //---------------------------------- 获取用户的地理位置----------------------------------
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        let op = latitude + ',' + longitude;
        app.util.request({
          'url': 'entry/wxapp/map',
          'cachetime': '0',
          data: { op: op },
          success: res => {
            that.setData({
              address: res.data.result.address
            })
          }
        })
      }
    })
    //---------------------------------- 获取置顶信息----------------------------------
    app.util.request({
      'url': 'entry/wxapp/Top',
      'cachetime': '0',
      success: function (res) {
        var stick = res.data
        for (let i in stick) {
          if (stick[i].type == 1) {
            stick[i].array = '置顶一天' + '（收费' + stick[i].money + '元）'
          } else if (stick[i].type == 2) {
            stick[i].array = '置顶一周' + '（收费' + stick[i].money + '元）'
          } else if (stick[i].type == 3) {
            stick[i].array = '置顶一月' + '（收费' + stick[i].money + '元）'
          }
        }
        var stock = []
        stick.map(function (item) {
          var arr = {}
          arr = item.array
          stock.push(arr)
        })
        stock.push('取消置顶')
        that.setData({
          stock: stock,
          stick: stick
        })
      },
    })
    //---------------------------------- 获取置顶信息----------------------------------
    app.util.request({
      'url': 'entry/wxapp/Label',
      'cachetime': '0',
      data: { type2_id: type2_id },
      success: function (res) {
        for (let i in res.data) {
          res.data[i].click_class = 'selected1'
        }
        that.setData({
          label: res.data
        })
      },
    })
  },
  // --------------------------------------选择的置顶信息-------------------------------------
  selected: function (e) {
    var that = this
    var index = e.currentTarget.id
    var stick = that.data.stick
    that.setData({
      stick_info: stick[index].array,
      money1: stick[index].money,
      type: stick[index].type,
      checked: false,
      stick_none: true
    })

  },
  // ----------------------------------选择具体地址和经纬度----------------------------------
  add: function (e) {
    var that = this
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var coordinates = res.latitude + ',' + res.longitude
        that.setData({
          address: res.address,
          coordinates: coordinates
        })
      }
    })
  },

    videoRecord:function(){
        
      var that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: function (res) {
          that.setData({
            src: res.tempFilePath
          })
        }
      })

    },

  //  ----------------------------------删除商家上传的轮播图----------------------------------
  // delete: function (e) {
  //   var that = this
  //   Array.prototype.indexOf = function (val) {
  //     for (var i = 0; i < this.length; i++) {
  //       if (this[i] == val) return i;
  //     }
  //     return -1;
  //   };
  //   Array.prototype.remove = function (val) {
  //     var index = this.indexOf(val);
  //     if (index > -1) {
  //       this.splice(index, 1);
  //     }
  //   };
  //   var inde = e.currentTarget.dataset.index,
  //     pictures = this.data.lunbo;
  //   pictures.remove(pictures[inde]);
  //   console.log(pictures)
  //   that.setData({
  //     lunbo: pictures,
  //     lunbo_len: pictures.length
  //   })
  // },
  // ----------------------------------预览商家上传的轮播图----------------------------------
  // previewImage: function (e) {
  //   var that = this,
  //     index = e.currentTarget.dataset.index,
  //     pictures = this.data.lunbo;
  //   wx.previewImage({
  //     current: pictures[index],
  //     urls: pictures
  //   })
  // },
  // ----------------------------------标签----------------------------------
  label: function (e) {
    var that = this
    var label = that.data.label
    var index = e.currentTarget.dataset.inde
    if (label[index].click_class == 'selected1') {
      label[index].click_class = 'selected2'
    } else if (label[index].click_class == 'selected2') {
      label[index].click_class = 'selected1'
    }
    that.setData({
      label: label
    })
  },
  // -----------------------------------跳转发布须知
  know: function (e) {
    var that = this
    var know = that.data.know
    if (know == true) {
      that.setData({
        know: false
      })
    } else {
      that.setData({
        know: true
      })
    }

  },
  // ----------------------------------上传图片----------------------------------
  imgArray1: function (e) {
    var that = this
    var uniacid = wx.getStorageSync('uniacid')
    var img_length = 9 - imgArray1.length
    if (img_length > 0 && img_length <= 9) {
      // 选择图片
      wx.chooseImage({
        count: img_length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          wx.showToast({
            icon: "loading",
            title: "正在上传"
          })
          var imgsrc = res.tempFilePaths;
          that.uploadimg({
            url: that.data.url + 'app/index.php?i=' + uniacid + '&c=entry&a=wxapp&do=Upload&m=zh_tcwq',
            path: imgsrc
          });
        }
      })
    } else {
      wxd: wx.showModal({
        title: '上传提示',
        content: '最多上传9张图片',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'upfile',
      formData: null,
      success: (resp) => {
        if (resp.data != '') {
          success++;
          imgArray1.push(resp.data)
          that.setData({
            imgArray1: imgArray1
          })
        }
        else {
          wx.showToast({
            icon: "loading",
            title: "请重试"
          })
        }
      },
      fail: (res) => {
        fail++;
      },
      complete: () => {
        i++;
        if (i == data.path.length) {
          that.setData({
            images: data.path
          });
          wx.hideToast();
        } else {
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },
  delete: function (e) {
    var that = this
    Array.prototype.indexOf = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    };
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    var index = e.currentTarget.dataset.inde
    imgArray1.remove(imgArray1[index])
    that.setData({
      imgArray1: imgArray1
    })
  },
  // -------------------------------开关1----------------------------
  switch1Change: function (e) {
    this.setData({
      checked: e.detail.value
    })
  },
  // -------------------------------开关2----------------------------
  switch2Change: function (e) {
    this.setData({
      checked_welfare: e.detail.value
    })
  },
  // -------------------------------平均分配----------------------------
  switch3Change: function (e) {
    this.setData({
      checked_average: e.detail.value
    })
  },
  // -------------------------------口令模式----------------------------
  switch4Change: function (e) {
    this.setData({
      checked_password: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('这是保存formid2')
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
    var city = wx.getStorageSync('city')
    var num = that.data.num + 1
    that.setData({
      num: num
    })
    // 获取置顶的金额
    var money1 = that.data.money1
    var address = that.data.address
    var procedures = that.data.procedures
    if (that.data.type == null) {
      var type = 0
    } else {

      var type = that.data.type
    }
    if (money1 == null) {
      var money1 = 0
    } else {
      var money1 = that.data.money1
    }
    var label = that.data.label
    var selected = []
    for (let i in label) {
      if (label[i].click_class == 'selected2') {
        selected.push(label[i])
      }
    }
    var sz = []
    selected.map(function (item) {
      var arr = {}
      arr.label_id = item.id
      sz.push(arr)
    })
    var openid = wx.getStorageSync("openid")
    // 获取提交的form_id
    var form_id = e.detail.formId
    // 输入的内容

    var details = e.detail.value.content
    // 输入的姓名
    var user_name = e.detail.value.name
    // 输入的手机号
    var user_tel = e.detail.value.tel
    console.log(user_tel)
    // 获取上传的图片集合
    var lunbo = that.data.lunbo
    if (lunbo == null || lunbo.length == 0) {
      lunbo = ''
    }
    // 获取上传图片所需的网址
    var url = that.data.url
    var uniacid = wx.getStorageSync('uniacid')
    // 小分类id
    var type2_id = that.data.type2_id
    // 大分类id
    var type_id = that.data.type_id
    // 发布帖子的金额
    var money = Number(that.data.money) + Number(money1)
    var tz_money = money
    // 获取用户的id
    var user_id = wx.getStorageSync('users').id
    console.log(user_id)
    var title = ''



    // 是否开始红包
    var checked_welfare = that.data.checked_welfare
    // 是否开启口令模式
    var checked_password = that.data.checked_password
    // 是否平均分配福利
    var checked_average = that.data.checked_average
    // 红包金额
    var hb_money = 0
    // 红包口令
    var hb_keyword = ''
    // 红包个数
    var hb_num = ''
    // 红包类型 普通红包或者是口令红包  1为普通 2为口令红包
    var hb_type = 0
    // 是否是随机分配  1为随机 2为平均
    var hb_random = 0
    // 正则验证输入的是否为汉字
    var reg = new RegExp("^[\u4e00-\u9fa5]+$")

    var welfare_money = 0
    // 开启塞福利
    if (checked_welfare == true) {
      // 随机分配
      if (checked_average == false) {
        hb_random = 1
        hb_money = Number(e.detail.value.welfare_money)
        hb_num = Number(e.detail.value.welfare_share)
        var beishu = hb_money / hb_num
        // 红包总金额
        welfare_money = hb_money + (procedures / 100) * hb_money
        money = money + Number(welfare_money.toFixed(2))
      } else {
        hb_random = 2
        hb_money = Number(e.detail.value.welfare_money)
        hb_num = Number(e.detail.value.welfare_share)
        var beishu = 1
        // 红包总金额
        welfare_money = hb_money * hb_num + hb_money * hb_num * (procedures / 100)
        money = money + Number(welfare_money.toFixed(2))
      }
      if (checked_password == true) {
        hb_keyword = e.detail.value.welfare_pass
        hb_type = 2
      } else {
        hb_type = 1
      }
    } else {
      money = money
    }
    if (details == '') {
      title = '内容不能为空'
    } else if (details.length >= 540) {
      title = '内容超出了'
    } else if (user_name == '') {
      title = '姓名不能为空'
    } else if (user_tel == '') {
      title = '电话不能为空'
    } else if (checked_welfare == true) {
      if (hb_money == '') {
        title = '红包金额不能为空'
      } else if ((!that.data.checked_average)&&hb_money < 1) {
        title = '福利红包金额不能小于1元'
      } else if (hb_num == '') {
        title = '红包个数不能为空'
      } else if (beishu < 0.1) {
        title = '红包份数过大，请合理设置'
      } else if ((that.data.checked_average) && hb_money < 0.1) {
        title = '单个红包最小金额不能小于0.1元'
      } else if (checked_password == true) {
        if (hb_keyword == '') {
          title = '口令不能为空'
        } else if (!reg.test(hb_keyword)) {
          title = '口令只能输入汉字'
        }
      }
    }
    if (title != '') {
      wx: wx.showModal({
        title: '提示',
        content: title,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      money = money
      var procedures = wx.getStorageSync('System')
      // 有上传轮播图

      if (imgArray1.length == 0) {
        var img = ''
      } else {
        var img = imgArray1.join(",")
      }
      if (money <= 0) {
        that.setData({
          disabled: true,
        })
        app.util.request({
          'url': 'entry/wxapp/Posting',
          'cachetime': '0',
          data: {
            details: details,
            img: img,
            user_id: user_id,
            user_name: user_name,
            user_tel: user_tel,
            type2_id: type2_id,
            type_id: type_id,
            money: money,
            type: type,
            sz: sz,
            address: address,
            hb_money: hb_money,
            hb_keyword: hb_keyword,
            hb_num: hb_num,
            hb_type: hb_type,
            hb_random: hb_random,
            cityname: city
          },
          success: function (res) {
            // -----------------------------------发布成功跳转到首页-----------------------------------------
            wx: wx.showToast({
              title: '发布成功',
              icon: '',
              image: '',
              duration: 2000,
              mask: true,
              success: function (res) {
                // wx: wx.reLaunch({
                //   url: '../../index/index',
                //   success: function (res) { },
                //   fail: function (res) { },
                //   complete: function (res) { },
                // })
              },
              fail: function (res) { },
              complete: function (res) { },
            })
            setTimeout(function () {
              wx: wx.reLaunch({
                url: '../../index/index',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }, 2000)
          },
        })
      } else {
        that.setData({
          disabled: true,
        })
        // -----------------------------------有金额执行这一步-----------------------------------------
        app.util.request({
          'url': 'entry/wxapp/Pay',
          'cachetime': '0',
          data: { openid: openid, money: money },
          success: function (res) {
            wx.requestPayment({
              'timeStamp': res.data.timeStamp,
              'nonceStr': res.data.nonceStr,
              'package': res.data.package,
              'signType': res.data.signType,
              'paySign': res.data.paySign,
              'success': function (res) {
                app.util.request({
                  'url': 'entry/wxapp/Posting',
                  'cachetime': '0',
                  data: {
                    details: details,
                    img: img,
                    user_id: user_id,
                    user_name: user_name,
                    user_tel: user_tel,
                    type2_id: type2_id,
                    type_id: type_id,
                    money: money,
                    type: type,
                    sz: sz,
                    address: address,
                    hb_money: hb_money,
                    hb_keyword: hb_keyword,
                    hb_num: hb_num,
                    hb_type: hb_type,
                    hb_random: hb_random,
                    cityname: city
                  },
                  success: function (res) {
                    if (tz_money == 0 || tz_money == null || tz_money == '') {

                    } else {
                      app.util.request({
                        'url': 'entry/wxapp/SaveTzPayLog',
                        'cachetime': '0',
                        data: { tz_id: res.data, money: tz_money },
                        success: res => {

                        }
                      })
                    }

                    // -----------------------------------发布成功跳转到首页-----------------------------------------
                    wx: wx.showToast({
                      title: '发布成功',
                      icon: '',
                      image: '',
                      duration: 2000,
                      mask: true,
                      success: function (res) {
                        // wx: wx.switchTab({
                        //   url: '../../index/index',
                        //   success: function (res) { },
                        //   fail: function (res) { },
                        //   complete: function (res) { },
                        // })
                      },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                    setTimeout(function () {
                      wx: wx.switchTab({
                        url: '../../index/index',
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                    }, 2000)
                  },
                })
              },

              'fail': function (res) {
                wx.showToast({
                  title: '支付失败',
                  duration: 1000
                })
              },
              'complete': function (res) {
                console.log(res);
                if (res.errMsg == 'requestPayment:fail cancel') {
                  wx.showToast({
                    title: '取消支付',
                    icon: 'loading',
                    duration: 1000
                  })
                  that.setData({
                    disabled: false,
                  })
                }
              }
            })
          },
        })
      }
    }

  },
  cancel: function (e) {
    this.setData({
      money1: 0,
      type: 0,
      checked: false,
      stick_none: false
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
    console.log(this.data)
    imgArray1.splice(0, imgArray1.length)
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