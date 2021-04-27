import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PostFrame, ErrorPage } from '../pages'

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={PostFrame} />
            <Route path="/error" exact component={ErrorPage} />
            <Redirect to="/" />
        </Switch>
    )
}