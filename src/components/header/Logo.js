import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import logo from '../../assets/logo20181008.png';
export default class Logo extends Component {
    componentWillMount () {}
    render () {
        return (
            <div className={css(styles.container)}>
                <img className={css(styles.logo)} src={logo} alt=""/>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        // fontSize: '30px',
        // fontStyle: 'bold',
        // width: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        // width: '200px',
        // height: '100px'
    }
});