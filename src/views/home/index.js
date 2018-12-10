import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Main from './Main';
import Detail from './Detail';
import HeadNav from './HeadNav.js';
import SingerList from './children/SingerList.js';
import ClassList from './children/ClassList.js';
import RangeList from './children/RangeList.js';
import AlbumList from './children/AlbumList.js';
import SingerDetail from './singerDetailChildren/SingerIndex.js';
export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <HeadNav/>
                <Switch>
                    <Route exact path={'/home'} component={Main}></Route>
                    <Route exact path={'/home/detail'} component={Detail}></Route>
                    <Route exact path={'/home/singer'} component={SingerList}></Route>
                    <Route exact path={'/home/album'} component={AlbumList}></Route>
                    <Route exact path={'/home/range'} component={RangeList}></Route>
                    <Route exact path={'/home/class'} component={ClassList}></Route>
                    <Route exact path={'/home/singer_detail'} component={SingerDetail}></Route>
                </Switch>
            </div>
        )
    }
}