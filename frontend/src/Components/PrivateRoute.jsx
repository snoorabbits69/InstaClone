import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const state = useSelector((state) => state.user);
    return (
        state.currentUser ? <Outlet /> : <Navigate to="/login" />
    );
}
