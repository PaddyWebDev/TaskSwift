import React from 'react'
import { Toaster } from 'react-hot-toast'
export default function ToastProvider({ children }: any) {
    return (
        <div><Toaster
            position="top-center"
            reverseOrder={false}
        />
            {children}
        </div>
    )
}
