import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import Icon from 'antd/lib/icon';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_4mhmkt79fw5.js'
});
export default class SingerSongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    timeFormat (time) {
        // let hour = parseInt(time / 3600);
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
    componentDidMount() {
        this.setState({
            data: this.props.list.list
        });
        console.log(this.props.list);
    }
    render() {
        return (
            this.state.data ?
            <div className={css(styles.nav_right)}>
                <div className={css(styles.list_title)}>热门歌曲</div>
                {/*<div className={css(styles.list_btn)}>播放全部</div>*/}
                <div className={css(styles.list_header)}>
                    <p className={css(styles.list_title_song)}>歌曲</p>
                    <p className={css(styles.list_title_singer)}>歌手</p>
                    <p className={css(styles.list_title_album)}>专辑</p>
                    <p className={css(styles.list_title_time)}>时长</p>
                </div>
                <ul>
                    {this.state.data.map((val, index) => {
                        return <li className={css(styles.list_item)} key={index}>
                            <div className={css(styles.list_item_song)}>
                                {/*<img className={css(styles.list_item_img)} src={`//y.gtimg.cn/music/photo_new/T002R150x150M000${val.musicData.albummid}.jpg?max_age=2592000`} alt=""/>*/}
                                <span className={css(styles.list_item_name)}>{val.musicData.songname}{val.musicData.albumdesc}</span>
                                <div className={css(styles.list_control_play)}>
                                    <IconFont type={'icon-zanting8'} className={css(styles.list_item_icon) + ' list_item_active'}/>
                                    <IconFont type={'icon-tianjia2'} className={css(styles.list_item_icon) + ' list_item_active'}/>
                                </div>
                            </div>
                            <div className={css(styles.list_item_singer)}>
                                {val.musicData.singer.map(val => val.name)}
                            </div>
                            <div className={css(styles.list_item_album)}>
                                <span>{val.musicData.albumname}</span>
                            </div>
                            <div className={css(styles.list_item_time)}>
                                <span>{this.timeFormat(val.musicData.interval)}</span>
                            </div>
                            <div className={css(styles.list_item_num)}>
                                {index + 1}
                            </div>
                        </li>
                    })}
                </ul>
            </div> : null
        );
    }
}
const styles = StyleSheet.create({
    nav_right: {
        // paddingLeft: '30px',
        // paddingTop: '15px',
        width: '1100px',
        margin: '0 auto'
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
        width: '100px',
        textAlign: 'center'
    },
    list_title_album: {
        width: '200px',
    },
    list_item: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '100px',
        paddingBottom: '10px',
        paddingTop: '10px',
        position: 'relative',
        height: '40px',
        lineHeight: '40px',
        fontSize: '14px',
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
        // paddingLeft: '20px',
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
    list_item_album: {
        width: '200px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    list_item_time: {
        width: '100px',
        color: '#000',
        textAlign: 'center'
    },
    list_item_num: {
        color: '#000',
        fontSize: '14px',
        position: 'absolute',
        left: '40px',

    },
    list_item_icon: {
        color: '#999',
        fontSize: '30px',
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
        display: 'flex',
        alignItems: 'center'
        // top: '50%',
        // transform: 'translateY(-50%)'
    }
});