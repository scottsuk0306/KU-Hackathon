import React, { useState,useEffect } from "react";
import { getAuth,signOut,updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";
const TeamView = ({userObj})=>{
    const [goal,setGoal]=useState("");
    const [description,setDescription]=useState("");
    const onChangeGoal =(event)=>{
        const {
            target:{value},
        }=event;
        setGoal(value);
    }
    const onChangeDescription =(event)=>{
        const {
            target:{value},
        }=event;
        setDescription(value);
    }
    
    return(
        <>
            <h3>팀을 생성해보세요</h3>
            <form >
                팀의 목표<br></br><input type="text" value={goal} onChange={onChangeGoal}/><br/>
                마감 날짜<br></br><input type="date"/><br></br>
                모집 인원<br></br><input type="number" /><br/>
                상세 설명<br></br><input type="text" value={description} onChange={onChangeDescription}/><br></br>
                <input type="submit" value="팀 생성하기"/> 
            </form>
                       
        </>
        
    )
                
}
export default TeamView;