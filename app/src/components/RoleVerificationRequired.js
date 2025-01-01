import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import EmailVerification from '../views/EmailVerification';
import Container from 'react-bootstrap/Container';

const RoleVerificationRequired = ({ requiredRole}) => {
    const { user } = useAuth();
    
    return user.role === requiredRole ? <Outlet /> : <Navigate to="/user/home" />
}
export default RoleVerificationRequired;