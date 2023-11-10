import React from 'react'
export default function HeadSection({ children }: any) {
    return (
        <>
            <head>
                <title>TaskSwift</title>
                <link rel="icon" href="/Images/favicon.png" type="image/png" sizes="any" />
            </head>
            {children}
        </>
    )
}
