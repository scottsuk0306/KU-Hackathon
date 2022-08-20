import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import {v4 as uuid} from "uuid";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import {ref,getStorage,uploadString} from "firebase/storage";
const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attatchment, setAttatchment]=useState();
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
        const storage = getStorage();
        const fileRef = ref(storage,  `${userObj.uid}/${uuid()}`);
        uploadString(fileRef, attatchment, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        });
       /* await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");*/
    };
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNweet(value);
    };
    const onFileChange=(event)=>{
        const {target:{files}}=event;
        const theFile=files[0];
        const reader=new FileReader();
        reader.onloadend=(finishedEvent)=>{
            const {currentTarget:{result},}=finishedEvent;
            setAttatchment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttatchment=()=>setAttatchment(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet}
                    type="text" placeholder="What's on your mind?"
                    onChange={onChange}
                    maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet" />
                {attatchment && <div>
                    <img src={attatchment} width="50px" height="50px" alt="uploaded img"/>
                    <button onClick={onClearAttatchment}>Clear photo</button>
                    </div>}
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