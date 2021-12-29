import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './protectedRoute'
import HomePage from './Pages/Home/Home';
import ChatPage from './Pages/Chat/Chat';
// import Page404 from './Pages/Helper/404';


export default function Routing() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/chat" exact component={ChatPage} />
      {/* <Route path="*" component={Page404} /> */}
    </Switch>
  )
}
