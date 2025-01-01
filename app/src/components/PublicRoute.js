import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Container from 'react-bootstrap/Container';

const PublicRoute = () => {
    const { isAuth } = useAuth();
    if (isAuth === null)
        return <Container className="d-flex h-100 my-auto justify-content-center" >
            </Container>;
    else
        return !isAuth ? <Outlet /> : <Navigate to="/user/home" />
}
export default PublicRoute;

