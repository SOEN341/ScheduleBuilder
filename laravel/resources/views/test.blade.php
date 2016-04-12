<?php
require_once('../mysqli_connect.php');
require_once('../preferences');
require_once('../Course.php');
//$username=$_POST['username'];
$username='Jason123';

$query ="SELECT * FROM users where username='$username' ";
// Check if these credentials are taken

$response= mysqli_query($dbc,$query);

$array= mysqli_fetch_array($response);

$coursesDone=Array();
$coursesRem=Array();
$coursesLectures = Array();
$coursesTutorials = Array();
$coursesLabs = Array();


//$priorityPrereq = array("COMP 248", "COMP 249", "COMP 352", "COMP 232", "MATH 203", "MATH 204", "COMP 346", "ENCS 282", "SOEN 341", "ENGR 213", "ENGR 233", "MATH 205", "CHEM 205", "CHEM 206", "SOEN 228", "MATH 203", "MATH 204","CHEM 204", "PHYS 204", "PHYS 205", "PHYS 206");
$priorityPrereq = array("COMP 248", "COMP 249", "COMP 352", "COMP 232", "MATH 203", "MATH 204", "COMP 346", "ENCS 282", "SOEN 341", "ENGR 213", "ENGR 233","SOEN 228");

$decodedDone=json_decode($array['CoursesDones'],true);

foreach ($decodedDone as $key => $key_value) {
		foreach ($key_value as $x => $x_value) {
		array_push($coursesDone,$x_value['number']);

		    }
}

$decodedrem=json_decode($array['CoursesRem'],true);

foreach ($decodedrem as $key => $key_value) {
		foreach ($key_value as $x => $x_value) {
		array_push($coursesRem,$x_value['number']);
		   }
}

// var_dump($priorityPrereq);

// var_dump($coursesDone);

// var_dump($coursesRem);

$schedule= new Schedule($coursesRem,$coursesDone,4,'Monday','Morning',$priorityPrereq);


$courses=  $schedule->courses;


foreach ($courses as $key => $value){
	//$temp = $value['number'];
	//$queryForCourseLecture = mysqli_fetch_array(mysqli_query($dbc,"SELECT * FROM sections WHERE courseCode = '$value' AND type = 'Lecture'"));
	//$queryForCourseTutorial = mysqli_fetch_array(mysqli_query($dbc,"SELECT * FROM sections WHERE courseCode = '$value' AND type = 'Tutorial'"));
	//$queryForCourseLab = mysqli_fetch_array(mysqli_query($dbc,"SELECT * FROM sections WHERE courseCode = '$value' AND type = 'Lab'"));

	$queryForCourseLecture =mysqli_fetch_assoc(mysqli_query($dbc, "SELECT * FROM sections WHERE courseCode = '$value' AND type = 'Lecture'"));
	$queryForCourseTutorial = mysqli_fetch_assoc(mysqli_query($dbc, "SELECT * FROM sections WHERE courseCode = '$value' AND type = 'Tutorial'"));
	$queryForCourseLab = mysqli_fetch_assoc(mysqli_query($dbc, "SELECT * FROM sections WHERE courseCode = '$value' AND type = 'Lab'"));
	$jsonLectures = json_encode($queryForCourseLecture);
	$jsonTutorials = json_encode($queryForCourseTutorial);
	$jsonLabs = json_encode($queryForCourseLab);
	//echo '"';
	//$query ="SELECT * FROM sections where courseCode='$value' ";
	array_push($coursesLectures, $jsonLectures);
	array_push($coursesTutorials,$jsonTutorials);
	array_push($coursesLabs, $jsonLabs);

	//TODO: this returns all the sections
	//TODO: create an object $course containing all the sections(lecture, lab, tutorial) for all the courses in $courses
	$course = new Course($value, $coursesLectures, $coursesTutorials, $coursesLabs);
	//var_dump($course->getName());
	var_dump($course);
}

/*
//print_r(array_values($coursesInformation));
//var_dump($coursesInformation['0']);
echo "<br/>";
var_dump($coursesLectures['0']);
echo "<br/>";
var_dump($coursesTutorials['0']);
echo "<br/>";
var_dump($coursesLabs['0']);
echo "<br/>";
var_dump($coursesLectures['2']);
echo "<br/>";
var_dump($coursesTutorials['2']);
echo "<br/>";
var_dump($coursesLabs['2']);
echo "<br/>";
var_dump($coursesLectures['3']);
echo "<br/>";
var_dump($coursesTutorials['3']);
echo "<br/>";
var_dump($coursesLabs['3']);
echo "<br/>";
var_dump($coursesLectures['4']);
echo "<br/>";
var_dump($coursesTutorials['4']);
echo "<br/>";
var_dump($coursesLabs['4']);
echo "<br/>";
var_dump($coursesLectures['5']);
echo "<br/>";
var_dump($coursesTutorials['5']);
echo "<br/>";
var_dump($coursesLabs['5']);
echo "<br/>";
var_dump($coursesLectures['6']);
echo "<br/>";
var_dump($coursesTutorials['6']);
echo "<br/>";
var_dump($coursesLabs['6']);
*/
/*
var_dump($coursesLectures);
echo "<br/>";
var_dump($coursesTutorials);
echo "<br/>";
var_dump($coursesLabs);
*/

//echo $coursesInformation['0'];
//print_r(array_values($courses));

//loop through $arrayofcourses
//schedule.add($courses)




//var_dump($schedule);

// $query ="SELECT * FROM courses where username='$username' ";
// // Check if these credentials are taken

// $response= mysqli_query($dbc,$query);

// $array= mysqli_fetch_array($response);






// while($current = mysqli_fetch_assoc($response)) {
//     if(++$counter == $numResults) {
//     	echo json_encode($current);
//     }  else {
// 		echo json_encode($current) . ',' ;
// 	}
// }



mysqli_close($dbc);



?>