<?php
// contact-submit.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'error' => 'Only POST requests are accepted']);
    exit();
}

// Receive React form data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['name']) || !isset($data['email']) || !isset($data['phone']) || 
    !isset($data['purpose']) || !isset($data['message'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit();
}

// Sanitize inputs
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = filter_var($data['phone'], FILTER_SANITIZE_STRING);
$purpose = filter_var($data['purpose'], FILTER_SANITIZE_STRING);
$message = filter_var($data['message'], FILTER_SANITIZE_STRING);

// Database connection (update credentials)
$servername = "localhost";
$username = "your_db_user";
$password = "your_db_password";
$dbname = "portfolio_x";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Insert using prepared statement
    $stmt = $conn->prepare("INSERT INTO contact_responses 
        (name, email, phone, purpose, message, created_at) 
        VALUES (:name, :email, :phone, :purpose, :message, NOW())");
        
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':purpose', $purpose);
    $stmt->bindParam(':message', $message);
    
    $stmt->execute();
    
    // Log successful contact submission
    error_log("Contact form submitted successfully for: $email");
    
    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    // Log error
    error_log("Database error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error occurred']);
}
?>
