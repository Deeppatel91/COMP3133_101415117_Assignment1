# GraphQL API with Node.js, Express, and MongoDB

This project is a GraphQL API built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. It allows you to perform CRUD operations on employees and manage user authentication.

---

## Features

- **User Authentication**:
  - Signup and login with JWT token generation.
  - Protected routes using JWT authentication.
- **Employee Management**:
  - Add, update, delete, and fetch employee details.
  - Search employees by designation or department.
- **GraphQL API**:
  - Built using Apollo Server and Express.
  - Supports queries and mutations for all operations.

---

## Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-525252?style=for-the-badge&logo=bcrypt&logoColor=white)

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local or cloud-based)
- Postman (for API testing)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/my-graphql-project.git
   cd my-graphql-project
Install dependencies:


npm install
Create a .env file in the root directory and add the following environment variables:


PORT=4000
MONGODB_URI=mongodb://localhost:27017/mygraphqldb
JWT_SECRET=your_jwt_secret_key
Start the server:


The GraphQL API will be running at http://localhost:4000/graphql.

Screenshots
For screenshots of the API testing and usage, please refer to the Screenshots PDF. https://github.com/Deeppatel91/COMP3133_101415117_Assignment1/blob/main/Screenshots-Testings%20(1).pdf
