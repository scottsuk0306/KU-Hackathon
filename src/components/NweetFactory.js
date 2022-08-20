import {ref,getStorage,uploadString, getDownloadURL} from "firebase/storage";
import {v4 as uuid} from "uuid";
import { dbService, storageService } from "fbase";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTimes } from "@fortawesome/free-solid-svg-icons";
const NweetFactory=(userObj)=>{
    const [attatchment, setAttatchment]=useState("");
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        if(nweet===""){
            return;
        }
        let fileUrl="";
        if(attatchment!==""){
        const storage = getStorage();
        const fileRef = ref(storage,  `${userObj.uid}/${uuid()}`);
        await uploadString(fileRef, attatchment, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!');
          });
        fileUrl=await getDownloadURL(ref(storageService,fileRef));
        }
        const newNweet={
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            fileUrl,
        }
        await addDoc(collection(dbService, "nweets"),newNweet||null);
            
        setNweet("");
        setAttatchment("");
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
    return(
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput_input" value={nweet}
                    type="text" placeholder="What's on your mind?"
                    onChange={onChange}
                    maxLength={120} />
                    <input type="submit" value="&rarr;" className="factoryInput__arrow"  />
            
                </div>
                <label htmlFor="attatch-file" className="factoryInput__label">
                    <span>Add Photos</span>
                    <FontAwesomeIcon icon={faPlus}/>
                </label>
                <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity:0,}}/>
                {attatchment && <div className="factoryForm__attachment">
                    <img src={attatchment} style={{
                        backgroundImage:attatchment,
                    }}  alt="uploaded img"/>
                    <div className="factoryForm__clear" onClick={onClearAttatchment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                    </div>}
            </form>

    )
};

export default NweetFactory;