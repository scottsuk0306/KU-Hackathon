import { React,useEffect } from "react";
import { collection } from "firebase/firestore";
import { authService, dbService } from "fbase";
import { getDocs } from "firebase/firestore";
import { query,where,orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";
const MyTeam=(userObj)=>{
    const [teams,setTeams]=[];
    const getMyTeams=async()=>{
        const q=query(
            collection(dbService,"teamlist"),
            where("creatorId","==",userObj.uid),
            orderBy("createdAt","desc")
        );
        const querySnapshot=await getDocs(q);
        const teamArray=await querySnapshot.docs.map((doc)=>(
            {
                id:doc.id,
                ...doc.data(),
            }));
            setTeams(teamArray);
        };
    
    useEffect(()=>{
        getMyTeams();
        console.log(teams);
    },[])
    return(
        <section className="container">
            <div>
                {teams && teams.map((team) => (
                    <div>
                        <Nweet teamObj={team} key={team.Id} isOwner={team.creatorId === userObj.uid} />
                    </div>
                ))}
            </div>
        </section>
    )

}

export default MyTeam;