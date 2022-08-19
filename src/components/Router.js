import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigatin from "./Navigation";
import Profile from "routes/Profile";
const AppRouter = ({ isLoggedIn ,userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigatin />}
            <switch>
                {isLoggedIn ?
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile/>
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