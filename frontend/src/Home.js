import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/home.css';  

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/', { withCredentials: true })
      .then(response => {
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          navigate('/invoices');
        }
      })
      .catch(error => console.error('Error checking authentication:', error));
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="background"></div>
      <div className="container">
        <h1>Login with Google</h1>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Home;
