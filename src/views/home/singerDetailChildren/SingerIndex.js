import React, {Component} from 'react';
// import {StyleSheet, css}from 'aphrodite';
import axios from 'axios';
import Title from './SingerTitle';
import SongList from './SingerSongList';
import AlbumList from './SingerAlbumList';
export default class SingerIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationData: null,
            singerData: null,
            begin: 0,
            num: 30,
            type: null,
        }
    }
    componentDidMount() {
        console.log(this.props.location);
        let singerData = this.props.location.state.item;
        let type = this.props.location.state.type;
        this.setState({
            navigationData: singerData,
            type: type
        }, () => {
            let getData = new Promise(async (resolve, reject) => {
                let singerInfo = await this.getSingerInfo();
                let songList = await this.getSongList();
                let albumList = await this.getAlbumList();
                resolve({
                    singer: {singerInfo: singerInfo, singerMid: singerData.singer_mid, singerName: singerData.singer_name, singerId: singerData.singer_id},
                    songList,
                    albumList})
            });
            getData.then(res => {
                this.setState({
                    singerData: res
                })
            })
        })
    }
    async getSingerInfo () {
        return await axios({
            method: 'POST',
            url: 'http://192.168.0.131:20200/v1/music/singer_detail',
            data: {
                singerMid: this.state.navigationData.singer_mid
            }
        }).then(res => {
            let domParser = new DOMParser();
            let xmlDoc = domParser.parseFromString(res.data.data, 'text/xml');
            let data = [].slice.call(xmlDoc.getElementsByTagName('basic')[0].children);
            data = data.splice(1, data.length - 1);
            let singerInfo = '';
            data.forEach((val, index) => {
                singerInfo += val.children[0].textContent + '：' + val.children[1].textContent + ' ';
            });
            return singerInfo;
        }).catch(err => {
            console.log(err);
        });
    }
    async getSongList () {
        return await axios({
            method: 'POST',
            url: 'http://192.168.0.131:20200/v1/music/singer_song_detail',
            data: {
                singerMid: this.state.navigationData.singer_mid,
                begin: this.state.begin,
                num: 10
            }
        }).then(res => {
            console.log(res.data.data.data);
            return res.data.data.data;
        }).catch(err => {
            console.log(err);
        });
    }
    async getAlbumList () {
        return await axios({
            method: 'POST',
            url: 'http://192.168.0.131:20200/v1/music/singer_album_detail',
            data: {
                singerMid: this.state.navigationData.singer_mid,
                begin: this.state.begin,
                num: 15
            }
        }).then(res => {
            console.log(res.data.data.singerAlbum.data);
            return res.data.data.singerAlbum.data
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
            this.state.singerData &&
            <div>
                <Title data={this.state.singerData}/>
                <SongList list={this.state.singerData.songList}/>
                <AlbumList list={this.state.singerData.albumList} history={this.props.history}/>
            </div>
        );
    }
}