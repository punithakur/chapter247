import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/login.css';
import {  register } from '../../Api/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
           await register(username, password);
            navigate('/');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Register</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Register</button>
                    <a href='/'>Login</a>
                </form>
            </div>
        </div>
    );
};

export default Register;
