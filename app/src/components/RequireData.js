import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireData = () => {
    const location = useLocation();
    const type = location.state?.type;
    const email = location.state?.email;

    return email !== undefined && type !== undefined ? <Outlet /> : <Navigate to="/error" />
}
export default RequireData;