import React, {Component} from 'react';
import './App.css';
import './common/reset.css';
import {hot} from 'react-hot-loader';
import Header from './components/header/index';
import {BrowserRouter as Router} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite';
import RouteList from './router';
import './assets/iconfont.css';
import PlayerAudio from './components/player/AudioPlayer'
class App extends Component {
    constructor (props) {
        super();
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <PlayerAudio/>
                    <Header/>
                    <div className={css(styles.container)}>
                        <RouteList/>
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
    }
});
export default hot(module)(App)
