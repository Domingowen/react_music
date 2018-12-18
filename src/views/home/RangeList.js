import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
import axios from "axios";
import Message from "antd/lib/message";
import _ from "lodash";
export default class RangeList extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     list: {
        //         pop: [],
        //         hot: [],
        //         europe: [],
        //         newSing: [],
        //         korean: []
        //     }
        // }
    }
    componentDidMount () {
        // console.log(this.props);
    }
    componentDidUpdate (prevProps, prevState) {
        // if (this.props.list.pop ) {
        //     this.setState({
        //         list: this.props.list
        //     });
        // }

    }
    handlePlayPopularSong (val) {
        console.log(val);
        // const hide = Message.loading('正在请求音乐数据..', 0);
        // axios({
        //     method: 'post',
        //     url: 'http://192.168.0.131:20200/v1/music/search',
        //     data: {
        //         search: val.data.songmid,
        //         filter: 'id',
        //         type: 'qq',
        //         page: 1,
        //     }
        // }).then(res => {
        //     console.log(res.data.data.data);
        //     setTimeout(hide, 100);
        //     let data = res.data.data.data[0];
        //     let items = {
        //         singId: data.songid,
        //         singPic: data.pic,
        //         singAuthor: data.author,
        //         singLrc: data.lrc,
        //         singUrl: data.url,
        //         singTitle: data.title,
        //     };
        //     this.props.addPlayer(items);
        //     if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
        //         this.props.addPlayerList(items);
        //     }
        //     this.props.changeControl({
        //         isPlayer: true,
        //     });
        //     // Notification.open({
        //     //     message: 'Hi',
        //     //     description: `${items.singTitle} 准备播放~~`,
        //     //     icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        //     // });
        //     Message.success(`${items.singTitle}，准备播放`)
        // }).catch(err => {
        //     console.log(err);
        // })
    }
    render () {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.title)}>
                    音乐排行榜
                </div>
                <div className={css(styles.rank_sing)}>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg2)}>
                            流行指数
                        </div>
                        <ul>
                            {this.props.list.pop.length > 0 ? this.props.list.pop.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index} onClick={this.handlePlayPopularSong.bind(this,val)}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg1)}>
                            热歌
                        </div>
                        <ul>
                            {this.props.list.hot.length > 0 ? this.props.list.hot.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index} onClick={this.handlePlayPopularSong.bind(this,val)}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg3)}>
                            新歌
                        </div>
                        <ul>
                            {this.props.list.newSing.length > 0 ? this.props.list.newSing.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index} onClick={this.handlePlayPopularSong.bind(this,val)}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg4)}>
                            欧美
                        </div>
                        <ul>
                            {this.props.list.europe.length > 0 ? this.props.list.europe.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index} onClick={this.handlePlayPopularSong.bind(this,val)}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg5)}>
                            韩国
                        </div>
                        <ul>
                            {this.props.list.korean.length > 0 ? this.props.list.korean.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index} onClick={this.handlePlayPopularSong.bind(this,val)}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        background: 'linear-gradient(to bottom, #f1f1f1, #fff)'
    },
    title: {
        height: '100px',
        lineHeight: '100px',
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'bold',
    },
    rank_sing: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 10px',
        width: '1100px',
        margin: '0 auto'
    },
    rank_list: {
        width: '19%',
        height: '500px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        // padding: '20px 0 0 0',
        boxShadow: '0 0 20px #ccc',
        transition: '0.5s all',
        ':hover': {
            transform: 'translate3d(0, -10px, 0)'
        }

    },
    rank_bg: {
        height: '100px',
        lineHeight: '100px',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '24px'
    },
    rank_bg1: {
        backgroundColor: '#FEBBB8',
    },
    rank_bg2: {
        backgroundColor: '#B5ECF1',
    },
    rank_bg3: {
        backgroundColor: '#FEC2A0',
    },
    rank_bg4: {
        backgroundColor: '#292C4C',
    },
    rank_bg5: {
        backgroundColor: '#36cfc9',
    },
    rank_item: {
        width: '100%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 0 24px',
        cursor: 'pointer',
        color: '#000',
        ':hover': {
            color: '#31c27c',
        }
    },
    rank_txt: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px',
        width: '120px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});