import { createContext, useContext, useState } from "react";
import SnackBar from "../Components/SnackBar";
const SnackBarContext = createContext({});

export const SnackBarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    function showHideSnckBar(message) {
        setOpen(true);
        setMessage(message);
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    }
    return (
        <SnackBarContext.Provider value={{ showHideSnckBar }}>
            <SnackBar open={open} message={message} />
            {children}
        </SnackBarContext.Provider>
    );
};
export const useSnackBar = () => {
    return useContext(SnackBarContext);
};
