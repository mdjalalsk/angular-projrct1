<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET, POST, PUT, DELETE,OPTIONS");
header("Access-Control-Allow-Headers:access");
header("Access-Control-Allow-credentials: true");
header("content-type: application/json; charset=utf-8");
$conn=new mysqli("localhost","root","","hotelreservation");
$sql= "SELECT rooms.id as room_id, rooms.capacity, rooms.images, amenities.description as amenity_desc,rooms.name as room_name, amenities.name as amenity_name, roomtypes.name as roomtype_name, roomtypes.rate FROM rooms INNER JOIN amenities ON rooms.amenities_id = amenities.id INNER JOIN roomtypes ON rooms.roomtype_id = roomtypes.id";
$result= $conn->query($sql);
$result=$conn->query($sql);
if ($result-> num_rows > 0) {
    while($row=$result->fetch_assoc()){
        $output[]=$row;
    }
}else{
    $output=Array();

}

  echo json_encode($output);
  $conn->close();  

