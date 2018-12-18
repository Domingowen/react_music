import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import axios from 'axios';
import {connect} from 'react-redux';
import {
    add_player,
    player,
    audio_player,
    audio_control,
    player_time,
    player_status,
    deleteItem

} from '../../redux/actions';
import _ from "lodash";
// import Message from "antd/lib/message";
// import 'antd/lib/message/style/index.css';
import Title from './detailChildren/DetailTitle';
import Content from './detailChildren/DetailContent';
import Message from "antd/lib/message";
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData: null,
            itemType: null
        }
    }
    componentDidMount () {
        // console.log(this.props.location);
        let navigationData = this.props.location.state.item;
        let type = this.props.location.state.type;
        let disstId = navigationData.content_id ? navigationData.content_id : navigationData.tid;
        let albumMid = navigationData.album_mid ? navigationData.album_mid : null;
        switch (type) {
            case 'recommend':
                axios({
                    method: 'post',
                    url: 'http://192.168.0.131:20200/v1/music/music_detail_recommend',
                    data: {
                        disstId: disstId
                    }
                }).then(res => {
                    console.log(res.data.data);
                    this.setState({
                        itemData: res.data.data.cdlist[0],
                        itemType: 'recommend'
                    })
                });
                break;
            case 'album':
                axios({
                    method: 'post',
                    url: 'http://192.168.0.131:20200/v1/music/album_detail',
                    data: {
                        albumMid: albumMid
                    }
                }).then(res => {
                    console.log(res.data.data.data);
                    let data = res.data.data.data;
                    let itemData = Object.assign(data, {songlist: data.list});
                    this.setState({
                        itemData: itemData,
                        itemType: 'album'
                    })
                }).catch(err => {
                    console.log(err);
                });
                break;
            default:
                break;
        }
    }
    addAllPlay () {
        console.log(this.state.itemData.songlist);
        this.state.itemData.songlist.forEach((val, index) => {
            // console.log(val);
            let playerItem = {
                singId: val.songmid, // 音乐ID
                singPic: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${val.albummid}.jpg`,
                singAuthor: `${val.singer.map(val => val.name)}`,
                singLrc: null,
                singUrl: `https://api.bzqll.com/music/tencent/url?key=579621905&id=${val.songmid}&br=192`,
                singTitle: `${val.songname}`,
                singLyric: `${val.lyric ? val.lyric : ''}`,
                singInterval: val.interval,
                singAlbum: val.albumname ? val.albumname : null
            };
            // console.log(playerItem);
            if (_.findIndex(this.props.playerList, {singId: playerItem.singId}) === -1) {
                this.props.addPlayerList(playerItem);
            }
        });
        Message.success(`当前歌单，已添加到播放列表`, 1);
    }
    // addPlayer (item) {
    //     let itemList = this.state.itemList.map(val => {
    //         item.songmid === val.songmid ? val.playStatus = true : val.playStatus = false;
    //         return val;
    //     });
    //     this.setState({
    //         itemList: itemList
    //     });
    //     const hide = Message.loading('正在请求音乐数据..', 0);
    //     axios({
    //         method: 'post',
    //         url: 'http://192.168.0.131:20200/v1/music/search',
    //         data: {
    //             search: item.songmid,
    //             filter: 'id',
    //             type: 'qq',
    //             page: 1
    //         }
    //     }).then(res => {
    //         setTimeout(hide, 100);
    //         let data = res.data.data.data[0];
    //         let items = {
    //             singId: data.songid,
    //             singPic: data.pic,
    //             singAuthor: data.author,
    //             singLrc: data.lrc,
    //             singUrl: data.url,
    //             singTitle: data.title,
    //         };
    //         this.props.addPlayer(items);
    //         if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
    //             this.props.addPlayerList(items);
    //         }
    //         this.props.changeControl({
    //             isPlayer: true,
    //         });
    //         Message.success(`${items.singTitle}，准备播放`)
    //     })
    // }
    // addPlayerList (item) {
    //     axios({
    //         method: 'post',
    //         url: 'http://192.168.0.131:20200/v1/music/search',
    //         data: {
    //             search: item.songmid,
    //             filter: 'id',
    //             type: 'qq',
    //             page: 1
    //         }
    //     }).then(res => {
    //         let data = res.data.data.data[0];
    //         let items = {
    //             singId: data.songid,
    //             singPic: data.pic,
    //             singAuthor: data.author,
    //             singLrc: data.lrc,
    //             singUrl: data.url,
    //             singTitle: data.title,
    //         };
    //         if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
    //             this.props.addPlayerList(items);
    //             Message.success(`${items.singTitle}，已添加到播放列表`, 1);
    //         } else {
    //             Message.error(`${items.singTitle}，已在播放列表中`, 1);
    //         }
    //     })
    // }
    // createDec() { return {__html: this.state.itemData.desc}; };
    render () {
        return (
            this.state.itemData &&
            <div className={css(styles.container)}>
                <Title data={this.state.itemData} type={this.state.itemType} addAllPlay={this.addAllPlay.bind(this)}/>
                <Content list={this.state.itemData.songlist} type={this.state.itemType}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    playerList: state.Player.list
});
const mapDispatchToProps = dispatch => ({
    addPlayer: item => dispatch(player(item)),
    changeAudio: item => dispatch(audio_player(item)),
    changeControl: item => dispatch(audio_control(item)),
    playerTime: item => dispatch(player_time(item)),
    playerStatus: item => dispatch(player_status(item)),
    deletePlayer: item => dispatch(deleteItem(item)),
    addPlayerList: item => dispatch(add_player(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail)
const styles = StyleSheet.create({
    container: {
        width: '1100px',
        margin: '0 auto'
    },
    // header: {
    //     display: 'flex',
    //     // alignItems: 'center',
    //     margin: '40px 10px'
    // },
    // header_img: {
    //     width: '200px',
    //     height: '200px'
    // },
    // header_content: {
    //     paddingLeft: '50px'
    // },
    // header_title: {
    //     paddingTop: '10px',
    //     fontSize: '28px',
    //     fontWeight: 700
    // },
    // header_nick: {
    //     paddingTop: '20px',
    //     fontSize: '20px',
    //     fontWeight: 500
    // },
    // header_tag: {
    //     paddingTop: '20px',
    //     fontSize: '20px',
    //     fontWeight: 500,
    //     display: 'flex',
    //     alignItems: 'center'
    // },
    // header_info: {
    //     paddingTop: '20px',
    //     fontSize: '20px',
    //     lineHeight: '24px',
    //     width: '700px',
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     whiteSpace: 'nowrap',
    //     // '-webkit-line-clamp': 2,
    //     // '-webkit-box-orient': 'vertical',
    //     // webkitLineClamp: 3,
    //     // webkitBoxOrient: 'vertical',
    //     // display: '-webkit-box',
    // },
    // list_title: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     // justifyContent: 'center',
    //     height: '60px',
    //     fontSize: '20px',
    //     // borderRadius: '6px',
    //     fontWeight: 'bold',
    //     // backgroundColor: '#87e8de',
    //
    //     // color: '#fff',
    //     // borderBottom: '1px solid #613400',
    //     // padding: '0 20px',
    //
    //
    // },
    // list_right: {
    //     // width: '700px',
    //
    // },
    // list_sing: {
    //     width: '270px',
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     whiteSpace: 'nowrap',
    //     paddingRight: '100px',
    //     position: 'relative',
    //     paddingLeft: '40px'
    // },
    // list_number: {
    //     position: 'absolute',
    //     left: 0,
    //     top: 0,
    //     zIndex: 10,
    // },
    // list_author: {
    //     width: '150px',
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     whiteSpace: 'nowrap',
    //     paddingRight: '100px',
    // },
    // list_album: {
    //     width: '180px',
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     whiteSpace: 'nowrap',
    //     // paddingRight: '30px',
    // },
    // list_operate: {
    //     width: '150px',
    //     textAlign: 'center',
    //     display: 'flex',
    //     justifyContent: 'center'
    // },
    // list_player: {
    //     fontSize: '36px',
    //     color: '#777',
    //     marginRight: '10px',
    //     ':hover': {
    //         color: '#31c27c'
    //     },
    //     cursor: 'pointer',
    //     display: 'none'
    // },
    // list_content: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     // justifyContent: 'center',
    //     fontSize: '18px',
    //     fontWeight: 400,
    //     height: '60px',
    //     ':hover': {
    //         color: '#31c27c'
    //     },
    //     ':hover .list_player': {
    //         display: 'block'
    //     }
    // }
});