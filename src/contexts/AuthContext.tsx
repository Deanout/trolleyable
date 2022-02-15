import { Observer } from '@reduxjs/toolkit';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';
import {
    User,
  } from "firebase/auth";

interface AuthContextInterface { 
    currentUser: User | null; 
    loading: boolean;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<any>;
    resetPassword: (email: string) => Promise<any>;
    updateEmail: (email: string) => Promise<any>;
    updatePassword: (password: string) => Promise<any>;
    setCurrentUser: (user: User | null) => void;

}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export function useAuth() {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) : any {
    const authContext = useContext(AuthContext);


    authContext.signUp = function signup(email:string, password:string) {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    authContext.login = async function login(email:string, password:string) {
        return auth.signInWithEmailAndPassword(email, password);
    };

    authContext.logout = function logout() {
        return auth.signOut();
    };

    authContext.resetPassword = function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
      }

    authContext.setCurrentUser = function setCurrentUser(user: User | null) {
        authContext.currentUser = user;
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            authContext.loading = true;
            console.log("Auth state changed");
            console.log(user);
            authContext.setCurrentUser(user);
            authContext.loading = false;
        });
        return unsubscribe;
    }, []);

  return (
    <AuthContext.Provider value={authContext}>
        {!authContext.loading && children}
    </AuthContext.Provider>
  )
}