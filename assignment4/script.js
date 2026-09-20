// function to handle server communication
function sendToServer(formData, resultContainerId) {
    fetch('server.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById(resultContainerId).innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}

// 1. Function to Display "Hello PHP"
function q1Hello() {
    let fd = new FormData();
    fd.append('action', 'q1');
    sendToServer(fd, 'res1');
}

// 2. Function to evaluate student grade based on input marks
function q2Grade() {
    let marks = document.getElementById('marks').value;
    if(marks === "") return alert("Please enter marks");
    let fd = new FormData();
    fd.append('action', 'q2');
    fd.append('marks', marks);
    sendToServer(fd, 'res2');
}

// 3. Function to request odd numbers from 1 to N
function q3OddNumbers() {
    let n = document.getElementById('nValue').value;
    if(n === "") return alert("Please enter a value for N");
    let fd = new FormData();
    fd.append('action', 'q3');
    fd.append('n', n);
    sendToServer(fd, 'res3');
}

// 4i. Function to sort N numbers
function q4Sort() {
    let numbers = document.getElementById('sortInput').value;
    if(numbers === "") return alert("Please enter numbers");
    let fd = new FormData();
    fd.append('action', 'q4i');
    fd.append('numbers', numbers);
    sendToServer(fd, 'res4');
}

// 4ii. Function to retrieve N animal names
function q4Animals() {
    let count = document.getElementById('animalCount').value;
    if(count === "") return alert("Please enter an amount");
    let fd = new FormData();
    fd.append('action', 'q4ii');
    fd.append('count', count);
    sendToServer(fd, 'res4');
}

// 5. Function to send form data with multiple input types to the server
function q5FormFeedback() {
    let form = document.getElementById('feedbackForm');
    let fd = new FormData(form); 
    fd.append('action', 'q5'); 
    sendToServer(fd, 'res5');
}

// 6. Function to request N image URLs of animals
function q6Images() {
    let count = document.getElementById('imgCount').value;
    if(count === "") return alert("Please enter an amount");
    let fd = new FormData();
    fd.append('action', 'q6');
    fd.append('count', count);
    sendToServer(fd, 'res6');
}

// 7. Function to request data from the database
function q7Database() {
    let fd = new FormData();
    fd.append('action', 'q7');
    sendToServer(fd, 'res7');
}

function q8AdvancedGrade() {
    let math = document.getElementById('mathMark').value;
    let science = document.getElementById('scienceMark').value;
    let english = document.getElementById('englishMark').value;
    
    if(math === "" || science === "" || english === "") {
        return alert("Please enter marks for all three subjects");
    }
    
    if (math < 0 || math > 100 || science < 0 || science > 100 || english < 0 || english > 100) {
        return alert("Invalid input: All marks must be strictly between 0 and 100.");
    }
    
    let fd = new FormData();
    fd.append('action', 'q8');
    fd.append('math', math);
    fd.append('science', science);
    fd.append('english', english);
    
    sendToServer(fd, 'res8');
}