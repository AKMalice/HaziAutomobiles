import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToDash = () => {
    navigate('/dash');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Home Page</h1>
      <button onClick={goToDash} style={{ margin: '10px', padding: '10px 20px' }}>
        Go to Dash
      </button>
      <button onClick={goToLogin} style={{ margin: '10px', padding: '10px 20px' }}>
        Go to Login
      </button>
      <button onClick={goToSignup} style={{ margin: '10px', padding: '10px 20px' }}>
        Go to Signup
      </button>
    </div>
  );
};

export default Home;
