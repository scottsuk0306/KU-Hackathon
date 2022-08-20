import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigatin from "./Navigation";
import Profile from "routes/Profile";
import TeamView from "routes/TeamView";
const AppRouter = ({ isLoggedIn ,userObj,refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigatin userObj={userObj}/>}
            <switch>
                {isLoggedIn ?
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile refreshUser={refreshUser} userObj={userObj}/>
                        </Route>
                        <Route exact path="/teamview">
                            <TeamView userObj={userObj}/>
                        </Route>
                    </> :
                    <Route exact path="/">
                        <Auth />
                    </Route>
                }
            </switch>
        </Router>
    )
}

export default AppRouter;