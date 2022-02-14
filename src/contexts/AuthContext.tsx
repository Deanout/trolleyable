import { Observer } from '@reduxjs/toolkit';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from "../firebase";

const AuthContext = createContext({
    currentUser: {
        email: '',
    },
    signup: (email: string, password: string) => {},
    login: (email: string, password: string) => {},
});

export function useAuth() {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) : any {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email:string, password:string) {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    function login(email:string, password:string) {
        return auth.signInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    auth.onAuthStateChanged((user: any) => {
        setCurrentUser(user);
    });

    const value = {
        currentUser: {
            email: "",
        },
        signup,
        login
    };
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}