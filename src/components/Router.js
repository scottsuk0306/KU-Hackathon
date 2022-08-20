import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigatin from "./Navigation";
import Profile from "routes/Profile";
const AppRouter = ({ isLoggedIn ,userObj,refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigatin userObj={userObj}/>}
            <switch>
                {isLoggedIn ?
                    <div 
                    style={{
                        maxwidth:890,
                        width:"100%",
                        margin:"0 auto",
                        marginTop:80,
                        display:"flex",
                        justifyContent:"center",
                    }}>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile refreshUser={refreshUser} userObj={userObj}/>
                        </Route>
                    </div> :
                    <Route exact path="/">
                        <Auth />
                    </Route>
                }
            </switch>
        </Router>
    )
}

export default AppRouter;