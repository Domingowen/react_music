import React, {Component} from 'react';
import Logo from './Logo';
import Nav from './Nav';
import Search from './Search';
import { StyleSheet, css } from 'aphrodite'
export default class Header extends Component {
    constructor (props) {
        super();
    }
    componentWillMount () {

    }
    render () {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.header)}>
                    <Logo/>
                    <Nav/>
                    {/*<Search/>*/}
                </div>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        minWidth: '1000px',
        backgroundColor: '#fff',
        height: '90px',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        // borderTopLeftRadius: '5px',
        // borderTopRightRadius: '5px',
    },
    header: {
        width: '1000px',
        height: '100%',
        margin: '0 auto',
        borderBottom: '1px solid #f2f2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '20px'
    }
});