// UserList.jsx
import React, { useState } from 'react';
import { useUserContext } from './UserContext';
import AddUser from './AddUser';

const UsersList = () => {
  // Use custom hook to access user data and functions from context
  const { users, editUser, deleteUser } = useUserContext();
  // State to store the user being edited
  const [editingUser, setEditingUser] = useState(null);

  // Function to handle edit button click
  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  return (
    <>
      <div>
        <h2>Users</h2>
        {/* Render the list of users */}
        <ul className="list-group">
          {users.map(user => (
            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {/* Display user details */}
                <span><b>Name:</b> {user.name}</span><br />
                <span><b>Phone no:</b> {user.phone}</span><br />
                <span><b>Email:</b> {user.email}</span>
              </div>
              <div>
                {/* Button to edit user */}
                <button onClick={() => handleEditClick(user)} className="btn btn-outline-primary btn-sm mr-2">Edit</button>
                {/* Button to delete user */}
                <button onClick={() => deleteUser(user.id)} className="btn btn-outline-danger btn-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
        {/* Render AddUser component in edit mode when editingUser is not null */}
        {editingUser !== null && (
          <div className="cart-popup-overlay">
            <div className="cart-popup-container">
            <h3>Edit Mode</h3>
            <AddUser
              editUser={editUser}
              editingUser={editingUser}
              setEditingUser={setEditingUser}
            />
            </div>
          </div>
        )}
      
    </>
  );
};

export default UsersList;
