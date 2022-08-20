import { useEffect } from "react";
import { useLocation } from "react-router-dom"

const TeamDetail=()=>{
    const teamId=useLocation.state.data;
    useEffect(()=>{
        console.log(teamId)
    })
}

export default TeamDetail;