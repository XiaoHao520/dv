<?php

/**

 * 志汇-同城微圈小程序模块微站定义

 *

 * @author 武汉志汇科技

 * @url 

 */

defined('IN_IA') or exit('Access Denied');

require 'inc/func/core.php';

class Zh_tcwqModuleSite extends Core {


//修改区域
	public function doMobileUpdArea() {
		global $_W,$_GPC;
        if($_GPC['num']){
           $data['num']=$_GPC['num']; 
        }
        $res=pdo_update('zhtc_area',$data,array('id'=>$_GPC['id']));
        if($res){
            echo '1';
        }else{
            echo '2';
        }	

	}
//修改广告
    public function doMobileUpdAd() {
        global $_W,$_GPC;
        if($_GPC['num']){
           $data['orderby']=$_GPC['num']; 
        }
        $res=pdo_update('zhtc_ad',$data,array('id'=>$_GPC['id']));
        if($res){
            echo '1';
        }else{
            echo '2';
        }   

    }
    //修改分类
    public function doMobileUpdType(){
        global $_W,$_GPC;
        if($_GPC['num']){
           $data['num']=$_GPC['num']; 
        }
         if($_GPC['money']){
           $data['money']=$_GPC['money']; 
        }
        $res=pdo_update('zhtc_type',$data,array('id'=>$_GPC['id']));
        if($res){
            echo '1';
        }else{
            echo '2';
        }   
    }

//全部删除二级信息分类
public function doMobileAllDelete(){
    global $_W, $_GPC;
            $res=pdo_delete('zhtc_type2',array('id'=>$_GPC['id']));
        if($res){
            message('删除成功',$this->createWebUrl('type2',array()),'success');
        }else{
            message('删除失败','','error');
        }
}

//全部删除二级商家分类
public function doMobileDeleteType2(){
    global $_W, $_GPC;
        $res=pdo_delete('zhtc_storetype2',array('id'=>$_GPC['id']));
        if($res){
            message('删除成功',$this->createWebUrl('storetype2',array()),'success');
        }else{
            message('删除失败','','error');
        }
}


  //修改商家分类（价格+顺序）
    public function doMobileUpdType2(){
        global $_W,$_GPC;
        if($_GPC['num']){
           $data['num']=$_GPC['num']; 
        }
         if($_GPC['money']){
           $data['money']=$_GPC['money']; 
        }
        $res=pdo_update('zhtc_storetype',$data,array('id'=>$_GPC['id']));
        if($res){
            echo '1';
        }else{
            echo '2';
        }   
    }


    //查询帖子二级分类
    public function doMobileGetInformationType() {
        global $_W,$_GPC;
     $type2=pdo_getall('zhtc_type2',array('type_id'=>$_GPC['id']));
     echo json_encode( $type2);

    }

public function doMobileAlldeleteinfo(){
    global $_W, $_GPC;
        $res=pdo_delete('zhtc_information',array('id'=>$_GPC['id']));
        if($res){
            message('删除成功',$this->createWebUrl('information',array()),'success');
        }else{
            message('删除失败','','error');
        }
}

//批量更新(二级信息分类)
public function doMobileAllUpdateInfo(){
    global $_W, $_GPC;
    $arr=$_GPC['arr'];
    if($arr){
        foreach($arr as $v){
            if($v['type']==1){               
               $res= pdo_update('zhtc_type2',array('state'=>2),array('id'=>$v['id']));         
            }

            if($v['type']==2){
                $res=pdo_update('zhtc_type2',array('state'=>1),array('id'=>$v['id']));
            }

        }
    }
    
}

//批量更新(二级商家分类)
public function doMobileAllUpdateStore(){
    global $_W, $_GPC;
    $arr=$_GPC['arr'];
    if($arr){
        foreach($arr as $v){
            if($v['type']==1){               
               $res= pdo_update('zhtc_storetype2',array('state'=>2),array('id'=>$v['id']));         
            }

            if($v['type']==2){
                $res=pdo_update('zhtc_storetype2',array('state'=>1),array('id'=>$v['id']));
            }

        }
    }
    
}

//帖子批量通过
public function doMobileAdoptInfo(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_information',array('state'=>2),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('information',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//帖子批量拒绝
public function doMobileRejectInfo(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_information',array('state'=>3),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('information',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//资讯批量删除
public function doMobileAlldeleteZx(){
    global $_W, $_GPC;
        $res=pdo_delete('zhtc_zx',array('id'=>$_GPC['id']));
        if($res){
            message('删除成功',$this->createWebUrl('zx',array()),'success');
        }else{
            message('删除失败','','error');
        }
}


//资讯批量通过
public function doMobileAdoptZx(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_zx',array('state'=>2),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('zx',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//资讯批量拒绝
public function doMobileRejectZx(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_zx',array('state'=>3),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('zx',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//拼车批量删除
public function doMobileAlldeleteCar(){
    global $_W, $_GPC;
        $res=pdo_delete('zhtc_car',array('id'=>$_GPC['id']));
        if($res){
            message('删除成功',$this->createWebUrl('zx',array()),'success');
        }else{
            message('删除失败','','error');
        }
}

//拼车批量通过
public function doMobileAdoptCar(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_car',array('state'=>2),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('information',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//拼车批量拒绝
public function doMobileRejectCar(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_car',array('state'=>3),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('information',array()),'success');
        }else{
            message('操作失败','','error');
        }
}


//黄页批量通过
public function doMobileAdoptHy(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_yellowstore',array('state'=>2),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('information',array()),'success');
        }else{
            message('操作失败','','error');
        }
}
//黄页批量拒绝
public function doMobileRejectHy(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_yellowstore',array('state'=>3),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('information',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//商家批量删除
public function doMobileDeleteStore(){
    global $_W, $_GPC;
        $res=pdo_delete('zhtc_store',array('id'=>$_GPC['id']));
        if($res){
            message('删除成功',$this->createWebUrl('store',array()),'success');
        }else{
            message('删除失败','','error');
        }
}

//商家批量通过
public function doMobileAdoptStore(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_store',array('state'=>2),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('information',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//商家批量拒绝
public function doMobileRejectStore(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_store',array('state'=>3),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('information',array()),'success');
        }else{
            message('操作失败','','error');
        }
}


//商品批量删除
public function doMobileDeleteGoods(){
    global $_W, $_GPC;
        $res=pdo_delete('zhtc_goods',array('id'=>$_GPC['id']));
        if($res){
            message('删除成功',$this->createWebUrl('goods',array()),'success');
        }else{
            message('删除失败','','error');
        }
}

//商品批量通过
public function doMobileAdoptGoods(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_goods',array('state'=>2),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('goods',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//商品批量拒绝
public function doMobileRejectGoods(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_goods',array('state'=>3),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('goods',array()),'success');
        }else{
            message('操作失败','','error');
        }
}



//信息分类批量删除
public function doMobileDeleteType(){
    global $_W, $_GPC;
        $res=pdo_delete('zhtc_type',array('id'=>$_GPC['id']));
        if($res){
            message('删除成功',$this->createWebUrl('type',array()),'success');
        }else{
            message('删除失败','','error');
        }
}

//信息分类批量启用
public function doMobileQyType(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_type',array('state'=>1),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('type',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//信息分类批量禁用
public function doMobileJyType(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_type',array('state'=>2),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('type',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//商家分类批量删除
public function doMobileDeleteStoreType(){
    global $_W, $_GPC;
        $res=pdo_delete('zhtc_storetype',array('id'=>$_GPC['id']));
        if($res){
            message('删除成功',$this->createWebUrl('storetype',array()),'success');
        }else{
            message('删除失败','','error');
        }
}

//商家分类批量启用
public function doMobileQyStoreType(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_storetype',array('state'=>1),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('storetype',array()),'success');
        }else{
            message('操作失败','','error');
        }
}

//商家分类批量禁用
public function doMobileJyStoreType(){
     global $_W, $_GPC;
        $res=pdo_update('zhtc_storetype',array('state'=>2),array('id'=>$_GPC['id']));
        if($res){
            message('操作成功',$this->createWebUrl('storetype',array()),'success');
        }else{
            message('操作失败','','error');
        }
}



//查找用户
public function doMobileFindUser(){
global $_W, $_GPC;
/*    //查出已是商家用户
$sjuser=pdo_getall('zhtc_store',array('uniacid'=>$_W['uniacid']),'user_id');
//二维数组转一维
$yuser=array_column($sjuser, 'user_id');
$string='';
if($yuser){
foreach($yuser as $v){
    $string.="'".$v."',";
}
$string=rtrim($string, ",");
}
//echo $string;
//用户
//
if($yuser){
$sql =" select id,name from ".tablename('zhtc_user')." where uniacid={$_W['uniacid']}  and id not in ({$string}) and  name like '%{$_GPC['keywords']}%'";  
}else{
 $sql =" select id,name from ".tablename('zhtc_user')." where uniacid={$_W['uniacid']}   and  name like '%{$_GPC['keywords']}%'";     
}

$user=pdo_fetchall($sql);
//$user=pdo_getall('zhtc_user',array('uniacid'=>$_W['uniacid'],'id !='=>$yuser));*/
$sql =" select id,name from ".tablename('zhtc_user')." where uniacid={$_W['uniacid']}  and id not in (select user_id  from" .tablename('zhtc_store')."where uniacid={$_W['uniacid']}) and  name like '%{$_GPC['keywords']}%'";  
$user=pdo_fetchall($sql);

return json_encode($user);
}

//查找城市
public function doMobileFindCity(){
global $_W, $_GPC;
$sql =" select DISTINCT cityname from ".tablename('zhtc_hotcity')." where uniacid={$_W['uniacid']}   and  cityname like '%{$_GPC['keywords']}%'";  
$city=pdo_fetchall($sql);
return json_encode($city);

}



//资讯评论批量删除
public function doMobileDeleteZxAssess(){
    global $_W, $_GPC;
    $res=pdo_delete('zhtc_zx_assess',array('id'=>$_GPC['id']));
    if($res){
        message('删除成功',$this->createWebUrl('zxpinglun',array()),'success');
    }else{
        message('删除失败','','error');
    }

}

//帖子分类列表

public function doMobileTypeList(){
    global $_W, $_GPC;
    $type=pdo_getall('zhtc_type',array('uniacid'=>$_W['uniacid'],'state'=>1),array(),'','num asc');
    $type2=pdo_getall('zhtc_type2',array('uniacid'=>$_W['uniacid'],'state'=>1),array(),'','num asc');
    foreach($type as $key => $value){
         $data=$this->getSon($value['id'],$type2);
         $type[$key]['ej']=$data;

    }
    return json_encode($type);

}

//一级分类详情
public function doMobilePTypeInfo(){
    global $_W, $_GPC;
    $res=pdo_get('zhtc_type',array('uniacid' => $_W['uniacid'],'id'=>$_GPC['id']));
    return json_encode($res);
}

//一级分类保存
public function doMobileSavePType(){
    global $_W, $_GPC;
    $data['img']=$_GPC['img'];
    $data['num']=$_GPC['num'];
    $data['type_name']=$_GPC['type_name'];
    $data['money']=$_GPC['money'];
    $data['state']=$_GPC['state'];
    $data['uniacid']=$_W['uniacid'];
    if($_GPC['id']==''){                
        $res=pdo_insert('zhtc_type',$data);        
    }else{
        $res = pdo_update('zhtc_type', $data, array('id' => $_GPC['id']));
    }
    if($res){
       echo '1';
   }else{
       echo '2';
   }

}

//二级分类详情
public function doMobileSTypeInfo(){
    global $_W, $_GPC;
    $res= pdo_get('zhtc_type2',array('uniacid' => $_W['uniacid'],'id'=>$_GPC['id']));
    return json_encode($res);
}

//二级分类保存
public function doMobileSaveSType(){
    global $_W, $_GPC;
    $data['num']=$_GPC['num'];
    $data['type_id']=$_GPC['type_id'];
    $data['name']=$_GPC['name'];
    $data['state']=$_GPC['state'];
    $data['uniacid']=$_W['uniacid'];
    if($_GPC['id']==''){                
        $res=pdo_insert('zhtc_type2',$data);
    }else{
        $res = pdo_update('zhtc_type2', $data, array('id' => $_GPC['id']));
    }
    if($res){
       echo '1';
   }else{
       echo '2';
   }

}

//查看帖子标签

public  function doMobileQueryTag(){
    global $_W, $_GPC;
    $res=pdo_getall('zhtc_label',array('type2_id'=>$_GPC['type2_id']));
    echo json_encode($res);

}


//删除标签
public function doMobileDelTag(){
    global $_W, $_GPC;
    $res=pdo_delete('zhtc_label',array('id'=>$_GPC['tag_id']));
    if($res){
        echo '1';
    }else{
        echo '2';
    }
}

//修改标签
public function doMobileUpdTag(){
      global $_W, $_GPC;
    $res=pdo_update('zhtc_label',array('label_name'=>$_GPC['label_name']),array('id'=>$_GPC['tag_id']));
    if($res){
        echo '1';
    }else{
        echo '2';
    }
}








}