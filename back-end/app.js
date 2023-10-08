import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { Employee, User, sequelize } from "./Model/model.js";
import { secretKey } from "./utils/Authenticate.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (password === user.password) {
      const accessToken = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      return res.json({ user, accessToken });
    } else {
      return res
        .status(401)
        .json({ error: "Authentication failed. Incorrect password." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//  api for sign up
app.post("/api/signup", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ error: "Username, password, and role are required." });
  }

  try {
    const newUser = await User.create({ username, password, role });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for adding new employee
app.post("/api/addemployees", async (req, res) => {
  const { firstName, lastName, address, designation } = req.body;
  if (!firstName || !lastName || !address || !designation) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      address,
      designation,
    });
    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for employee list
app.get("/api/employeesList", async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 10;
    const users = await Employee.findAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for deleting an employee from list
app.delete("/api/deleteEmployees/:id", async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// api for updating details of an employee
app.put("/api/updateEmployee/:id", async (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployeeData = req.body;
  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.update(updatedEmployeeData);
    return res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
