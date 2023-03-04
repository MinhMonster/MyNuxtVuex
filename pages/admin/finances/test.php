<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/incfiles/database.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/incfiles/functions.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization");

// if($admin && ($getadminuser['admin'] == 9)) {
$post = file_get_contents('php://input');
$post = json_decode($post);
$id = $post->id;
$file_path = $post->path;
$file_name = $post->fileName;

if ($id && $file_path && $file_name) {
    mysql_query("DELETE FROM `MMS_folder_files` WHERE `ID` = '$id' && type = 'file' ");
    unlink($_SERVER['DOCUMENT_ROOT'] . $file_path . $file_name);
    $check_file = file_exists($_SERVER['DOCUMENT_ROOT'] . $file_path . $file_name);
    $check = mysql_result(mysql_query("SELECT COUNT(*) FROM `MMS_folder_files` WHERE `ID` = '" . $id . "' "), 0);
    if ($check == 0 && !$check_file) {
        $code = 200;
        $message = 'Success';
    } else {
        $code = 422;
        if ($check != 0 && $check_file) {
            $message = 'Delete file failed';
        } else if ($check == 0 && $check_file) {
            $message = 'Delete file failed, Deleted DB but file exists';
        } else {
            $message = 'Delete file failed, Deleted file but DB exists';
        }

    }
} else {
    $code = 422;
    if (!$id) {
        $message = 'id invalid';
    } else if (!$file_path) {
        $message = 'path invalid';
    } else {
        $message = 'fileName invalid';
    }

}

$output = array(
    'code' => $code,
    'message' => $message,
);

echo json_encode($output);
// }
exit;
