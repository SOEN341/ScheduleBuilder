<?php
$old=$_POST['username'];//username
$json=$_POST['json'];//username
if (!(isset($old))) {
   $old='';
}
if (!(isset($json))) {
   $json='{}';
}
// $old='Jason';
// $json='{"List":[{"name":"oop", "number":"248"},{"name":"oop2", "number":"249"}]}';

$contents = utf8_encode($json); 
//var_dump(json_decode($contents, true)); //testing purposes

require_once('../mysqli_connect.php'); // defining and connecting to the database as root

//CoursesDones 	CoursesRem 	CLoad 	dayOff 	pTime 
$sql = "UPDATE `users` SET `CoursesDones`='$contents' WHERE username='$old'";

$response= mysqli_query($dbc,$sql);

echo json_encode(array("success"=>"true","username"=>"$old","List"=>"$contents"));  

mysqli_close($dbc);