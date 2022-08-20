import React, { useState,useEffect } from "react";
import { getAuth,signOut,updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fbase";
import { addDoc ,collection} from "firebase/firestore";
import { async } from "@firebase/util";
import {v4 as uuid} from "uuid";
const TeamView = ({userObj})=>{
    const [goal,setGoal]=useState("");
    const [description,setDescription]=useState("");
    const [num,setNum]=useState(0);
    const [date,setDate]=useState(Date.now());
    const [mission,setMission]=useState("");
    const onChangeMission=(event)=>{
        const{
            target:{value},
        }=event;
        setMission(value);
    }
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
            createdAt:Date.now(),
            mission:mission,
            creatorId:userObj.uid,
            teamId:uuid(),
        }
        await addDoc(collection(dbService,"teamlist"),newTeam);
        console.log(newTeam)
        };
    

    return(
        <>
            <h1>팀을 생성해보세요!</h1>
            <br></br>
            <form onSubmit={onSubmit} >
                팀의 목표<br></br><input type="text" value={goal} onChange={onChangeGoal} className="formInput"/><br/>
                마감 날짜<br></br><input type="date" value={date} onChange={onChangeDate} className="formInput"/><br></br>
                모집 인원<br></br><input type="number" value={num} onChange={onChangeNum} className="formInput"/><br/>
                상세 설명<br></br><input type="text" value={description} onChange={onChangeDescription} className="formInput"/><br></br>
                사전 미션<br></br><input type="text" value={mission} onChange={onChangeMission} className="formInput"/><br></br>
                <input type="submit" value="팀 생성하기"/> 
            </form>
                       
        </>
    )
                
}
export default TeamView;