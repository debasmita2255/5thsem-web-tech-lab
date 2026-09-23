<?php
// Database Configuration
$host = 'localhost';
$db   = 'webtechlab';
$user = 'root'; // Update with your DB username
$pass = 'XiaomiPad8';     // Update with your DB password
$tableName = '2024CSB008'; // Update with your table name

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die("Database Connection Failed: " . $e->getMessage());
}

$action = $_POST['action'] ?? '';

switch ($action) {
    // Q3, Q5, Q8: Fetch Records (Live Search & Sortable Headers)
    case 'fetch':
        $search = $_POST['search'] ?? '';
        $sortCol = $_POST['sortCol'] ?? 'id';
        $sortOrder = strtoupper($_POST['sortOrder'] ?? 'ASC');

        // Allow-list for safe sorting (prevents SQL injection)
        $allowedCols = ['id', 'title', 'category', 'price', 'status'];
        if (!in_array($sortCol, $allowedCols)) $sortCol = 'id';
        if ($sortOrder !== 'ASC' && $sortOrder !== 'DESC') $sortOrder = 'ASC';

        $sql = "SELECT * FROM $tableName WHERE title LIKE :search ORDER BY $sortCol $sortOrder";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['search' => "%$search%"]);
        $records = $stmt->fetchAll();

        // Generate HTML Table with Clickable Headers (Q8) and Edit/Delete Buttons (Q7)
        echo "<table>";
        echo "<tr>
                <th onclick=\"sortTable('id')\">ID <span class='sort-icon'>↕</span></th>
                <th onclick=\"sortTable('title')\">Title <span class='sort-icon'>↕</span></th>
                <th onclick=\"sortTable('category')\">Category <span class='sort-icon'>↕</span></th>
                <th onclick=\"sortTable('price')\">Price <span class='sort-icon'>↕</span></th>
                <th onclick=\"sortTable('status')\">Status <span class='sort-icon'>↕</span></th>
                <th>Actions</th>
              </tr>";
        
        if (count($records) > 0) {
            foreach ($records as $row) {
                echo "<tr>
                        <td>{$row['id']}</td>
                        <td>" . htmlspecialchars($row['title']) . "</td>
                        <td>" . htmlspecialchars($row['category']) . "</td>
                        <td>$" . number_format($row['price'], 2) . "</td>
                        <td>" . htmlspecialchars($row['status']) . "</td>
                        <td>
                            <button class='btn-small btn-warning' onclick=\"editRecord({$row['id']}, {$row['price']})\">Edit Price</button>
                            <button class='btn-small btn-danger' onclick=\"deleteRecord({$row['id']})\">Delete</button>
                        </td>
                      </tr>";
            }
        } else {
            echo "<tr><td colspan='6'>No records found.</td></tr>";
        }
        echo "</table>";
        break;

    // Q4: Insert New Record
    case 'insert':
        try {
            $title = $_POST['title'];
            $price = $_POST['price'];
            $category = $_POST['category'];
            $status = $_POST['status'];

            $sql = "INSERT INTO $tableName (title, category, price, status) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$title, $category, $price, $status]);
            echo "Success: Record added.";
        } catch (Exception $e) {
            echo "Error: Could not add record.";
        }
        break;

    // Q7 (Bonus): Delete Record
    case 'delete':
        $id = $_POST['id'];
        $stmt = $pdo->prepare("DELETE FROM $tableName WHERE id = ?");
        $stmt->execute([$id]);
        break;

    // Q7 (Bonus): Update Record
    case 'update':
        $id = $_POST['id'];
        $price = $_POST['price'];
        $stmt = $pdo->prepare("UPDATE $tableName SET price = ? WHERE id = ?");
        $stmt->execute([$price, $id]);
        break;

    // Q6: Array Calculations (Total, Average, Category Logic)
    case 'analyze':
        $stmt = $pdo->query("SELECT title, price FROM $tableName");
        $records = $stmt->fetchAll();

        if (count($records) === 0) {
            echo "<p>No data to analyze.</p>";
            break;
        }

        // Store prices in a PHP array
        $prices = array_column($records, 'price');
        
        // Array calculations
        $total = array_sum($prices);
        $count = count($prices);
        $average = $total / $count;

        $html = "<table>";
        $html .= "<tr><th>Title</th><th>Price</th><th>Pricing Category</th></tr>";
        
        // Loop through records to assign a category based on conditions
        foreach ($records as $row) {
            $price = $row['price'];
            if ($price > 60) {
                $grade = "<strong style='color:green;'>Premium</strong>";
            } elseif ($price > 40) {
                $grade = "<strong style='color:orange;'>Standard</strong>";
            } else {
                $grade = "<strong style='color:gray;'>Budget</strong>";
            }

            $html .= "<tr>
                        <td>" . htmlspecialchars($row['title']) . "</td>
                        <td>$" . number_format($price, 2) . "</td>
                        <td>$grade</td>
                      </tr>";
        }
        $html .= "</table>";
        
        $html .= "<div style='margin-top: 15px; padding: 10px; background: #e9ecef; border-radius: 4px;'>";
        $html .= "<strong>Total Column Value:</strong> $" . number_format($total, 2) . " | ";
        $html .= "<strong>Average Column Value:</strong> $" . number_format($average, 2);
        $html .= "</div>";

        echo $html;
        break;
}
?>