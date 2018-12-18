import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import musicBg from "../../assets/music_player_bg.jpg";
export default class DownLoad extends Component{
    render () {
        return (
            <div className={css(styles.container)}>
                iOS和安卓重新上线，预计是圣诞节前后，程序员小哥哥在疯狂加快速度修改了
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
        background: `url(${musicBg}) no-repeat center center`,
        height: '100%',
        width: '100%',
        // overflowY: 'scroll'
    }
});