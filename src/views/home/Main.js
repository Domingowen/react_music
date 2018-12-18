import React, {Component} from 'react';
import axios from 'axios';
import Icon from 'antd/lib/icon';
import 'antd/lib/carousel/style/index.css';
// import _ from 'lodash';
// import {player, add_player, audio_control} from '../../redux/actions';
// import {connect} from 'react-redux';
// import { message, Button } from 'antd';
// import Message from 'antd/lib/message';
// import Notification from 'antd/lib/notification';
// import Button from 'antd/lib/button';
// import 'antd/lib/message/style/index.css';
// import 'antd/lib/button/style/index.css';
// import 'antd/lib/notification/style/index.css';
// import HeadNav from './HeadNav.js';
import RecommendList from './RecommendList.js';
import NewSongList from './NewSongList.js';
import NewAlbumList from './NewAlbumList.js';
import RangeList from './RangeList.js';
// import UpToTop from '../../components/UpToTop.js';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_hnqij5ewxtc.js'
});

export default class Main extends Component {
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
    componentDidMount () {
        console.log(this.props);
        axios({
            method: 'post',
            url: 'http://192.168.0.131:20200/v1/music/recommend'
        }).then((res) => {
            let data = res.data.data;
            let newSong = [];
            for(let i=0,len=data.new_song.data.song_list.length - 1;i<45;i+=9){
                newSong.push(data.new_song.data.song_list.slice(i,i+9));
            }
            let recList = [];
            for(let i=0;i<4;i++){
                recList.push(data.category.data.category[0].items[i]);
            }
            let recommend = [];
            for(let i=0,len=10;i<len;i+=5){
                recommend.push(data.recomPlaylist.data.v_hot.slice(i,i+5));
            }
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
            });
        }).catch((res) => {});
        axios({
            method: 'post',
            url: 'http://192.168.0.131:20200/v1/music/toplist',
            data: {
                topId: 4,
            }
        }).then((res) => {
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{pop: data.songlist})
            })
        });
        axios({
            method: 'post',
            url: 'http://192.168.0.131:20200/v1/music/toplist',
            data: {
                topId: 26,
                // date: moment().format('YYYY-MM-DD')
            }
        }).then((res) => {
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{hot: data.songlist})
            })
        });
        axios({
            method: 'post',
            url: 'http://192.168.0.131:20200/v1/music/toplist',
            data: {
                topId: 27,
            }
        }).then((res) => {
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{newSing: data.songlist})
            })
        });
        axios({
            method: 'post',
            url: 'http://192.168.0.131:20200/v1/music/toplist',
            data: {
                topId: 3,
            }
        }).then((res) => {
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{europe: data.songlist})
            })
        });
        axios({
            method: 'post',
            url: 'http://192.168.0.131:20200/v1/music/toplist',
            data: {
                topId: 16,
            }
        }).then((res) => {
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
                <RecommendList history={this.props.history} IconFont={IconFont} list={this.state.recommendPlay} navList={this.state.recommendList}/>
                <NewSongList history={this.props.history} IconFont={IconFont} list={this.state.newSingPlay} navList={this.state.newSingList}/>
                <NewAlbumList history={this.props.history} IconFont={IconFont} list={this.state.newAlbumPlay} navList={this.state.newAlbumList}/>
                <RangeList history={this.props.history} IconFont={IconFont} list={this.state.topSingList}/>
            </div>
        )
    }
}