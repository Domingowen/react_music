import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import {connect} from 'react-redux';
import {player, audio_player, audio_control} from '../../redux/actions';
import musicPic from '../../assets/music_bg.png';
import musicPic2 from '../../assets/music_bg2.png';
import musicPic3 from '../../assets/music_bg3.png';
import Progress from 'antd/lib/progress';
import 'antd/lib/progress/style/index.css';
import moment from 'moment';
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
        }
    }
    play () {
        this.setState({
            isPlay: !this.state.isPlay
        }, () => {
            if(this.state.isPlay) {
                this.props.changeControl({
                    playIndex: this.state.playIndex,
                    isPlay: true,
                })
            } else {
                this.props.changeControl({
                    playIndex: this.state.playIndex,
                    isPlay: false,
                })
            }
        });
    }
    prevSing () {
        this.setState({
            playIndex: this.state.playIndex > 0 ? this.state.playIndex - 1 : this.state.playList.length - 1
        }, () => {
            console.log(this.state.playList[this.state.playIndex]);
            this.props.changeControl({
                playIndex: this.state.playIndex,
                isPlay: true,
            });
            this.props.changePlayer(this.state.playList[this.state.playIndex])
        })
    }
    nextSing () {
        if(this.state.playList.length > 0) {
            this.setState({
                playIndex: this.state.playIndex >= this.state.playList.length - 1 ? 0 : this.state.playIndex + 1
            }, () => {
                console.log(this.state.playList[this.state.playIndex]);
                this.props.changeControl({
                    playIndex: this.state.playIndex,
                    isPlay: true,
                });
                this.props.changePlayer(this.state.playList[this.state.playIndex])
            });
        }
    }
    playListSing (item) {
        this.props.changePlayer(item);
    }
    // componentWillReceiveProps (nextProps, nextState) {
    //     console.log(nextProps);
    //     console.log(nextState);
    // }
    componentDidMount () {
        // console.log(this.props.playerData);
        let player = this.props.playerData.player;
        this.setState({
            singPic: player.singPic? player.singPic : musicPic3,
            singLrc: player.singLrc ? player.singLrc.split('\n') : [],
            singAuthor: player.singAuthor ? player.singAuthor : '歌手不存在？',
            singTitle: player.singTitle? player.singTitle : '歌名不存在？',
            singId: player.singId ? player.singId : '',
        }, () => {
            this.formatSingLrc()
        });
    }
    componentDidUpdate (prevProps, prevState){
        // this.playerProgress();
        // console.log(prevState);
        // console.log(prevProps);
        if (prevProps.playerData.control.isPlay !== this.state.isPlay) {
            this.setState({
                isPlay: prevProps.playerData.control.isPlay
            })
        }
        if (prevProps.playerData.control.playIndex !== this.state.playIndex) {
            this.setState({
                playIndex: prevProps.playerData.control.playIndex
            })
        }
        if (prevProps.playerData.list.length !== this.state.playList.length) {
            this.setState({
                playList: prevProps.playerData.list
            })
        }
        // console.log(prevProps.playerData.player.singId);
        // console.log(this.state.singId);
        if (prevProps.playerData.player.singId && prevProps.playerData.player.singId !== this.state.singId) {
            this.setState({
                singPic: prevProps.playerData.player.singPic? prevProps.playerData.player.singPic : musicPic3,
                singLrc: prevProps.playerData.player.singLrc? prevProps.playerData.player.singLrc.split('\n') : [],
                singAuthor: prevProps.playerData.player.singAuthor ? prevProps.playerData.player.singAuthor : '歌手不存在？',
                singTitle: prevProps.playerData.player.singTitle? prevProps.playerData.player.singTitle : '歌名不存在？',
                singId: prevProps.playerData.player.singId ? prevProps.playerData.player.singId : ''
            });

        }

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let audio = nextProps.playerData.time;
        // console.log(nextProps);
        if (audio.currentTime && audio.durationTime) {
            return {
                currentTime: audio.currentTime ? audio.currentTime : 0,
                durationTime: audio.durationTime ? audio.durationTime : 0,
            }
        }
        return null;
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
    render () {
        let currentTime = this.timeFormat(this.state.currentTime);
        let durationTime = this.timeFormat(this.state.durationTime);
        // console.log(this.state.currentTime);
        // console.log(moment(this.state.currentTime).get('millisecond'));
        let progress = Math.round((this.state.currentTime / this.state.durationTime) * 100);
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.container_left)}>
                    <div className={css(styles.container_title)}>播放列表</div>
                    <div className={css(styles.container_list)}>
                        <span className={css(styles.list_sing)}>歌曲</span>
                        <span className={css(styles.list_singer)}>歌手</span>
                        <span className={css(styles.list_player)}>操作</span>
                    </div>
                    <ul>
                        {this.state.playList.map((val, index) => {
                            return <li className={css(styles.player_list)} key={index}>
                                <span className={css(styles.list_sing)}>{val.singTitle}</span>
                                <span className={css(styles.list_singer)}>{val.singAuthor}</span>
                                <span className={css(styles.list_player)} onClick={this.playListSing.bind(this, val)}>播放</span>
                            </li>
                        })}
                    </ul>
                </div>
                <div className={css(styles.container_right)}>
                    <div className={css(styles.singImg)}>
                        <img className={css(styles.img)} src={this.state.singPic} alt=""/>
                    </div>
                    <div className={css(styles.singAuthor)}>
                        <span>{this.state.singTitle}</span>
                        <span style={{padding: '0 10px'}}>——</span>
                        <span>{this.state.singAuthor}</span>
                    </div>
                    <div className={css(styles.singLrc)}>
                        <ul className={css(styles.singLrcList)}>
                            {this.state.showSingLrc.map((val,index) => {
                                return <li key={index} className={moment(this.state.currentTime).get('millisecond') >= moment(val.time).get('seconds') ? css(styles.singLrcActive, styles.singLrcItems) : css(styles.singLrcItems)}>{val.txt}</li>
                            })}
                        </ul>
                    </div>
                    <div className={css(styles.singTip)}>
                        音乐解析需要几秒时间，然后就会自动播放啦~
                    </div>
                </div>
                <div className={css(styles.player)}>
                    <div className={css(styles.playerProgress)}>
                        <div className={css(styles.time)}>{currentTime}</div>
                        <div className={css(styles.singRange)}>
                            <Progress strokeWidth={5}  percent={progress} showInfo={false} />
                        </div>
                        <div className={css(styles.time)}>{durationTime}</div>
                    </div>
                    <div className={css(styles.playerControl)}>
                        <span className={css(styles.playerPrev) + ' ' + 'iconfont icon-shangyishou'} onClick={this.prevSing.bind(this)}></span>
                        {this.state.isPlay ?
                            <span className={css(styles.playerPlay) + ' ' + 'iconfont icon-zanting'} onClick={this.play.bind(this)}></span>
                            :
                            <span className={css(styles.playerPlay) + ' ' + 'iconfont icon-bofang'} onClick={this.play.bind(this)}></span>
                        }
                        <span className={css(styles.playerNext) + ' ' + 'iconfont icon-xiayishou'} onClick={this.nextSing.bind(this)}/>
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
    changeControl: item => dispatch(audio_control(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(Player)
const styles = StyleSheet.create({
    container: {
        width: '1000px',
        margin: '0 auto',
        display: 'flex',

    },
    container_left: {
        width: '490px',
        height: '450px',
        marginTop: '10px',
        paddingLeft: '10px',
        overflow: 'scroll'
    },
    container_right: {
        width: '500px',
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
        backgroundColor: '#f1f1f1'
        // position: '-webkit-sticky',
    },
    player_list: {
        display: 'flex',
        alignItems: 'center',
        // paddingBottom: '10px',
        height: '50px',
        // borderBottom: '1px solid rgba(255,255,255, 0.4)'
    },
    list_sing: {
        width: '200px',
    },
    list_singer: {
        width: '200px'
    },
    list_player: {
        width: '100px',
        cursor: 'pointer'
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
        bottom: '40px',
        left: 0,
        right: 0,
        minWidth: '1000px'
    },
    playerControl: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '400px',
        margin: '0 auto'
    },
    playerPrev: {
        fontSize: '34px',
        color: '#31c27c',
        cursor: 'pointer'
    },
    playerNext: {
        fontSize: '34px',
        color: '#31c27c',
        cursor: 'pointer'
    },
    playerPlay: {
        fontSize: '30px',
        color: '#31c27c',
        cursor: 'pointer'
    },
    playerProgress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70px'
    },
    playerRight: {

    },
    singRange: {
        // flex: 1,
        width: '800px',
        padding: '0 10px'
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