import React from "react";
import { Link } from "react-router-dom";
const Navigatin=({userObj})=><nav>
    <ul>
        <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/profile">{userObj.displayName}의 profile</Link>
            </li>
    </ul>
</nav>;

export default Navigatin;