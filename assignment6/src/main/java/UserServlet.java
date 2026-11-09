import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Maps this servlet to the URL requested by the JSP form
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {

    // Database credentials based on your local webtechlab environment
    private static final String DB_URL = "jdbc:mysql://localhost:3306/webtechlab";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "XiaomiPad8";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Retrieve data sent from the JSP form
        String name = request.getParameter("studentName");
        String email = request.getParameter("studentEmail");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        // 2. Database Connection and Insertion
        try {
            // Load the MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish the connection
            try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {

                // Prepare the SQL statement (prevents SQL injection)
                String sql = "INSERT INTO students (name, email) VALUES (?, ?)";
                try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                    pstmt.setString(1, name);
                    pstmt.setString(2, email);

                    // Execute the update
                    int rowsAffected = pstmt.executeUpdate();

                    if (rowsAffected > 0) {
                        out.println("<h3 style='color: green;'>Success: " + name + " added to the database!</h3>");
                    } else {
                        out.println("<h3 style='color: red;'>Error: Could not insert record.</h3>");
                    }
                    out.println("<a href='index.jsp'>Go Back</a>");
                }
            }
        } catch (ClassNotFoundException e) {
            out.println("<h3>Error: MySQL JDBC Driver not found. Ensure the .jar file is in your WEB-INF/lib folder.</h3>");
            e.printStackTrace();
        } catch (SQLException e) {
            out.println("<h3>Database Connection Error: " + e.getMessage() + "</h3>");
            e.printStackTrace();
        }
    }
}