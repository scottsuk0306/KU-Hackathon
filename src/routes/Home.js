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
        <>
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map((nweet)=>(
                    <div>
                    <Nweet nweetObj={nweet} key={nweet.id} isOwner={nweet.creatorId===userObj.uid}/>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Home;