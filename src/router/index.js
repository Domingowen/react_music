import {Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import Home from '../views/home';
import List from '../views/list';
import Player from '../views/player';
import Search from '../views/search';
import DownLoad from '../views/download';
const RouterList = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/list',
        component: List,
        name: 'list'
    },
    {
        path: '/player',
        component: Player,
        name: 'player'
    },
    {
        path: '/search',
        component: Search,
        name: 'search'
    }
];

export default class RouteList extends Component {
    render () {
        return (
            <Switch>
                {/*{*/}
                    {/*RouterList.map(val => {*/}
                        {/*return <Route path={val.path} component={val.component} key={val.name}/>*/}
                    {/*})*/}
                {/*}*/}
                <Route exact path='/' component={Home} />
                <Route path='/player' component={Player} />
                <Route path='/list' component={List} />
                <Route path='/search' component={Search} />
                <Route path='/app' component={DownLoad} />
            </Switch>
        )
    }
}