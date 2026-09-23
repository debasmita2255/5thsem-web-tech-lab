CREATE DATABASE IF NOT EXISTS webtechlab;
USE webtechlab;

-- Replace 'roll_12345' with your actual roll number
CREATE TABLE 2024CSB008 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL
);

-- Inserting 5 sample records directly as requested
INSERT INTO 2024CSB008 (title, category, price, status) VALUES
('Introduction to Algorithms', 'Textbook', 85.00, 'Available'),
('Clean Code', 'Reference', 45.00, 'Available'),
('The Pragmatic Programmer', 'Reference', 55.00, 'Checked Out'),
('Design Patterns', 'Textbook', 60.00, 'Available'),
('JavaScript: The Good Parts', 'Reference', 30.00, 'Available');

select * from 2024CSB008;