import React, {Component} from 'react';
import './App.css';
import './common/reset.css';
import {hot} from 'react-hot-loader';
import Header from './components/header/index';
import {BrowserRouter as Router} from 'react-router-dom';
import RouteList from './router';
import {StyleSheet, css} from 'aphrodite';
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
                        <RouteList/>
                    </div>
                </div>
            </Router>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        minWidth: '1000px',
        height: 'calc(100vh - 90px)',
        // height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
});
export default hot(module)(App)
