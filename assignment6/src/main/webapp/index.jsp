<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>JSP to Servlet Database Communication</title>
    <style>
        body {
            font-family: sans-serif;
            padding: 20px;
            background-color: #ffffff; /* Forces a white background */
            color: #333333;            /* Forces dark text */
        }
        .form-container { border: 1px solid #ccc; padding: 20px; width: 300px; border-radius: 5px; }
        input { margin-bottom: 10px; width: 100%; padding: 8px; box-sizing: border-box; }
        button { padding: 10px; width: 100%; background-color: #0056b3; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>Add Student Record</h2>
        <form action="UserServlet" method="POST">
            <label>Name:</label>
            <input type="text" name="studentName" required>

            <label>Email:</label>
            <input type="email" name="studentEmail" required>

            <button type="submit">Submit to Servlet</button>
        </form>
    </div>
</body>
</html>