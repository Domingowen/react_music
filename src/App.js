import React, {Component} from 'react';
import './App.css';
import './common/reset.css';
import {hot} from 'react-hot-loader';
import Header from './components/header/index';
import {BrowserRouter as Router} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite';
import RouteList from './router';
import './assets/iconfont.css';

class App extends Component {
    constructor (props) {
        super();
    }
    render() {
        return (
            <Router>
                <div className="App">

                    <Header/>
                    <div className={css(styles.container)}>
                        {/*<div className={css(styles.main)}>*/}
                            <RouteList/>
                        {/*</div>*/}
                    </div>
                </div>
            </Router>
        );
    }
    componentDidMount () {}
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
        // '::-webkit-scrollbar-track': {
        //     background: '#f1f1f1'
        // },
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
export default hot(module)(App)
