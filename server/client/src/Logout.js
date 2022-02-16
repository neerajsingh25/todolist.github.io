import React, { useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "./App";

const Logout = ()=>{
    const {state, dispatch} = useContext(userContext);
    const history= useNavigate();
    
        
    useEffect(()=>{
        fetch('/logout',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res)=>{
            dispatch({type:"user", payload: false})
            history('/login',{ replace:true });
            if(res.status !== 201){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((error)=>{
            console.log(error);
        });
    });
    return(
        <>
            <h>logout page</h>
        </>
    );
}
export default Logout;