import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
export default class Logo extends Component {
    componentWillMount () {}
    render () {
        return (
            <div className={css(styles.container)}>
                菲哩咕
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // height: '100%',
        fontSize: '30px',
        fontStyle: 'bold',
    }
});