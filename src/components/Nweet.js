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
                <h2 className="movie__title">{teamObj.goal}</h2>
                <h3 className="movie__year">기간: {teamObj.dueDate}</h3>
                <h4 className="movie__year">모집 인원:{teamObj.number}</h4>
                <p className="movie__summary">상세 설명:{teamObj.description}</p>
            </div>
        </div>

    )
}

export default Nweet;