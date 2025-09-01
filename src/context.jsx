import {createContext, useContext, useEffect} from "react";
import {useFetch} from "./hooks/useFetch.js";

 const UsersContext = createContext();
export const UsersProvider = ({ children }) => {
    const {fetchData,data,error,loading} = useFetch()

    useEffect(() => {
        fetchData()
    }, []);

    return(
        <UsersContext.Provider value={{fetchData,data,error,loading}}>
            {children}
        </UsersContext.Provider>
    )

}
export const useUsers = () => useContext(UsersContext);