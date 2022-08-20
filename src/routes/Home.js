import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";

import NweetFactory from "components/NweetFactory";
const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);
    
    useEffect(() => {
        onSnapshot(collection(dbService, "nweets"), (snapshot) =>{
            const nweetArray=snapshot.docs.map((doc)=>(
                {
                    id:doc.id,
                    ...doc.data(),
                }));
                setNweets(nweetArray.reverse());
        }
        )
    }, []);
    
    return (
        <div className="container">
            <NweetFactory userObj={userObj}/>
            <div style={{marginTop:30}}>
                {nweets.map((nweet)=>(
                    <div>
                    <Nweet nweetObj={nweet} key={nweet.id} isOwner={nweet.creatorId===userObj.uid}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home;