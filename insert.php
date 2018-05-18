<?php







pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_system')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `appid` varchar(100) NOT NULL COMMENT 'appid',



  `appsecret` varchar(200) NOT NULL COMMENT 'appsecret',



  `mchid` varchar(20) NOT NULL COMMENT '商户号',



  `wxkey` varchar(100) NOT NULL COMMENT '商户秘钥',



  `uniacid` varchar(50) NOT NULL,



  `url_name` varchar(20) NOT NULL COMMENT '网址名称',



  `details` text NOT NULL COMMENT '关于我们',



  `url_logo` varchar(100) NOT NULL COMMENT '网址logo',



  `bq_name` varchar(50) NOT NULL COMMENT '版权名称',



  `link_name` varchar(30) NOT NULL COMMENT '网站名称',



  `link_logo` varchar(100) NOT NULL COMMENT '网站logo',



  `support` varchar(20) NOT NULL COMMENT '技术支持',



  `bq_logo` varchar(100) NOT NULL,



  `color` varchar(20) NOT NULL,



  `tz_appid` varchar(30) NOT NULL,



  `tz_name` varchar(30) NOT NULL,



  `pt_name` varchar(30) NOT NULL COMMENT '平台名称',



  `tz_audit` int(11) NOT NULL COMMENT '帖子审核1.是 2否',



  `sj_audit` int(11) NOT NULL COMMENT '商家审核1.是 2否'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"







);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_type')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `type_name` varchar(20) NOT NULL COMMENT '分类名称',



  `img` varchar(100) NOT NULL COMMENT '分类图片',



  `uniacid` int(11) NOT NULL COMMENT '小程序id',



  `num` int(11) NOT NULL,



  `money` decimal(10,2) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"







);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_type2')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `name` varchar(20) NOT NULL COMMENT '分类名称',



  `type_id` int(11) NOT NULL COMMENT '主分类id',



  `num` int(11) NOT NULL,



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"







);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_user')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `openid` varchar(100) NOT NULL COMMENT 'openid',



  `img` varchar(200) NOT NULL COMMENT '头像',



  `time` varchar(20) NOT NULL COMMENT '注册时间',



  `name` varchar(20) NOT NULL,



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"







);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_ad')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `title` varchar(50) NOT NULL COMMENT '轮播图标题',



  `logo` varchar(200) NOT NULL COMMENT '图片',



  `status` int(11) NOT NULL COMMENT '1.开启  2.关闭',



  `src` varchar(100) NOT NULL COMMENT '链接',



  `orderby` int(11) NOT NULL COMMENT '排序',



  `xcx_name` varchar(20) NOT NULL,



  `appid` varchar(20) NOT NULL,



  `uniacid` int(11) NOT NULL COMMENT '小程序id'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"







);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_area')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `area_name` varchar(50) NOT NULL COMMENT '区域名称',



  `num` int(11) NOT NULL COMMENT '排序',



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_comments')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `information_id` int(11) NOT NULL COMMENT '帖子id',



  `details` varchar(200) NOT NULL COMMENT '评论详情',



  `time` varchar(20) NOT NULL COMMENT '时间',



  `reply` varchar(200) NOT NULL COMMENT '回复详情',



  `hf_time` varchar(20) NOT NULL COMMENT '回复时间',



  `user_id` int(11) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_information')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `details` text NOT NULL COMMENT '内容',



  `img` text NOT NULL COMMENT '图片',



  `user_id` int(11) NOT NULL COMMENT '用户id',



  `user_name` varchar(20) NOT NULL COMMENT '联系人',



  `user_tel` varchar(20) NOT NULL COMMENT '电话',



  `hot` int(11) NOT NULL COMMENT '1.热门 2.不热门',



  `top` int(11) NOT NULL COMMENT '1.置顶 2.不置顶',



  `givelike` int(11) NOT NULL COMMENT '点赞数',



  `views` int(11) NOT NULL COMMENT '浏览量',



  `uniacid` int(11) NOT NULL COMMENT '小程序id',



  `type2_id` int(11) NOT NULL COMMENT '分类二id',



  `type_id` int(11) NOT NULL,



  `state` int(11) NOT NULL COMMENT '1.待审核 2.通过3拒绝',



  `money` decimal(10,2) NOT NULL,



  `time` int(11) NOT NULL COMMENT '发布时间'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_like')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `information_id` int(11) NOT NULL COMMENT '帖子id',



  `user_id` int(11) NOT NULL COMMENT '用户id'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_store')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL COMMENT '用户id',



  `store_name` varchar(50) NOT NULL COMMENT '商家名称',



  `address` varchar(200) NOT NULL COMMENT '商家地址',



  `announcement` varchar(100) NOT NULL COMMENT '公告',



  `storetype_id` int(11) NOT NULL COMMENT '主行业分类id',



  `storetype2_id` int(11) NOT NULL COMMENT '商家子分类id',



  `area_id` int(11) NOT NULL COMMENT '区域id',



  `yy_time` varchar(50) NOT NULL COMMENT '营业时间',



  `keyword` varchar(50) NOT NULL COMMENT '关键字',



  `skzf` int(11) NOT NULL COMMENT '1.是 2否(刷卡支付)',



  `wifi` int(11) NOT NULL COMMENT '1.是 2否',



  `mftc` int(11) NOT NULL COMMENT '1.是 2否(免费停车)',



  `jzxy` int(11) NOT NULL COMMENT '1.是 2否(禁止吸烟)',



  `tgbj` int(11) NOT NULL COMMENT '1.是 2否(提供包间)',



  `sfxx` int(11) NOT NULL COMMENT '1.是 2否(沙发休闲)',



  `tel` varchar(20) NOT NULL COMMENT '手机号',



  `logo` varchar(100) NOT NULL,



  `weixin_logo` varchar(100) NOT NULL,



  `ad` text NOT NULL COMMENT '轮播图',



  `state` int(11) NOT NULL COMMENT '1.待审核2通过3拒绝',



  `money` decimal(10,2) NOT NULL COMMENT '金额',



  `password` varchar(100) NOT NULL COMMENT '核销密码',



  `details` text NOT NULL COMMENT '商家简介',



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_share')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `information_id` int(11) NOT NULL COMMENT '帖子id',



  `user_id` int(11) NOT NULL COMMENT '用户id'



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_storetype')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `type_name` varchar(20) NOT NULL COMMENT '分类名称',



  `img` varchar(100) NOT NULL COMMENT '分类图片',



  `uniacid` int(11) NOT NULL,



  `num` int(11) NOT NULL COMMENT '排序',



  `money` decimal(10,2) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_storetype2')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `name` varchar(20) NOT NULL,



  `type_id` int(11) NOT NULL COMMENT '主分类id',



  `num` int(11) NOT NULL COMMENT '排序',



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_news')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `title` varchar(50) NOT NULL COMMENT '公告标题',



  `details` text NOT NULL COMMENT '公告详情',



  `num` int(11) NOT NULL COMMENT '排序',



  `uniacid` int(11) NOT NULL,



   `time` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_top')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `type` int(11) NOT NULL COMMENT '1.一天2.一周3.一个月',



  `money` decimal(10,2) NOT NULL COMMENT '价格',



  `uniacid` int(11) NOT NULL,



  `num` int(11) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_label')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `label_name` varchar(20) NOT NULL,



  `type2_id` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_mylabel')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `label_id` int(11) NOT NULL,



  `information_id` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_in')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `type` int(11) NOT NULL COMMENT '1.一天2.半年3.一年',



  `money` DECIMAL(10,2) NOT NULL,



  `num` int(11) NOT NULL,



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_help')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `question` varchar(200) NOT NULL COMMENT '标题',



  `answer` text NOT NULL COMMENT '回答',



  `sort` int(4) NOT NULL COMMENT '排序',



  `uniacid` varchar(50) NOT NULL,



  `created_time` datetime NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_sms')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `appkey` varchar(100) NOT NULL,



  `tpl_id` int(11) NOT NULL,



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_fx')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL COMMENT '用户ID',



  `zf_user_id` int(11) NOT NULL COMMENT '转发人ID',



  `money` decimal(10,2) NOT NULL COMMENT '金额',



  `time` int(11) NOT NULL COMMENT '时间戳',



  `uniacid` varchar(50) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='分销表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_hblq')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL COMMENT '用户ID',



  `tz_id` int(11) NOT NULL COMMENT '帖子ID',



  `money` decimal(10,2) NOT NULL COMMENT '金额',



  `time` int(11) NOT NULL COMMENT '时间戳',



  `uniacid` varchar(50) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='分销表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_withdrawal')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `name` varchar(10) NOT NULL COMMENT '真实姓名',



  `username` varchar(100) NOT NULL COMMENT '账号',



  `type` int(11) NOT NULL COMMENT '1支付宝 2.微信 3.银行',



  `time` int(11) NOT NULL COMMENT '申请时间',



  `sh_time` int(11) NOT NULL COMMENT '审核时间',



  `state` int(11) NOT NULL COMMENT '1.待审核 2.通过  3.拒绝',



  `tx_cost` decimal(10,2) NOT NULL COMMENT '提现金额',



  `sj_cost` decimal(10,2) NOT NULL COMMENT '实际金额',



  `user_id` int(11) NOT NULL COMMENT '用户id',



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_zx')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `type_id` int(11) NOT NULL COMMENT '分类ID',



  `user_id` int(11) NOT NULL COMMENT '发布人ID',



  `title` varchar(200) NOT NULL COMMENT '标题',



  `content` text NOT NULL COMMENT '内容',



  `time` datetime NOT NULL COMMENT '时间',



  `yd_num` int(11) NOT NULL COMMENT '阅读数量',



  `pl_num` int(11) NOT NULL COMMENT '评论数量',



  `uniacid` varchar(50) NOT NULL,



  `imgs` text NOT NULL COMMENT '图片'



) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_zx_type')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `type_name` varchar(100) NOT NULL COMMENT '分类名称',



  `icon` varchar(100) NOT NULL COMMENT '图标',



  `sort` int(4) NOT NULL COMMENT '排序',



  `time` datetime NOT NULL COMMENT '时间',



  `uniacid` varchar(50) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_zx_assess')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `zx_id` int(4) NOT NULL,



  `score` int(11) NOT NULL,



  `content` text NOT NULL,



  `img` varchar(500) NOT NULL,



  `cerated_time` datetime NOT NULL,



  `user_id` int(11) NOT NULL,



  `uniacid` varchar(50) NOT NULL,



  `status` int(4) NOT NULL,



  `reply` text NOT NULL,



  `reply_time` datetime NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_zx_zj')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `zx_id` int(11) NOT NULL COMMENT '资讯ID',



  `user_id` int(11) NOT NULL COMMENT '用户ID',



  `uniacid` varchar(50) NOT NULL,



  `time` int(11) NOT NULL COMMENT '时间'



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资讯足迹';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_car')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL COMMENT '用户id',



  `start_place` varchar(100) NOT NULL COMMENT '出发地',



  `end_place` varchar(100) NOT NULL COMMENT '目的地',



  `start_time` varchar(30) NOT NULL COMMENT '出发时间',



  `num` int(4) NOT NULL COMMENT '乘车人数/可乘人数',



  `link_name` varchar(30) NOT NULL COMMENT '联系人',



  `link_tel` varchar(20) NOT NULL COMMENT '联系电话',



  `typename` varchar(30) NOT NULL COMMENT '分类名称',



  `other` varchar(300) NOT NULL COMMENT '补充',



  `time` int(11) NOT NULL COMMENT '发布时间',



  `sh_time` int(11) NOT NULL COMMENT '审核时间',



  `top_id` int(11) NOT NULL COMMENT '置顶ID',



  `top` int(4) NOT NULL COMMENT '是否置顶,1,是,2否',



  `uniacid` varchar(50) NOT NULL,



  `state` int(4) NOT NULL COMMENT '1待审核,2通过，3拒绝',



  `tj_place` varchar(300) NOT NULL COMMENT '途经地',



  `hw_wet` varchar(10) NOT NULL COMMENT '货物重量',



  `star_lat` varchar(20) NOT NULL COMMENT '出发地维度',



  `star_lng` varchar(20) NOT NULL COMMENT '出发地经度',



  `end_lat` varchar(20) NOT NULL COMMENT '目的地维度',



  `end_lng` varchar(20) NOT NULL COMMENT '目的地经度'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='拼车';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_car_my_tag')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `tag_id` int(11) NOT NULL COMMENT '标签id',



  `car_id` int(11) NOT NULL COMMENT '拼车ID'



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_car_tag')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `typename` varchar(30) NOT NULL COMMENT '分类名称',



  `tagname` varchar(30) NOT NULL COMMENT '标签名称',



  `uniacid` varchar(11) NOT NULL COMMENT '50'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_car_top')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `type` int(11) NOT NULL COMMENT '1.一天2.一周3.一个月',



  `money` decimal(10,2) NOT NULL COMMENT '价格',



  `uniacid` int(11) NOT NULL,



  `num` int(11) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='拼车置顶';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_goods')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `store_id` int(11) NOT NULL COMMENT '商家ID',



  `spec_id` int(11) NOT NULL COMMENT '主规格ID',



  `goods_name` varchar(100) NOT NULL COMMENT '商品名称',



  `goods_num` int(11) NOT NULL COMMENT '商品数量',



  `goods_cost` decimal(10,2)  NOT NULL COMMENT '商品价格',



  `freight` decimal(10,2) NOT NULL COMMENT '运费',



  `delivery` varchar(500) NOT NULL COMMENT '关于发货',



  `quality` int(4) NOT NULL COMMENT '正品1是,0否',



  `free` int(4) NOT NULL COMMENT '包邮1是,0否',



  `all_day` int(4) NOT NULL COMMENT '24小时发货1是,0否',



  `service` int(4) NOT NULL COMMENT '售后服务1是,0否',



  `refund` int(4) NOT NULL COMMENT '极速退款1是,0否',



  `weeks` int(4) NOT NULL COMMENT '7天包邮1是，0否',



  `lb_imgs` varchar(500) NOT NULL COMMENT '轮播图',



  `imgs` varchar(500) NOT NULL COMMENT '商品介绍图',



  `time` int(11) NOT NULL COMMENT '时间',



  `uniacid` varchar(50) NOT NULL,



  `goods_details` text NOT NULL COMMENT '商品详细',



  `state` int(4) NOT NULL COMMENT '1待审核,2通过，3拒绝',



  `sy_num` int(11) NOT NULL COMMENT '剩余数量'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='商品表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_goods_spec')."(



    `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `spec_name` varchar(100) NOT NULL COMMENT '规格名称',



  `sort` int(4) NOT NULL COMMENT '排序',



  `uniacid` varchar(50) NOT NULL COMMENT '50'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='商品规格表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_spec_value')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `goods_id` int(11) NOT NULL COMMENT '商品ID',



  `spec_id` int(11) NOT NULL,



  `money` decimal(10,2) NOT NULL COMMENT '价格',



  `name` varchar(50) NOT NULL COMMENT '名称',



  `num` int(11) NOT NULL COMMENT '数量'



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_order')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL,



  `store_id` int(11) NOT NULL,



  `money` decimal(10,2) NOT NULL COMMENT '金额',



  `user_name` varchar(20) NOT NULL COMMENT '联系人',



  `address` varchar(200) NOT NULL COMMENT '联系地址',



  `tel` varchar(20) NOT NULL COMMENT '电话',



  `time` int(11) NOT NULL COMMENT '下单时间',



  `pay_time` int(11) NOT NULL,



  `complete_time` int(11) NOT NULL,



  `fh_time` int(11) NOT NULL COMMENT '发货时间',



  `state` int(11) NOT NULL COMMENT '1.待付款 2.待发货3.待确认4.已完成5.退款中6.已退款7.退款拒绝',



  `order_num` varchar(20) NOT NULL COMMENT '订单号',



  `good_id` int(11) NOT NULL,



  `good_name` varchar(100) NOT NULL,



  `good_img` varchar(100) NOT NULL,



  `good_money` decimal(10,2) NOT NULL,



  `out_trade_no` varchar(50) NOT NULL,



  `good_spec` varchar(200) NOT NULL COMMENT '商品规格',



  `del` int(11) NOT NULL COMMENT '用户删除1是  2否 ',



  `del2` int(11) NOT NULL COMMENT '商家删除1.是2.否',



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_store_wallet')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `store_id` int(11) NOT NULL,



  `money` decimal(10,2) NOT NULL,



  `note` varchar(20) NOT NULL,



  `type` int(11) NOT NULL COMMENT '1加2减'



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商家钱包明细';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_commission_withdrawal')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL,



  `type` int(11) NOT NULL COMMENT '1.支付宝2.银行卡',



  `state` int(11) NOT NULL COMMENT '1.审核中2.通过3.拒绝',



  `time` int(11) NOT NULL COMMENT '申请时间',



  `sh_time` int(11) NOT NULL COMMENT '审核时间',



  `uniacid` int(11) NOT NULL,



  `user_name` varchar(20) NOT NULL,



  `account` varchar(100) NOT NULL,



  `tx_cost` decimal(10,2) NOT NULL COMMENT '提现金额',



  `sj_cost` decimal(10,2) NOT NULL COMMENT '实际到账金额'



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='佣金提现';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_distribution')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL,



  `time` int(11) NOT NULL,



  `user_name` varchar(20) NOT NULL,



  `user_tel` varchar(20) NOT NULL,



  `state` int(11) NOT NULL COMMENT '1.审核中2.通过3.拒绝',



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='分销申请';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_earnings')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL,



  `son_id` int(11) NOT NULL COMMENT '下线',



  `money` decimal(10,2) NOT NULL,



  `time` int(11) NOT NULL,



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='佣金收益表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_fxset')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `fx_details` text NOT NULL COMMENT '分销商申请协议',



  `tx_details` text NOT NULL COMMENT '佣金提现协议',



  `is_fx` int(11) NOT NULL COMMENT '1.开启分销审核2.不开启',



  `is_ej` int(11) NOT NULL COMMENT '是否开启二级分销1.是2.否',



  `tx_rate` int(11) NOT NULL COMMENT '提现手续费',



  `commission` varchar(10) NOT NULL COMMENT '一级佣金',



  `commission2` varchar(10) NOT NULL COMMENT '二级佣金',



  `tx_money` int(11) NOT NULL COMMENT '提现门槛',



  `img` varchar(100) NOT NULL COMMENT '分销中心图片',



  `img2` varchar(100) NOT NULL COMMENT '申请分销图片',



  `uniacid` int(11) NOT NULL,



  `is_open` int(11) NOT NULL DEFAULT '1' COMMENT '1.开启2关闭',



  `instructions` text NOT NULL COMMENT '分销商说明'



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_fxuser')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL COMMENT '一级分销',



  `fx_user` int(11) NOT NULL COMMENT '二级分销',



  `time` int(11) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_yellowset')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `days` int(11) NOT NULL COMMENT '入住天数',



  `money` decimal(10,2) NOT NULL,



  `num` int(11) NOT NULL,



  `uniacid` int(11) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='黄页设置表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_yellowstore')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL,



  `logo` varchar(200) NOT NULL COMMENT 'logo图片',



  `company_name` varchar(100) NOT NULL COMMENT '公司名称',



  `company_address` varchar(200) NOT NULL COMMENT '公司地址',



  `type_id` int(11) NOT NULL COMMENT '二级分类',



  `link_tel` varchar(20) NOT NULL COMMENT '联系电话',



  `sort` int(11) NOT NULL COMMENT '排序',



  `rz_time` int(11) NOT NULL COMMENT '入住时间',



  `sh_time` int(11) NOT NULL COMMENT '审核时间',



  `state` int(4) NOT NULL COMMENT '1待,2通过,3拒绝',



  `rz_type` int(4) NOT NULL COMMENT '入驻类型',



  `time_over` int(4) NOT NULL COMMENT '1到期,2没到期',



  `uniacid` varchar(50) NOT NULL,



  `coordinates` varchar(50) NOT NULL COMMENT '坐标',



  `content` text NOT NULL COMMENT '简介',



  `imgs` varchar(500) NOT NULL COMMENT '多图'



) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_hotcity')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `cityname` varchar(50) NOT NULL COMMENT '城市名称',



  `time` int(11) NOT NULL COMMENT '创建时间',



  `uniacid` varchar(50) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_paylog')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `fid` int(11) NOT NULL COMMENT '外键id(商家,帖子,黄页,拼车)',



  `money` decimal(10,2) NOT NULL COMMENT '钱',



  `time` datetime NOT NULL COMMENT '时间',



  `uniacid` varchar(50) NOT NULL COMMENT '50'



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='支付记录表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_account')."(



  `id` int(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',



  `storeid` varchar(1000) NOT NULL,



  `uid` int(10) unsigned NOT NULL DEFAULT '0',



  `from_user` varchar(100) NOT NULL DEFAULT '',



  `accountname` varchar(50) NOT NULL DEFAULT '',



  `password` varchar(200) NOT NULL DEFAULT '',



  `salt` varchar(10) NOT NULL DEFAULT '',



  `pwd` varchar(50) NOT NULL,



  `mobile` varchar(20) NOT NULL,



  `email` varchar(20) NOT NULL,



  `username` varchar(50) NOT NULL,



  `pay_account` varchar(200) NOT NULL,



  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',



  `dateline` int(10) unsigned NOT NULL DEFAULT '0',



  `status` tinyint(1) unsigned NOT NULL DEFAULT '2' COMMENT '状态',



  `role` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1:店长,2:店员',



  `lastvisit` int(10) unsigned NOT NULL DEFAULT '0',



  `lastip` varchar(15) NOT NULL,



  `areaid` int(10) NOT NULL DEFAULT '0' COMMENT '区域id',



  `is_admin_order` tinyint(1) unsigned NOT NULL DEFAULT '1',



  `is_notice_order` tinyint(1) unsigned NOT NULL DEFAULT '1',



  `is_notice_queue` tinyint(1) unsigned NOT NULL DEFAULT '1',



  `is_notice_service` tinyint(1) unsigned NOT NULL DEFAULT '1',



  `is_notice_boss` tinyint(1) NOT NULL DEFAULT '0',



  `remark` varchar(1000) NOT NULL DEFAULT '' COMMENT '备注',



  `lat` decimal(18,10) NOT NULL DEFAULT '0.0000000000' COMMENT '经度',



  `lng` decimal(18,10) NOT NULL DEFAULT '0.0000000000' COMMENT '纬度',



  `cityname` varchar(50) NOT NULL COMMENT '城市名称'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_carpaylog')."(



   `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `car_id` int(44) NOT NULL COMMENT '拼车id',



  `money` decimal(10,2) NOT NULL COMMENT '钱',



  `time` datetime NOT NULL,



  `uniacid` varchar(50) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='拼车支付记录表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_storepaylog')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `store_id` int(11) NOT NULL COMMENT '商家ID',



  `money` decimal(10,2) NOT NULL,



  `time` datetime NOT NULL,



  `uniacid` varchar(50) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商家入驻支付记录表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_tzpaylog')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `tz_id` int(11) NOT NULL,



  `money` decimal(10,2) NOT NULL,



  `time` datetime NOT NULL,



  `uniacid` varchar(50) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='帖子支付记录表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_yellowpaylog')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `hy_id` int(11) NOT NULL,



  `money` decimal(10,2) NOT NULL,



  `time` datetime NOT NULL,



  `uniacid` varchar(50) NOT NULL



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='黄页支付记录表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_yjset')."(



  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `type` int(4) NOT NULL DEFAULT '1' COMMENT '1统一模式,2分开模式',



  `typer` varchar(10) NOT NULL COMMENT '统一比例',



  `sjper` varchar(10) NOT NULL COMMENT '商家比例',



  `hyper` varchar(10) NOT NULL COMMENT '黄页比例',



  `pcper` varchar(10) NOT NULL COMMENT '拼车比例',



  `tzper` varchar(10) NOT NULL COMMENT '帖子比例',



  `uniacid` varchar(50) NOT NULL



) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='佣金比例表';"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_yjtx')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `account_id` int(11) NOT NULL COMMENT '账号id',



  `tx_type` int(4) NOT NULL COMMENT '提现方式 1,支付宝,2微信,3银联',



  `tx_cost` decimal(10,2) NOT NULL COMMENT '提现金额',



  `status` int(4) NOT NULL COMMENT '状态 1申请,2通过,3拒绝',



  `uniacid` varchar(50) NOT NULL,



  `cerated_time` datetime NOT NULL COMMENT '日期',



  `sj_cost` decimal(10,2) NOT NULL COMMENT '实际金额',



  `account` varchar(30) NOT NULL COMMENT '账户',



  `name` varchar(30) NOT NULL COMMENT '姓名',



  `sx_cost` decimal(10,2) NOT NULL COMMENT '手续费',



  `time` datetime NOT NULL COMMENT '审核时间',



  `is_del` int(4) NOT NULL DEFAULT '1' COMMENT '1正常,2删除'



) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;"



);



pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhtc_userformid')."(



 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,



  `user_id` int(11) NOT NULL COMMENT '用户id',



  `form_id` varchar(50) NOT NULL COMMENT 'form_id',



  `time` datetime NOT NULL,



  `uniacid` varchar(50) NOT NULL,



  `openid` varchar(50) NOT NULL COMMENT 'openid'



) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='formid表';"



);















if (!pdo_fieldexists(tablename('zhtc_ad'), 'type')) {



   pdo_query("ALTER TABLE".tablename('zhtc_ad')." ADD `type`  INT NOT NULL;");







}



if (!pdo_fieldexists(tablename('zhtc_store'), 'coordinates')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `coordinates`  VARCHAR(50) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'views')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `views`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'sh_time')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `sh_time`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'top_type')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `top_type`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_news'), 'img')) {



    pdo_query("ALTER TABLE".tablename('zhtc_news')." ADD `img`  VARCHAR(100) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_news'), 'state')) {



    pdo_query("ALTER TABLE".tablename('zhtc_news')." ADD `state`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'mapkey')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `mapkey`  VARCHAR(200) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'tel')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `tel`  VARCHAR(20) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'gd_key')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `gd_key`  VARCHAR(100) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_news'), 'type')) {



    pdo_query("ALTER TABLE".tablename('zhtc_news')." ADD `type`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_comments'), 'store_id')) {



    pdo_query("ALTER TABLE".tablename('zhtc_comments')." ADD `store_id`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_share'), 'store_id')) {



    pdo_query("ALTER TABLE".tablename('zhtc_share')." ADD `store_id`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'score')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `score`  DECIMAL(10,1) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_comments'), 'score')) {



    pdo_query("ALTER TABLE".tablename('zhtc_comments')." ADD `score`  DECIMAL(10,1) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'type')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `type`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'sh_time')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `sh_time`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'time_over')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `time_over`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'address')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `address`  VARCHAR(500) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'img')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `img`  TEXT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'rz_xuz')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `rz_xuz`  TEXT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'ft_xuz')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `ft_xuz`  TEXT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'vr_link')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `vr_link`  TEXT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'fx_money')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `fx_money`  DECIMAL(10,2) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_user'), 'money')) {



    pdo_query("ALTER TABLE".tablename('zhtc_user')." ADD `money`  DECIMAL(10,2) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'hb_money')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `hb_money`  DECIMAL(10,2) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'hb_num')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `hb_num`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'hb_type')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `hb_type`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'hb_keyword')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `hb_keyword`  VARCHAR(20) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'hb_random')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `hb_random`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'hb_sxf')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `hb_sxf`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'hong')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `hong`  TEXT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'store_id')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `store_id`  INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'tx_money')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `tx_money`  DECIMAL(10,2) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'tx_sxf')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `tx_sxf` INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'tx_details')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `tx_details` TEXT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'del')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `del` INT NOT NULL DEFAULT '2';");



}



if (!pdo_fieldexists(tablename('zhtc_sms'), 'is_open')) {



    pdo_query("ALTER TABLE".tablename('zhtc_sms')." ADD `is_open` INT NOT NULL DEFAULT '2';");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'num')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `num` INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'start_time')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `start_time` VARCHAR(20) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'end_time')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `end_time` VARCHAR(20) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_like'), 'zx_id')) {



    pdo_query("ALTER TABLE".tablename('zhtc_like')." ADD `zx_id` INT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_hhr')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_hhr` INT(4) NOT NULL DEFAULT '2';");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_hbfl')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_hbfl` INT(4) NOT NULL DEFAULT '2';");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_zx')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_zx` INT(4) NOT NULL DEFAULT '2';");



}



if (!pdo_fieldexists(tablename('zhtc_zx'), 'state')) {



    pdo_query("ALTER TABLE".tablename('zhtc_zx')." ADD `state` INT(4) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_zx'), 'sh_time')) {



    pdo_query("ALTER TABLE".tablename('zhtc_zx')." ADD `sh_time` DATETIME NOT NULL ;");



}







if (!pdo_fieldexists(tablename('zhtc_system'), 'is_car')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_car` INT(4) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'pc_xuz')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `pc_xuz` TEXT NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'pc_money')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `pc_money` DECIMAL(10,2) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_car'), 'is_open')) {



    pdo_query("ALTER TABLE".tablename('zhtc_car')." ADD `is_open` INT(4) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_car'), 'start_time2')) {



    pdo_query("ALTER TABLE".tablename('zhtc_car')." ADD `start_time2` INT NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'user_img2')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `user_img2` VARCHAR(200) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_sjrz')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_sjrz` INT(4) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_pcfw')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_pcfw` INT(4) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'total_num')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `total_num` INT(11) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_goods')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_goods` INT(4) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_user'), 'user_name')) {



    pdo_query("ALTER TABLE".tablename('zhtc_user')." ADD `user_name` VARCHAR(20) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_user'), 'user_tel')) {



    pdo_query("ALTER TABLE".tablename('zhtc_user')." ADD `user_tel` VARCHAR(20) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_user'), 'user_address')) {



    pdo_query("ALTER TABLE".tablename('zhtc_user')." ADD `user_address` VARCHAR(200) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'wallet')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `wallet` DECIMAL(10,2) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_order'), 'freight')) {



    pdo_query("ALTER TABLE".tablename('zhtc_order')." ADD `freight` DECIMAL(10,2) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_order'), 'note')) {



    pdo_query("ALTER TABLE".tablename('zhtc_order')." ADD `note` VARCHAR(100) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'apiclient_cert')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `apiclient_cert` TEXT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'apiclient_key')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `apiclient_key` TEXT NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_type'), 'state')) {



    pdo_query("ALTER TABLE".tablename('zhtc_type')." ADD `state` INT(4) NOT NULL DEFAULT '1';");



}



if (!pdo_fieldexists(tablename('zhtc_storetype'), 'state')) {



    pdo_query("ALTER TABLE".tablename('zhtc_storetype')." ADD `state` INT(4) NOT NULL DEFAULT '1';");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_openzx')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_openzx` INT(4) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_storetype2'), 'state')) {



    pdo_query("ALTER TABLE".tablename('zhtc_storetype2')." ADD `state` INT(4) NOT NULL DEFAULT '1';");



}



if (!pdo_fieldexists(tablename('zhtc_type2'), 'state')) {



    pdo_query("ALTER TABLE".tablename('zhtc_type2')." ADD `state` INT(4) NOT NULL DEFAULT '1';");



}



if (!pdo_fieldexists(tablename('zhtc_order'), 'good_num')) {



    pdo_query("ALTER TABLE".tablename('zhtc_order')." ADD `good_num` INT NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_goods'), 'is_show')) {



    pdo_query("ALTER TABLE".tablename('zhtc_goods')." ADD `is_show` INT NOT NULL DEFAULT '1';");



}



if (!pdo_fieldexists(tablename('zhtc_goods'), 'sales')) {



    pdo_query("ALTER TABLE".tablename('zhtc_goods')." ADD `sales` INT NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_zx'), 'type')) {



    pdo_query("ALTER TABLE".tablename('zhtc_zx')." ADD `type` INT(4) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_store_wallet'), 'time')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store_wallet')." ADD `time` VARCHAR(20) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_withdrawal'), 'method')) {



    pdo_query("ALTER TABLE".tablename('zhtc_withdrawal')." ADD `method` INT NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_withdrawal'), 'store_id')) {



    pdo_query("ALTER TABLE".tablename('zhtc_withdrawal')." ADD `store_id` INT NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_user'), 'commission')) {



    pdo_query("ALTER TABLE".tablename('zhtc_user')." ADD `commission` DECIMAL(10,2) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'user_name')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `user_name` VARCHAR(30) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'pwd')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `pwd` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_hyset')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_hyset` INT(4) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'dq_time')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `dq_time` INT(11) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'dq_time')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `dq_time` INT(11) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_yellowstore'), 'views')) {



    pdo_query("ALTER TABLE".tablename('zhtc_yellowstore')." ADD `views` INT NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_tzopen')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_tzopen` INT(4) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_pageopen')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_pageopen` INT(4) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_yellowstore'), 'tel2')) {



    pdo_query("ALTER TABLE".tablename('zhtc_yellowstore')." ADD `tel2` VARCHAR(20) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_information'), 'cityname')) {



    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `cityname` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'cityname')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `cityname` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_tel')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_tel` INT(4) NOT NULL DEFAULT '1' ;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'cityname')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `cityname` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_yellowstore'), 'cityname')) {



    pdo_query("ALTER TABLE".tablename('zhtc_yellowstore')." ADD `cityname` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_sms'), 'tid1')) {



    pdo_query("ALTER TABLE".tablename('zhtc_sms')." ADD `tid1` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_sms'), 'tid2')) {



    pdo_query("ALTER TABLE".tablename('zhtc_sms')." ADD `tid2` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_sms'), 'tid3')) {



    pdo_query("ALTER TABLE".tablename('zhtc_sms')." ADD `tid3` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_car'), 'cityname')) {



    pdo_query("ALTER TABLE".tablename('zhtc_car')." ADD `cityname` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'time')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `time` DATETIME NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_zx'), 'cityname')) {



    pdo_query("ALTER TABLE".tablename('zhtc_zx')." ADD `cityname` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_ad'), 'cityname')) {



    pdo_query("ALTER TABLE".tablename('zhtc_ad')." ADD `cityname` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_news'), 'cityname')) {



    pdo_query("ALTER TABLE".tablename('zhtc_news')." ADD `cityname` VARCHAR(50) NOT NULL ;");



}



if (!pdo_fieldexists(tablename('zhtc_user'), 'state')) {



    pdo_query("ALTER TABLE".tablename('zhtc_user')." ADD `state` INT(4) NOT NULL DEFAULT '1';");



}



if (!pdo_fieldexists(tablename('zhtc_paylog'), 'note')) {



    pdo_query("ALTER TABLE".tablename('zhtc_paylog')." ADD `note` VARCHAR(100) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'fx_num')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `fx_num` INT(11) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'tx_mode')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `tx_mode` INT(4) NOT NULL DEFAULT '1';");



}







if (!pdo_fieldexists(tablename('zhtc_system'), 'many_city')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `many_city` INT(4) NOT NULL DEFAULT '2';");



}



if (!pdo_fieldexists(tablename('zhtc_store'), 'ewm_logo')) {



    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `ewm_logo` VARCHAR(100) NOT NULL;");



}







if (!pdo_fieldexists(tablename('zhtc_hotcity'), 'user_id')) {



    pdo_query("ALTER TABLE".tablename('zhtc_hotcity')." ADD `user_id` INT(11) NOT NULL;");



}







if (!pdo_fieldexists(tablename('zhtc_ad'), 'wb_src')) {



    pdo_query("ALTER TABLE".tablename('zhtc_ad')." ADD `wb_src` VARCHAR(300) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_ad'), 'state')) {



    pdo_query("ALTER TABLE".tablename('zhtc_ad')." ADD `state` INT(4) NOT NULL  DEFAULT '1';");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'tx_type')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `tx_type` INT(4) NOT NULL DEFAULT '2';");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'is_hbzf')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `is_hbzf` INT(4) NOT NULL DEFAULT '1';");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'hb_img')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `hb_img` VARCHAR(100) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'tz_num')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `tz_num` INT(11) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_system'), 'client_ip')) {



    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `client_ip` VARCHAR(30) NOT NULL;");



}



if (!pdo_fieldexists(tablename('zhtc_yellowstore'), 'dq_time')) {

    pdo_query("ALTER TABLE".tablename('zhtc_yellowstore')." ADD `dq_time` INT(11) NOT NULL;");

}

if (!pdo_fieldexists(tablename('zhtc_information'), 'hbfx_num')) {
    pdo_query("ALTER TABLE".tablename('zhtc_information')." ADD `hbfx_num` INT(11) NOT NULL;");
}

if (!pdo_fieldexists(tablename('zhtc_store'), 'is_top')) {
    pdo_query("ALTER TABLE".tablename('zhtc_store')." ADD `is_top` INT(4) NOT NULL DEFAULT '2';");
}

if (!pdo_fieldexists(tablename('zhtc_system'), 'hb_content')) {
    pdo_query("ALTER TABLE".tablename('zhtc_system')." ADD `hb_content` VARCHAR(100) NOT NULL;");
}


 pdo_query("ALTER TABLE".tablename('zhtc_system')." CHANGE `is_tel` `is_tel` INT(4) NOT NULL DEFAULT '1';");






















?>