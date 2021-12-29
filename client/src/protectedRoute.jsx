import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route { ...rest }
      render={(props) => {
        if (sessionStorage.getItem('loginStatus') === "loggedIn" && props.location.state !== undefined){
          return <Component {...props} />
        }
        else {
          return <Redirect 
            to={{
              pathname: '/',
            }}
          />
        }
      }}
    />
  )
}

