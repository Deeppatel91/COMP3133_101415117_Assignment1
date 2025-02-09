const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const Employee = require('../../models/employee.model');
require('dotenv').config();

const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      if (!username || !password) {
        throw new Error("Username and password are required");
      }

      console.log(`Attempting login for username: ${username}`);

      const user = await User.findOne({ username });
      if (!user) {
        console.error("User not found!");
        throw new Error("Invalid credentials");
      }

      console.log(`User's stored password: ${user.password}`);
      console.log(`Entered password: ${password}`);

      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isValidPassword);

      if (!isValidPassword) {
        console.error("Password does not match!");
        throw new Error("Invalid credentials");
      }

      console.log("Login successful! Generating token...");

      return {
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" }),
        user,
      };
    },

    getAllEmployees: async (_, __, context) => {
      if (!context.user) {
        console.error("Unauthorized: You must be logged in.");
        throw new Error("Unauthorized: You must be logged in.");
      }
      console.log("Fetching all employees...");
      return await Employee.find();
    },

    getEmployeeById: async (_, { id }, context) => {
      if (!context.user) {
        console.error("Unauthorized: You must be logged in.");
        throw new Error("Unauthorized: You must be logged in.");
      }
      if (!id) {
        throw new Error("Employee ID is required");
      }
      console.log(`Fetching employee with ID: ${id}`);
      const employee = await Employee.findById(id);
      if (!employee) {
        console.error(`Employee with ID ${id} not found`);
        throw new Error(`Employee with ID ${id} not found`);
      }
      console.log(`Employee found: ${employee}`);
      return employee;
    },

    searchEmployeeByDesignation: async (_, { designation }, context) => {
      if (!context.user) {
        console.error("Unauthorized: You must be logged in.");
        throw new Error("Unauthorized: You must be logged in.");
      }
      if (!designation) {
        throw new Error("Designation is required");
      }
      console.log(`Searching employees with designation: ${designation}`);
      return await Employee.find({ designation });
    },

    searchEmployeeByDepartment: async (_, { department }, context) => {
      if (!context.user) {
        console.error("Unauthorized: You must be logged in.");
        throw new Error("Unauthorized: You must be logged in.");
      }
      if (!department) {
        throw new Error("Department is required");
      }
      console.log(`Searching employees in department: ${department}`);
      const employees = await Employee.find({ department });
      if (employees.length === 0) {
        console.error(`No employees found in department: ${department}`);
        throw new Error(`No employees found in department: ${department}`);
      }
      console.log(`Employees found in department ${department}:`, employees);
      return employees;
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      if (!username || !email || !password) {
        throw new Error("Username, email, and password are required");
      }

      console.log(`Attempting signup for email: ${email}`);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.error("User already exists");
        throw new Error("User already exists");
      }

      console.log(`Plain password before hashing: ${password}`);

      const user = new User({ username, email, password });
      await user.save();

      console.log(`User saved with hashed password: ${user.password}`);

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      console.log("Signup successful! Token generated.");
      return { token, user };
    },

    addEmployee: async (_, args, context) => {
      if (!context.user) {
        console.error("Unauthorized: You must be logged in.");
        throw new Error("Unauthorized: You must be logged in.");
      }
      if (!args.first_name || !args.last_name || !args.email || !args.designation || !args.department) {
        throw new Error("First name, last name, email, designation, and department are required");
      }
      console.log("Adding new employee...");
      const employee = new Employee(args);
      await employee.save();
      console.log("Employee added successfully!");
      return employee;
    },

    updateEmployee: async (_, { id, ...args }, context) => {
      if (!context.user) {
        console.error("Unauthorized: You must be logged in.");
        throw new Error("Unauthorized: You must be logged in.");
      }
      if (!id) {
        throw new Error("Employee ID is required");
      }
      console.log(`Updating employee with ID: ${id}`);
      const existingEmployee = await Employee.findById(id);
      if (!existingEmployee) {
        console.error(`Employee with ID ${id} not found`);
        throw new Error(`Employee with ID ${id} not found`);
      }
      const updatedEmployee = await Employee.findByIdAndUpdate(id, args, { new: true });
      console.log("Employee updated successfully!");
      return updatedEmployee;
    },

    deleteEmployee: async (_, { id }, context) => {
      if (!context.user) {
        console.error("Unauthorized: You must be logged in.");
        throw new Error("Unauthorized: You must be logged in.");
      }
      if (!id) {
        throw new Error("Employee ID is required");
      }
      console.log(`Deleting employee with ID: ${id}`);
      const employee = await Employee.findById(id);
      if (!employee) {
        console.error(`Employee with ID ${id} not found`);
        throw new Error(`Employee with ID ${id} not found`);
      }
      await Employee.findByIdAndDelete(id);
      console.log(`Employee with ID ${id} deleted successfully`);
      return `Employee with ID ${id} deleted successfully`;
    },
  },
};

module.exports = resolvers;