import React from 'react'
import {Redirect, Route, Switch } from 'react-router-dom'
import {Page404} from "./components/Page404/Page404";

export const App = () => {
    return (
        <div>
            <h1 className="text-blue-800 text-2xl">Hello</h1>
            <Switch>
                {/*<Route exact path={'/'} render={ }/>*/}
                <Route path={"/404"} render={ () => <Page404/> }/>
                <Redirect from= '*' to="/404"/>
            </Switch>
        </div>
    )
}