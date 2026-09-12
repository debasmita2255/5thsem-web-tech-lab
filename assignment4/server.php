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
        default: echo "Invalid request."; break;
    }
}

// 1. Function to Display "Hello PHP"[cite: 1]
function generateHello() {
    return "Hello PHP";
}

// 2. Function to evaluate student grade based on marks[cite: 1]
function evaluateGrade($marks) {
    if ($marks >= 90) return "Grade: A+";
    if ($marks >= 80) return "Grade: A";
    if ($marks >= 70) return "Grade: B";
    if ($marks >= 60) return "Grade: C";
    if ($marks >= 50) return "Grade: D";
    return "Grade: F (Fail)";
}

// 3. Function to display odd numbers from 1 to N[cite: 1]
function getOddNumbers($n) {
    $odds = [];
    for ($i = 1; $i <= $n; $i++) {
        if ($i % 2 !== 0) {
            $odds[] = $i;
        }
    }
    return "Odd numbers: " . implode(', ', $odds);
}

// 4i. Function to use array to sort N numbers[cite: 1]
function sortNumbers($numberString) {
    $arr = array_map('trim', explode(',', $numberString));
    sort($arr, SORT_NUMERIC);
    return "Sorted Numbers: " . implode(', ', $arr);
}

// 4ii. Function to use array to display N names of animals[cite: 1]
function getAnimalNames($count) {
    $animals = ["Lion", "Elephant", "Tiger", "Giraffe", "Zebra", "Monkey"];
    $selected = array_slice($animals, 0, $count);
    return "Animals: " . implode(', ', $selected);
}

// 5. Function to display server-side feedback from form elements[cite: 1]
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

// 6. Function to use array to display N images of animals[cite: 1]
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
?>