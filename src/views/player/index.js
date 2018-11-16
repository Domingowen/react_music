import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import {connect} from 'react-redux';
import {player, audio_player, audio_control, player_time, player_status, deleteItem} from '../../redux/actions';
import Icon from 'antd/lib/icon';
import musicPic from '../../assets/music_bg.png';
import musicPic2 from '../../assets/music_bg2.png';
import musicPic3 from '../../assets/music_bg3.png';
import moment from 'moment';
import _ from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_heepzwrlzhf.js'
});
class Player extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isPlay: false,
            currentTime: 0,
            durationTime: 0,
            singPic: musicPic3,
            singLrc: [],
            singAuthor: null,
            singTitle: null,
            playList: [],
            playIndex: 0,
            singId: '',
            progress: 0,
            showSingLrc: [],
            singStatus: false
        }
    }
    play () {
        this.setState({
            isPlay: !this.state.isPlay
        }, () => {
            console.log(this.state.isPlay);
            if(this.state.isPlay) {
                this.props.changeControl({
                    isPlay: true,
                });
            } else {
                this.props.changeControl({
                    isPlay: false,
                })
            }
        });
    }
    prevSing () {
        let index = _.findIndex(this.state.playList, {singId: this.state.singId});
        console.log(index);
        // this.setState({
        //     isPlay: true
        // });
        // this.props.changeControl({
        //     isPlay: true,
        // });
        !this.state.isPlay &&this.play();
        if (index > 0) {
            this.props.changePlayer(this.state.playList[index - 1]);
        } else {
            this.props.changePlayer(this.state.playList[this.state.playList.length - 1]);
        }
    }
    nextSing () {
        let index = _.findIndex(this.state.playList, {singId: this.state.singId});
        !this.state.isPlay &&this.play();
        console.log(index);
        if (this.state.playList.length - 1 > index) {
            this.props.changePlayer(this.state.playList[index + 1]);
        } else {
            this.props.changePlayer(this.state.playList[0]);
        }
    }
    startPlay (item) {
        this.props.changePlayer(item);
    }
    deletePlay (item) {
        this.props.deletePlayer(item);
    }
    componentDidMount () {
        this.formatSingLrc();
        this.setState({
            isPlay: this.props.playerData.control.isPlay
        }, () => {
            console.log(this.state.isPlay);
        })
    }
    componentDidUpdate (prevProps, prevState){
        let playerData = prevProps.playerData;
        if (playerData.player.singId && playerData.player.singId !== this.state.singId) {
            this.formatSingLrc();
        }
        // if (prevProps.playerData.control.isPlay !== this.props.playerData.control.isPlay) {
        //     this.setState({
        //         isPlay: this.props.playerData.control.isPlay
        //     })
        // }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps);
        // console.log(prevState);
        let audio = nextProps.playerData.time;
        let playerData = nextProps.playerData;
        let currentTime = prevState.currentTime;
        let durationTime =  prevState.durationTime;
        let singPic = prevState.singPic;
        let singLrc = prevState.singLrc;
        let singAuthor = prevState.singAuthor;
        let singTitle = prevState.singTitle;
        let singId = prevState.singId;
        let playList = prevState.playList;
        if (audio.currentTime && audio.durationTime) {
            currentTime = audio.currentTime ? audio.currentTime : 0;
            durationTime = audio.durationTime ? audio.durationTime : 0;
        }
        if (playerData.player.singId && playerData.player.singId !== prevState.singId) {
            singPic = playerData.player.singPic ? playerData.player.singPic : musicPic3;
            singLrc = playerData.player.singLrc.split('\n');
            singAuthor = playerData.player.singAuthor;
            singTitle = playerData.player.singTitle;
            singId = playerData.player.singId;
        }
        if (playerData.list.length !== playList.length) {
            playerData.list.forEach(val => {
                val.singId === singId ? val.playStatus = true : val.playStatus = false;
            });
            console.log(_.filter(playerData.list, {singId: singId}));

            playList= playerData.list;
            console.log(playList);
        }
        return {
            currentTime: currentTime,
            durationTime: durationTime,
            singPic: singPic,
            singLrc: singLrc,
            singAuthor: singAuthor,
            singTitle: singTitle,
            singId: singId,
            playList: playList,
        };
    }
    playerProgress() {
        // console.log(this.state.currentTime);
        // console.log(this.state.durationTime);
        // let currentTime = e.currentTime;
        // let progress = (e.currentTime / this.state.realityTime) * 100;
        // let time = this.timeFormat(currentTime);
        // console.log(progress);
        // console.log(currentTime);
        // console.log(this.state.realityTime);
        // this.setState({
        //     currentTime: time,
        //     playerProgress: progress,
        // })

        // console.log(Math.round(progress));
        // this.setState({
        //     progress: Math.round(progress)
        // })
    }
    playerSliderChange(value) {
        let currentTime = parseInt((value / 100) * this.state.durationTime);
        let progress = (currentTime / this.state.durationTime) * 100;
        console.log(progress);
        console.log(currentTime);
        this.props.playerTime(Object.assign({}, this.props.playerData.time, {
            currentTime: currentTime
        }))
    }
    playerSliderAfterChange (value) {

        // console.log(value);
        // this.setState({
        //     progress: value
        // })
    }
    playerStatus () {
        this.setState({
            singStatus: !this.state.singStatus
        }, () => {
            console.log(this.state.singStatus);
            this.props.playerStatus({
                status: this.state.singStatus
            })
        })
    }
    timeFormat(time) {
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
    formatSingLrc () {
        // console.log(this.state.singLrc);
        let timeReg = /\[(\d{2,}):(\d{2,3})(?:\.(\d{2,3}))?]/g;
        let tagRegMap = {
            title: 'ti',
            artist: 'ar',
            album: 'al',
            offset: 'offset',
            by: 'by'
        };
        let arr = [];
        this.state.singLrc.forEach((val, index) => {
            let result = timeReg.exec(val);
            if (result) {
                let txt = val.replace(timeReg, '').trim();
                if (txt) {
                    arr.push({
                        time: result[1]*60*1000 + result[2]*1000 + (result[3] || 0)*10,
                        txt
                    })
                }
            }
        });
        console.log(arr);
        this.setState({
            showSingLrc: arr
        })
    }
    lrcTimeSelect () {

    }
    imgOnError () {
        console.log('图片出错');
        this.playerImg.src = musicPic3;
    }
    playerImg = null;
    render () {
        let currentTime = this.timeFormat(this.state.currentTime);
        let durationTime = this.timeFormat(this.state.durationTime);
        let progress = this.state.durationTime > 0 ? (this.state.currentTime / this.state.durationTime) * 100 : 0;
        // console.log(progress);
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.container_left)}>
                    <div className={css(styles.container_title)}>播放列表</div>
                    <div className={css(styles.container_list)}>
                        <span className={css(styles.list_sing)}>歌曲</span>
                        <span className={css(styles.list_singer)}>歌手</span>
                        {/*<span className={css(styles.list_player)}>操作</span>*/}
                    </div>
                    <ul>
                        {this.state.playList.map((val, index) => {
                            return <li className={css(styles.player_list)} key={index}>
                                <span className={css(styles.list_sing)}>{val.singTitle}</span>
                                <span className={css(styles.list_singer)}>{val.singAuthor}</span>
                                {
                                    val.playStatus ?
                                        <IconFont className={css(styles.list_player) + ' list_player'} type="icon-zanting9" onClick={this.startPlay.bind(this, val)}/>
                                        :
                                        <IconFont className={css(styles.list_player) + ' list_player'} type="icon-zanting8" onClick={this.startPlay.bind(this, val)}/>
                                }
                                <IconFont className={css(styles.list_player) + ' list_player'} type="icon-shanchu2" onClick={this.deletePlay.bind(this, val)}/>
                            </li>
                        })}
                    </ul>
                </div>
                <div className={css(styles.container_right)}>
                    <div className={css(styles.singImg)}>
                        <img className={css(styles.img)} src={this.state.singPic} alt="" onError={this.imgOnError.bind(this)} ref={(val) => this.playerImg = val}/>
                    </div>
                    <div className={css(styles.singAuthor)}>
                        <span>{this.state.singTitle}</span>
                        <span style={{padding: '0 10px'}}>——</span>
                        <span>{this.state.singAuthor}</span>
                    </div>
                    <div className={css(styles.singLrc)}>
                        <ul className={css(styles.singLrcList)}>
                            {this.state.showSingLrc.map((val,index) => {
                                return <li key={index} className={moment(this.state.currentTime).get('millisecond') >= moment(parseInt(val.time) / 1000).get('millisecond')? css(styles.singLrcActive, styles.singLrcItems) : css(styles.singLrcItems)}>{val.txt}</li>
                            })}
                        </ul>
                    </div>
                    {/*<div className={css(styles.singTip)}>*/}
                        {/*音乐解析需要几秒时间，然后就会自动播放啦~*/}
                    {/*</div>*/}
                </div>
                <div className={css(styles.player)}>
                    <div className={css(styles.playerProgress)}>
                        <div className={css(styles.time)}>{currentTime}</div>
                        <div className={css(styles.singRange)}>
                            <Slider
                                style={
                                    {cursor: 'pointer'}
                                }
                                value={progress}
                                trackStyle={[{backgroundColor: '#31c27c'}]}
                                railStyle={{backgroundColor: '#ccc'}}
                                onAfterChange={this.playerSliderAfterChange.bind(this)}
                                onChange={this.playerSliderChange.bind(this)}
                                // handleStyle={[{backgroundColor: '#31c27c'}]}
                                // dotStyle={{backgroundColor: '#ccc'}}
                                // activeDotStyle={{backgroundColor: '#31c27c', color: '#31c27c'}}
                            />
                        </div>
                        <div className={css(styles.time)}>{durationTime}</div>
                    </div>
                    <div className={css(styles.playerControl)}>
                        {this.state.singStatus ?
                            <IconFont type="icon-danquxunhuan2" className={css(styles.playerStatus)} onClick={this.playerStatus.bind(this)}/>
                            :
                            <IconFont type="icon-liebiaoxunhuan" className={css(styles.playerStatus)} onClick={this.playerStatus.bind(this)}/>
                        }
                        <IconFont type="icon-shangyishou1" className={css(styles.playerIcon)} onClick={this.prevSing.bind(this)}/>
                        {this.state.isPlay ?
                            <IconFont type="icon-g-status-zanting" className={css(styles.playerIcon)} onClick={this.play.bind(this)}/>
                            :
                            <IconFont type="icon-bofang4" className={css(styles.playerIcon)} onClick={this.play.bind(this)}/>
                        }
                        <IconFont type="icon-xiayishou3" className={css(styles.playerIcon)} onClick={this.nextSing.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    playerData: state.Player,
});
const mapDispatchToProps = dispatch => ({
    changePlayer: item => dispatch(player(item)),
    changeAudio: item => dispatch(audio_player(item)),
    changeControl: item => dispatch(audio_control(item)),
    playerTime: item => dispatch(player_time(item)),
    playerStatus: item => dispatch(player_status(item)),
    deletePlayer: item => dispatch(deleteItem(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(Player)
const styles = StyleSheet.create({
    container: {
        width: '1000px',
        margin: '0 auto',
        display: 'flex',
        // paddingBottom: '30px'
    },
    container_left: {
        width: '590px',
        height: '450px',
        marginTop: '10px',
        paddingLeft: '10px',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    container_right: {
        width: '400px',
        height: '450px',
        // borderLeft: '1px solid rgba(255,255,255, 0.4)'
    },
    container_title: {
        display: 'flex',
        height: '30px',
        alignItems: 'center',
        position: 'sticky',
        top: '0',
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
    },
    container_list: {
        display: 'flex',
        height: '40px',
        alignItems: 'center',
        position: 'sticky',
        top: '30px',
        backgroundColor: '#f1f1f1',
        // paddingBottom: '10px',
        // position: '-webkit-sticky',
    },
    player_list: {
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        ':hover': {
            color: '#31c27c'
        },
        ':hover .list_player': {
            display: 'block',
        }
        // borderBottom: '1px solid rgba(255,255,255, 0.4)'
    },
    list_sing: {
        width: '180px',
        paddingRight: '20px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    list_singer: {
        width: '200px',
        paddingLeft: '50px'
    },
    list_player: {
        // width: '100px',
        display: 'none',
        cursor: 'pointer',
        color: '#777',
        fontSize: '32px',
        marginRight: '10px',
        ':hover': {
            color: '#31c27c'
        }
    },
    singImg: {
        // width: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0'
    },
    singAuthor: {
        textAlign: 'center',
        paddingBottom: '20px',
        fontSize: '20px',
    },
    singLrc: {
        fontSize: '20px',
        textAlign: 'center',
        paddingBottom: '20px',
        height: '150px',
        overflowY: 'scroll'
    },
    singTip: {
        marginTop: '10px',
        textAlign: 'center'
    },
    img: {
        // width: '300px',
        height: '200px'
    },
    player: {
        position: 'fixed',
        bottom: '20px',
        left: 0,
        right: 0,
        minWidth: '1000px'
    },
    playerControl: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '400px',
        margin: '0 auto',
        position: 'relative',
    },
    playerIcon: {
        fontSize: '50px',
        color: '#31c27c',
        cursor: 'pointer'
    },
    playerStatus: {
        fontSize: '30px',
        color: '#31c27c',
        cursor: 'pointer',
        position: 'absolute',
        left: '-200px',
    },
    playerProgress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70px',
        // padding: '0 20px'
    },
    playerRight: {

    },
    singRange: {
        // flex: 1,
        width: '780px',
        padding: '0 10px 3px',
    },
    range: {
        width: '100%'
    },
    time: {
        fontSize: '20px',
        width: '50px',
        textAlign: 'center'
    },
    singLrcActive: {
        color: '#31c27c',
        // fontWeight: 'bold',
    },
    singLrcList: {

    },
    singLrcItems: {
        marginTop: '10px'
    }
});