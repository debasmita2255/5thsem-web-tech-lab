<?php
// Route the incoming request to the correct function based on the 'action' variable
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        case 'q1': echo generateHello(); break;
        case 'q2': echo evaluateGrade($_POST['marks']); break;
        case 'q3': echo getOddNumbers($_POST['n']); break;
        case 'q4i': echo sortNumbers($_POST['numbers']); break;
        case 'q4ii': echo getAnimalNames($_POST['count']); break;
        case 'q5': echo processFormFeedback(); break;
        case 'q6': echo getAnimalImages($_POST['count']); break;
        case 'q7': echo fetchDatabaseUsers(); break;
        case 'q8': echo calculateAdvancedGrade($_POST['math'], $_POST['science'], $_POST['english']); break;
        default: echo "Invalid request."; break;
    }
}

// 1. Function to Display "Hello PHP"
function generateHello() {
    return "Hello PHP";
}

// 2. Function to evaluate student grade based on marks
function evaluateGrade($marks) {
    if ($marks >= 90) return "Grade: A+";
    if ($marks >= 80) return "Grade: A";
    if ($marks >= 70) return "Grade: B";
    if ($marks >= 60) return "Grade: C";
    if ($marks >= 50) return "Grade: D";
    return "Grade: F (Fail)";
}

// 3. Function to display odd numbers from 1 to N
function getOddNumbers($n) {
    $odds = [];
    for ($i = 1; $i <= $n; $i++) {
        if ($i % 2 !== 0) {
            $odds[] = $i;
        }
    }
    return "Odd numbers: " . implode(', ', $odds);
}

// 4i. Function to use array to sort N numbers
function sortNumbers($numberString) {
    $arr = array_map('trim', explode(',', $numberString));
    sort($arr, SORT_NUMERIC);
    return "Sorted Numbers: " . implode(', ', $arr);
}

// 4ii. Function to use array to display N names of animals
function getAnimalNames($count) {
    $animals = ["Lion", "Elephant", "Tiger", "Giraffe", "Zebra", "Monkey"];
    $selected = array_slice($animals, 0, $count);
    return "Animals: " . implode(', ', $selected);
}

// 5. Function to display server-side feedback from form elements
function processFormFeedback() {
    $text = htmlspecialchars($_POST['userName'] ?? '');
    $pass = htmlspecialchars($_POST['userPass'] ?? '');
    $radio = htmlspecialchars($_POST['userPlan'] ?? '');
    $select = htmlspecialchars($_POST['userCity'] ?? '');
    $hidden = htmlspecialchars($_POST['hiddenId'] ?? '');
    
    $fileName = "No file uploaded";
    if(isset($_FILES['userFile']) && $_FILES['userFile']['error'] == UPLOAD_ERR_OK) {
        $fileName = htmlspecialchars($_FILES['userFile']['name']);
    }

    return "<strong>Server Feedback Received:</strong><br>" .
           "Textbox: $text <br>" .
           "Password: (hidden for security) <br>" .
           "Option (Radio): $radio <br>" .
           "List Box (Select): $select <br>" .
           "File Uploaded: $fileName <br>" .
           "Hidden Element: $hidden";
}

// 6. Function to use array to display N images of animals
function getAnimalImages($count) {
    // Array storing placeholder image URLs 
    $images = [
        "https://placebear.com/100/100",
        "https://placebear.com/101/100",
        "https://placebear.com/102/100",
        "https://placebear.com/103/100",
        "https://placebear.com/104/100"
    ];
    
    $selectedImages = array_slice($images, 0, $count);
    $htmlOutput = "";
    
    foreach($selectedImages as $imgUrl) {
        $htmlOutput .= "<img src='$imgUrl' alt='Animal' class='animal-img'>";
    }
    
    return $htmlOutput ?: "No images requested.";
}

// 7. Function to request data from the database
function fetchDatabaseUsers() {
    // Database credentials (update these if your local MySQL setup requires a password)
    $host = 'localhost';
    $db   = 'assignment4';
    $user = 'root'; 
    $pass = 'XiaomiPad8'; 
    
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    try {
        // Attempt to connect to the database
        $pdo = new PDO($dsn, $user, $pass, $options);
        
        // Execute a simple query
        $stmt = $pdo->query('SELECT name, email FROM users');
        
        // Format the returned data as HTML
        $output = "<strong>Database Users:</strong><ul>";
        while ($row = $stmt->fetch()) {
            $output .= "<li>" . htmlspecialchars($row['name']) . " - " . htmlspecialchars($row['email']) . "</li>";
        }
        $output .= "</ul>";
        
        return $output;
        
    } catch (PDOException $e) {
        return "Database connection failed: " . $e->getMessage();
    }
}

function calculateAdvancedGrade($math, $science, $english) {
    // 1. Use a PHP array to store subject-wise marks
    $subjectMarks = [
        "Math" => (float)$math,
        "Science" => (float)$science,
        "English" => (float)$english
    ];

    foreach ($subjectMarks as $mark) {
        if ($mark < 0 || $mark > 100) {
            return "<span style='color: red;'><strong>Error:</strong> Marks must be between 0 and 100.</span>";
        }
    }
    
    // 2. Calculate the total and average marks
    $totalMarks = array_sum($subjectMarks);
    $subjectCount = count($subjectMarks);
    $averageMarks = $totalMarks / $subjectCount;
    
    // 3. Determine the student's grade based on the average
    if ($averageMarks >= 90) $grade = "A+";
    elseif ($averageMarks >= 80) $grade = "A";
    elseif ($averageMarks >= 70) $grade = "B";
    elseif ($averageMarks >= 60) $grade = "C";
    elseif ($averageMarks >= 50) $grade = "D";
    else $grade = "F (Fail)";
    
    // 4. Format and display the information
    $output = "<strong>Subject Marks:</strong><ul>";
    foreach ($subjectMarks as $subject => $mark) {
        $output .= "<li>$subject: $mark</li>";
    }
    $output .= "</ul>";
    
    $output .= "<strong>Total Marks:</strong> $totalMarks <br>";
    // Use number_format to keep the average to 2 decimal places
    $output .= "<strong>Average:</strong> " . number_format($averageMarks, 2) . " <br>"; 
    $output .= "<strong>Final Grade:</strong> <span style='color: #0056b3;'>$grade</span>";
    
    return $output;
}
?>