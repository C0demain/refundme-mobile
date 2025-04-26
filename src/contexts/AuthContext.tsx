import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType{
    userId?: string
    token?: string
    role?: string
    isLogged?: boolean
    storeUser(userId: string, authToken: string, role: string): Promise<void>
    logout(): void 
}

const AuthContext = createContext<AuthContextType>({
    storeUser: function (userId: string, authToken: string, role: string): Promise<void> {
        throw new Error("Function not implemented.");
    },
    logout: function (): void {
        throw new Error("Function not implemented.");
    }
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({children}: {children: ReactNode}){
    const [userId, setUserId] = useState<string>()
    const [role, setRole] = useState<string>()
    const [token, setToken] = useState<string>()
    const [isLogged, setIsLogged] = useState<boolean>(false)

    const storeUser = async (userId: string, token: string, role: string) => {
        await AsyncStorage.setItem('userId', userId)
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('role', role)
        setUserId(userId)
        setToken(token)
        setRole(role)
        setIsLogged(true)
    }

    const logout = async () => {
        await AsyncStorage.multiRemove(['userId', 'token', 'role'])
        setIsLogged(false)
    }

    const getStored = async () => {
        const id = await AsyncStorage.getItem('userId')
        const token = await AsyncStorage.getItem('token')
        const role = await AsyncStorage.getItem('role')
        if(!!id && !!token && !!role){
            setUserId(id)
            setToken(token)
            setRole(role)
            setIsLogged(true)
        }
    }

    useEffect(() => {
        getStored()
    }, [])

    return (
        <AuthContext.Provider value={ { userId, token, role, isLogged, storeUser, logout } }>
            {children}
        </AuthContext.Provider>
    )
}