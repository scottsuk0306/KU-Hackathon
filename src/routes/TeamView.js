import React, { useState,useEffect } from "react";
import { getAuth,signOut,updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";
const TeamView = ({userObj,refreshUser})=>{
    const history=useHistory();
    const auth=getAuth();
    const[newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const onLogOutCLick=()=>{
        signOut(auth);
        history.push("/");
    }
    const onChange=(event)=>{
        const{
            target:{value},
        }=event;
        setNewDisplayName(value);
    };
    const onSubmit=async(event)=>{
        event.preventDefault();
        if(userObj.displayName!==newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            
        refreshUser();
        }
    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display Name" value={newDisplayName}/>
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={onLogOutCLick}>Log Out</button>            
        </>
        
    )
                
}
export default TeamView;