import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
// import axios from 'axios';
export default class SingerTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [],
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.props.navList.length !== prevProps.navList.length) {
            this.setState({
                navList: this.props.navList
            })
        }
    }
    handleSelectNav (name, item) {
        console.log(name);
        console.log(item);
        let navList = this.state.navList.filter(val => {
            if (val.name === name) {
                val.list.forEach((val, index) => {
                    val.id === item.id? val.select = true : val.select = false;
                })
            }
            return val;
        });
        this.props.selectNav(name, item);
        this.setState({
            navList: navList
        })
    }
    render () {
        return (
            <div className={css(styles.container)}>
                {this.state.navList.length > 0 && this.state.navList.map((item, index) => {
                    return <ul className={css(styles.navList)} key={index}>
                        {item.list.map((val, index) => {
                            return <li
                                className={css(styles.navItem, val.select ? styles.navItem_active : null)}
                                key={index}
                                onClick={this.handleSelectNav.bind(this,item.name, val)}
                            >
                                {val.name}
                            </li>
                        })}
                    </ul>
                })}
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: '1100px',
        margin: '30px auto',
    },
    navList: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingBottom: '10px'
    },
    navItem: {
        marginRight: '10px',
        cursor: 'pointer',
        padding: '5px 10px',
        marginBottom: '10px',
        fontSize: '14px',
        ':hover': {
            color: '#31c27c'
        }
    },
    navItem_active: {
        color: '#fff',
        backgroundColor: '#31c27c',
        ':hover': {
            color: '#fff'
        }
    }
});