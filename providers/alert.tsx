'use client'

import React from 'react';
import toast, { ToastOptions, Toaster } from 'react-hot-toast'

export type AlertContextType = {
    success: (text: string) => void;
    error: (text: string) => void;
};

const toastConfig: ToastOptions = {
    duration: 4000,
    position: 'bottom-center'
};

const AlertContext = React.createContext<AlertContextType | null>(null);
AlertContext.displayName = 'AlertContext';

const AlertProvider = ({ children }: { children: React.ReactElement }) => {
    const contextValue = React.useMemo(
        () => ({
            success: (text: string) => toast.success(text, toastConfig),
            error: (text: string) => toast.error(text, toastConfig)
        }),
        []
    );

    return <AlertContext.Provider value={contextValue}>{children}</AlertContext.Provider>;
};

const AlertInso = () => {
    return <Toaster />;
};

const useAlert = () => React.useContext(AlertContext);

export { AlertProvider, AlertContext, AlertInso, useAlert };