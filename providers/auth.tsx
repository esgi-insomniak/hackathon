'use client'
import React from "react";
import jwt_decode from "jwt-decode";

export type UserType = {
    avatar: string
    created: string
    email: string
    id: string
    name: string
    updated: string
    username: string
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
        verified: false,
        roles: 'consultant'
    },
    token: '',
    login: () => { },
    logout: () => { }
});

type UserState = Omit<AuthContextType, 'login' | 'logout'>;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const localToken = typeof window !== 'undefined' ? localStorage.getItem('token') : ''

    const defaultUser = React.useMemo(() => {
        if (localToken) {
            const decodedToken = jwt_decode<UserState>(localToken);
            return {
                id: decodedToken?.id,
                record: decodedToken?.record,
                token: localToken
            }
        }
        return { id: '', record: null, token: '' }
    }, [localToken])

    const [user, setUser] = React.useState<UserState>(defaultUser);

    const login = React.useCallback((token: string) => {
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode<UserState>(token);
        setUser({
            id: decodedToken?.id,
            record: decodedToken?.record,
            token: token
        });

    }, [setUser]);

    const logout = React.useCallback(() => {
        localStorage.removeItem('token');
        setUser({
            id: '',
            record: null,
            token: ''
        });
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