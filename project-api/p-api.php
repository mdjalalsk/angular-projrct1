<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET, POST, PUT, DELETE,OPTIONS");
header("Access-Control-Allow-Headers:access");
header("Access-Control-Allow-credentials: true");
header("content-type: application/json; charset=utf-8");
$conn=new mysqli("localhost","root","","ngcruds");

// your API code goes here

$sql = 'SELECT * FROM students' ;
$result= $conn->query($sql);
// var_dump($result);
if ($result-> num_rows > 0){
while ( $rows=$result ->fetch_assoc()){
    $output[]= $rows;
}  
}
else{
$output=array();
}
echo json_encode($output);
$conn->close();

?>