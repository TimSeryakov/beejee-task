import React from 'react'
import {Redirect, Route, Switch } from 'react-router-dom'
import {Page404} from "./components/Page404/Page404";
import {Test} from "./components/Test/Test";

export const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/test'} render={ () => <Test/> }/>
                <Route path={"/404"} render={ () => <Page404/> }/>
                <Redirect from= '*' to="/404"/>
            </Switch>
        </div>
    )
}