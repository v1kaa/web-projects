<?php
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the message from the request
$message = $_POST['message'] ?? '';
$sender_id = 'user123'; // Static for now, replace with dynamic user data

if (!empty($message)) {
    $stmt = $conn->prepare("INSERT INTO chat_messages (sender_id, message) VALUES (?, ?)");
    $stmt->bind_param("ss", $sender_id, $message);
    if ($stmt->execute()) {
        echo "Message sent successfully";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>
