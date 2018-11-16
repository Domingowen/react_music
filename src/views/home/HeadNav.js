import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import {NavLink} from 'react-router-dom';
export default class HeadNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [
                // {
                //     name: '首页',
                //     id: 1,
                //     url: '',
                // },
                {
                    name: '歌手',
                    id: 2,
                    url: '/home/singer',
                },
                {
                    name: '专辑',
                    id: 3,
                    url: '/home/album',
                },
                {
                    name: '排行榜',
                    id: 4,
                    url: '/home/range',
                },
                {
                    name: '分类歌单',
                    id: 5,
                    url: '/home/class',
                }
            ],
            selectNav: 0
        }
    }
    render () {
        return (
            <div className={css(styles.nav_container)}>
                <ul className={css(styles.nav_list)}>
                    <li className={css(styles.nav_txt)}>
                        <NavLink exact to='/home' className={css(styles.a)} activeClassName={css(styles.active)}>首页</NavLink>
                    </li>
                    {this.state.navList.map(val => <li key={val.id} className={css(styles.nav_txt)}>
                        <NavLink to={val.url} className={css(styles.a)} activeClassName={css(styles.active)}>{val.name}</NavLink>
                    </li>)}
                </ul>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    nav_container: {
        backgroundColor: '#fff',
    },
    nav_list: {
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        width: '1100px',
        justifyContent: 'center',
        fontSize: '16px',
        margin: '0 auto',
        borderTop: '1px solid #f1f1f1'
    },
    nav_txt: {
        color: '#333',
        width: '150px',
    },
    a: {
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c'
        }
    },
    active: {
        // backgroundColor: '#31c27c',
        color: '#31c27c',
        // ':hover':{
        //     // backgroundColor: '#31c27c',
        //     color: '#fff'
        // }
    }
});