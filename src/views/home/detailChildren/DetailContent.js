import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import Icon from 'antd/lib/icon';
import axios from "axios";
import _ from "lodash";
import Message from "antd/lib/message";
import {connect} from 'react-redux';
import {add_player, player, audio_control} from '../../../redux/actions';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_hnqij5ewxtc.js'
});
class DetailContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        this.setState({
            data: this.props.list
        });
        console.log(this.props.list);
    }
    async play (item) {
        console.log(item);
        let lrc = await axios({ // 获取歌词
            url: 'http://192.168.0.131:20200/v1/music/music_song_lrc2',
            method: 'post',
            data: {
                songmid: item.songmid
            }
        }).then(res => {
            console.log(res);
            return res.data.data;
        }).catch(err => {
            console.log(err);
        });
        let playerItem = {
            singId: item.songmid, // 音乐ID
            singPic: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg`,
            singAuthor: `${item.singer.map(val => val.name)}`,
            singLrc: lrc,
            singUrl: `https://api.bzqll.com/music/tencent/url?key=579621905&id=${item.songmid}&br=192`,
            singTitle: `${item.songname}`,
            singLyric: `${item.lyric ? item.lyric : ''}`,
            singInterval: item.interval,
            singAlbum: item.albumname ? item.albumname : ''
        };
        console.log(playerItem);
        if (_.findIndex(this.props.playerList, {singId: playerItem.singId}) === -1) {
            this.props.addPlayerList(playerItem);
        }
        this.props.player(playerItem);
        Message.success(`${playerItem.singTitle}，准备播放`);
    }
    async add (item) {
        let lrc = await axios({ // 获取歌词
            url: 'http://192.168.0.131:20200/v1/music/music_song_lrc2',
            method: 'post',
            data: {
                songmid: item.songmid
            }
        }).then(res => {
            console.log(res);
            return res.data.data;
        }).catch(err => {
            console.log(err);
        });
        let items = {
            singId: item.songmid, // 音乐ID
            singPic: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
            singAuthor: `${item.singer.map(val => val.name)}`,
            singLrc: lrc,
            singUrl: `https://api.bzqll.com/music/tencent/url?key=579621905&id=${item.songmid}&br=192`,
            singTitle: `${item.songname}`,
            singLyric: `${item.lyric ? item.lyric : ''}`,
            singInterval: item.interval,
            singAlbum: item.albumname ? item.albumname : ''
        };
        if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
            this.props.addPlayerList(items);
            Message.success(`${items.singTitle}，已添加到播放列表`, 1);
        } else {
            Message.error(`${items.singTitle}，已在播放列表中`, 1);
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

    render() {
        return (
            this.state.data &&
            <div className={css(styles.nav_right)}>
                {/*<div className={css(styles.list_title)}>{this.state.navTitle}</div>*/}
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
                                <img className={css(styles.list_item_img)} src={`//y.gtimg.cn/music/photo_new/T002R150x150M000${val.albummid}.jpg?max_age=2592000`} alt=""/>
                                <span className={css(styles.list_item_name)}>{val.songname}{val.albumdesc}</span>
                                <div className={css(styles.list_control_play)}>
                                    <IconFont type={'icon-zanting8'} className={css(styles.list_item_icon) + ' list_item_active'} onClick={this.play.bind(this, val)}/>
                                    <IconFont type={'icon-tianjia2'} className={css(styles.list_item_icon) + ' list_item_active'} onClick={this.add.bind(this, val)}/>
                                </div>
                            </div>
                            <div className={css(styles.list_item_singer)}>
                                {val.singer.map(val => val.name)}
                            </div>
                            <div className={css(styles.list_item_album)}>
                                <span>{val.albumname}</span>
                            </div>
                            <div className={css(styles.list_item_time)}>
                                <span>{this.timeFormat(val.interval)}</span>
                            </div>
                            <div className={css(styles.list_item_num)}>
                                {index + 1}
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        );
    }

}
const mapStateToProps = state => ({
    playerList : state.Player.list
});
const mapDispatchToProps = dispatch => ({
    addPlayerList: item => dispatch(add_player(item)),
    player: item => dispatch(player(item)),
    changeAudioControl: item => dispatch(audio_control(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailContent)
const styles = StyleSheet.create({
    nav_right: {
        width: '1100px',
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
