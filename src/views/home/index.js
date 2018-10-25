import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
export default class Home extends Component {
    render () {
        return (
            <div className={css(styles.container)}>
                希望你们会喜欢，保证本周出来音乐推荐页面，不然杀了程序祭天🤔<br/>
                需求请联系dooooomingo
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        // height: '200px',
        lineHeight: '100px',
        fontSize: '24px'
    }
});