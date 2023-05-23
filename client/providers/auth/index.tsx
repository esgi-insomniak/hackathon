'use client'

import React from "react";
import { SessionProvider } from "next-auth/react";

interface AuthProps {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider