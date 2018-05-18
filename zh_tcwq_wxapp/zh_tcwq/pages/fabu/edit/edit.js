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
    disabled: false,
    video: null,
    videoUrl: null,
    city: null
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

            console.log(res);

            that.setData({
              address: res.data.result.address,
              city: res.data.result.address_component.city
            })
          }
        })
      }
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
  /********上传视频********/
  chooseVideo: function () {
    var url = wx.getStorageSync('url')
    var uniacid = wx.getStorageSync('uniacid')
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        wx.uploadFile({
          url: that.data.url + 'app/index.php?i=' + uniacid + '&c=entry&a=wxapp&do=Upload&m=zh_tcwq',
          filePath: res.tempFilePath,
          name: 'upfile',
          success: function (res) {
            console.log(res)
            if (res.errMsg == 'uploadFile:ok') {
              that.setData({
                video: res.data,
                videoUrl: url + res.data
              })
            }
          },
          fail: function (res) {
            console.log("失败信息");
            console.log(res)
          }
        })
      }
    })

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
  //___________________________发布帖子_________________________/
  formSubmit: function (e) {
    var that = this;
    var details = e.detail.value.content
    // 输入的姓名
    var user_name = e.detail.value.name
    // 输入的手机号
    var user_tel = e.detail.value.tel
    var address = that.data.address;
    var imgArray1 = that.data.imgArray1;
    var video = that.data.video;
    var uniacid = wx.getStorageSync('uniacid')
    var user_id = wx.getStorageSync('users').id
    var city = that.data.city
    if(imgArray1!=null){
      if (imgArray1.length == 0) {
        var img = ''
      } else {
        var img = imgArray1.join(",")
      }
    }else{
     var img='';
    }
    if(video==null){
      video='';
    }
  
    app.util.request({
      'url': 'entry/wxapp/Posting',
      'cachetime': '0',
      data: {
        details: details,
        img: img,
        user_id: user_id,
        user_name: user_name,
        user_tel: user_tel,
        address: address,
        video: video,
        uniacid: uniacid,
        cityname: city
      },
      success: function (res) {
        // -----------------------------------发布成功跳转到首页-----------------------------------------
        if (res.data != 0) {
          wx.showToast({
            title: '已发布',
          })
        }
      }
    })
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