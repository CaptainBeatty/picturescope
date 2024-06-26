import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
       
        const { token, userId } = data;
        // Stocker le token et l'email dans le stockage local
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId); // Stockage de l'userId
        localStorage.setItem('email', email);
        setEmail('');
        setPassword('');
        console.log(token); 
        alert('User logged in successfully!');
        // Rediriger vers la page d'accueil
        navigate('/');
        // Recharger la page pour mettre à jour l'affichage
        window.location.reload();
      } else {
        const result = await response.json();
        alert('Failed to log in: ' + result.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
