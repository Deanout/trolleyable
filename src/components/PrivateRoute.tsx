import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';
import {Navigate, Outlet, Route } from 'react-router-dom'
import { RootState, store } from '../app/store';
import {useAuth} from '../contexts/AuthContext'
import { selectLoading, selectUser } from '../features/auth/authSlice';

function PrivateRoute({children} : any) {
  const currentUser = useSelector(selectUser)
  const loading = useSelector(selectLoading)
  const loggedIn = !!currentUser;
  console.log("Private route...")
  if (loggedIn) {
    return children
  } else if (loading) {
    return <p>Loading...</p>
  } else {
    return <Navigate to="/login" />;
  }    
}

export default PrivateRoute