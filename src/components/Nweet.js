import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { doc, deleteDoc,updateDoc} from "firebase/firestore";
import { ref ,deleteObject} from "firebase/storage";
import "./Nweet.css"
const Nweet = ({ teamObj, isOwner }) => {
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this Team?");

        if (ok) {
            deleteDoc(doc(dbService, "teamlist", teamObj.id));
        }
        else {

        }
    }
    return (
        <div className="movie">
            <div className="movie__data">
                <h3 className="movie__title">{teamObj.goal}</h3>
                <h5 className="movie__year">기간: {teamObj.dueDate}</h5>
                <h4 className="movie__year">모집 인원:{teamObj.number}</h4>
                <p className="movie__summary">{teamObj.description.slice(0, 140)}...</p>
            </div>
        </div>

    )
}

export default Nweet;