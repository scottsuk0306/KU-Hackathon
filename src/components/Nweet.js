import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { doc, deleteDoc,updateDoc} from "firebase/firestore";
import {  ref ,deleteObject} from "firebase/storage";
const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this Team?");

        if (ok) {
            deleteDoc(doc(dbService, "nweets", nweetObj.id));
            const fileRef = ref(storageService, nweetObj.fileUrl);
            deleteObject(fileRef);
        }
        else {

        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit=(event)=>{
        event.preventDefault();
        updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });
    }
    const onChange =(event)=>{
        const {
            target:{value},
        }=event;
        setNewNweet(value);
    }
    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="what is your editing" value={newNweet} required />
                <input type="submit" value="update nweet"/>
                </form>
                <button onClick={toggleEditing}>CANCEL</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.fileUrl && <img src={nweetObj.fileUrl} width="50px" height="50px"/>}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}

        </div>

    )
}

export default Nweet;