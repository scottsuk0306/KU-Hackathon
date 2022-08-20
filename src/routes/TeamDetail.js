import { useEffect ,useState} from "react";
import { useLocation } from "react-router-dom"
import React from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { dbService } from "fbase";
import { useParams } from "react-router-dom";
const TeamDetail=()=>{
    const [teams, setTeams] = useState([]);
        
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
    
    return(
        <div>
            <h3>Goal</h3>
            <p>{team.goal}</p>
            <h3>Detail</h3>
            <p>{team.description}</p>
            <h3>Mission</h3>
            <p>{team.mission}</p>
            <button >이 팀에 지원하기</button>
    </div>
    );
}

export default TeamDetail;