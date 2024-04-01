// UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create a context for managing user data
const UserContext = createContext();

// Custom hook to consume the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserProvider component to provide user data to the entire application
export const UserProvider = ({ children }) => {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API
  const fetchUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  // Function to add a new user
  const addUser = (newUser) => {
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
      })
      .catch(error => {
        console.error('Error adding user: ', error);
      });
  };

  // Function to edit a user
  const editUser = (id, updatedUser) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
      .then(response => {
        const updatedUsers = users.map(user => {
          if (user.id === id) {
            return response.data;
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error('Error updating user: ', error);
      });
  };

  // Function to delete a user
  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
      })
      .catch(error => {
        console.error('Error deleting user: ', error);
      });
  };

  // Provide user data and functions to child components via context
  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
