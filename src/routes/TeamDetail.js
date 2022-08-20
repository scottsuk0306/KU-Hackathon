import { useEffect ,useState} from "react";
import { useLocation } from "react-router-dom"
import React from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { dbService } from "fbase";
import { useParams } from "react-router-dom";
const TeamDetail=()=>{
    const[teams,setTeams]=useState([]);
    const[team,setTeam]=useState({
        goal:"프론트엔드 프레임워크 리액트 기본 다지기",
        description:"저희는 프론트엔드 개발자를 지향하는 사람들의 모입입니다. 프론트엔드 프레임 워크의 대표인 리액트를 함께 공부함으로써 개발자 커리어의 첫발자국을 함께하실 분을 모집합니다.",
        mission:"아무래도 불성실한 분을 모시고 싶지 않기 떄문에 아래 링크에 해당하는 강의 수강을 확인 후 승인하겠습니다. https://nomadcoders.co/react-for-beginners"
    });
    let id=useParams();
    useEffect(async() => {
        await onSnapshot(collection(dbService, "teamlist"), (snapshot) => {
            const teamArray = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }));
                setTeams(teamArray);
        }
        )
    }, []);
    /*let currentTeam=teams.filter(team=>team.teamId===id.teamid);
    setTeam(currentTeam[0]);
    console.log(team)*/
    return(
        <div>
    <ul>
        <li>{team.goal}</li>
        <br/>
        <li>{team.description}</li>
        <br/>
        <li>{team.mission}</li>
    </ul>
    </div>
    );
}

export default TeamDetail;