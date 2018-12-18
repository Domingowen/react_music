import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './Main';
import Detail from './Detail';
import HeadNav from './HeadNav.js';
import SingerList from './children/SingerList.js';
import ClassList from './children/ClassList.js';
import RangeList from './children/RangeList.js';
import AlbumList from './children/AlbumList.js';
import SingerDetail from './singerDetailChildren/SingerIndex.js';
import UpToTop from "../../components/UpToTop";
import {StyleSheet, css} from 'aphrodite';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.containerRef = null;
        this.state = {
            containerRef: null
        }
    }
    componentDidMount() {
        this.containerRef && this.setState({containerRef: true})
    }
    render () {
        return (
            <div className={css(styles.container)} ref={elem => this.containerRef = elem}>
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
                {
                    this.state.containerRef ?
                        <UpToTop refEle={this.containerRef}/> : null
                }
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        minWidth: '1000px',
        height: 'calc(100vh - 90px)',
        // height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        '::-webkit-scrollbar': {
            width: '5px',
            backgroundColor: '#f1f1f1',
            borderBottomRightRadius: '5px',
        },
        '::-webkit-scrollbar-thumb': {
            background: '#31c27c',
            borderRadius: '10px',
        },
        '::-webkit-scrollbar-button:start': {
            display: 'none'
        },

        '::-webkit-scrollbar-button:end': {
            display: 'none'
        }
    },
    main: {
        width: '1000px',
        height: '100%',
        margin: '0 auto',
    }
});