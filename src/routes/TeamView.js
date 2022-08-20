import React, { useState,useEffect } from "react";
import { getAuth,signOut,updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fbase";
import { addDoc ,collection} from "firebase/firestore";
import { async } from "@firebase/util";
const TeamView = ({userObj})=>{
    const [goal,setGoal]=useState("");
    const [description,setDescription]=useState("");
    const [num,setNum]=useState(0);
    const [date,setDate]=useState(Date.now());
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
    const onChangeNum=(event)=>{
        const{
            target:{value},
        }=event;
        setNum(value);
    }
    const onChangeDate=(event)=>{
        const{
            target:{value},
        }=event;
        setDate(value);
    }
    const onSubmit=async(event)=>{
        event.preventDefault();
        const newTeam={
            goal:goal,
            dueDate:date,
            number:num,
            description:description,
            creatorId:userObj.uid,
        }
        await addDoc(collection(dbService,"teamlist"),newTeam);
        console.log(newTeam)
        };
    

    return(
        <>
            <h3>팀을 생성해보세요</h3>
            <form onSubmit={onSubmit} >
                팀의 목표<br></br><input type="text" value={goal} onChange={onChangeGoal}/><br/>
                마감 날짜<br></br><input type="date" value={date} onChange={onChangeDate}/><br></br>
                모집 인원<br></br><input type="number" value={num} onChange={onChangeNum}/><br/>
                상세 설명<br></br><input type="text" value={description} onChange={onChangeDescription}/><br></br>
                <input type="submit" value="팀 생성하기" /> 
            </form>
                       
        </>
        
    )
                
}
export default TeamView;