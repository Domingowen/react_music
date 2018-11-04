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
            recommendList: [
                {
                    title: '为你推荐',
                    id: 0,
                },
                {
                    title: 'R&B',
                    id: 0,
                },
                {
                    title: '国语经典',
                    id: 0,
                },
                {
                    title: '古筝',
                    id: 0,
                },
                {
                    title: '官方歌单',
                    id: 0,
                },
                {
                    title: '情歌',
                    id: 0,
                }
            ],
            recommendPlay: [],
            newSingSelect: 0,
            newSingList: [
                {
                    title: '内地',
                },
                {
                    title: '港台',
                },
                {
                    title: '欧美',
                },
                {
                    title: '韩国',
                },
                {
                    title: '日本',
                }
            ],
            newSingPlay: [],
            topSingList: {
                pop: [],
                hot: [],
                europe: [],
                newSing: [],
                korean: []
            },
        }
    }
    handleSelectRecommend (index) {
        this.setState({
            recommendSelect: index
        })
    }
    handleSelectNewSing (index, id) {
        console.log(id);
        this.setState({
            newSingSelect: index,
        })
    }
    newSingCarousel = null;
    render () {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.title)}>
                    歌单推荐
                </div>
                <ul className={css(styles.menu)}>
                    {
                        this.state.recommendList.map((val, index) => {
                            return <li key={index} className={css(styles.menu_item, this.state.recommendSelect === index ? styles.menu_item_active : null)} onClick={this.handleSelectRecommend.bind(this, index)}>{val.title}</li>
                        })
                    }
                </ul>
                {/*<Carousel className={css(styles.carousel_list)}>*/}
                    {/*<div className={css(styles.carousel_item)}>*/}

                    {/*</div>*/}
                {/*</Carousel>*/}
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
                                                            <span>{val.singer[0].title}</span>
                                                        </div>
                                                    </li>
                                                })}
                                            </ul>
                                        </div>
                                    })
                                }
                            </Carousel> : null
                        }
                        <div className={css(styles.carousel_btn_left)} onClick={this.newSingBtnLeft.bind(this)}>
                            <IconFont type="icon-zuojiantou" />
                        </div>
                        <div className={css(styles.carousel_btn_right)} onClick={this.newSingBtnRight.bind(this)}>
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
    newSingBtnLeft () {
        this.newSingCarousel.prev();
    }
    newSingBtnRight () {
        // console.log(this.newSingCarousel);
        this.newSingCarousel.next();
    }
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
            console.log(newSong);
            this.setState({
                recommendPlay: data.recomPlaylist.data.v_hot,
                newSingPlay: newSong,
                newSingList: data.new_song.data.type_info,
                // topSingList: data.toplist.data.group_list[0].list
            });
            console.log(this.state.topSingList);
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
            console.log(res);
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
            console.log(res);
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
            console.log(res);
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
            console.log(res);
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
            console.log(res);
            let data = res.data.data;
            this.setState({
                topSingList: Object.assign({}, this.state.topSingList,{korean: data.songlist})
            }, () => {
                console.log(this.state.topSingList);
            })
        });

    }
}
const styles = StyleSheet.create({
    container: {
        width: '1000px',
        margin: '0 auto',
        // textAlign: 'center',
        // height: '200px',
        // lineHeight: '100px',
        // fontSize: '24px'
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
        height: '400px',
        // 'hover': {
        //     carousel_btn_left: {
        //         display: 'flex'
        //     },
        //     carousel_btn_right: {
        //         display: 'flex'
        //     }
        // }
    },
    carousel_list: {

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
    carousel_new_item: {},
    carousel_new_list: {
        display: 'flex',
        // alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: '20px'
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
            color: '#31c27c'
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