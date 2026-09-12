// A reusable function to handle server communication
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

// 1. Function to Display "Hello PHP"[cite: 1]
function q1Hello() {
    let fd = new FormData();
    fd.append('action', 'q1');
    sendToServer(fd, 'res1');
}

// 2. Function to evaluate student grade based on input marks[cite: 1]
function q2Grade() {
    let marks = document.getElementById('marks').value;
    if(marks === "") return alert("Please enter marks");
    let fd = new FormData();
    fd.append('action', 'q2');
    fd.append('marks', marks);
    sendToServer(fd, 'res2');
}

// 3. Function to request odd numbers from 1 to N[cite: 1]
function q3OddNumbers() {
    let n = document.getElementById('nValue').value;
    if(n === "") return alert("Please enter a value for N");
    let fd = new FormData();
    fd.append('action', 'q3');
    fd.append('n', n);
    sendToServer(fd, 'res3');
}

// 4i. Function to sort N numbers[cite: 1]
function q4Sort() {
    let numbers = document.getElementById('sortInput').value;
    if(numbers === "") return alert("Please enter numbers");
    let fd = new FormData();
    fd.append('action', 'q4i');
    fd.append('numbers', numbers);
    sendToServer(fd, 'res4');
}

// 4ii. Function to retrieve N animal names[cite: 1]
function q4Animals() {
    let count = document.getElementById('animalCount').value;
    if(count === "") return alert("Please enter an amount");
    let fd = new FormData();
    fd.append('action', 'q4ii');
    fd.append('count', count);
    sendToServer(fd, 'res4');
}

// 5. Function to send form data with multiple input types to the server[cite: 1]
function q5FormFeedback() {
    let form = document.getElementById('feedbackForm');
    let fd = new FormData(form); 
    fd.append('action', 'q5'); 
    sendToServer(fd, 'res5');
}

// 6. Function to request N image URLs of animals[cite: 1]
function q6Images() {
    let count = document.getElementById('imgCount').value;
    if(count === "") return alert("Please enter an amount");
    let fd = new FormData();
    fd.append('action', 'q6');
    fd.append('count', count);
    sendToServer(fd, 'res6');
}