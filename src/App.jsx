import React, { useState } from 'react'; // Import useState
import { UserProvider } from './UserContext';
import UsersList from './UserList';
import AddUser from './AddUser';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // State to manage the display of the popup
  const [popup, setPopup] = useState(false);

  // Function to open the popup
  const openPopup = () => {
    setPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setPopup(false);
  };

  return (
    <UserProvider>
      <div className="App">
        <h1>User Management System</h1>
        {/* Render the AddUser component within a popup when the popup state is true */}
        {popup && (
          <div className="cart-popup-overlay">
            <div className="cart-popup-container">
              <h3>Add user</h3>
              <AddUser closePopup={closePopup} />
              {/* Close button to close the popup */}
              <button onClick={closePopup} className="btn btn-outline-secondary btn-sm">Close</button>
            </div>
          </div>
        )}
        {/* Button to open the popup */}
        <button onClick={openPopup} className="btn btn-outline-primary btn-sm mr-2">Add User</button>
        {/* Render the UsersList component */}
        <UsersList />
      </div>
    </UserProvider>
  );
}

export default App;