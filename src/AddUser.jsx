import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useUserContext } from './UserContext';

const AddUser = ({ editUser, editingUser, setEditingUser, closePopup }) => {
  const { addUser } = useUserContext();

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validate: values => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.phone) {
        errors.phone = 'Phone is required';
      }
      if (!/^\d+$/.test(values.phone)) {
        errors.phone = 'Phone number must contain only numbers';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      if (editingUser) {
        editUser(editingUser.id, values);
        setEditingUser(null);
      } else {
        addUser(values);
      }
      // Close the popup after form submission
      closePopup();
      // Reset form values
      resetForm();
    },
  });

  useEffect(() => {
    if (editingUser) {
      formik.setValues(editingUser);
    }
  }, [editingUser]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Name</span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-danger">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Phone</span>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="Enter phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-danger">{formik.errors.phone}</div>
        ) : null}
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
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-danger">{formik.errors.email}</div>
        ) : null}
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        {editingUser ? 'Edit Data' : 'Add User'}
      </button>
    </form>
  );
};

export default AddUser;
