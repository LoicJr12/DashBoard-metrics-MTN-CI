import { useEffect, useCallback, useState, useRef} from "react";
import { Outlet, Navigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axiosInstance from "./AxiosInstance";



function ProtectedRoutes (){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let open = true;
    const handleClose = () =>{
        open = false
    }

    const VerifUserRequest = useCallback(async () =>{

        axiosInstance.post('/verifuser')  // Remplacez '/endpoint' par votre endpoint
            .then(response => {
              const resultat = response.data;
              const value = resultat.message
                if(value){
                    setIsAuthenticated(value)
                    setIsLoading(false)
                    console.log("user is authenticated", value)
                }else{
                    setIsAuthenticated(value)
                    console.log("user is authenticated", value)
                    setIsLoading(false)
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setIsAuthenticated(false)
                setIsLoading(false)
        });

    }, [])

    const VerifUserRequestRef = useRef(VerifUserRequest);

    useEffect(() => {
        VerifUserRequestRef.current();
    }, []);

    if (isLoading) {
        return (
            <Backdrop sx={{ color: '#ffc400', background: "#FFFFFF80",zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace={true} />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;