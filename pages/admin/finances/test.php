<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/incfiles/functions.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With,  Authorization");

$post = file_get_contents('php://input');
$post = json_decode($post);
$input = $post->input;

$taikhoan = strip_tags(mysql_real_escape_string(addslashes($input->taikhoan)));
$giatien = LocSO(strip_tags(mysql_real_escape_string(addslashes($input->giatien))));
$gianhap = LocSO(strip_tags(mysql_real_escape_string(addslashes($input->gianhap))));
$server = strip_tags(mysql_real_escape_string(addslashes($input->server)));
$level = strip_tags(mysql_real_escape_string(addslashes($input->level)));
$class = strip_tags(mysql_real_escape_string(addslashes($input->class)));
$loainick = strip_tags(mysql_real_escape_string(addslashes($input->loainick)));
$thongtin = strip_tags(mysql_real_escape_string(addslashes($input->thongtin)));
$vukhi = strip_tags(mysql_real_escape_string(addslashes($input->vukhi)));
$do = strip_tags(mysql_real_escape_string(addslashes($input->do)));
$ingame = strip_tags(mysql_real_escape_string(addslashes($input->ingame)));
$tl1 = strip_tags(mysql_real_escape_string(addslashes($input->tl1)));
$tl2 = strip_tags(mysql_real_escape_string(addslashes($input->tl2)));
$tl3 = strip_tags(mysql_real_escape_string(addslashes($input->tl3)));
$tl4 = strip_tags(mysql_real_escape_string(addslashes($input->tl4)));
$tl5 = strip_tags(mysql_real_escape_string(addslashes($input->tl5)));
$tl6 = strip_tags(mysql_real_escape_string(addslashes($input->tl6)));
$tl7 = strip_tags(mysql_real_escape_string(addslashes($input->tl7)));
$tl8 = strip_tags(mysql_real_escape_string(addslashes($input->tl8)));
$tl9 = strip_tags(mysql_real_escape_string(addslashes($input->tl9)));
$tl10 = strip_tags(mysql_real_escape_string(addslashes($input->tl10)));
$tl11 = strip_tags(mysql_real_escape_string(addslashes($input->tl11)));

$hinhanh = $input->hinhanh;
$link_hinh_anh = implode(",", $hinhanh);

if (empty($taikhoan) || empty($giatien) || (strlen($class) != 1) || empty($level) || empty($server) || empty($thongtin) || empty($loainick)) {
    $code = 422;
    $status = 'error';
    $message = 'Các trường Không được để trống';

} else {

    mysql_query("INSERT INTO `GAME_NickNJ` SET
                	`taikhoan`='$taikhoan',
                	`ingame`='$ingame',
                	`vukhi`='$vukhi',
                	`do`='$do',
                	`hinhanh`='$link_hinh_anh',
                	`giatien`='" . floor($giatien) . "',
                	`gianhap`='" . floor($gianhap) . "',
                	`server`='$server',
                	`loainick`='$loainick',
                	`level`='$level',
                	`thongtin`='$thongtin',
                	`class`='$class',
                	`time`='" . time() . "',

                	`tl1`='$tl1',
                	`tl2`='$tl2',
                	`tl3`='$tl3',
                	`tl4`='$tl4',
                	`tl5`='$tl5',
                	`tl6`='$tl6',
                	`tl7`='$tl7',
                	`tl8`='$tl8',
                	`tl9`='$tl9',
                	`tl10`='$tl10',
                	`tl11`='$tl11'
                ");
    $code = 200;
    $status = 'success';
    $message = 'Thành Công';

}

$output = array(
    'accountNinja' => $input,
    'code' => $code,
    'message' => $message,
);

echo json_encode($output);
// }
exit;
