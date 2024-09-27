# Production System Designer 
A lightweight tool for prototyping production systems strucutures.

##### Table of Contents  
[1. Overview](#overview) <br>
[2. Features](#features)  
[3. App setup](#run-the-app)  
[4. Acknowledgments](#acknowledgments)

### Overview

The Production System Designer is a tool developed as a practical component for my engineering thesis. This application serves as a simple solution for designing and visualizing production systems. Whether you are a student working on an engineering thesis or a professional involved in production system design, this app simplifies the process and enhances your ability to quickly prototype efficient and well-organized production systems.

![image23](https://github.com/user-attachments/assets/b719ead1-b31b-46c1-99bb-5e067c04de03)


## Features

### 1. Designing Production System Structures

Easily create a tree list representation of your production system. Organize and structure components and devices to get a clear overview of the entire system hierarchy.

### 2. Layout Drawing

Utilize the intuitive layout drawing feature to design the physical arrangement of the selected production system.

### 3. Report Generation

Generate summary reports for your designed production systems in PDF format. These reports provide valuable insights into the structure, layout, and key components of the system, aiding in documentation and analysis.

## Run The App

In current state, the application is only able tu run locally and requires You to set it up by yourself.
To get started with the Production System Designer, follow these steps:

### Frontend Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/production-system-designer.gitT
   ```

2. **Install Dependencies:**
   ```bash
   cd web-app-for-production-resource-database/ProductionSystemsWebApp
   npm install
   ```

3. **Run the Application:**
   ```bash
   ng serve
   ```

4. **Access the App:**
   Open your web browser and navigate to `http://localhost:4200` to access the Production System Designer.

### Backend Setup
1. **Install Dependencies**
   ```bash
   cd ProductionSystems/WebApi
   dotnet restore
   dotnet build
   ```

2. **Run the Application:**
   ```bash
   dotnet run
   ```

### Database Setup
1. **Configure SQL Server:**
   
   Ensure that SQL Server is running and note your connection settings (server name, username, password).

2. **Open and Run the SQL Script:** 

   Open SQL Server Management Studio (SSMS), connect to your server, and do the following:
      - Open the Database/setup.sql file from the repository.
      - Execute the script to create the database schema.

3. **Verify Database:**
   
   Once the script runs successfully, you can verify that the database has been created by viewing it in SQL Server Management Studio or by running a SQL query to check for the created tables. Make sure that the **connection string, database name and    password** are correct in ProductionSystems/WebApi/appsettings.json and ProductionSystems/WebApi/Program.cs

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular (v17)
- dotnet 6.0
- SqlServer

## Acknowledgments

This app uses fabric.js for drawing 2D layouts and pdfmake for PDF generation:
1) fabric.js: https://github.com/fabricjs/fabric.js
2) pdfmake: https://github.com/bpampuch/pdfmake 

---

