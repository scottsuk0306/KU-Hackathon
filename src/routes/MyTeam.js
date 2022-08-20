import { React,useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import { authService, dbService } from "fbase";
import { onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
const MyTeam=(userObj)=>{
    const [teams,setTeams]=useState([]);
    
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
        <h1>내가 팀장인 팀들!</h1>
        <section className="container">
            <div>
                {teams.map((team) => (
                    <div>
                        <Nweet teamObj={team} key={team.Id} isOwner={team.creatorId === userObj.uid} />
                    </div>
                ))}
            </div>
        </section>
        </div>
    )

}

export default MyTeam;