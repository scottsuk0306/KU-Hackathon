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
        <section className="container">
            <div className="movies">
                {nweets.map((nweet) => {
                    return (
                        <Link to={`/teamdetail/${nweet.teamId}`}>
                        <Nweet teamObj={nweet} key={nweet.teamId} isOwner={nweet.creatorId === userObj.uid} />
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
export default Home;