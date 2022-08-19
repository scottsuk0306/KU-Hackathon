import React from "react";
import { getAuth,signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
export default ()=>{
    const history=useHistory();
    const auth=getAuth();
    const onLogOutCLick=()=>{
        signOut(auth);
        history.push("/");
    }
    return(
        <>
            <button onClick={onLogOutCLick}>Log Out</button>
        </>
    )
}