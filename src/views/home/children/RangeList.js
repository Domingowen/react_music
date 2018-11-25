import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
import axios from 'axios';
import Icon from "antd/lib/icon";
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_4mhmkt79fw5.js'
});
export default class RangeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [],
            navSelect: 0,
            navTitle: null,
            date: null,
            topId: null,
            begin: 0,
            list: []
        }
    }
    componentDidMount () {
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/range_nav',
            data: {}
        }).then(res => {
            // console.log(res)
            this.setState({
                navList: res.data.data,
                date: res.data.data[0].List[0].showtime,
                topId: res.data.data[0].List[0].topID,
                navTitle: res.data.data[0].List[0].ListName
            }, () => {
                // console.log(this.state.navList);
                // console.log(this.state.data);
                // console.log(this.state.topId);
                this.changeRangList();
            })
        }).catch(err => {
            console.log(err)
        });
    }
    changeRangList () {
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/range_list',
            data: {
                date: this.state.date,
                topId: this.state.topId,
                begin: this.state.begin
            }
        }).then(res => {
            console.log(res.data.data);
            let data = res.data.data;
            this.setState({
                list: data.songlist
            })
        }).catch(err => {
            console.log(err)
        })
    }
    selectNav (index, val) {
        console.log(val);
        this.setState({
            navSelect: index,
            navTitle: val.ListName,
            topId: val.topID,
            date:val.showTime,
        }, this.changeRangList)
    }
    timeFormat (time) {
        let hour = parseInt(time / 3600);
        let min = parseInt((time / 60) % 60);
        let sec = parseInt(time % 60);
        let currentMin = '';
        let currentSec = '';
        if (min < 10) {
            currentMin = `0${min}`;
        } else {
            currentMin = min;
        }
        if (sec < 10) {
            currentSec = `0${sec}`;
        } else {
            currentSec = sec;
        }
        return `${currentMin}:${currentSec}`;
    }
    render () {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.nav_left)}>
                    <div className={css(styles.nav_title)}>
                        巅峰榜
                    </div>
                    <ul>
                        {this.state.navList.length > 0 && this.state.navList[0].List.map((val, index) => {
                            return <li
                                className={css(styles.nav_list_items, this.state.navSelect === index ? styles.nav_list_items_active: null)}
                                key={index}
                                onClick={this.selectNav.bind(this, index, val)}
                            >{val.ListName}</li>
                        })}
                    </ul>
                </div>
                <div className={css(styles.nav_right)}>
                    <div className={css(styles.list_title)}>{this.state.navTitle}</div>
                    <div className={css(styles.list_btn)}>播放全部</div>
                    <div className={css(styles.list_header)}>
                        <p className={css(styles.list_title_song)}>歌曲</p>
                        <p className={css(styles.list_title_singer)}>歌手</p>
                        <p className={css(styles.list_title_time)}>时长</p>
                    </div>
                    <ul>
                        {this.state.list.map((val, index) => {
                            return <li className={css(styles.list_item)} key={index}>
                                <div className={css(styles.list_item_song)}>
                                    <img className={css(styles.list_item_img)} src={`//y.gtimg.cn/music/photo_new/T002R150x150M000${val.data.albummid}.jpg?max_age=2592000`} alt=""/>
                                    <span className={css(styles.list_item_name)}>{val.data.songname}{val.data.albumdesc}</span>
                                    <div className={css(styles.list_control_play)}>
                                        <IconFont type={'icon-zanting8'} className={css(styles.list_item_icon) + ' list_item_active'}/>
                                        <IconFont type={'icon-tianjia2'} className={css(styles.list_item_icon) + ' list_item_active'}/>
                                    </div>
                                </div>
                                <div className={css(styles.list_item_singer)}>
                                    {val.data.singer.map(val => val.name)}
                                </div>
                                <div className={css(styles.list_item_time)}>
                                    <span>{this.timeFormat(val.data.interval)}</span>
                                </div>
                                <div className={css(styles.list_item_num)}>
                                    {index + 1}
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '1100px',
        margin: '50px auto 0'
    },
    nav_left: {
        width: '180px',
        height: '550px',
        border: '1px solid rgba(153,153,153,.2)',
    },
    nav_title: {
        fontSize: '20px',
        textAlign: 'center',
        // backgroundColor: '#31c27c',
        // color: '#fff',
        margin: '-1px -1px',
        height: '50px',
        lineHeight: '50px'
        // marginBottom: '10px'
    },
    nav_list_items: {
        padding: '10px 10px 10px 20px',
        fontSize: '14px',
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c'
        }
    },
    nav_list_items_active: {
        backgroundColor: '#31c27c',
        margin: '0px -1px',
        color: '#fff',
        ':hover': {
            color: '#fff'
        }
    },
    nav_right: {
        paddingLeft: '30px',
        paddingTop: '15px',
        width: '900px',
    },

    list_title: {
        fontSize: '26px',
        marginBottom: '20px',
    },
    list_btn: {
        backgroundColor: '#31c27c',
        width: '130px',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '14px',
        borderRadius: '3px',
        cursor: 'pointer',
        ":hover": {
            opacity: '0.8'
        }
    },
    list_header: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '100px',
        color: '#000',
        marginTop: '30px',
        height: '50px',
        backgroundColor: 'rgba(0,0,0,0.01)',
        fontSize: '14px'
    },
    list_title_song: {
        width: '600px'
    },
    list_title_singer: {
        width: '200px'
    },
    list_title_time: {
        width: '100px'
    },
    list_item: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '100px',
        paddingBottom: '10px',
        paddingTop: '10px',
        position: 'relative',
        ':nth-child(2n)': {
            backgroundColor: 'rgba(0,0,0,0.01)',
        },
        ':hover .list_item_active': {
            display: 'inline-block',
        }
    },
    list_item_song: {
        display: 'flex',
        alignItems: 'center',
        width: '600px',
        position: 'relative'
    },
    list_item_name: {
        color: '#000',
        paddingLeft: '20px',
        width: '300px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    list_item_img: {
        width: '80px',
        height: '80px'
    },
    list_item_singer: {
        width: '180px',
        paddingRight: '20px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    list_item_time: {
        width: '100px',
        color: '#000'
    },
    list_item_num: {
        color: '#000',
        fontSize: '20px',
        position: 'absolute',
        left: '40px',

    },
    list_item_icon: {
        color: '#999',
        fontSize: '40px',
        marginLeft: '10px',
        display: 'none',
        cursor: 'pointer',
        ":hover": {
            color: '#31c27c',
        }
    },
    list_control_play: {
        position: 'absolute',
        right: '30px',
        top: '50%',
        transform: 'translateY(-50%)'
    }
});