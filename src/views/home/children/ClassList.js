import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
import ClassTitle from './ClassTitle.js';
import axios from 'axios';
export default class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagList: [],
            list: [],
            selectTitle: null,
            categoryId: 10000000,
            sin: 0,
            ein: 29,
            sortId: 5
        }
    }
    componentDidMount () {
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/class_tag',
            data: {}
        }).then(res => {
            this.setState({
                tagList: res.data.data.data.categories
            })
        }).catch(err => {
            console.log(err);
        });
        this.getClassList();
    }
    getClassList () {
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/class_list',
            data: {
                categoryId: this.state.categoryId,
                sin: this.state.sin,
                ein: this.state.ein,
                sortId: this.state.sortId,
            }
        }).then(res => {
            console.log(res.data.data.data.list);
            this.setState({
                list: res.data.data.data.list
            })
        }).catch(err => {
            console.log(err);
        });
    }
    handleChangeClass (item) { // 切换类目
        console.log(item);
        this.setState({
            selectTitle: item.categoryName,
            categoryId: item.categoryId
        }, this.getClassList)
    }
    handleChangeTag (sortId) {
        this.setState({
            sortId: sortId
        }, this.getClassList)
    }
    handleClassDetail (item) {
        console.log(item);
    }
    handleClean () { // 恢复默认状态
        this.setState({
            selectTitle: null,
            sortId: 5,
            categoryId: 10000000
        }, this.getClassList)
    }
    render () {
        return (
            <div className={css(styles.container)}>
                <ClassTitle classList={this.state.tagList} selectTitle={this.state.selectTitle} handleChangeClass={this.handleChangeClass.bind(this)}/>
                <div className={css(styles.header)}>
                    <div>
                        <span className={css(styles.header_title)}>{this.state.selectTitle ? this.state.selectTitle : '全部歌单'}</span>
                        {this.state.selectTitle && <span className={css(styles.header_clean)} onClick={this.handleClean.bind(this)}>切换全部歌单</span>}
                    </div>
                    <ul className={css(styles.header_tag)}>
                        <li
                            className={css(styles.header_item, this.state.sortId=== 5 ? styles.header_item_left_active : null)}
                            onClick={this.handleChangeTag.bind(this, 5)}>推荐</li>
                        <li
                            className={css(styles.header_item,  this.state.sortId=== 2 ? styles.header_item_right_active : null)}
                            onClick={this.handleChangeTag.bind(this, 2)}>最新</li>
                    </ul>
                </div>
                <ul className={css(styles.list)}>
                    {this.state.list.length > 0 && this.state.list.map((val, index) => {
                        return <li className={css(styles.list_item)} key={index} onClick={this.handleClassDetail.bind(this, val)}>
                            <div className={css(styles.list_item_img_container)}>
                                <img className={css(styles.list_item_img) + ' list_item_img_active'} src={val.imgurl} alt=""/>
                            </div>
                            <p className={css(styles.list_item_name)}>{val.dissname}</p>
                            <p className={css(styles.list_item_author)}>{val.creator.name}</p>
                            <p className={css(styles.list_item_playNum)}>播放量：{val.listennum}</p>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: '1100px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    header_title: {
        fontSize: '26px',
    },
    header_clean: {
        fontSize: '14px',
        paddingLeft: '30px',
        color: '#999',
        cursor: 'pointer',
        ":hover": {
            color: '#31c27c'
        }
    },
    header_tag: {
        display: 'flex',
        border: '1px solid #c9c9c9',
        width: '130px',
        height: '40px',
        alignItems: 'center',
        borderRadius: '3px',
    },
    header_item: {
        width: '75px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    header_item_left_active: {
        backgroundColor: '#31c27c',
        border: '1px solid #31c27c',
        color: '#fff',
        margin: '-1px 0 -1px -1px',
        borderTopLeftRadius: '3px',
        borderBottomLeftRadius: '3px',
    },
    header_item_right_active: {
        backgroundColor: '#31c27c',
        border: '1px solid #31c27c',
        color: '#fff',
        margin: '-1px -1px -1px 0px',
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px',
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    list_item: {
        cursor: 'pointer',
        width: '20%',
        marginBottom: '40px',
        ':hover': {
            color: '#31c27c'
        },
        ':hover .list_item_img_active': {
            transform: 'scale(1.1)'
        }
    },
    list_item_img_container: {
        width: '200px',
        height: '200px',
        overflow: 'hidden',
        marginBottom: '10px',

    },
    list_item_img: {
        width: '200px',
        height: '200px',
        transition: '0.5s all'
    },
    list_item_name: {
        marginBottom: '8px',
        width: '200px'
    },
    list_item_author: {
        color: '#999',
        marginBottom: '8px'
    },
    list_item_playNum: {
        color: '#999',
    }
});