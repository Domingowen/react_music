import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
import axios from "axios";
import AlbumTitle from './AlbumTitle.js';
export default class AlbumList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            navList: [],
            area: 1,
            genre: -1,
            type: -1,
            sort: 2,
            sin: 0,
            num: 19,
            headerTitle: '内地'
        }
    }
    handleAlbumDetail (item) {
        console.log(item);
        this.props.history.push({
            pathname: '/home/detail',
            state: {
                item: item,
                type: 'album'
            }
        })
    }
    render () {
        return (
            <div className={css(styles.container)}>
                <AlbumTitle navList={this.state.navList} selectNav={this.handleSelect.bind(this)}/>
                <div className={css(styles.header)}>
                    <div className={css(styles.header_nav)}>
                        <div className={css(styles.header_left)}>
                            {this.state.headerTitle}
                        </div>
                        <div className={css(styles.header_right)}>
                            <ul className={css(styles.select_tab)}>
                                <li className={css(styles.select_items, this.state.sort === 2 ? styles.select_items_active_left : null)} onClick={this.handleSelectTab.bind(this, 2)}>最新</li>
                                <li className={css(styles.select_items, this.state.sort === 5 ? styles.select_items_active_right : null)} onClick={this.handleSelectTab.bind(this, 5)}>最热</li>
                            </ul>
                        </div>
                    </div>
                    <ul className={css(styles.item_list)}>
                        {
                            this.state.list.map(val => {
                                return <li className={css(styles.item)}
                                           key={val.album_mid}
                                           onClick={this.handleAlbumDetail.bind(this, val)}
                                >
                                    <div className={css(styles.item_img_container)}>
                                        <img
                                            className={css(styles.item_img) +' item_img_active'}
                                            src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${val.album_mid}.jpg?max_age=2592000`}
                                            alt=""/>
                                    </div>
                                    <p className={css(styles.item_txt, styles.item_title) + ' item_txt_active'}>{val.album_name}</p>
                                    <p className={css(styles.item_txt)}>{val.singers.map(item => {
                                        return val.singers.length > 1 ? item.singer_name + ' ' : item.singer_name
                                    })}</p>
                                    {/*<p className={css(styles.item_txt)}>{val.singers.length > 1 ? [...val.singers] : null}</p>*/}
                                    <p className={css(styles.item_txt)}>{val.public_time}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    handleSelect (id, item) {
        console.log(id, item);
        switch (id) {
            case 'area':
                this.setState({
                    area: item.id,
                    headerTitle: item.name
                }, () => {
                    this.getAlbumListData();
                });
                break;
            case 'type':
                this.setState({
                    type: item.id
                }, () => {
                    this.getAlbumListData();
                });
                break;
            case 'genre':
                this.setState({
                    genre: item.id
                }, () => {
                    this.getAlbumListData();
                });
                break;
        }
    }
    handleSelectTab (sort) {
        this.setState({
            sort: sort
        }, () => {
            this.getAlbumListData();
        })
    }
    getAlbumListData () {
        axios({
            method: 'post',
            url: 'http://192.168.0.131:20200/v1/music/album_list',
            data: {
                area: this.state.area,
                genre: this.state.genre,
                type: this.state.type,
                sort: this.state.sort,
                sin: this.state.sin,
                num: this.state.num
            }
        }).then(res => {
            let data = res.data.data.albumlib.data;
            this.setState({
                list: data.list
            })
        }).catch(err => {
            console.log(err);
        })
    }
    componentDidMount () {
        axios({
            method: 'post',
            url: 'http://192.168.0.131:20200/v1/music/album_list',
            data: {
                area: this.state.area,
                genre: this.state.genre,
                type: this.state.type,
                sort: this.state.sort,
                sin: this.state.sin,
                num: this.state.num
            }
        }).then(res => {
            let data = res.data.data.albumlib.data;
            console.log(data);
            data.tags.type[0].select = true;
            data.tags.area[0].select = true;
            data.tags.genre[0].select = true;
            let navList = [
                {
                    name: 'area',
                    list: data.tags.area,
                },
                {
                    name: 'type',
                    list: data.tags.type,
                },
                {
                    name: 'genre',
                    list: data.tags.genre,
                }
            ];
            this.setState({
                list: data.list,
                navList: navList,
            })
        }).catch(err => {
            console.log(err);
        })
    }
}
const styles = StyleSheet.create({
    container: {
        width: '1100px',
        margin: '0 auto'
    },
    header: {
        width: '1100px',
        margin: '0 auto',
    },
    header_nav: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '20px',
    },
    header_left: {
        fontSize: '30px',
    },
    header_right: {

    },
    select_tab: {
        display: 'flex',
        alignItems: 'center',
        height: '40px',
        border: '1px solid #c9c9c9',
        borderRadius: '3px'
    },
    select_items: {
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        width: '50px'
    },
    select_items_active_left: {
        backgroundColor: '#31c27c',
        border: '1px solid #31c27c',
        borderTopLeftRadius: '3px',
        borderBottomLeftRadius: '3px',
        color: '#fff',
        margin: '-1px 0 -1px -1px'
    },
    select_items_active_right: {
        backgroundColor: '#31c27c',
        border: '1px solid #31c27c',
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px',
        color: '#fff',
        margin: '-1px -1px -1px 0px'
    },
    item_list: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    item: {
        width: '20%',
        marginBottom: '30px',
        cursor: 'pointer',
        ':hover .item_txt_active': {
            color: '#31c27c'
        },
        ':hover .item_img_active': {
            transform: 'scale(1.1)'
        },
    },
    item_img_container: {
        width: '200px',
        height: '200px',
        overflow: 'hidden',
        marginBottom: '10px',
    },
    item_img: {
        width: '100%',
        height: '100%',
        transition: '0.5s all',
    },
    item_txt: {
        paddingBottom: '10px',
        color: '#999'
    },
    item_title: {
        color: '#000'
    }
});