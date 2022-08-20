import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import { ref, getStorage, uploadString, getDownloadURL } from "firebase/storage";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import TeamDetail from "./TeamDetail";
const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);
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
                            <Nweet teamObj={nweet} key={nweet.teamId} isOwner={nweet.creatorId === userObj.uid} />
                            <Link to={`/teamdetail/${nweet.teamId}`}>
                                <span>참여하기</span>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Home;