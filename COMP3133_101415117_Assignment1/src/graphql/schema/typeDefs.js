const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  type Query {
    login(username: String!, password: String!): AuthPayload!
    getAllEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
    searchEmployeeByDesignation(designation: String!): [Employee]
     searchEmployeeByDepartment(department: String!): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload!
    addEmployee(
      first_name: String!,
      last_name: String!,
      email: String!,
      gender: String!,
      designation: String!,
      salary: Float!,
      date_of_joining: String!,
      department: String!,
      employee_photo: String
    ): Employee
    updateEmployee(
      id: ID!,
      first_name: String,
      last_name: String,
      email: String,
      gender: String,
      designation: String,
      salary: Float,
      date_of_joining: String,
      department: String,
      employee_photo: String
    ): Employee
    deleteEmployee(id: ID!): String
  }
`;

module.exports = typeDefs;
