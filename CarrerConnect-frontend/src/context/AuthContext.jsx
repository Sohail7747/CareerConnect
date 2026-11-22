import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        try {
            return JSON.parse(
                localStorage.getItem("CareerConnectUser")
            ) || null;

        } catch {
            return null;
        }

    });


    const login = (data) => {

        // Store only safe user information
        const userData = {
            id: data.id,
            fullName: data.fullName,
            email: data.email,
            role: data.role
        };


        // Store user information
        localStorage.setItem(
            "CareerConnectUser",
            JSON.stringify(userData)
        );


        // Store JWT token separately
        localStorage.setItem(
            "CareerConnectToken",
            data.token
        );


        setUser(userData);
    };


    const logout = () => {

        localStorage.removeItem("CareerConnectUser");

        localStorage.removeItem("CareerConnectToken");

        setUser(null);
    };


    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}


// Custom hook
export const useAuth = () => useContext(AuthContext);

