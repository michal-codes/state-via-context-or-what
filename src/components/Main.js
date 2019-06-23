import React from 'react'
import { Switch, Route } from 'react-router-dom'
import About from './pages/About'
import LandingPage from './pages/LandingPage'

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/about" component={About} />
    </Switch>
  )
}

export default Main
