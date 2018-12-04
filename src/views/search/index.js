import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import axios from 'axios';
import {connect} from 'react-redux';
import {add_player, player, audio_player, audio_control} from '../../redux/actions';
import _ from 'lodash';
import Spin from 'antd/lib/spin';
import Message from 'antd/lib/message';
import 'antd/lib/spin/style/index.css';
import 'antd/lib/message/style/index.css';
import Icon from 'antd/lib/icon';
import Player from "../../redux/reducer/player";

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_4865y8hzytg.js'
});
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
            text: null,
            filter: 'name',
            type: 'qq',
            page: 1,
            isLoading: false,
            searchResult: 0,
            searchType: 'lrc'
        }
    }
    searchText (e) {
        // console.log(e.target.value);
        this.setState({
            text: e.target.value
        })
    }
    async play (item) {
        console.log(item);
        let lrc = await axios({ // 获取歌词
            url: 'http://192.168.0.122:20200/v1/music/music_song_lrc2',
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
        // axios({
        //     url: 'http://192.168.0.122:20200/v1/music/music_song_url2',
        //     method: 'post',
        //     data: {
        //         songmid: item.songmid
        //     }
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // });
        // axios({
        //     url: 'http://192.168.0.122:20200/v1/music/music_song_url',
        //     method: 'post',
        //     data: {
        //         songmid: item.songmid
        //     }
        // }).then(res => {
        //     console.log(res.data.data);
        //     // `https://dl.stream.qqmusic.qq.com/C600003OUlho2HcRHC.m4a?vkey=79B5BA25596C8228D6D228170C567CF5418224CC63E4E751232C74CD2DF9C521D7007D214AB0F1563D21C8E9C34B6B6217AD1C9F43C1405A&guid=1543080947&uid=0&fromtag=30`
        // }).catch(err => {
        //     console.log(err);
        // });
        // axios({
        //     url: 'http://192.168.0.122:20200/v1/music/music_song_key',
        //     method: 'post',
        //     data: {}
        // }).then(res => {
        //     console.log(res.data.data);
        //     // `https://dl.stream.qqmusic.qq.com/C600003OUlho2HcRHC.m4a?vkey=79B5BA25596C8228D6D228170C567CF5418224CC63E4E751232C74CD2DF9C521D7007D214AB0F1563D21C8E9C34B6B6217AD1C9F43C1405A&guid=1543080947&uid=0&fromtag=30`
        // }).catch(err => {
        //     console.log(err);
        // })

        let playerItem = {
            singId: item.songmid, // 音乐ID
            singPic: `https://api.bzqll.com/music/tencent/pic?key=579621905&id=${item.songmid}`,
            singAuthor: `${item.singer.map(val => val.name)}`,
            singLrc: lrc,
            singUrl: `https://api.bzqll.com/music/tencent/url?key=579621905&id=${item.songmid}&br=192`,
            singTitle: `${item.songname}`,
            singLyric: `${item.lyric}`,
            singInterval: item.interval,
            singAlbum: item.albumname ? item.albumname : null
        };
        console.log(playerItem);
        if (_.findIndex(this.props.playerList, {singId: playerItem.singId}) === -1) {
            this.props.addPlayerList(playerItem);
        }
        this.props.player(playerItem);
        Message.success(`${playerItem.singTitle}，准备播放`);
        // this.props.changeAudioControl({
        //     isPlayer: true,
        // });
        // let searchList = this.state.searchList.map((val, index) => {
        //     if (val.songid === item.songid) {
        //         console.log(val);
        //         return Object.assign(val, {
        //             isPlay: true
        //         })
        //     } else {
        //         return Object.assign(val, {
        //             isPlay: false
        //         })
        //     }
        // });
        // console.log(this.props);
        // this.setState({
        //     searchList: searchList
        // })
    }
    add (item) {
        let items = {
            singId: item.songid,
            singPic: item.pic,
            singAuthor: item.author,
            singLrc: item.lrc,
            singUrl: item.url,
            singTitle: item.title
        };
        if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
            this.props.addPlayerList(items);
            Message.success(`${items.singTitle}，已添加到播放列表`, 1);
        } else {
            Message.error(`${items.singTitle}，已在播放列表中`, 1);
        }
    }
    getData () {
        axios({
            method: 'post',
            url: 'http://192.168.0.122:20200/v1/music/new_search',
            data: {
                page: this.state.page,
                name: this.state.text,
                // type: this.state.searchType,
                // search: this.state.text,
                // filter: this.state.filter,
                // type: this.state.type,
                // page: this.state.page
            }
        }).then((res) => {
            console.log(res.data.data.data);
            res.data.data.data.song.list.map((val, index) => {
                return Object.assign(val, {
                    isPlay: false
                })
            });
            this.setState({
                searchList: [...this.state.searchList, ...res.data.data.data.song.list],
                isLoading: false,
            });
            console.log(this.state.searchList);
        }).catch((res) => {
            console.log(res);
            this.setState({
                isLoading: false,
            })
        })
    }
    getMore () {
        this.setState({
            page: this.state.page + 1,
            isLoading: true,
        }, () => {
            this.getData();
        })
    }
    searchBtn () {
        if(this.state.text && this.state.text.length > 0) {
           this.setState({
               searchList: [],
               page: 1,
               isLoading: true,
           }, () => {
               this.getData();
           })
        } else {
            // alert('')
            Message.error(`请输入歌名或者歌手中`, 1);
        }
    }
    enterBtn(e) {
        // console.log(e.keyCode);
        if(e.keyCode === 13) {
            this.searchBtn();
        }
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
                {/*<Alert message={'请输入歌名或者歌手'} type="warning"/>*/}
                <div className={css(styles.search)}>
                    <div className={css(styles.searchInput)}>
                        <input type="text" className={css(styles.input)} placeholder={'请输入歌手或歌名'} onChange={this.searchText.bind(this)} onKeyDown={this.enterBtn.bind(this)}/>
                        <span className='iconfont icon-search' style={{fontSize: '26px', cursor: 'pointer'}} onClick={this.searchBtn.bind(this)}></span>
                    </div>
                </div>
                <div className={css(styles.list)}>
                    {
                        this.state.isLoading ?  <Spin size="large" className={css(styles.loading)} /> : null
                    }
                    {this.state.searchList.length > 0 ?
                        <div className={css(styles.list_title)}>
                            <span className={css(styles.title_song)}>歌曲</span>
                            <span className={css(styles.title_singer)}>歌手</span>
                            <span className={css(styles.title_album)}>专辑</span>
                            <span className={css(styles.title_time)}>时长</span>
                            {/*<span className={css(styles.title_control)}>操作</span>*/}
                        </div> :
                        <div className={css(styles.list_empty)}>
                            🎧总有一首歌让你循环一整天
                        </div>
                    }
                    {this.state.searchList.map((val, index) => {
                    return <div className={css(styles.list_item)} key={index}>
                            <span className={css(styles.item_song)}>{val.songname}&nbsp;{val.lyric}</span>
                            <span className={css(styles.item_singer)}>{val.singer.map(val => val.name) + ' '}</span>
                            <span className={css(styles.item_album)}>{val.albumname}</span>
                            <span className={css(styles.item_time)}>{this.timeFormat(val.interval)}</span>
                            {/*<img className={css(styles.item_album)} src={val.pic} alt=""/>*/}
                            <div className={css(styles.item_playControl)}>
                                {val.isPlay ?
                                    <IconFont type="icon-zanting9" className={css(styles.item_play) + ' item_play'} onClick={this.play.bind(this, val)}/>
                                    :
                                    <IconFont type="icon-zanting8" className={css(styles.item_play) + ' item_play'} onClick={this.play.bind(this, val)}/>
                                }
                                <IconFont type="icon-tianjia2" className={css(styles.item_play) + ' item_play'} onClick={this.add.bind(this, val)}/>

                            </div>
                        </div>
                    })}
                    {this.state.searchList.length > 0 ? <span className={css(styles.getmore)} onClick={this.getMore.bind(this)}>加载更多</span>: null}
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => ({
    playerList: state.Player.list
});
const mapDispatchToProps = dispatch => ({
    addPlayerList: item => dispatch(add_player(item)),
    player: item => dispatch(player(item)),
    // addAudio: item => dispatch(audio_player(item)),
    changeAudioControl: item => dispatch(audio_control(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(Search)
const styles = StyleSheet.create({
    container: {
        // height: '100px',
    },
    loading: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(000,000,000,0.2)'
    },
    search: {
        background: 'linear-gradient(45deg, blue, red)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // margin: '0 auto',
        // width: '1000px',
        height: '100px',
    },
    searchInput: {
        height: '50px',
        width: '500px',
        backgroundColor: '#fff',
        borderRadius: '3px',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        height: '50px',
        border: 'none',
        background: 'transparent',
        lineHeight: '',
        fontSize: '20px',
        flex: 1,
        ':focus': {
            outline: 'none',
        }
    },
    list: {
        width: '1000px',
        margin: '0 auto',
        position: 'relative',
        paddingLeft: '20px',
    },
    list_title: {
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        // backgroundColor: '#fff'
    },
    title_song: {
        width: '400px',
        paddingLeft: '10px'
    },
    title_singer: {
        width: '200px',
    },
    title_album: {
        width: '230px',
        // textAlign: 'center'
    },
    title_time: {

    },
    title_control: {
        width: '200px',
        textAlign: 'center'
    },
    list_item: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '10px',
        height: '50px',
        fontSize: '14px',
        position: 'relative',
        ':hover .item_play': {
            display: 'block'
        },
        ':nth-child(2n)': {
            backgroundColor: 'rgba(0,0,0,0.01)'
        }
    },
    item_song: {
        width: '400px',
        paddingLeft: '10px'
    },
    item_singer:{
        width: '200px',
    },
    item_album: {
        width: '230px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
        // height: '80px',
        // marginRight: '50px'
    },
    item_time: {

    },
    item_play: {
        color: '#777',
        fontSize: '36px',
        marginRight: '10px',
        display: 'none',
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c'
        }
    },
    item_playControl: {
        position: 'absolute',
        right: 0,
        display: 'flex',
    },
    getmore: {
        width: '150px',
        height: '40px',
        textAlign: 'center',
        backgroundColor: '#31c27c',
        color: '#fff',
        display: 'block',
        margin: '20px auto',
        fontSize: '20px',
        lineHeight: '40px',
        borderRadius: '3px',
        cursor: 'pointer'
    },
    list_empty: {
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        position: 'relative',
    }
});