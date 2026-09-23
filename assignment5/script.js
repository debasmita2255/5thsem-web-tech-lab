// Global state for Q8 sorting
let currentSortCol = 'id';
let currentSortOrder = 'ASC';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchTable();
});

// Q3, Q5, Q8: Fetch Table Data with Search & Sort Context
function fetchTable() {
    const searchVal = document.getElementById('searchInput').value;
    const formData = new FormData();
    formData.append('action', 'fetch');
    formData.append('search', searchVal);
    formData.append('sortCol', currentSortCol);
    formData.append('sortOrder', currentSortOrder);

    fetch('backend.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(html => {
            document.getElementById('tableContainer').innerHTML = html;
        });
}

// Q8: Handle click on table headers for sorting
function sortTable(column) {
    if (currentSortCol === column) {
        currentSortOrder = (currentSortOrder === 'ASC') ? 'DESC' : 'ASC';
    } else {
        currentSortCol = column;
        currentSortOrder = 'ASC';
    }
    fetchTable();
}

// Q4: Submit new record
function submitForm() {
    const form = document.getElementById('addForm');
    const formData = new FormData(form);

    fetch('backend.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(response => {
            const msgDiv = document.getElementById('message');
            if (response.includes("Success")) {
                msgDiv.style.color = "green";
                form.reset();
                fetchTable(); // Refresh table live
                fetchAnalysis(); // Refresh analysis if it's visible
            } else {
                msgDiv.style.color = "red";
            }
            msgDiv.textContent = response;
            setTimeout(() => { msgDiv.textContent = ''; }, 3000);
        });
}

// Q7: Delete a record
function deleteRecord(id) {
    if (!confirm("Are you sure you want to delete this record?")) return;
    
    const formData = new FormData();
    formData.append('action', 'delete');
    formData.append('id', id);

    fetch('backend.php', { method: 'POST', body: formData })
        .then(() => {
            fetchTable();
            fetchAnalysis();
        });
}

// Q7: Edit a record
function editRecord(id, oldPrice) {
    const newPrice = prompt("Enter new price:", oldPrice);
    if (newPrice === null || newPrice.trim() === "") return;

    const formData = new FormData();
    formData.append('action', 'update');
    formData.append('id', id);
    formData.append('price', newPrice);

    fetch('backend.php', { method: 'POST', body: formData })
        .then(() => {
            fetchTable();
            fetchAnalysis();
        });
}

// Q6: Fetch Array Analysis
function fetchAnalysis() {
    const formData = new FormData();
    formData.append('action', 'analyze');

    fetch('backend.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(html => {
            document.getElementById('analysisContainer').innerHTML = html;
        });
}