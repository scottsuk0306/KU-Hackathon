import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import { ref, getStorage, uploadString, getDownloadURL } from "firebase/storage";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attatchment, setAttatchment] = useState("");
    useEffect(() => {
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

    return (
        <div>
            <h1>현재 모집중인 팀들</h1>
            <br></br>
            <ul>
                {nweets.map((nweet) => (
                    <li>
                        <div className="nweet">
                            <Nweet teamObj={nweet} key={nweet.id} isOwner={nweet.creatorId === userObj.uid} />
                            <Link to='/teamdetail'>
                            <button>Participate</button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Home;