import React from "react";
import "./ProfileCard.css";
import avatar from "../images/image-rita.png";
import { authService } from "fbase";
import {useHistory} from 'react-router-dom';
function ProfileCard(props) {
	const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut()
    history.push('/');
  };
	return (
		<div className="profile">
		<div className="card-container">
			<header>
				<img src={avatar} alt={props.name} />
			</header>
			<h1 className="bold-text">
				{props.name} <span className="normal-text">{props.age}</span>
			</h1>
			<h2 className="normal-text">{props.city}</h2>
			<div className="social-container">
				<div className="followers">
					<h1 className="bold-text">{props.followers}</h1>
					<h2 className="smaller-text">Followers</h2>
				</div>
				<div className="likes">
					<h1 className="bold-text">{props.likes}</h1>
					<h2 className="smaller-text">Likes</h2>
				</div>
				<div className="photos">
					<h1 className="bold-text">{props.photos}</h1>
					<h2 className="smaller-text">Photos</h2>
				</div>
			</div>
			
		</div>
		<button className="logoutBtn" onClick={onLogOutClick}>Log Out</button>
		</div>
	);
}

export default ProfileCard;