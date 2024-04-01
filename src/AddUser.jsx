import React, { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';

const AddUser = ({ editUser, editingUser, setEditingUser, closePopup }) => {
  const { addUser } = useUserContext();
  const [userData, setUserData] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    if (editingUser) {
      setUserData(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.phone || !userData.email) return;

    if (editingUser) {
      editUser(editingUser.id, userData);
      setEditingUser(null);
    } else {
      addUser(userData);
    }
    // Close the popup after form submission
    closePopup();
    // Clear the user data after submission
    setUserData({ name: '', phone: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Name</span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Phone</span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Email</span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">{editingUser ? 'Edit Data' : 'Add User'}</button>
    </form>
  );
};

export default AddUser;