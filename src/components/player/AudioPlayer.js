import React, {Component} from 'react';
import {player, player_time, player_status, audio_control} from '../../redux/actions';
import {connect} from 'react-redux';
import _ from 'lodash';
class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singUrl: null,
            singId: null,
            isLoop: false,
            isPlay: false,
            playList: [],
        };
    }
    setInit () {
        this.player.pause();
        this.player.currentTime = 0;
        this.props.playerTime({
            currentTime: 0
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.playerData.player.singId !== prevProps.playerData.player.singId) { // 切换歌曲
            console.log(this.props.playerData.player);
            this.setState({
                singUrl: this.props.playerData.player.singUrl,
                singId: this.props.playerData.player.singId,
            }, () => {
                this.setInit();
            })
        }
        if (this.props.playerData.list.length !== prevProps.playerData.list.length) { // 歌曲列表变化
            console.log(this.props.playerData.list);
            this.setState({
                playList: this.props.playerData.list
            })
        }
        if (this.props.playerData.control !== prevProps.playerData.control) { // 歌曲暂停和播放
            console.log(this.props.playerData.control);
            this.setState({
                isPlay: this.props.playerData.control
            }, () => {
                if (this.state.isPlay) {
                    this.player.play();
                } else {
                    this.player.pause();
                }
            })
        }
        if (this.props.playerData.status !== prevProps.playerData.status) { // 是否要循环播放
            console.log(prevProps.playerData.status);
            console.log(this.props.playerData.status);
            this.setState({
                isLoop: this.props.playerData.status
            });
        }
        if (this.state.singUrl) { // 控制歌曲时间
            if (this.props.playerData.time.settingTime) {
                this.player.currentTime = this.props.playerData.time.settingTime;
            }
        }
    }

    componentDidMount() {
        this.setState({
            playList: this.props.playerData.list
        })
    }
    player = null;

    playerPause() {
    }

    playProgress(e) {
    }

    playLoadStart(e) {
    }

    playDurationChange(e) {}

    playCanPlay(e) {
        //
        this.player.play();
        this.props.audioControl({
            isPlay: true
        });
        if (this.props.playerData.time.settingTime) {

        } else {

        }
    }

    playCanPlayThrough(e) {
    }

    playTimeUpdate(e) {
        this.props.playerTime({
            currentTime: this.player.currentTime
        })
    }

    playEnd ()  {
        let index = _.findIndex(this.state.playList, {singId: this.state.singId});
        console.log(index);
        if (this.state.isLoop) {
            this.setInit();
        } else {
            if (this.state.playList.length - 1 > index) {
                this.props.player(this.state.playList[index + 1]);
            } else {
                // this.props.player(this.state.playList[0]);
                this.setInit();
            }
        }
    };

    playPlaying() {
    };

    playSeeked(e) {
    }

    playError(e) {
    }

    playLoadedData(e) {
        this.props.playerTime({
            currentTime: this.player.currentTime
        })
    }

    render() {
        return (
            this.state.singUrl ?
                <audio
                    style={{display: 'none'}}
                    src={this.state.singUrl}
                    preload={'auto'}
                    onLoadStart={this.playProgress.bind(this)}
                    onDurationChange={this.playLoadStart.bind(this)}
                    onProgress={this.playDurationChange.bind(this)}
                    onCanPlay={this.playCanPlay.bind(this)}
                    // onCanPlayThrough={this.playCanPlayThrough.bind(this)}
                    onTimeUpdate={this.playTimeUpdate.bind(this)}
                    onSeeked={this.playSeeked.bind(this)}
                    onError={this.playError.bind(this)}
                    onLoadedData={this.playLoadedData.bind(this)}
                    // onPlaying={this.playPlaying.bind(this)}
                    onEnded={this.playEnd.bind(this)}
                    ref={(el) => this.player = el}
                    // loop={this.state.isLoop}
                    controls
                /> : null
        )
    }
}

const mapStateToProps = state => ({
    playerData: state.Player,
});
const mapDispatchToProps = dispatch => ({
    // addAudio: item => dispatch(audio_player(item)),
    player: item => dispatch(player(item)),
    playerTime: item => dispatch(player_time(item)),
    playerStatus: item => dispatch(player_status(item)),
    audioControl: item => dispatch(audio_control(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer)