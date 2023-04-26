<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

 
if ($_SERVER['REQUEST_METHOD'] !== 'POST') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request!.Only POST method is allowed',
    ]);
    exit;
endif;
 
require 'db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();
 
$data = json_decode(file_get_contents("php://input"));


//print_r($data);

$hobbies = $data->hobbyField;
//print_r($hobbies);
$hobbies_list = '';
foreach ($hobbies as $hobby) {
    $hobbies_list .= $hobby.',';
 } 

if (!isset($data->first_name) || !isset($data->last_name) || !isset($data->email)) :
 
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  First Name, Last Name and Email',
    ]);
    exit;
 
elseif (empty(trim($data->first_name)) || empty(trim($data->last_name)) || empty(trim($data->email))) :
 
    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;
 
endif;
 
try {
 
    $first_name = htmlspecialchars(trim($data->first_name));
    $last_name = htmlspecialchars(trim($data->last_name));
    $email = htmlspecialchars(trim($data->email));
    $password = htmlspecialchars(trim($data->password));
    $gender = $data->gender;
    $hobbies = $hobbies_list;
    $country = $data->country;
 
    $query = "INSERT INTO `students`(
    first_name,
    last_name,
    email,
    password,
    gender,
    hobbies,
    country
    ) 
    VALUES(
    :first_name,
    :last_name,
    :email,
    :password,
    :gender,
    :hobbies,
    :country
    )";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':first_name', $first_name, PDO::PARAM_STR);
    $stmt->bindValue(':last_name', $last_name, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);
    $stmt->bindValue(':gender', $gender, PDO::PARAM_STR);
    $stmt->bindValue(':hobbies', $hobbies, PDO::PARAM_STR);
    $stmt->bindValue(':country', $country, PDO::PARAM_STR);
    

    if ($stmt->execute()) {
 
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully.'
        ]);
        exit;
    }
    
    echo json_encode([
        'success' => 0,
        'message' => 'There is some problem in data inserting'
    ]);
    exit;
 
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
