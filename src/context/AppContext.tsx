import { createContext, useContext, useState } from "react";
import { AppContextProviderType, AppContextType } from "../types/AppContext.types";


export const appContext=createContext<AppContextType|null>(null);

export const AppContextProvider=({children}:AppContextProviderType)=>{

    const [total,setTotal]=useState<number>(0);
    const [pending,setPending]=useState<number>(0);
    const [done,setDone]=useState<number>(0);

    const values={
        total,
        pending,
        done,
        setTotal,
        setPending,
        setDone
    }

    return (
        <appContext.Provider value={values}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext=()=>{
    const context=useContext(appContext);
    if(!context){
        throw new Error("Cannot use useAppContext outside of AppContextProvider");
    }
    return context;
}