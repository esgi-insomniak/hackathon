'use client'
import React from "react";
import jwt_decode from "jwt-decode";
import { redirect } from "next/navigation";

export type UserType = {
    avatar: string
    created: string
    email: string
    id: string
    name: string
    updated: string
    username: string
    poste: string
    verified: boolean
    roles?: 'admin' | 'consultant' | 'rh' | 'commercial'
}

export type AuthContextType = {
    id: string;
    record: UserType | null;
    token: string;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | null>({
    id: '',
    record: {
        avatar: '',
        created: '',
        email: '',
        id: '',
        name: '',
        updated: '',
        username: '',
        poste: '',
        verified: false,
        roles: 'consultant'
    },
    token: '',
    login: () => { },
    logout: () => { }
});

type UserState = Omit<AuthContextType, 'login' | 'logout'>;

export const AuthProvider = ({ children, userData }: { children: React.ReactNode, userData: any }) => {

    const localToken = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
    const defaultUser = React.useMemo(() => {
        if (localToken) {
            const decodedToken = jwt_decode<UserState>(localToken);
            return {
                id: decodedToken?.id,
                record: userData,
                token: localToken
            }
        }
        return { id: '', record: null, token: '' }
    }, [localToken])

    const [user, setUser] = React.useState<UserState>(defaultUser);

    const login = React.useCallback((token: string) => {
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode<UserState>(token);
        localStorage.setItem('user', JSON.stringify(decodedToken?.id));
        document.cookie = `userId=${decodedToken?.id}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
        setUser({
            id: decodedToken?.id,
            record: userData,
            token: token
        });

    }, [setUser]);

    const logout = React.useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser({
            id: '',
            record: null,
            token: ''
        });
        redirect('/sign-in');
    }, [setUser]);

    const value = React.useMemo<AuthContextType>(() => ({
        id: user?.id,
        record: user?.record,
        token: user?.token,
        login,
        logout
    }), [user, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}