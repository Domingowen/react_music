import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
export default class DownLoad extends Component{
    render () {
        return (
            <div className={css(styles.container)}>
                iOS和安卓即将上线
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // width: '1000px',
        // margin: '0 auto',
        textAlign: 'center',
        // height: '100vh',
        lineHeight: '400px',
        fontSize: '24px',
        // overflowY: 'scroll'
    }
});