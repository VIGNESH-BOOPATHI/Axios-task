// AddUser.jsx
import React, { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';

const AddUser = ({ editUser, editingUser, setEditingUser }) => {
  // Use custom hook to access addUser function from context
  const { addUser } = useUserContext();
  // State to store user data
  const [userData, setUserData] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    // Populate userData with editingUser data when in edit mode
    if (editingUser) {
      setUserData(editingUser);
    }
  }, [editingUser]);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.phone || !userData.email) return;

    // Call editUser function if editingUser is not null, otherwise call addUser function
    if (editingUser) {
      editUser(editingUser.id, userData);
      setEditingUser(null);
    } else {
      addUser(userData);
    }
    // Clear user data after submission
    setUserData({ name: '', phone: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        {/* Input field for name */}
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        {/* Input field for phone */}
        <input
          type="text"
          className="form-control"
          placeholder="Enter phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />
        {/* Input field for email */}
        <input
          type="text"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        {/* Button to submit form (either Add User or Edit Data based on editingUser state) */}
        <button type="submit" className="btn btn-primary">{editingUser ? 'Edit Data' : 'Add User'}</button>
      </div>
    </form>
  );
};

export default AddUser;
