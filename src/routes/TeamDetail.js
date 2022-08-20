import { useEffect ,useState} from "react";
import { useLocation } from "react-router-dom"
import React from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { dbService } from "fbase";
import { useParams } from "react-router-dom";
const TeamDetail=()=>{
    
    return(
    <h1>팀 상세 페이지</h1>
    );
}

export default TeamDetail;