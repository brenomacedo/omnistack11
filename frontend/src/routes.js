import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'

import Logon from './pages/logon/index'
import Register from './pages/register/index' 
import Profile from './pages/profile/index'
import NewIncident from './pages/newincident/index'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Logon} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />
                <Route path='/incidents/new' component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
}