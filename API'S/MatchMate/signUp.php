<?php
include 'config.php';

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$username = $data['user_name'];
$email = $data['user_email'];
$password = $data['user_password'];

// Validate user input
if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(array('msg' => 'All fields are required', 'status' => 'Error'));
    exit();
}

// Check if the email is valid
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array('msg' => 'Please enter a valid email', 'status' => 'Error'));
    exit();
}

// Check for duplicate email
$emailCheckQuery = "SELECT * FROM users WHERE user_email = '$email'";
$result = mysqli_query($conn, $emailCheckQuery);
if (mysqli_num_rows($result) > 0) {
    echo json_encode(array('msg' => 'Email is already in use', 'status' => 'Error'));
    exit();
}

// Hash the password for security
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert user data into the database
$query = "INSERT INTO users(user_name, user_email, user_password) VALUES ('$username', '$email', '$hashedPassword')";
if (!mysqli_query($conn, $query)) {
    echo json_encode(array('msg' => 'Error inserting user data', 'status' => 'Error'));
    exit();
}

// Retrieve the last inserted user ID
$generatedUserId = mysqli_insert_id($conn);

// Generate a random token for the user
$token = bin2hex(random_bytes(16));

// Save the token in the database (you'll need a `user_token` column in your `users` table)
$tokenQuery = "UPDATE users SET token = '$token' WHERE user_id = $generatedUserId";
mysqli_query($conn, $tokenQuery);

// Respond with success message and token
echo json_encode(array(
    'msg' => 'User Created Successfully',
    'status' => 'Success',
    'token' => $token // Include the generated token in the response
));
?>
