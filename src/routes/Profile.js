import React, { useState,useEffect } from "react";
import { getAuth,signOut,updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";
const Profile= ({userObj,refreshUser})=>{
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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange} type="text" placeholder="Display Name" value={newDisplayName} 
                autoFocus className="formInput"/>
                <input type="submit" value="Update Profile" className="formBtn" style={{marginTop:10,}}/>
            </form>
                <span className="formBtn cancelBtn logOut" onClick={onLogOutCLick}>  
                    Log Out
            </span>        
        </div>
        
    )
                
}
export default Profile;