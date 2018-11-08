import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite';
export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [
                {
                    title: '音乐推荐',
                    url: '/home',
                    id: 0,
                },
                {
                    title: '播放器',
                    url: '/player',
                    id: 1,
                },
                {
                    title: '播放历史',
                    url: '/list',
                    id: 2,
                },
                {
                    title: '音乐搜索',
                    url: '/search',
                    id: 3,
                },
                {
                    title: '客户端下载',
                    url: '/app',
                    id: 4,
                }
            ]
        }
    }

    render () {
        return (
            <ul className={css(styles.nav)}>
                {this.state.navList.map(val => <li key={val.id} className={css(styles.nav_item)}>
                    <NavLink to={val.url} className={css(styles.a)} activeClassName={css(styles.active)}>{val.title}</NavLink>
                </li>)}
            </ul>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    nav_item: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        // backgroundColor: '#31c27c'
    },
    a: {
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        cursor: 'pointer',
        padding: '0 20px',
        fontSize: '18px',
    },
    active: {
        // backgroundColor: '#31c27c',
        color: '#31c27c'
    }
});