import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data); // Set error message from server
      } else {
        setError('Registration error, please try again.'); // Default error message
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Register</button>
      <p>Already have an Account? <Link to="/login">Login</Link></p>
    </form>
  );
};

export default Register;
