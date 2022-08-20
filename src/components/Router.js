import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import ProfileCard from 'routes/ProfileCard'
import Navigation from 'components/Navigation'
import TeamView from 'routes/TeamView'
import TeamDetail from 'routes/TeamDetail'
const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: '100%',
              margin: '0 auto',
              marginTop: 80,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Route exact path='/'>
              <Home userObj={userObj} />
            </Route>
            <Route exact path='/profile'>
              <ProfileCard
                name="Rita Correia"
                age="32"
                city="Backend Developer"
                followers="80K"
                likes="803K"
                photos="1.4K"/>
            </Route>
            <Route exact path='/teamview'>
              <TeamView userObj={userObj} />
            </Route>
            <Route exact path='/teamdetail/:teamid' component={TeamDetail}>
              <TeamDetail userObj={userObj} />
            </Route>
          </div>
        ) : (
          <>
            <Route exact path='/'>
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  )
}
export default AppRouter
