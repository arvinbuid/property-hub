'use client'

import { createContext, useState } from "react"

type GlobalContextType = {
    unreadMessageCount: number;
    setUnreadMessageCount?: React.Dispatch<React.SetStateAction<number>>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

interface GlobalProviderProps {
    children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [unreadMessageCount, setUnreadMessageCount] = useState(22);

    return (
        <GlobalContext.Provider value={{
            unreadMessageCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

