import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Main from './Main';
import Detail from './Detail';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <Switch>
                <Route exact path={'/home'} component={Main}></Route>
                <Route exact path={'/home/detail'} component={Detail}></Route>
            </Switch>
        )
    }
}