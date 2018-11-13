import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import axios from 'axios';
import Icon from 'antd/lib/icon';
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
import Message from "antd/lib/message";
import 'antd/lib/message/style/index.css';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_heepzwrlzhf.js'
});
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData: {},
            itemList: [],
        }
    }
    componentDidMount () {
        // console.log(this.props.location);
        let contentId = this.props.location.state.item.content_id;
        let tId = this.props.location.state.item.tid;
        let albummid = this.props.location.state.item.album_mid;
        let type = this.props.location.state.type;
        // console.log(contentId);
        switch (type) {
            case 'rec':
                axios({
                    method: 'post',
                    url: 'http://192.168.254.103:20200/v1/music/detail_rec',
                    data: {
                        contentId: contentId ? contentId : tId
                    }
                }).then(res => {
                    let itemList = res.data.data.cdlist[0].songlist.map(val => {
                        val.playStatus = false;
                        return val;
                    });
                    this.setState({
                        itemData: res.data.data.cdlist[0],
                        itemList: itemList
                    });
                    // console.log(itemList);
                }).catch(err => {
                    console.log(err);
                });
            break;
            case 'album':
                axios({
                    method: 'post',
                    url: 'http://192.168.254.103:20200/v1/music/detail_album',
                    data: {
                        albummid: albummid
                    }
                }).then(res => {
                    console.log(res.data.data.data);
                    let itemList = res.data.data.data.list.map(val => {
                        val.playStatus = false;
                        return val;
                    });
                    let data = res.data.data.data;
                    console.log(itemList);
                    this.setState({
                        itemData: {
                            dissname: data.name,
                            name: data.singername,
                            desc: data.desc,
                            logo: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${data.mid}.jpg?max_age=2592000`
                        },
                        itemList: itemList
                    });
                    // console.log(itemList);
                }).catch(err => {
                    console.log(err);
                });
        }

    }
    addPlayer (item) {
        let itemList = this.state.itemList.map(val => {
            item.songmid === val.songmid ? val.playStatus = true : val.playStatus = false;
            return val;
        });
        this.setState({
            itemList: itemList
        });
        const hide = Message.loading('正在请求音乐数据..', 0);
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/search',
            data: {
                search: item.songmid,
                filter: 'id',
                type: 'qq',
                page: 1
            }
        }).then(res => {
            setTimeout(hide, 100);
            let data = res.data.data.data[0];
            let items = {
                singId: data.songid,
                singPic: data.pic,
                singAuthor: data.author,
                singLrc: data.lrc,
                singUrl: data.url,
                singTitle: data.title,
            };
            this.props.addPlayer(items);
            if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
                this.props.addPlayerList(items);
            }
            this.props.changeControl({
                isPlayer: true,
            });
            Message.success(`${items.singTitle}，准备播放`)
        })
    }
    addPlayerList (item) {
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/search',
            data: {
                search: item.songmid,
                filter: 'id',
                type: 'qq',
                page: 1
            }
        }).then(res => {
            let data = res.data.data.data[0];
            let items = {
                singId: data.songid,
                singPic: data.pic,
                singAuthor: data.author,
                singLrc: data.lrc,
                singUrl: data.url,
                singTitle: data.title,
            };
            if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
                this.props.addPlayerList(items);
                Message.success(`${items.singTitle}，已添加到播放列表`, 1);
            } else {
                Message.error(`${items.singTitle}，已在播放列表中`, 1);
            }
        })
    }
    createDec() { return {__html: this.state.itemData.desc}; };
    render () {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.header)}>
                    <img src={this.state.itemData.logo} alt="" className={css(styles.header_img)}/>
                    <div className={css(styles.header_content)}>
                        <h1 className={css(styles.header_title)}>
                            {this.state.itemData.dissname}
                        </h1>
                        {this.state.itemData.tags ?
                            <h1 className={css(styles.header_tag)}>
                                <span>标签：</span>{this.state.itemData.tags ? this.state.itemData.tags.map((val, index) => {
                                return <span style={{paddingRight: '5px'}} key={index}>{val.name}</span>
                            }) : null}
                            </h1>
                            : null
                        }

                        {this.state.itemData.visitnum ?
                            <h1 className={css(styles.header_tag)}>
                                <span>播放量：</span><span>{this.state.itemData.visitnum}</span>
                            </h1>
                            : null
                        }
                        <h1 className={css(styles.header_info)}>
                            <span>简介：</span><span>{this.state.itemData.desc}</span>
                        </h1>
                    </div>
                </div>
                <div className={css(styles.list)}>
                    <div className={css(styles.list_right)}>
                        <ul className={css(styles.list_title)}>
                            <li className={css(styles.list_sing)}>歌曲</li>
                            <li className={css(styles.list_author)}>歌手</li>
                            <li className={css(styles.list_album)}>专辑</li>
                            {/*<li className={css(styles.list_operate)}>操作</li>*/}
                        </ul>
                        {this.state.itemList ? this.state.itemList.map((val, index) => {
                            return <ul className={css(styles.list_content)} key={index} >
                                <li className={css(styles.list_sing)}>
                                    <span className={css(styles.list_number)}>{index + 1}</span>
                                    {val.songname}
                                    </li>
                                <li className={css(styles.list_author)}>{val.singer.map(val => <span key={val.id}>{val.name}</span>)}</li>
                                <li className={css(styles.list_album)}>{val.albumname}</li>
                                <li className={css(styles.list_operate)}>
                                    {val.playStatus ?
                                        <IconFont className={css(styles.list_player) + ' list_player'} type="icon-zanting9"/>
                                        :
                                        <IconFont className={css(styles.list_player) + ' list_player'} type="icon-zanting8" onClick={this.addPlayer.bind(this, val)}/>
                                    }
                                    <IconFont type="icon-tianjia2" className={css(styles.list_player) + ' list_player'} onClick={this.addPlayerList.bind(this, val)}/>
                                </li>
                            </ul>
                        }) : null}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    playerData: state.Player,
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
        width: '1000px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        // alignItems: 'center',
        margin: '40px 10px'
    },
    header_img: {
        width: '200px',
        height: '200px'
    },
    header_content: {
        paddingLeft: '50px'
    },
    header_title: {
        paddingTop: '10px',
        fontSize: '28px',
        fontWeight: 700
    },
    header_nick: {
        paddingTop: '20px',
        fontSize: '20px',
        fontWeight: 500
    },
    header_tag: {
        paddingTop: '20px',
        fontSize: '20px',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center'
    },
    header_info: {
        paddingTop: '20px',
        fontSize: '20px',
        lineHeight: '24px',
        width: '700px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        // '-webkit-line-clamp': 2,
        // '-webkit-box-orient': 'vertical',
        // webkitLineClamp: 3,
        // webkitBoxOrient: 'vertical',
        // display: '-webkit-box',
    },
    list_title: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        height: '60px',
        fontSize: '20px',
        // borderRadius: '6px',
        fontWeight: 'bold',
        // backgroundColor: '#87e8de',

        // color: '#fff',
        // borderBottom: '1px solid #613400',
        // padding: '0 20px',


    },
    list_right: {
        // width: '700px',

    },
    list_sing: {
        width: '270px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingRight: '100px',
        position: 'relative',
        paddingLeft: '40px'
    },
    list_number: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 10,
    },
    list_author: {
        width: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingRight: '100px',
    },
    list_album: {
        width: '180px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        // paddingRight: '30px',
    },
    list_operate: {
        width: '150px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    list_player: {
        fontSize: '36px',
        color: '#777',
        marginRight: '10px',
        ':hover': {
            color: '#31c27c'
        },
        cursor: 'pointer',
        display: 'none'
    },
    list_content: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 400,
        height: '60px',
        ':hover': {
            color: '#31c27c'
        },
        ':hover .list_player': {
            display: 'block'
        }
    }
});