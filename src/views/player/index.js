import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import {connect} from 'react-redux';
import {player, audio_player, audio_control, player_time, player_status, deleteItem} from '../../redux/actions';
import Icon from 'antd/lib/icon';
// import musicPic3 from '../../assets/music_bg3.png';
// import moment from 'moment';
import _ from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import musicBg from '../../assets/music_player_bg.jpg'
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_hnqij5ewxtc.js'
});
class Player extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isPlay: false, // 暂停和播放
            currentTime: 0,
            durationTime: 0,
            singPic: '//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000',
            singLrc: [],
            singAuthor: null,
            singTitle: null,
            singAlbum: null,
            playList: [],
            // playIndex: 0,
            singId: '',
            progress: 0,
            showSingLrc: [],
            playStatus: false // 控制歌曲是否循环
        }
    }
    componentDidMount () {
        this.setInit();
    }
    componentDidUpdate (prevProps, prevState){
        // console.log(prevProps);
        if (this.props.playerData.player.singId !== prevProps.playerData.player.singId) { // 切换歌曲
            this.setInit();
        }
        if (this.props.playerData.control !== prevProps.playerData.control) { // 控制歌曲暂停和播放
            this.setState({
                isPlay: this.props.playerData.control
            })
        }
        if (this.props.playerData.list.length !== prevProps.playerData.list.length) { // 列表修改
            this.setState({
                playList: this.props.playerData.list,
            }, () => {
                this.changePlayerListStatus();
            })
        }
        if (this.props.playerData.time !== prevProps.playerData.time) {
            // console.log(this.props.playerData.time);
            this.setState({
                currentTime: this.props.playerData.time.currentTime
            })
        }
    }
    play () {
        if (this.props.playerData.player.singId) { // 判断是否有音乐数据在播放
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
        } else {
            if (this.state.playList.length > 0) {
                this.props.changePlayer(this.state.playList[0]);
                this.props.changeControl({
                    isPlay: true,
                });
            }
        }
    }
    prevSing () {
        if (this.state.playList.length <=0) {
            return false;
        }
        let index = _.findIndex(this.state.playList, {singId: this.state.singId});
        if (index > 0) {
            this.props.changePlayer(this.state.playList[index - 1]);
        } else {
            this.props.changePlayer(this.state.playList[this.state.playList.length - 1]);
        }
    }
    nextSing () {
        if (this.state.playList.length <=0) {
            return false;
        }
        let index = _.findIndex(this.state.playList, {singId: this.state.singId});
        if (this.state.playList.length - 1 > index) {
            this.props.changePlayer(this.state.playList[index + 1]);
        } else {
            this.props.changePlayer(this.state.playList[0]);
        }
    }
    startPlay (item) {
        console.log(item);
        let  data = _.forEach(this.state.playList, (val, key) => {
            val.singId === item.singId ? val.singStatus = true : val.singStatus = false;
            return val;
        });
        this.props.changePlayer(item);
        this.setState({
            playList: data
        })
    }
    deletePlay (item) {
        console.log(item);
        if (this.props.playerData.singId === item.singId) {

        } else {
            let list = this.state.playList.filter(val => val.singId !== item.singId);
            this.setState({
                playList: list
            }, () => {
                this.props.deletePlayer(item);
            })
        }
    }
    shareSong (item) {
        console.log(item);
    }
    changePlayerListStatus () {
        let  data = _.forEach(this.state.playList, (val, key) => {
            val.singId === this.state.singId ? val.singStatus = true : val.singStatus = false;
            return val;
        });
        this.setState({
            playList: data
        })
    }
    setInit () {
        this.setState({
            playList: this.props.playerData.list,
            singTitle: this.props.playerData.player.singTitle,
            singAuthor: this.props.playerData.player.singAuthor,
            singAlbum: this.props.playerData.player.singAlbum,
            singPic: this.props.playerData.player.singPic ? this.props.playerData.player.singPic : this.state.singPic,
            durationTime: this.props.playerData.player.singInterval ? this.props.playerData.player.singInterval : 0,
            singId: this.props.playerData.player.singId,
            singLrc: this.props.playerData.player.singLrc ? this.props.playerData.player.singLrc.split('\n') : [],
            playStatus: this.props.playerData.status,
            isPlay: this.props.playerData.control,
            currentTime: this.props.playerData.time.currentTime ? this.props.playerData.time.currentTime: 0
        }, () => {
            this.formatSingLrc();
            this.changePlayerListStatus();
        })
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     return true;
    // }
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
        let settingTime = parseInt((value / 100) * this.state.durationTime);
        let progress = (settingTime / this.state.durationTime) * 100; // 进度条走了多少进度
        console.log(progress + 'progress');
        console.log(settingTime + 'settingTime');
        this.props.playerTime({
            currentTime: currentTime,
            settingTime: settingTime
        });
    }
    playerSliderAfterChange (value) {}
    playerStatus () {
        this.setState({
            playStatus: !this.state.playStatus
        }, () => {
            console.log(this.state.playStatus);
            this.props.playerStatus({
                status: this.state.playStatus
            })
        })
    }
    timeFormat(time) {
        // console.log(time);
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
    lrcTimeSelect () {}
    imgOnError () {
        console.log('图片出错');
        this.playerImg.src = '//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000';
    }
    playerImg = null;
    render () {
        let currentTime = this.timeFormat(this.state.currentTime);
        let durationTime = this.timeFormat(this.state.durationTime);
        let progress = this.state.durationTime > 0 ? (this.state.currentTime / this.state.durationTime) * 100 : 0;
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.main)}>
                    <div className={css(styles.main_left)}>
                        <div className={css(styles.list)}>
                            <ul className={css(styles.list_header)}>
                                <li className={css(styles.list_song)}>歌曲</li>
                                <li className={css(styles.list_singer)}>歌手</li>
                                <li className={css(styles.list_time)}>时长</li>
                            </ul>
                            <ul className={css(styles.list_items)}>
                                {
                                    this.state.playList &&
                                    this.state.playList.map((val, index) => {
                                        return <li className={css(styles.list_item)} key={index}>
                                            <div className={css(styles.item_title)}>
                                                <span className={css(styles.item_text)}>{val.singTitle} {val.singLyric}</span>
                                                <div className={css(styles.item_control)}>
                                                    {
                                                        val.singStatus ?
                                                            <IconFont className={css(styles.list_player) + ' list_player'} type="icon-zanting9" onClick={this.startPlay.bind(this, val)}/>
                                                            :
                                                            <IconFont className={css(styles.list_player) + ' list_player'} type="icon-zanting8" onClick={this.startPlay.bind(this, val)}/>
                                                    }
                                                    <IconFont className={css(styles.list_player) + ' list_player'} type="icon-shanchu" onClick={this.deletePlay.bind(this, val)}/>
                                                    <IconFont className={css(styles.list_player) + ' list_player'} type="icon-fenxiangcopy" onClick={this.shareSong.bind(this, val)}/>
                                                </div>
                                            </div>
                                            <span className={css(styles.item_author)}>{val.singAuthor}</span>
                                            <span className={css(styles.item_time)}>{this.timeFormat(val.singInterval)}</span>
                                            <span className={css(styles.item_num)}>{index + 1}</span>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={css(styles.main_right)}>
                        <img className={css(styles.img)} src={this.state.singPic} alt="" onError={this.imgOnError.bind(this)} ref={(val) => this.playerImg = val}/>
                        <div className={css(styles.song_detail)}>
                            {
                                this.state.singTitle &&
                                    <p className={css(styles.song_item)}>歌曲名：{this.state.singTitle}</p>
                            }
                            {
                                this.state.singAuthor &&
                                    <p className={css(styles.song_item)}>歌手名：{this.state.singAuthor}</p>
                            }
                            {
                                this.state.singAlbum &&
                                    <p className={css(styles.song_item)}>专辑名：{this.state.singAlbum}</p>
                            }
                        </div>
                        <ul className={css(styles.song_lrc)}>
                            {
                                this.state.showSingLrc.length > 0 && this.state.showSingLrc.map((val, index) => {
                                    return <li className={css(styles.lrc_item)} key={index}>{val.txt}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={css(styles.player_control)}>
                    <div className={css(styles.player_left)}>
                        <div className={css(styles.player_list) + ' list_player'}>
                            <IconFont type="icon-shangyishou1" className={css(styles.playerIcon)} onClick={this.prevSing.bind(this)}/>
                            {
                                this.state.isPlay ?
                                    <IconFont type="icon-g-status-zanting" className={css(styles.playerIcon)} onClick={this.play.bind(this)}/>
                                    :
                                    <IconFont type="icon-bofang4" className={css(styles.playerIcon)} onClick={this.play.bind(this)}/>
                            }
                            <IconFont type="icon-xiayishou3" className={css(styles.playerIcon)} onClick={this.nextSing.bind(this)}/>
                        </div>
                    </div>
                    <div className={css(styles.player_middle)}>
                        <div className={css(styles.player_bar)}>
                            <div className={css(styles.player_subtitle)}>
                                {
                                    this.state.singTitle && this.state.singAuthor ?
                                    <span>{this.state.singTitle}--{this.state.singAuthor}</span> : null
                                }
                                <div className={css(styles.player_time)}>
                                    <span>{currentTime}</span>
                                    <span> - </span>
                                    <span>{durationTime}</span>
                                </div>
                            </div>
                            <div className={css(styles.player_slider)}>
                                <Slider
                                    style={{cursor: 'pointer'}}
                                    value={progress}
                                    trackStyle={[{backgroundColor: '#e41c38'}]}
                                    railStyle={{backgroundColor: '#999393'}}
                                    // onAfterChange={this.playerSliderAfterChange.bind(this)}
                                    onChange={this.playerSliderChange.bind(this)}
                                    // handleStyle={[{backgroundColor: '#31c27c'}]}
                                    // dotStyle={{backgroundColor: '#ccc'}}
                                    // activeDotStyle={{backgroundColor: '#31c27c', color: '#31c27c'}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={css(styles.player_right)}>
                        {
                            this.state.playStatus ?
                                <IconFont type="icon-danquxunhuan2" className={css(styles.playerStatus)} onClick={this.playerStatus.bind(this)}/>
                                :
                                <IconFont type="icon-liebiaoxunhuan" className={css(styles.playerStatus)} onClick={this.playerStatus.bind(this)}/>
                        }
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
        background: `url(${musicBg}) no-repeat center center`,
        height: '100%',
        width: '100%',
    },
    main: {
        width: '1100px',
        margin: '0 auto',
        paddingTop: '10px',
        display: 'flex',
        // borderTop: '1px solid #f1f1f1'
    },
    main_left: {
        width: '800px',
    },
    list: {},
    list_header: {
        display: 'flex',
        paddingLeft: '80px',
        height: '40px',
        lineHeight: '40px',
        borderBottom: '1px solid #f1f1f1',
        fontSize: '14px',
    },
    list_song: {
        width: '400px',
    },
    list_singer: {
        width: '200px'
    },
    list_time: {
        width: '100px'
    },
    main_right: {
        width: '250px',
        paddingLeft: '50px'
    },
    img: {
        width: '250px',
        minHeight: '187px',
        backgroundColor: '#999',
    },
    song_detail: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    song_item: {
        paddingTop: '10px',
        color: '#888889'
    },
    list_items: {
        height: '450px',
        overflow: 'auto',
        '::-webkit-scrollbar': {
            height: '3px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            width: '6px',
        },
        '::-webkit-scrollbar-thumb': {
            background: '#31c27c',
            borderRadius: '5px',
        }
    },
    list_item: {
        paddingLeft: '80px',
        height: '50px',
        lineHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        position: 'relative',
        cursor: 'pointer',
        ':nth-child(2n+1)': {
            backgroundColor: '#fff9f9',
        },
        ':hover .list_player': {
            display: 'flex',
        }

    },
    item_title: {
        width: '400px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    item_text: {
        width: '300px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    item_author: {
        width: '200px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    item_time: {
        width: '100px'
    },
    item_num: {
        position: 'absolute',
        left: '40px',
        fontSize: '14px'
    },
    item_control: {
        position: 'absolute',
        top: 0,
        right: '10px',
        display: 'flex',
        alignItems: 'center',
        height: '100%'
    },
    player_control: {
        position: 'absolute',
        bottom: '50px',
        left: 0,
        right: 0,
        width: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center'
        // display: 'flex',
        // justifyContent: 'center'
    },
    player_bar: {
        paddingLeft: '30px'
    },
    player_left: {

    },
    player_list: {
        display: 'flex',
        alignItems: 'center',
    },
    playerIcon: {
        fontSize: '50px',
        color: '#e41c38',
        cursor: 'pointer',
        marginRight: '10px',
    },
    player_middle: {
    },
    player_subtitle: {
        color: '#888889',
        paddingBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    },
    player_time: {
        position: 'absolute',
        right: 0
    },
    player_slider: {
        width: '700px',
    },
    player_right: {
        paddingLeft: '30px'
    },
    playerStatus: {
        fontSize: '30px',
        color: '#e41c38',
        cursor: 'pointer',
    },
    list_player: {
        // width: '100px',
        display: 'none',
        cursor: 'pointer',
        color: '#777',
        fontSize: '30px',
        marginRight: '10px',
        ':hover': {
            color: '#e41c38'
        }
    },
    song_lrc: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '20px',
        height: '200px',
        overflow: 'auto',
        '::-webkit-scrollbar': {
            height: '3px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            width: '6px',
        },
        '::-webkit-scrollbar-thumb': {
            background: '#31c27c',
            borderRadius: '5px',
        }
    },
    lrc_item: {
        fontSize: '16px',
        color: '#888889',
        paddingBottom: '5px',

    },
    lrc_item_active: {
        color: '#e41c38'
    }
});