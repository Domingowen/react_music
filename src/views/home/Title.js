import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
export default class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleList: [],
            titleSelect: 0,
            title: null
        }
    }
    handleSelectTitle (index, id) {
        this.setState({
            titleSelect: index
        });
        this.props.handleSelect(index, id);
    }
    componentDidUpdate (prevProps, prevState) {
        // console.log(this.props);
        // console.log(prevProps);
        if (this.props.nav.length !== prevProps.nav.length) {
            this.setState({
                titleList: this.props.nav
            })
        }
    }
    componentDidMount () {
        this.setState({
            title: this.props.title
        })
    }

    render () {
        return (
            <div className={css(styles.title_container)}>
                <div className={css(styles.title)}>
                    {this.state.title}
                </div>
                <ul className={css(styles.menu)}>
                    {
                        this.state.titleList.map((val, index) => {
                            return <li key={index}
                                       className={css(styles.menu_item, this.state.titleSelect === index ? styles.menu_item_active : null)}
                                       onClick={this.handleSelectTitle.bind(this, index, val)}
                            >{val.item_name}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    title_container: {
        width: '1100px',
        margin: '0 auto',
    },
    title: {
        height: '100px',
        lineHeight: '100px',
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'bold',
        letterSpacing: '10px'
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu_item: {
        padding: '0 30px',
        fontSize: '20px',
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c'
        }
    },
    menu_item_active: {
        color: '#31c27c'
    },
});