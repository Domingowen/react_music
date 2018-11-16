import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
export default class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleList: [
                {
                    item_name: '为你推荐',
                    item_id: 0
                },
                {
                    item_name: '为你推荐',
                    item_id: 1
                },
                {
                    item_name: '为你推荐',
                    item_id: 2
                },
                {
                    item_name: '为你推荐',
                    item_id: 3
                }
            ],
            titleSelect: 0,
        }
    }
    handleSelectTitle (index, id) {
        this.setState({
            titleSelect: index
        })
    }
    render () {
        return (
            <div className={css(styles.title_container)}>
                <div className={css(styles.title)}>
                    歌单推荐
                </div>
                <ul className={css(styles.menu)}>
                    {
                        this.state.titleList.map((val, index) => {
                            return <li key={index} className={css(styles.menu_item, this.state.titleSelect === index ? styles.menu_item_active : null)} onClick={this.handleSelectTitle.bind(this, index, val.item_id)}>{val.item_name}</li>
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