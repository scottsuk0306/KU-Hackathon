import { React,useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import { authService, dbService } from "fbase";
import { onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import User from "components/user";
const MyTeam=(userObj)=>{
    const [teams,setTeams]=useState([]);
    const applyList=[
        {
            name:"권재영",
            github:"https://github.com/jaylions",
            ment:"열심히 참여하겠습니다!"
        },
        {
            name:"석주영",
            github:"https://github.com/scottsuk0306",
            ment:"누구보다 열정적입니다!"
        },
        {
            name:"이민섭",
            github:"https://github.com/mininim",
            ment:"항상 적극적으로 참여하겠습니다!"
        }
    ]

    
    useEffect(() => {
        onSnapshot(collection(dbService, "teamlist"), (snapshot) => {
            const teamArray = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }));
                setTeams(teamArray.filter(team=>team.creatorId===userObj.userObj.uid))
        }
        )
        console.log(teams)
    }, []);
    return(
        <div>
        <h1>내가 팀장인 팀</h1>
        <section className="container">
            <div>
                {teams.map((team) => (
                    <div>
                        <Nweet teamObj={team} key={team.Id} isOwner={team.creatorId === userObj.uid} />
                    </div>
                ))}
                <h1>우리 팀 지원자 리스트</h1>
                {applyList.map((apply)=>(
                    <div>
                        <User userInfo={apply}/>
                    </div>
                ))}
            </div>
        </section>
        </div>
    )

}

export default MyTeam;