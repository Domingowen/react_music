import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducer/';
import {createStore, applyMiddleware, compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
// import {createLogger} from 'redux-logger';
// const loggerMiddleware = createLogger({collapsed: true});
import PlayerAudio from './components/player/AudioPlayer';
const store = createStore(rootReducer, compose(composeWithDevTools()));

ReactDOM.render(
    <Provider store={store}>
        <div>
            <PlayerAudio/>
            <App />
        </div>
    </Provider>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
