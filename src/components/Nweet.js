import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
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
    const onSubmit = (event) => {
        event.preventDefault();
        updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    }
    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input onChange={onChange} type="text" placeholder="Edit your nweet" value={newNweet} autoFocus className="formInput" required />
                        <input type="submit" value="update nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancleBtn">CANCEL</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.fileUrl && <img src={nweetObj.fileUrl} width="50px" height="50px" />}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}

        </div>

    )
}

export default Nweet;