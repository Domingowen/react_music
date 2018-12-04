import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
import SingerTitle from './SingerTitle.js';
import axios from "axios";
import Player from "../../../redux/reducer/player";
export default class SingerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            navList: [],
            alphabet_select: -100,
            area_select: -100,
            genre_select: -100,
            sex_select: -100,
            cur_page: 1,
            sin: 0
        }
    }
    handleSelect (id, item) {
        // console.log(id, item);
        switch (id) {
            case 'alphabet':
                this.setState({
                    alphabet_select: item.id
                }, () => {
                    this.getSingerListData();
                });
                break;
            case 'area':
                this.setState({
                    area_select: item.id
                }, () => {
                    this.getSingerListData();
                });
                break;
            case 'sex':
                this.setState({
                    sex_select: item.id
                }, () => {
                    this.getSingerListData();
                });
                break;
            case 'genre':
                this.setState({
                    genre_select: item.id
                }, () => {
                    this.getSingerListData();
                });
                break;
        }
        // console.log(this.state);
    }
    getSingerListData () {
        axios({
            method: 'post',
            url: 'http://192.168.0.122:20200/v1/music/singer_list',
            data: {
                area: this.state.area_select,
                sex: this.state.sex_select,
                genre: this.state.genre_select,
                alphabet: this.state.alphabet_select,
                sin: this.state.sin,
                cur_page: this.state.cur_page
            }
        }).then(res => {
            let data = res.data.data.singerList.data;
            this.setState({
                list: data.singerlist
            })
        })
    }
    selectSinger (items) {
        console.log(items);
    }
    componentDidMount () {
        axios({
            method: 'post',
            url: 'http://192.168.0.122:20200/v1/music/singer_list',
            data: {
                area: this.state.area_select,
                sex: this.state.sex_select,
                genre: this.state.genre_select,
                alphabet: this.state.alphabet_select,
                sin: this.state.sin,
                cur_page: this.state.cur_page
            }
        }).then(res => {
            let data = res.data.data.singerList.data;
            data.tags.index[0].select = true;
            data.tags.area[0].select = true;
            data.tags.sex[0].select = true;
            data.tags.genre[0].select = true;
            let navList = [
                {
                    name: 'alphabet',
                    list: data.tags.index,
                },
                {
                    name: 'area',
                    list: data.tags.area,
                },
                {
                    name: 'sex',
                    list:  data.tags.sex
                },
                {
                    name: 'genre',
                    list: data.tags.genre,
                }
            ];
            this.setState({
                list: data.singerlist,
                navList: navList,
            })
        }).catch(err => {
            console.log(err);
        })
    }
    render () {
        return (
            <div className={css(styles.container)}>
                <SingerTitle selectNav={this.handleSelect.bind(this)} navList={this.state.navList}/>
                <ul className={css(styles.list)}>
                    {this.state.list.length > 0 && this.state.list.map((val, index) => {
                        if (index < 10) {
                            return <li className={css(styles.item)} onClick={this.selectSinger.bind(this, val)}>
                                <div className={css(styles.img_container)}>
                                    <img className={css(styles.img) + ' img_active'} onError={(event) => {
                                        console.log(event);
                                        event.src = '//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=2592000';
                                    }} src={`//y.gtimg.cn/music/photo_new/T001R300x300M000${val.singer_mid}.jpg?max_age=2592000`} alt=""/>
                                </div>
                                <p className={css(styles.singer_name)}>{val.singer_name}</p>
                            </li>
                        }
                    })}
                </ul>
                <ul className={css(styles.list, styles.list_txt)}>
                    {this.state.list.length > 0 && this.state.list.map((val, index) => {
                        if (index > 9) {
                            return <li className={css(styles.item)} onClick={this.selectSinger.bind(this, val)}>
                                <p className={css(styles.singer_name)}>{val.singer_name}</p>
                            </li>
                        }
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
    list: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    list_txt: {
        paddingTop: '50px',
        paddingBottom: '30px'
    },
    item: {
        width: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '15px 0',
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c'
        },
        ':hover .img_active': {
            transform: 'scale(1.2)'
        }
    },
    // item_text: {
    //     paddingTop: '50px'
    // },
    img_container: {
        width: '120px',
        height: '120px',
        overflow: 'hidden',
        borderRadius: '50%',

    },
    img: {
        width: '100%',
        height: '100%',
        transition: '0.5s all',
        background: 'url()'
    },
    singer_name: {
        paddingTop: '10px'
    }
});