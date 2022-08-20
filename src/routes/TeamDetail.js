import { useEffect ,useState} from "react";
import { useLocation } from "react-router-dom"
import React from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { dbService } from "fbase";
import { useParams } from "react-router-dom";
import { doc, deleteDoc, updateDoc} from "firebase/firestore";

const TeamDetail=({userObj})=>{
    const [teams, setTeams] = useState([]);
    const [participants, setParticipants] = useState([]);

    const clickHandler = (params, event)=>{
        // const{
        //     userObj
        // } = event;
        // console.log(params)
        // console.log(event)
        console.log(params.userObj.displayName)
        console.log(params.team)
        event.preventDefault();
        updateDoc(doc(dbService, "teamlist", params.team.id), { participants: params.userObj.displayName });
        // setMission(value);
    }

    const id=useParams();
    useEffect(() => {
        onSnapshot(collection(dbService, "teamlist"), (snapshot) => {
            const teamArray = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }));
            setTeams(teamArray.reverse());
        }
        )
    }, []);
    const team=teams.find(t=>t.teamId===id.teamid)??{
        goal:"목표",
        description:"상세 설명",
        mission:"미션",
    }

    console.log(team)
    
    return(
        <div>
            <h3>Goal</h3>
            <p>{team.goal}</p>
            <h3>Detail</h3>
            <p>{team.description}</p>
            <h3>Mission</h3>
            <p>{team.mission}</p>
            <h3>Participants</h3>
            <p>{team.participants}</p>
            <button onClick={(e)=>{clickHandler({userObj, team},e)}}>이 팀에 지원하기</button>
        </div>
        );
}

export default TeamDetail;