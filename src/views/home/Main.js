import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import axios from 'axios';
import Carousel from 'antd/lib/carousel';
// import Carousel from 'nuka-carousel';
import 'antd/lib/carousel/style/index.css';
import Icon from 'antd/lib/icon';
import moment from 'moment';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_gc5awkku4zq.js',
});
// import Player from "../../redux/reducer/player";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendSelect: 0,
            newSingSelect: 0,
            newAlbumSelect: 0,
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
    handleSelectRecommend (index, id) {
        if (id === 0 ) {
            axios({
                method: 'post',
                url: 'http://192.168.254.103:20200/v1/music/sing_recommend',
                data: {
                    id: id,
                }
            }).then((res) => {
                let data = res.data.data.recomPlaylist.data.v_hot;
                let recommend = [];
                for(let i=0,len=10;i<len;i+=5){
                    recommend.push(data.slice(i,i+5));
                }
                console.log(data);
                this.setState({
                    recommendPlay: recommend
                })
            }).catch((res) => {
                console.log(res);
            });
        } else {
            axios({
                method: 'post',
                url: 'http://192.168.254.103:20200/v1/music/sing_service',
                data: {
                    id: id,
                }
            }).then((res) => {
                let data = res.data.data.playlist.data.v_playlist;
                let recommend = [];
                for(let i=0,len=10;i<len;i+=5){
                    recommend.push(data.slice(i,i+5));
                }
                console.log(data);
                this.setState({
                    recommendPlay: recommend
                })
            }).catch((res) => {
                console.log(res);
            });
        }

        this.setState({
            recommendSelect: index
        })
    }
    handleSelectNewSing (index, id) {
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/sing_new',
            data: {
                type: id,
            }
        }).then((res) => {
            console.log(res.data.data);
            let data = res.data.data.new_song.data.song_list;
            let newSong = [];
            for(let i=0,len=data.length - 1;i<len;i+=9){
                newSong.push(data.slice(i,i+9));
            }
            this.setState({
                newSingPlay: newSong,
            })
        }).catch((res) => {
            console.log(res);
        });
        this.setState({
            newSingSelect: index,
        })
    }
    handleSelectNewAlbum (index, id){
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/sing_album',
            data: {
                area: id,
            }
        }).then((res) => {
            // console.log(res.data.data.new_album.data.list);
            let data = res.data.data.new_album.data.list;
            let newAlbum = [];
            for(let i=0,len=data.length - 1;i<len;i+=10){
                newAlbum.push(data.slice(i,i+10));
            }
            this.setState({
                newAlbumPlay: newAlbum,
            })
        }).catch((res) => {
            console.log(res);
        });
        this.setState({
            newAlbumSelect: index,
        })
    }
    recommendCarousel = null;
    newSingCarousel = null;
    newAlbumCarousel = null;
    componentDidMount () {
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/recommend'
        }).then((res) => {
            console.log(res.data.data);
            let data = res.data.data;
            let newSong = [];
            for(let i=0,len=data.new_song.data.song_list.length - 1;i<len;i+=9){
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
            <div className={css(styles.container)}>
                <div className={css(styles.title)}>
                    歌单推荐
                </div>
                <ul className={css(styles.menu)}>
                    {
                        this.state.recommendList.map((val, index) => {
                            return <li key={index} className={css(styles.menu_item, this.state.recommendSelect === index ? styles.menu_item_active : null)} onClick={this.handleSelectRecommend.bind(this, index, val.item_id)}>{val.item_name}</li>
                        })
                    }
                </ul>
                <div className={css(styles.carousel_container)}>
                    {this.state.recommendPlay.length > 0 ?
                        <Carousel
                            ref={(el) => this.recommendCarousel = el}
                            dots={true}
                            autoplay={true}
                            speed={500}
                            autoplaySpeed={5000}
                            className={css(styles.carousel_list)}>
                            {
                                this.state.recommendPlay.map((val, index) => {
                                    return <div className={css(styles.carousel_recommend_container)} key={index}>
                                        <ul className={css(styles.carousel_recommend_list)}>
                                            {val.map((val, index) => {
                                                return  <li className={css(styles.carousel_recommend_items)} key={index}>
                                                    {   val.cover_url_big ?
                                                        <img className={css(styles.carousel_rec_img)} src={val.cover_url_big} alt=""/> :
                                                        <img className={css(styles.carousel_rec_img)} src={val.cover} alt=""/>
                                                    }
                                                    <span className={css(styles.carousel_rec_txt)}>{val.title}</span>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                })
                            }
                        </Carousel> : null
                    }
                    <div className={css(styles.carousel_btn_left)} onClick={() => {this.recommendCarousel.prev()}}>
                        <IconFont type="icon-zuojiantou" />
                    </div>
                    <div className={css(styles.carousel_btn_right)} onClick={() => {this.recommendCarousel.next()}}>
                        <IconFont type="icon-youjiantou" />
                    </div>
                </div>
                <div className={css(styles.title)}>
                    新歌首发
                </div>
                <ul className={css(styles.menu)}>
                    {
                        this.state.newSingList.map((val, index) => {
                            return <li key={index} className={css(styles.menu_item, this.state.newSingSelect === index ? styles.menu_item_active : null)} onClick={this.handleSelectNewSing.bind(this, index, val.id)}>{val.title}</li>
                        })
                    }
                </ul>
                <div className={css(styles.carousel_container)}>
                    {this.state.newSingPlay.length > 0 ?
                        <Carousel
                            ref={(el) => this.newSingCarousel = el}
                            dots={true}
                            autoplay={true}
                            speed={500}
                            autoplaySpeed={5000}
                            className={css(styles.carousel_list)}>
                            {
                                this.state.newSingPlay.map((val, index) => {
                                    return <div className={css(styles.carousel_new_item)} key={index}>
                                        <ul className={css(styles.carousel_new_list)}>
                                            {val.map((val, index) => {
                                                return <li className={css(styles.carousel_new_list_item)} key={index}>
                                                    <img
                                                        className={css(styles.carousel_new_list_item_img)}
                                                        src={`//y.gtimg.cn/music/photo_new/T002R150x150M000${val.album.mid}.jpg?max_age=2592000`}
                                                        alt=""/>
                                                    <div className={css(styles.carousel_new_list_item_text)}>
                                                        <span className={css(styles.carousel_new_list_title)}>{val.title}</span>
                                                        <span className={css(styles.carousel_new_list_title)}>{val.singer[0].title}</span>
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                })
                            }
                        </Carousel> : null
                    }
                    <div className={css(styles.carousel_btn_left)} onClick={()=> {this.newSingCarousel.prev()}}>
                        <IconFont type="icon-zuojiantou" />
                    </div>
                    <div className={css(styles.carousel_btn_right)} onClick={()=> {this.newSingCarousel.next()}}>
                        <IconFont type="icon-youjiantou" />
                    </div>
                </div>
                <div className={css(styles.title)}>
                    新碟首发
                </div>
                <ul className={css(styles.menu)}>
                    {
                        this.state.newAlbumList.map((val, index) => {
                            return <li key={index} className={css(styles.menu_item, this.state.newAlbumSelect === index ? styles.menu_item_active : null)} onClick={this.handleSelectNewAlbum.bind(this, index, val.id)}>{val.name}</li>
                        })
                    }
                </ul>
                <div className={css(styles.carousel_container)}>
                    {this.state.newAlbumPlay.length > 0 ?
                        <Carousel
                            ref={(el) => this.newAlbumCarousel = el}
                            dots={true}
                            autoplay={true}
                            speed={500}
                            autoplaySpeed={6000}
                            className={css(styles.carousel_list)}>
                            {
                                this.state.newAlbumPlay.map((val, index) => {
                                    return <div className={css(styles.carousel_album_container)} key={index}>
                                        <ul className={css(styles.carousel_album_list)}>
                                            {val.map((val, index) => {
                                                return  <li className={css(styles.carousel_album_items)} key={index}>
                                                    <img className={css(styles.carousel_album_img)} src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${val.album_mid}.jpg?max_age=2592000`} alt=""/>
                                                    <span className={css(styles.carousel_album_txt)}>{val.album_name}</span>
                                                    <span className={css(styles.carousel_album_txt)}>{val.singers[0].singer_name}</span>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                })
                            }
                        </Carousel> : null
                    }
                    <div className={css(styles.carousel_btn_left)} onClick={() => {this.newAlbumCarousel.prev()}}>
                        <IconFont type="icon-zuojiantou" />
                    </div>
                    <div className={css(styles.carousel_btn_right)} onClick={() => {this.newAlbumCarousel.next()}}>
                        <IconFont type="icon-youjiantou" />
                    </div>
                </div>
                <div className={css(styles.title)}>
                    音乐排行榜
                </div>
                <div className={css(styles.rank_sing)}>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg2)}>
                            流行指数
                        </div>
                        <ul>
                            {this.state.topSingList.pop.length > 0 ? this.state.topSingList.pop.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg1)}>
                            热歌
                        </div>
                        <ul>
                            {this.state.topSingList.hot.length > 0 ? this.state.topSingList.hot.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg3)}>
                            新歌
                        </div>
                        <ul>
                            {this.state.topSingList.newSing.length > 0 ? this.state.topSingList.newSing.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg4)}>
                            欧美
                        </div>
                        <ul>
                            {this.state.topSingList.europe.length > 0 ? this.state.topSingList.europe.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                    <div className={css(styles.rank_list)}>
                        <div className={css(styles.rank_bg, styles.rank_bg5)}>
                            韩国
                        </div>
                        <ul>
                            {this.state.topSingList.korean.length > 0 ? this.state.topSingList.korean.map((val, index) => {
                                return <li className={css(styles.rank_item)} key={index}>
                                    <div>{index + 1}</div>
                                    <div className={css(styles.rank_txt)}>
                                        <span style={{paddingBottom: '10px'}}>{val.data.songname}</span>
                                        <span>{val.data.singer[0].name}</span>
                                    </div>
                                </li>
                            }) : null }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: '1000px',
        margin: '0 auto',
    },
    title: {
        height: '100px',
        lineHeight: '100px',
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'bold',
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu_item: {
        padding: '0 30px',
        fontSize: '20px',
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c'
        }
    },
    menu_item_active: {
        color: '#31c27c'
    },
    carousel_container: {
        position: 'relative',
        minHeight: '200px'
    },
    carousel_recommend_container: {
        height: '100%',
        marginTop: '30px'
    },
    carousel_recommend_list: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    carousel_recommend_items: {
        width: '20%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        paddingBottom: '30px',
        ':hover': {
            color: '#31c27c'
        }
    },
    carousel_rec_img: {
        width: '185px',
        height: '185px',
    },
    carousel_rec_txt: {
        width: '185px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        marginTop: '10px',
    },
    carousel_list: {
        height: '100%'
    },
    carousel_btn_left: {
        position: 'absolute',
        width: '80px',
        backgroundColor: 'rgba(0,0,0,.05)',
        height: '120px',
        color: '#000',
        fontSize: '50px',
        left: 0,
        top: '50%',
        transform: 'translate(0, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 3,
        ':hover': {
            color: '#31c27c',
            backgroundColor: 'rgba(0,0,0,.4)',
        }
    },
    carousel_btn_right: {
        position: 'absolute',
        width: '80px',
        backgroundColor: 'rgba(0,0,0,.05)',
        height: '120px',
        color: '#000',
        fontSize: '50px',
        right: 0,
        top: '50%',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
        ':hover': {
            color: '#31c27c',
            backgroundColor: 'rgba(0,0,0,.4)',
        }
    },
    carousel_new_item: {
        // paddingBottom: '50px'
    },
    carousel_new_list: {
        display: 'flex',
        // alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: '30px'
    },
    carousel_new_list_item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30px',
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c'
        }
    },
    carousel_new_list_item_img: {
        width: '100px',
        height: '100px',
    },
    carousel_new_list_item_text: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px'
    },
    carousel_new_list_title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '150px',
        paddingBottom: '10px'
    },
    carousel_album_container: {

    },
    carousel_album_list: {
        display: 'flex',
        // alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: '30px'
    },
    carousel_album_items: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '30px',
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c'
        }
    },
    carousel_album_img: {
        width: '180px',
        height: '180px',
    },
    carousel_album_txt: {
        paddingTop: '5px',
        width: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    rank_sing: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 10px'
    },
    rank_list: {
        width: '19%',
        height: '500px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        // padding: '20px 0 0 0',
        boxShadow: '0 0 20px #ccc',
        transition: '0.5s all',
        ':hover': {
            transform: 'translate3d(0, -10px, 0)'
        }

    },
    rank_bg: {
        height: '100px',
        lineHeight: '100px',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '24px'
    },
    rank_bg1: {
        backgroundColor: '#FEBBB8',
    },
    rank_bg2: {
        backgroundColor: '#B5ECF1',
    },
    rank_bg3: {
        backgroundColor: '#FEC2A0',
    },
    rank_bg4: {
        backgroundColor: '#292C4C',
    },
    rank_bg5: {
        backgroundColor: '#36cfc9',
    },
    rank_item: {
        width: '100%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 0 24px',
        cursor: 'pointer',
        color: '#000',
        ':hover': {
            color: '#31c27c',
        }
    },
    rank_txt: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px',
        width: '120px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }
});