import { dbService } from "fbase";
import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this Team?");

        if (ok) {
            deleteDoc(doc(dbService, "nweets", nweetObj.id));
        }
        else {

        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit=(event)=>{
        event.preventDfault();
    }
    const onChange =(event)=>{
        const {
            target:{value},}
            =event;
    }
    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onsubmit}>
                <input onChange={onchange} type="text" placeholder="what is your editing" value={newNweet} required />
                <input type="submit" value="update nweet"/>
                </form>
                <button onClick={toggleEditing}>CANCEL</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
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