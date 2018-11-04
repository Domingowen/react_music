import React, {Component} from 'react';
import {audio_player, player, add_player, player_time} from '../../redux/actions';
import {connect} from 'react-redux';

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singUrl: null,
            isLoop: false,
            isPlay: false,
            playList: []
        };
    }

    // componentWillReceiveProps
    componentDidUpdate(nextProps, nextState) {
        // console.log(nextProps);
        if (nextProps.playerData.control.isPlay) {
            this.player.play();
        } else {
            this.player.pause();
        }
        // if(nextProps.playerData.list.length !== this.state.playList.length) {
        //     this.setState({
        //
        //     })
        // }
        // this.player.play();
    }

    componentDidMount() {
        this.player.loop = false;
        this.player.addEventListener('ended', () => {
            alert('播放完毕');
        });
        let audio = document.getElementById('Audio');
        audio.addEventListener('ended', () => {
            console.log('播放完毕');
        })
        // this.player.paused
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return true;
    // }
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps);
        // console.log(this);
        return {
            singUrl: nextProps.playerData.player.singUrl,
            singId: nextProps.playerData.player.singId,
            playList: nextProps.playerData.list
        }
    }

    player = null;

    playerPause() {
        if (this.state.isPlay) {
            this.player.play()
        } else {
            this.player.pause()
        }
    }

    playProgress(e) {
        // console.log(e)
    }

    playLoadStart(e) {
        // console.log(e)
    }

    playDurationChange(e) {
        // console.log(e)
    }

    playCanPlay(e) {
        // this.player.pause();
        this.player.play();
        this.player.loop = true;
        // console.log(this.player.loop);
        // console.log(e);
    }

    playCanPlayThrough(e) {
        // this.player.play();
    }

    playTimeUpdate(e) {
        // console.log(this.player);
        // console.log(this.player.buffered.end(0));
        // console.log(this.player.buffered.length);
        // console.log(this.player.seekable.length);
        // console.log(this.player.ended);
        // console.log(document.getElementById('Audio'));
        this.props.playerTime({
            currentTime: this.player.currentTime,
            durationTime: this.player.duration
        })
    }

    playEnd = (event) => {
        event.persist();
        // console.log(e);
        console.log('播放结束');
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
            <audio
                style={{display: 'none'}}
                src={this.state.singUrl}
                id="Audio"
                // preload={'auto'}
                onLoadStart={this.playProgress.bind(this)}
                onDurationChange={this.playLoadStart.bind(this)}
                onProgress={this.playDurationChange.bind(this)}
                onCanPlay={this.playCanPlay.bind(this)}
                onCanPlayThrough={this.playCanPlayThrough.bind(this)}
                onTimeUpdate={this.playTimeUpdate.bind(this)}
                onSeeked={this.playSeeked.bind(this)}
                onEnded={() => {
                    console.log('播放完毕')
                }}
                // onended="playEnd"
                onError={this.playError.bind(this)}
                onLoadedData={this.playLoadedData.bind(this)}
                onPlaying={this.playPlaying.bind(this)}
                ref={(el) => this.player = el}
                // loop={false}
                // controls
            ></audio>
        )
    }
}

const mapStateToProps = state => ({
    playerData: state.Player,
});
const mapDispatchToProps = dispatch => ({
    // addAudio: item => dispatch(audio_player(item)),
    // player: item => dispatch(player(item))
    playerTime: item => dispatch(player_time(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer)