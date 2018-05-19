<?php
global $_GPC, $_W;
$GLOBALS['frames'] = $this->getMainMenu();
$info = pdo_get('zhtc_user', array('id' => $_GPC['id']));
$money=$info['money'];

if (checksubmit('submit')) {

    $data['money']=$money+$_GPC['money'];

    $res = pdo_update('zhtc_user', $data, array('id' => $_GPC['id']));
    if ($res) {
        message('编辑成功', $this->createWebUrl('user2', array()), 'success');
    } else {
        message('编辑失败', '', 'error');
    }
}
include $this->template('web/userinfo');