const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Import the database connection
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [`${process.env.ORIGIN}`],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
// Handle POST requests for saving reservations
app.post("/submit-reservation", (req, res) => {
  const reservationData = req.body;
  const adminId = 1; // Example admin ID (replace with actual authentication)

  pool.query(
    "INSERT INTO reservations (full_name, email, phone_number, destination, date, admin_id,status) VALUES (?, ?, ?, ?, ?, ?,?)",
    [
      reservationData.name,
      reservationData.email,
      reservationData.phone,
      reservationData.destination,
      reservationData.date,
      adminId,
      "En attente",
    ],
    (queryError, results) => {
      if (queryError) {
        console.error("Database query error:", queryError);
        return res.status(500).json({ error: "Database query error" });
      }

      console.log("Reservation saved successfully.");
      res.status(200).json({ message: "Reservation saved successfully." });
    }
  );
});

// Handle GET requests to fetch all reservations (protected route)
app.get("/admin/reservations", authenticateAdmin, (req, res) => {
  pool.query(
    "SELECT * FROM `reservations` WHERE `admin_id` = ? AND `status` != ?",
    ["1", "Done"], // Use the admin ID from authentication
    (queryError, results) => {
      if (queryError) {
        console.error("Database query error:", queryError);
        return res.status(500).json({ error: "Database query error" });
      }
      // console.log(req.adminId)
      res.status(200).json({ reservations: results });
    }
  );
});
app.get("/admin/profile/UserPassword", authenticateAdmin, (req, res) => {
  pool.query(
    "SELECT * FROM `admins`",
    // Use the admin ID from authentication
    (queryError, results) => {
      if (queryError) {
        console.error("Database query error:", queryError);
        return res.status(500).json({ error: "Database query error" });
      }
      // console.log(req.adminId)
      if (results.length === 0) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const { username, password } = results[0];
      res.status(200).json({ username, password });
    }
  );
});
app.put("/admin/update-profile", authenticateAdmin, async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the provided password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Use an appropriate saltRounds value

    // Update the profile information in the database with the hashed password
    pool.query(
      "UPDATE admins SET username = ?, password = ? WHERE id = ?",
      [username, hashedPassword, "1"],
      (queryError, results) => {
        if (queryError) {
          console.error("Database query error:", queryError);
          return res.status(500).json({ error: "Database query error" });
        }

        console.log("Profile updated successfully.");
        res.status(200).json({ message: "Profile updated successfully." });
      }
    );
  } catch (bcryptError) {
    console.error("Bcrypt error:", bcryptError);
    return res.status(500).json({ error: "Bcrypt error" });
  }
});

app.put("/admin/reservations/:id", authenticateAdmin, (req, res) => {
  const { id } = req.params;

  // Perform the update in the database, e.g., update the status to "Done"
  pool.query(
    "UPDATE reservations SET status = ? WHERE id = ?",
    ["Done", id],
    (queryError, results) => {
      if (queryError) {
        console.error("Database query error:", queryError);
        return res.status(500).json({ error: "Database query error" });
      }

      console.log("Reservation marked as Done.");
      res.status(200).json({ message: "Reservation marked as Done." });
    }
  );
});
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Query the admin table to find the admin by username
  pool.query(
    "SELECT * FROM admins WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Database query error" });
      }

      if (results.length === 0) {
        // No admin with the provided username found
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }

      const admin = results[0];

      try {
        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, admin.password);
        console.log(passwordMatch);
        console.log(password);
        console.log(admin.password);
        if (passwordMatch) {
          // Passwords did not match
          return res
            .status(401)
            .json({ message: "Invalid username or password." });
        }

        // Passwords matched, generate a JWT token
        const name = admin.name;
        const token = jwt.sign({ name }, `${process.env.JWT_SECRET}`, {
          expiresIn: "1d",
        });

        // Set the token in a cookie
        res.cookie("token", token);

        // Send the token in the response
        res.send({ token });
      } catch (bcryptErr) {
        console.error("Bcrypt error:", bcryptErr);
        return res.status(500).json({ error: "Bcrypt error" });
      }
    }
  );
});

function authenticateAdmin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, "password-test", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    } else {
      req.name = decoded.name;
      next();
    }
    // Attach the admin's ID to the request object for later us
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
