import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
export default class DownLoad extends Component{
    render () {
        return (
            <div className={css(styles.container)}>
                这个页面，因为穷，没有设计，就是产品跟程序员，你们凑合看看😢😢😢往下滚👇👇<br/>
                我们的手机端App👇👇👇👇👇👇<br/>
                已经在测试中了👇👇👇👇👇👇👇不是在开发中，是在测试<br/>
                ios和安卓都有，很稳👇👇👇👇👇👇👇👇<br/>
                音乐数据来源全球，很稳👇👇👇👇👇👇👇👇<br/>
                目测还要几天上线💪💪💪💪💪💪<br/>
                请体谅开发🙏🙏🙏🙏🙏多给他两个鸡腿🍗吧<br/>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        height: '400px',
        lineHeight: '400px',
        fontSize: '24px'
    }
});