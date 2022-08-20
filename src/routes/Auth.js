import { authService} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
  } from "firebase/auth";
import AuthForm from "components/AuthForm";
import {
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./Auth.css"
const Auth = () => {
    
const onSocialClick=async(event)=>{
    const {target:{name},}=event;
    let provider;
    if(name==="google"){
        provider=new GoogleAuthProvider();
    }else if(name==="github"){
        provider=new GithubAuthProvider();
    }
    const data=await signInWithPopup(authService, provider);
    console.log(data);
}
    return (
    <div className="authContainer">
      <h1>THONers</h1>
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
}

export default Auth;