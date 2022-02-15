import './App.css';
import MenuAppBar from './NavBar';
import Signup from './Signup';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../features/auth/authSlice';
declare global {
  interface Window { test: any; }
}
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const payload = {
          user: user
      }
      dispatch(setCurrentUser(payload));
    });
    return unsubscribe;
  }, [auth])
  return (
    <div className="App">
          <Router>
            <header className="App-header">
                {MenuAppBar()}
            </header>
            <main className="App-main">
              <Routes>
                <Route path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }/>
                <Route path="/update-profile" element={
                  <PrivateRoute>
                    <Dashboard/>
                  </PrivateRoute>
                }/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
              </Routes>
          </main>
          </Router>
    </div>
  );
}

export default App;
