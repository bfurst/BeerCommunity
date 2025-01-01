import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Container from 'react-bootstrap/Container';
import { useNavigate, Link } from 'react-router-dom';

const Logout = () => {
    const { logout } = useAuth();
    
    useEffect(() => {
        logout();
    }, []);
    
    return <Navigate to="/login" />;
}
export default Logout;