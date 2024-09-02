export interface AppContextType{
    total:number;
    pending:number;
    done:number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    setPending: React.Dispatch<React.SetStateAction<number>>;
    setDone: React.Dispatch<React.SetStateAction<number>>;
}

export interface AppContextProviderType{
    children:React.ReactNode
}