<?php

include 'config.php';

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$email = $data['user_email'];
$password = $data["user_password"];

// Check for empty fields
if (empty($email) || empty($password)) {
    echo json_encode(array('msg' => 'Email and Password are required', 'status' => 'Error'));
    exit();
}

// Query to check if the user exists with the given email
$response = mysqli_query($conn, "SELECT user_id, user_password, user_name, token FROM users WHERE user_email = '$email'") or die("Login Error!");

// Check if a user was found
if (mysqli_num_rows($response) > 0) {
    $row = mysqli_fetch_assoc($response);
    
    // Verify the password
    if (password_verify($password, $row['user_password'])) {
        // Set the user ID in the session
        $_SESSION['user_id'] = $row['user_id']; 

        $username = $row['user_name'];
        $token = $row['token']; // Get the user's token from the database

        // Respond with success message and the token
        echo json_encode(array(
            'msg' => 'User found successfully',
            'status' => 'Success',
            'username' => $username,
            'token' => $token // Include the generated token in the response
        ));
    } else {
        echo json_encode(array('msg' => 'Incorrect Email or Password', 'status' => 'IncorrectCredentials'));
    }
} else {
    echo json_encode(array('msg' => 'User not found', 'status' => 'UserNotFound'));
}

mysqli_close($conn);
?>
