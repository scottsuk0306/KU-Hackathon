import { useEffect } from "react";
import { faGithub} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const User=(userInfo)=>{
    useEffect(()=>{
        console.log(userInfo);
    })
    return(
        
    <div className="user">
        <h5>이름: {userInfo.userInfo.name}</h5>
        <a href={userInfo.userInfo.github} target="_blank">
            깃허브 방문하기 <FontAwesomeIcon icon={faGithub}/>
        </a>
        <p>{userInfo.userInfo.ment}</p>
    </div>
    )
}

export default User;