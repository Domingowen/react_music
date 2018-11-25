import React, {Component} from 'react';
import axios from 'axios';
import 'antd/lib/carousel/style/index.css';
import Icon from 'antd/lib/icon';
import _ from 'lodash';
import {player, add_player, audio_control} from '../../redux/actions';
import {connect} from 'react-redux';
// import { message, Button } from 'antd';
import Message from 'antd/lib/message';
import Notification from 'antd/lib/notification';
import Button from 'antd/lib/button';
import 'antd/lib/message/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/notification/style/index.css';
import HeadNav from './HeadNav.js';
import RecommendList from './RecommendList.js';
import NewSongList from './NewSongList.js';
import NewAlbumList from './NewAlbumList.js';
import RangeList from './RangeList.js';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_9vv1j1sakel.js'
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList: [
                {
                    item_name: '编辑推荐',
                    item_id: 0,
                }
            ],
            recommendPlay: [],
            newSingList: [],
            newSingPlay: [],
            newAlbumList: [],
            newAlbumPlay:[],
            topSingList: {
                pop: [],
                hot: [],
                europe: [],
                newSing: [],
                korean: []
            },

        }
    }
    // handleSelectNewSing (index, id) {
    //     axios({
    //         method: 'post',
    //         url: 'http://192.168.254.103:20200/v1/music/sing_new',
    //         data: {
    //             type: id,
    //         }
    //     }).then((res) => {
    //         console.log(res.data.data);
    //         let data = res.data.data.new_song.data.song_list;
    //         let newSong = [];
    //         for(let i=0,len=data.length - 1;i<5;i+=9){
    //             newSong.push(data.slice(i,i+9));
    //         }
    //         this.setState({
    //             newSingPlay: newSong,
    //         })
    //     }).catch((res) => {
    //         console.log(res);
    //     });
    //     this.setState({
    //         newSingSelect: index,
    //     })
    // }
    // handleSelectNewAlbum (index, id){
    //     axios({
    //         method: 'post',
    //         url: 'http://192.168.254.103:20200/v1/music/sing_album',
    //         data: {
    //             area: id,
    //         }
    //     }).then((res) => {
    //         // console.log(res.data.data.new_album.data.list);
    //         let data = res.data.data.new_album.data.list;
    //         let newAlbum = [];
    //         for(let i=0,len=data.length - 1;i<len;i+=10){
    //             newAlbum.push(data.slice(i,i+10));
    //         }
    //         this.setState({
    //             newAlbumPlay: newAlbum,
    //         })
    //     }).catch((res) => {
    //         console.log(res);
    //     });
    //     this.setState({
    //         newAlbumSelect: index,
    //     })
    // }
    handleDetailSingRecommend (val) {
        console.log(val);
        this.props.history.push({
            pathname: '/home/detail',
            state: {
                item: val,
                type: 'rec'

            }
        })
    }
    handleDetailSingNew (val) {
        // console.log(val);
        // this.props.history.push("/home/detail")
    }
    handleDetailSingAlbum (val) {
        console.log(val);
        this.props.history.push({
            pathname: '/home/detail',
            state: {
                item: val,
                type: 'album'
            }
        })
        // this.props.history.push("/home/detail")
    }
    handlePlayNewSong (val) {
        console.log(val);
        const hide = Message.loading('正在请求音乐数据..', 0);
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/search',
            data: {
                search: val.mid,
                filter: 'id',
                type: 'qq',
                page: 1,
            }
        }).then(res => {
            console.log(res.data.data.data);

            let data = res.data.data.data[0];
            let items = {
                singId: data.songid,
                singPic: data.pic,
                singAuthor: data.author,
                singLrc: data.lrc,
                singUrl: data.url,
                singTitle: data.title,
            };
            this.props.addPlayer(items);
            if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
                this.props.addPlayerList(items);
            }
            this.props.changeControl({
                isPlayer: true,
            });
            // Notification.open({
            //     message: 'Hi',
            //     description: `${items.singTitle} 准备播放~~`,
            //     icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
            // });
            Message.success(`${items.singTitle}，准备播放`)
        }).catch(err => {
            console.log(err);
        })
    }
    handlePlayPopularSong (val) {
        console.log(val);
        const hide = Message.loading('正在请求音乐数据..', 0);
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/search',
            data: {
                search: val.data.songmid,
                filter: 'id',
                type: 'qq',
                page: 1,
            }
        }).then(res => {
            console.log(res.data.data.data);
            setTimeout(hide, 100);
            let data = res.data.data.data[0];
            let items = {
                singId: data.songid,
                singPic: data.pic,
                singAuthor: data.author,
                singLrc: data.lrc,
                singUrl: data.url,
                singTitle: data.title,
            };
            this.props.addPlayer(items);
            if (_.findIndex(this.props.playerList, {singId: items.singId}) === -1) {
                this.props.addPlayerList(items);
            }
            this.props.changeControl({
                isPlayer: true,
            });
            // Notification.open({
            //     message: 'Hi',
            //     description: `${items.singTitle} 准备播放~~`,
            //     icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
            // });
            Message.success(`${items.singTitle}，准备播放`)
        }).catch(err => {
            console.log(err);
        })
    }
    componentDidMount () {
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/recommend'
        }).then((res) => {
            console.log(res.data.data);
            let data = res.data.data;
            let newSong = [];
            for(let i=0,len=data.new_song.data.song_list.length - 1;i<45;i+=9){
                newSong.push(data.new_song.data.song_list.slice(i,i+9));
            }
            let recList = [];
            for(let i=0;i<4;i++){
                recList.push(data.category.data.category[0].items[i]);
            }
            // console.log(recList);
            let recommend = [];
            for(let i=0,len=10;i<len;i+=5){
                recommend.push(data.recomPlaylist.data.v_hot.slice(i,i+5));
            }
            // console.log(recommend);
            let newAlbum = [];
            for(let i=0,len=data.new_album.data.list.length - 1;i<len;i+=10){
                newAlbum.push(data.new_album.data.list.slice(i,i+10));
            }
            this.setState({
                recommendPlay: recommend,
                recommendList: [...this.state.recommendList,...recList],
                newSingPlay: newSong,
                newSingList: data.new_song.data.type_info,
                newAlbumPlay: newAlbum,
                newAlbumList: data.new_album.data.tags.area,
                // topSingList: data.toplist.data.group_list[0].list
            });
            // console.log(this.state.topSingList);
        }).catch((res) => {
            console.log(res);
        });
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/toplist',
            data: {
                topId: 4,
                // date: moment().format('YYYY-MM-DD')
            }
        }).then((res) => {
            // console.log(res);
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{pop: data.songlist})
            })
        });
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/toplist',
            data: {
                topId: 26,
                // date: moment().format('YYYY-MM-DD')
            }
        }).then((res) => {
            // console.log(res);
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{hot: data.songlist})
            })
        });
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/toplist',
            data: {
                topId: 27,
                // date: moment().format('YYYY-MM-DD')
            }
        }).then((res) => {
            // console.log(res);
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{newSing: data.songlist})
            })
        });
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/toplist',
            data: {
                topId: 3,
                // date: moment().format('YYYY-MM-DD')
            }
        }).then((res) => {
            // console.log(res);
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{europe: data.songlist})
            })
        });
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/toplist',
            data: {
                topId: 16,
                // date: moment().format('YYYY-MM-DD')
            }
        }).then((res) => {
            // console.log(res);
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{korean: data.songlist})
            }, () => {
                console.log(this.state.topSingList);
            })
        });

    };
    render () {
        return (
            <div>
                <RecommendList IconFont={IconFont} list={this.state.recommendPlay} navList={this.state.recommendList}/>
                <NewSongList IconFont={IconFont} list={this.state.newSingPlay} navList={this.state.newSingList}/>
                <NewAlbumList IconFont={IconFont} list={this.state.newAlbumPlay} navList={this.state.newAlbumList}/>
                <RangeList IconFont={IconFont} list={this.state.topSingList}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    playerList: state.Player.list,
});
const mapDispatchToProps = dispatch => ({
    addPlayer: item => dispatch(player(item)),
    addPlayerList: item => dispatch(add_player(item)),
    // deleteItem: item => dispatch(deleteItem(item)),
    // addAudio: item => dispatch(audio_player(item)),
    changeControl: item => dispatch(audio_control(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(Main)