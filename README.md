# Employee Management Application

![Employee-List](https://github.com/saraKloyzner/Practicum/assets/148892103/fd73f2e6-f444-486f-8c43-97bcc682f1f9)

## Introduction

This application is designed to manage an employee list for an organization. It features a client-side developed with Angular, a server-side in .NET, and incorporates a database. The application emphasizes input validation, ease of navigation, and a user-friendly design.

## Features

- **Employee List Display:** Shows a table with partial details of employees.
- **Adding a New Employee and Editing Employee Details:** Enables adding and editing an employee through an expanding dynamic form, which can include multiple roles per employee (for example, an employee can be both a secretary and a teacher). Strong emphasis is placed on input validation in both cases, for example, the birth date must be at least 16 years prior to the current date to ensure no underage employment.
- **Role Management:** Managers can add roles through a secure login using JWT authentication.
- **User-Friendly Design:** The application is designed to be visually appealing, clean, and easy to navigate.

## Running the Application

### Prerequisites

- Git
- .NET SDK
- Node.js
- Angular CLI
- Angular Material
- XLSX for Angular

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saraKloyzner/Practicum.git
```
2. Navigate to the project directory:
```bash
cd Practicum
```

#### Server (.NET)

To run the .NET project:

1. Navigate to the .NET project directory from the root folder:
```bash
cd Server
```
2. Restore the .NET project dependencies:
```bash
dotnet restore
```
3. Run the .NET project:
```bash
dotnet run
```

#### Client (Angular)

To set up and run the Angular project:

1. Navigate to the Angular project directory from the root folder:
```bash
cd Client
```
2. Install the necessary Node.js packages:
```bash
npm install
```
3. Install Angular Material and XLSX:
```bash
npm install @angular/material xlsx
```
4. Serve the Angular project:
```bash
ng serve --open
```
This will open the application in your default web browser. The Angular app typically runs on http://localhost:4200.

### Additional Notes

- The application is designed with input validation as a priority to ensure data integrity and compliance with employment laws.
- For role management and any administrative tasks, it is required to login with a username and password to secure the process.
- The design and user interface have been crafted for a pleasant user experience, emphasizing a clean and attractive layout.

## Contributing

Your contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT
```

Make sure to replace or fill in any placeholders with the specific details related to your project. This template provides a structured format for your README, including sections for an introduction, features, running the application, additional notes, contributing, and licensing.
