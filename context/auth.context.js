import React, {createContext, useState} from "react";
//import * as SQLite from 'expo-sqlite';

export const Authoco = createContext();

export const AuthProvider = ({children}) => {
    const [isLogged, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    return (
        <Authoco.Provider value={{isLogged, setIsLoggedIn, userInfo, setUserInfo}}>
           {children}
        </Authoco.Provider>
    )
}