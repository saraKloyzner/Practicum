
![Employee-List](https://github.com/saraKloyzner/Practicum/assets/148892103/75ab7584-8fdb-45eb-adb8-6a02dedb5882)


# Employee Management Application

This project is an Employee Management Application consisting of a server written in .NET and a client written in Angular 17. The server connects to a database to store and retrieve data.

## Client Features

The client presents a table displaying the following employee details:

- First name
- Last name
- ID number
- Start date

The table allows for **addition**, **deletion**, and **editing** of employees. During editing and addition, additional employee details are displayed:

- Date of birth
- Gender
- List of positions, including:
  - position name
  - Whether the position is managerial or not
  - Date entered into the position

Input fields undergo **rigorous validation checks** both on the server and client sides.

## Server Implementation

The server-side implementation involves:

- Usage of **APIs** to handle data storage
- Data stored in **SQL Server**
- Project structure follows the **standard layered model**

## Running the Application

To run the server and client:

1. **Clone the repository:** `git clone https://github.com/saraKloyzner/Practicum.git`

### Server:

1. **Navigate to Server Directory:**
   `cd server_directory_path`

2. **Install Dependencies:**
   `dotnet restore`

3. **Run the Server Application:**
   `dotnet run`

### Client:

1. **Navigate to Client Directory:**
   `cd client_directory_path`

2. **Install Dependencies (Ensure npm is installed):**
   `npm install`

3. **Run Angular Server (Assuming Angular CLI is installed globally):**
   `ng serve`

4. **Access the Client Application:**
   Open a web browser and go to `http://localhost:4200`

Ensure you have the necessary dependencies installed for both the server and client applications before running them.

For detailed instructions on running the server and client, please refer to their respective README files within the repository.

For further information, questions, or support, please contact the `s0583213630@gmail.com`.
