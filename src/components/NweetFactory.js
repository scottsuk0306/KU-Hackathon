import {ref,getStorage,uploadString, getDownloadURL} from "firebase/storage";
import {v4 as uuid} from "uuid";
import { dbService, storageService } from "fbase";
import { useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
const NweetFactory=(userObj)=>{
    const [attatchment, setAttatchment]=useState("");
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
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
        await addDoc(collection(dbService, "nweets"),newNweet);
            
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
        <form onSubmit={onSubmit}>
                <input value={nweet}
                    type="text" placeholder="What's on your mind?"
                    onChange={onChange}
                    maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet" />
                {attatchment && <div>
                    <img src={attatchment} width="50px" height="50px" alt="uploaded img"/>
                    <button onClick={onClearAttatchment}>Clear photo</button>
                    </div>}
            </form>

    )
};

export default NweetFactory;