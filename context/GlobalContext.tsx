'use client'

import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react"

type GlobalContextType = {
    unreadMessageCount: number;
    setUnreadMessageCount: React.Dispatch<React.SetStateAction<number>>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

interface GlobalProviderProps {
    children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);

    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.user) {
            getUnreadMessageCount().then((res) => {
                if (res) setUnreadMessageCount(res);
            })
        }

    }, [session])

    return (
        <GlobalContext.Provider value={{
            unreadMessageCount,
            setUnreadMessageCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

