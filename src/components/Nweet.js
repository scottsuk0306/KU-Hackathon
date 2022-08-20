import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { doc, deleteDoc,updateDoc} from "firebase/firestore";
import {  ref ,deleteObject} from "firebase/storage";
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
        <div>
            <h4>{teamObj.goal}</h4>
            <br></br>
            <h4>기간: {teamObj.date}</h4>
            <br></br>
            <h4>모집 인원:{teamObj.number}</h4>
            <br></br>
            <p>상세 설명:{teamObj.description}</p>
            <br></br>
        </div>

    )
}

export default Nweet;