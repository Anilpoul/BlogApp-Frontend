// AuthPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === '/login';

    const handleToggle = () => {
        navigate(isLogin ? '/register' : '/login');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4" style={{ minWidth: '350px' }}>
                <h3 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h3>

                {isLogin ? <Login /> : <Register />}

                <button
                    className="btn btn-link mt-3"
                    onClick={handleToggle}
                >
                    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
