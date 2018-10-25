import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import {connect} from 'react-redux';
import {player, deleteItem, audio_player, audio_control} from '../../redux/actions';
class List extends Component{
    constructor (props) {
        super(props);
    }
    componentDidUpdate (prevProps, prevState){}
    render () {
        console.log(this.props);
        return (
            <div className={css(styles.container)}>
                {this.props.playerList.length > 0 ?
                    <div className={css(styles.listHeader)}>
                        <span className={css(styles.title_song)}>歌曲</span>
                        <span className={css(styles.title_singer)}>歌手</span>
                        <span className={css(styles.title_album)}>专辑图片</span>
                        <span className={css(styles.title_control)}>操作</span>
                    </div>
                    : null
                }

                <ul className={css(styles.list)}>
                    {this.props.playerList.length > 0 ?
                        this.props.playerList.map((val, index) => {
                            return  <li className={css(styles.item)} key={index}>
                                <div className={css(styles.item_song)}>{val.singTitle}</div>
                                <div className={css(styles.item_singer)}>{val.singAuthor}</div>
                                <img className={css(styles.item_img)} src={val.singPic} alt=""/>
                                <div className={css(styles.item_control)}>
                                    <span style={{marginRight: '20px', cursor: 'pointer'}} onClick={this.play.bind(this, val, index)}>播放</span>
                                    <span style={{cursor: 'pointer'}} onClick={this.deleteItem.bind(this, val)}>删除</span>
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
        this.props.addAudio(item);
        this.props.changeControl({
            isPlay: true,
            playIndex: index
        })
    }
    deleteItem (item) {
        console.log(item);
        this.props.deleteItem(item);
    }
}
const mapStateToProps = state => ({
    playerList: state.Player.list,
});
const mapDispatchToProps = dispatch => ({
    addPlayer: item => dispatch(player(item)),
    deleteItem: item => dispatch(deleteItem(item)),
    addAudio: item => dispatch(audio_player(item)),
    changeControl: item => dispatch(audio_control(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(List)

const styles = StyleSheet.create({
    container: {
        width: '1000px',
        margin: '0 auto'
    },

    listHeader: {
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        // borderBottom: '1px solid #ccc'
        // backgroundColor: '#fff'
    },
    title_song: {
        width: '400px',

    },
    title_singer: {
        width: '300px',
    },
    title_album: {
        width: '80px',
        textAlign: 'center'
    },
    title_control: {
        width: '200px',
        textAlign: 'center'
    },
    list: {
        paddingBottom: '10px'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px'
    },
    item_song: {
        width: '400px',
    },
    item_singer: {
        width: '300px',
    },
    item_img: {
        width: '80px',
        height: '80px',

    },
    item_control: {
        width: '200px',
        textAlign: 'center',
    }
});