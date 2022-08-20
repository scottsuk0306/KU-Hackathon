import { useEffect ,useState} from "react";
import { useLocation } from "react-router-dom"
import React from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { dbService } from "fbase";
import { useParams } from "react-router-dom";
const TeamDetail=()=>{
    const [nweets, setNweets] = useState([

    ]);
    const [nweet,setNweet]=useState({
        goal:"목표",
        description:"상세 설명",
        mission:"가입 조건",
    });
        
    const id=useParams();
    /*useEffect(() => {
        onSnapshot(collection(dbService, "teamlist"), (snapshot) => {
            const teamArray = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }));
            setNweets(teamArray.reverse());
        }
        )
    }, []);
    console.log(nweets);
    setNweet(nweets.filter(nweet=>nweet.teamId===id.teamid)[0])
    if(nweet===null)return(
        <div>
            현재 데이터를 불러오고 있어요!
        </div>
    );else{*/
    return(
        <div>
            <ul>
                <li>{nweet.goal}</li>
                <li>{nweet.description}</li>
                <li>{nweet.mission}</li>
            </ul>
    </div>
    );
}

export default TeamDetail;