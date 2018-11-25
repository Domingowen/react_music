import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
export default class ClassTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [],
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.props.classList.length !== prevProps.classList.length) {
            this.setState({
                navList: this.props.classList.splice(1,6)
            })
        }
        if (!this.props.selectTitle && this.props.selectTitle !== prevProps.selectTitle) {
            console.log(this.state.navList);
            let data = this.state.navList.filter((val, index) => {
                val.items.forEach((item, index) => {
                    item.select = false
                });
                return val;
            });
            this.setState({
                navList: data
            })
        }
    }
    handleSelectClick (items) {
        // console.log(items.categoryId);
        let navList = this.state.navList.filter((val, index) => {
            val.items.forEach((item, index) => {
                // console.log(item.categoryId);
                item.categoryId === items.categoryId ? item.select = true : item.select = false;
            });
            return val;
        });
        // console.log(navList);
        this.setState({
            navList: navList
        });
        this.props.handleChangeClass(items);
    }
    render () {
        return (
            <div className={css(styles.container)}>
                {this.state.navList.length > 0 && this.state.navList.map((item, index) => {
                    return <div className={css(styles.list)} key={index}>
                            <span className={css(styles.list_head)}>{item.categoryGroupName}</span>
                            <ul className={css(styles.list_items)}>
                                {item.items.map((val, index) => {
                                   return <li
                                       key={index}
                                       className={css(styles.list_text, val.select ? styles.list_text_active: null)}
                                       onClick={this.handleSelectClick.bind(this, val)}
                                       dangerouslySetInnerHTML={{__html: val.categoryName}}></li>
                                })}
                            </ul>
                    </div>
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
    list: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingBottom: '10px',
    },
    list_head: {
        marginRight: '30px',
        color: '#999',
        fontSize: '14px',
    },
    list_items: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        // paddingBottom: '10px'
    },
    list_text: {
        marginRight: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '5px 10px',
        ':hover': {
            color: '#31c27c'
        }
    },
    list_text_active: {
        color: '#fff',
        backgroundColor: '#31c27c',
        ':hover': {
            color: '#fff'
        }
    }
});