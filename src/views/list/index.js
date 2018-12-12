import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import {connect} from 'react-redux';
import {player, deleteItem, audio_player, audio_control} from '../../redux/actions';
import Icon from 'antd/lib/icon';
import Message from 'antd/lib/message';
import 'antd/lib/message/style/index.css';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_hnqij5ewxtc.js'
});
class List extends Component{
    constructor (props) {
        super(props);
    }
    componentDidUpdate (prevProps, prevState){}
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
        console.log(this.props);
        return (
            <div className={css(styles.container)}>
                {this.props.playerList.length > 0 ?
                    <div className={css(styles.list_title)}>
                        <span className={css(styles.title_song)}>歌曲</span>
                        <span className={css(styles.title_singer)}>歌手</span>
                        <span className={css(styles.title_album)}>专辑</span>
                        <span className={css(styles.title_time)}>时长</span>
                    </div>
                    : null
                }

                <ul className={css(styles.list)}>
                    {this.props.playerList.length > 0 ?
                        this.props.playerList.map((val, index) => {
                            return  <li className={css(styles.list_item)} key={index}>
                                <span className={css(styles.item_song)}>{val.singTitle}&nbsp;{val.singLyric}</span>
                                <span className={css(styles.item_singer)}>{val.singAuthor}</span>
                                <span className={css(styles.item_album)}>{val.singAlbum}</span>
                                <span className={css(styles.item_time)}>{this.timeFormat(val.singInterval)}</span>
                                {/*<img className={css(styles.item_album)} src={val.pic} alt=""/>*/}
                                <div className={css(styles.item_playControl)}>
                                    {/*{val.isPlay ?*/}
                                        {/*<IconFont type="icon-zanting9" className={css(styles.item_play) + ' item_play'} onClick={this.play.bind(this, val)}/>*/}
                                        {/*:*/}
                                        {/*<IconFont type="icon-zanting8" className={css(styles.item_play) + ' item_play'} onClick={this.play.bind(this, val)}/>*/}
                                    {/*}*/}
                                    {/*<IconFont type="icon-tianjia2" className={css(styles.item_play) + ' item_play'} onClick={this.add.bind(this, val)}/>*/}

                                </div>
                            </li>
                        })
                        : <li style={{height: '400px', lineHeight: '400px', textAlign: 'center'}}>当前播放列表为空</li>
                    }
                </ul>
            </div>
        )
    }
    play (item, index) {
        console.log(item);
        console.log(index);
        this.props.addPlayer(item);
        // this.props.addAudio(item);
        Message.success(`${item.singTitle}，准备播放`);
        this.props.changeControl({
            isPlay: true,
        });
    }
    deleteItem (item) {
        console.log(item);
        this.props.deleteItem(item);
        Message.warn(`${item.singTitle}，已移出播放列表`);
    }
}
const mapStateToProps = state => ({
    playerList: state.Player.list,
});
const mapDispatchToProps = dispatch => ({
    addPlayer: item => dispatch(player(item)),
    deleteItem: item => dispatch(deleteItem(item)),
    // addAudio: item => dispatch(audio_player(item)),
    changeControl: item => dispatch(audio_control(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(List)

const styles = StyleSheet.create({
    container: {
        width: '1100px',
        margin: '0 auto'
    },

    list: {
        width: '1100px',
        margin: '0 auto',
        position: 'relative',
        // paddingLeft: '20px',
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
});