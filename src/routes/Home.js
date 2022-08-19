import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs,onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
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
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNweet(value);
    };
    console.log(nweets)
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet}
                    type="text" placeholder="What's on your mind?"
                    onChange={onChange}
                    maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
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