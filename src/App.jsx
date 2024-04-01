// App.jsx
import React from 'react';
import { UserProvider } from './UserContext';
import UsersList from './UserList';
import AddUser from './AddUser';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // Wrap the entire application with UserProvider to provide user data to all components
    <UserProvider>
      <div className="App">
        <h1>User Management System</h1>
        {/* Render AddUser component to add new users */}
        <AddUser />
        {/* Render UsersList component to display the list of users */}
        <UsersList />
      </div>
    </UserProvider>
  );
}

export default App;
