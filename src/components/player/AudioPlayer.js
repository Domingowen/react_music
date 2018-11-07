import React, {Component} from 'react';
import {audio_player, player, add_player, player_time} from '../../redux/actions';
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
            playList: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props.playerData.control);
        // console.log(prevState);
        if (prevProps.playerData.control.isPlay !== this.props.playerData.control.isPlay) {
            this.setState({
                isPlay: this.props.playerData.control.isPlay
            }, () => {
                console.log(this.state.isPlay);
                if(this.state.isPlay) {
                    setTimeout(() => {
                        this.player.play();
                    }, 30)
                } else {
                    setTimeout(() => {
                        this.player.pause();
                    }, 30)
                }
            })
        }
    }

    componentDidMount() {}

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        console.log(prevState);
        if (nextProps.playerData.player.singUrl !== prevState.singUrl ||
            nextProps.playerData.player.singId !== prevState.singId) {
            return {
                singUrl: nextProps.playerData.player.singUrl,
                singId: nextProps.playerData.player.singId,
            }
        }
        return {
            playList: nextProps.playerData.list
        }
    }

    player = null;

    playerPause() {
    }

    playProgress(e) {
    }

    playLoadStart(e) {
    }

    playDurationChange(e) {
    }

    playCanPlay(e) {
        this.player.play();
    }

    playCanPlayThrough(e) {
    }

    playTimeUpdate(e) {
        this.props.playerTime({
            currentTime: this.player.currentTime,
            durationTime: this.player.duration
        })
    }

    playEnd ()  {
        let index = _.findIndex(this.state.playList, {singId: this.state.singId});
        console.log(index);
        if (this.state.isLoop) {
        } else {
            this.setState({
                singUrl: ''
            }, () => {
                if (this.state.playList.length - 1 > index) {
                    this.props.player(this.state.playList[index + 1]);
                } else {
                    this.props.player(this.state.playList[0]);
                }
                this.player.play();
            });
        }
        // console.log('播放结束');
    };

    playPlaying() {
    };

    playSeeked(e) {
    }

    playError(e) {
    }

    playLoadedData(e) {
        this.props.playerTime({
            currentTime: this.player.currentTime,
            durationTime: this.player.duration
        })
    }

    render() {
        return (
            this.state.singUrl ?
                <audio
                    // style={{display: 'none'}}
                    src={this.state.singUrl}
                    // id="Audio"
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
                    loop={this.state.isLoop}
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
    playerTime: item => dispatch(player_time(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer)