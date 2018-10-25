import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import axios from 'axios';
import {connect} from 'react-redux';
import {add_player, player, audio_player, audio_control} from '../../redux/actions';
import _ from 'lodash';
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
            text: null,
            filter: 'name',
            type: 'qq',
            page: 1,
        }
    }
    searchText (e) {
        // console.log(e.target.value);
        this.setState({
            text: e.target.value
        })
    }
    play (item) {
        let items = {
            singId: item.songid,
            singPic: item.pic,
            singAuthor: item.author,
            singLrc: item.lrc,
            singUrl: item.url,
            singTitle: item.title
        };
        // console.log(item);
        // console.log(this.props.playerList);
        // console.log(_.uniqWith(this.props.playerList, _.isEqual));
        // console.log(_.union(this.props.playerList, item));
        // console.log(_.uniq(this.props.playerList));
        // console.log(_.indexOf(this.props.playerList));
        // console.log(_.uniqBy(this.props.playerList, 'singId'));
        // console.log(_.findIndex(this.props.playerList, {singId: item.songid}));
        if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
            this.props.addPlayer(items);
            this.props.player(items);
        }
        this.props.addAudio(items);
        this.props.changeAudioControl({
            isPlayer: true,
            playIndex: 0,
        });
        // console.log(this.props.playerList);
    }
    getData () {
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/searchname',
            data: {
                search: this.state.text,
                filter: this.state.filter,
                type: this.state.type,
                page: this.state.page
            }
        }).then((res) => {
            console.log(res);
            this.setState({
                searchList: [...this.state.searchList, ...res.data.data.data],
            });
        }).catch((res) => {
            console.log(res);
        })
    }
    getMore () {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.getData();
        })
    }
    searchBtn () {
        if(this.state.text && this.state.text.length > 0) {
           this.setState({
               searchList: [],
               page: 1
           }, () => {
               this.getData();
           })
        }
    }
    enterBtn(e) {
        // console.log(e.keyCode);
        if(e.keyCode === 13) {
            this.searchBtn();
        }
    }
    render () {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.search)}>
                    <div className={css(styles.searchInput)}>
                        <input type="text" className={css(styles.input)} placeholder={'请输入歌手或歌名'} onChange={this.searchText.bind(this)} onKeyDown={this.enterBtn.bind(this)}/>
                        <span className='iconfont icon-search' style={{fontSize: '26px', cursor: 'pointer'}} onClick={this.searchBtn.bind(this)}></span>
                    </div>
                </div>
                <div className={css(styles.list)}>
                    {this.state.searchList.length > 0 ?
                        <div className={css(styles.list_title)}>
                            <span className={css(styles.title_song)}>歌曲</span>
                            <span className={css(styles.title_singer)}>歌手</span>
                            <span className={css(styles.title_album)}>专辑图片</span>
                            <span className={css(styles.title_control)}>操作</span>
                        </div> :
                        <div className={css(styles.list_empty)}>
                            🎧总有一首歌让你循环一整天
                        </div>
                    }
                    {this.state.searchList.map((val, index) => {
                    return <div className={css(styles.list_item)} key={index} onClick={this.play.bind(this, val)}>
                            <span className={css(styles.item_song)}>{val.title}</span>
                            <span className={css(styles.item_singer)}>{val.author}</span>
                            <img className={css(styles.item_album)} src={val.pic} alt=""/>
                            <span className={css(styles.item_play) + ' ' + 'iconfont icon-bofang'}></span>
                        </div>
                    })}
                    {this.state.searchList.length > 0 ? <span className={css(styles.getmore)} onClick={this.getMore.bind(this)}>加载更多</span>: null}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    playerList: state.Player.list
});
const mapDispatchToProps = dispatch => ({
    addPlayer: item => dispatch(add_player(item)),
    player: item => dispatch(player(item)),
    addAudio: item => dispatch(audio_player(item)),
    changeAudioControl: item => dispatch(audio_control(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(Search)
const styles = StyleSheet.create({
    container: {
        background: 'linear-gradient(45deg, blue, red)',
        height: '100px',
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        width: '1000px',
        height: '100px',
    },
    searchInput: {
        height: '50px',
        width: '500px',
        backgroundColor: '#fff',
        borderRadius: '3px',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        height: '50px',
        border: 'none',
        background: 'transparent',
        lineHeight: '',
        fontSize: '20px',
        flex: 1,
        ':focus': {
            outline: 'none',
        }
    },
    list: {
        width: '1000px',
        margin: '0 auto',
    },
    list_title: {
        display: 'flex',
        alignItems: 'center',
        height: '50px',
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
    list_item: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        paddingTop: '10px'
        // justifyContent: 'space-around'
    },
    item_song: {
        width: '400px',
    },
    item_singer:{
        width: '300px',
    },
    item_album: {
        width: '80px',
        height: '80px',
    },
    item_play: {
        width: '200px',
        textAlign: 'center',
        color: '#31c27c',
        fontSize: '22px'
    },
    getmore: {
        width: '150px',
        height: '40px',
        textAlign: 'center',
        backgroundColor: '#31c27c',
        color: '#fff',
        display: 'block',
        margin: '20px auto',
        fontSize: '20px',
        lineHeight: '40px',
        borderRadius: '3px',
        cursor: 'pointer'
    },
    list_empty: {
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
    }
});