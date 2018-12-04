import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
import Carousel from "antd/lib/carousel";
import Title from "./Title.js";
import axios from "axios";
export default class NewSongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            selectIndex: 0,
            navList: [],
        }
    }
    carousel = null;
    componentDidMount () {}
    componentDidUpdate (prevProps, prevState) {
        if (this.props.list.length !== prevProps.list.length) {
            this.setState({
                list: this.props.list
            })
        }
        if (this.props.navList.length !== prevProps.navList.length) {
            this.props.navList.map(val => {
                val.item_name = val.title;
                return val;
            });
            this.setState({
                navList: this.props.navList
            })
        }
        // console.log(this.props.list);
    }
    timeFormat (time) {
        let hour = parseInt(time / 3600);
        let min = parseInt((time / 60) % 60);
        let sec = parseInt(time % 60);
        let currentMin = '';
        let currentSec = '';
        if (min < 10) {
            currentMin = `0${min}`;
        } else {
            currentMin = min;
        }
        if (sec < 10) {
            currentSec = `0${sec}`;
        } else {
            currentSec = sec;
        }
        return `${currentMin}:${currentSec}`;
    }
    handleSelect (index, item) {
        console.log(index, item);
        this.carousel.goTo(0);
        this.setState({
            selectIndex: 0
        });
        let id = item.id;
        axios({
            method: 'post',
            url: 'http://192.168.0.122:20200/v1/music/sing_new',
            data: {
                type: id,
            }
        }).then((res) => {
            console.log(res.data.data);
            let data = res.data.data.new_song.data.song_list;
            let newSong = [];
            for(let i=0,len=data.length - 1;i < 45;i+=9){
                newSong.push(data.slice(i,i+9));
            }
            this.setState({
                list: newSong,
            })
        }).catch((res) => {
            console.log(res);
        });
    }
    render () {
        return (
            <div className={css(styles.rec_container)}>
                <Title title={'新歌首发'} nav={this.state.navList} handleSelect={this.handleSelect.bind(this)}/>
                <div className={css(styles.carousel_container)}>
                    {this.state.list.length > 0 &&
                    <Carousel
                        ref={(el) => this.carousel = el}
                        dots={false}
                        autoplay={true}
                        speed={500}
                        autoplaySpeed={5000}
                        afterChange={(index)=> {this.setState({selectIndex: index})}}
                    >
                        {
                            this.state.list.map((val, index) => {
                                return <div className={css(styles.carousel_recommend_container)} key={index}>
                                    <ul className={css(styles.carousel_recommend_list)}>
                                        {val.map((val, oIndex) => {
                                            return <li className={css(styles.carousel_recommend_items)} key={val.mid}
                                                // onClick={this.handleDetailSingRecommend.bind(this, val)}
                                            >
                                                <div className={css(styles.carousel_rec_img_content)}>
                                                    <img className={css(styles.carousel_rec_img) + ' imgActive'} src={`//y.gtimg.cn/music/photo_new/T002R150x150M000${val.album.mid}.jpg?max_age=2592000`} alt=""/>
                                                </div>
                                                <div className={css(styles.carousel_rec_txt)}>
                                                    <p className={css(styles.carousel_rec_title)}>{val.title}</p>
                                                    <p className={css(styles.carousel_rec_singer)}>{val.singer[0].title}</p>
                                                </div>
                                                <span>{this.timeFormat(val.interval)}</span>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            })
                        }
                    </Carousel>
                    }
                    <div className={css(styles.carousel_btn_left)}
                         onClick={() => {this.carousel.prev()}}
                    >
                        <this.props.IconFont type="icon-zuojiantou" />
                    </div>
                    <div className={css(styles.carousel_btn_right)}
                         onClick={() => {this.carousel.next()}}
                    >
                        <this.props.IconFont type="icon-youjiantou" />
                    </div>
                    <ul className={css(styles.dot_list)}>
                        {this.state.list.length > 0 && this.state.list.map((val, index) => {
                            return <li
                                key={index}
                                className={css(styles.dot_item, index === this.state.selectIndex ?styles.dot_item_active : null)}
                                onClick={()=> {
                                    this.setState({selectIndex: index}, () => {
                                        this.carousel.goTo(index)
                                    })}
                                }
                            ></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    rec_container: {
        position: 'relative',
        background: 'linear-gradient(to bottom, #f1f1f1, #fff)'
    },
    carousel_container: {
        width: '1100px',
        margin: '20px auto 0',
        webkitTapHighlightColor: 'transparent',
        outline: 'none',
        paddingBottom: '20px',
        minHeight: '200px',
    },
    carousel_recommend_container: {
        webkitTapHighlightColor: 'transparent',
        outline: 'none',
        height: '100%'
    },
    carousel_recommend_list: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    carousel_recommend_items: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        webkitTapHighlightColor: 'transparent',
        paddingBottom: '10px',
        marginBottom: '-1px',
        paddingTop: '10px',
        borderBottom: '1px solid #f1f1f1',
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c',
        },
        ':hover .imgActive': {
            transform: 'scale(1.1)'
        }
    },
    carousel_rec_img_content: {
        width: '90px',
        height: '90px',
        overflow: 'hidden'
    },
    carousel_rec_img: {
        width: '90px',
        height: '90px',
        transition: '0.3s all'
    },
    carousel_rec_txt: {
        paddingLeft: '10px',
        paddingRight: '15px',
    },
    carousel_rec_title: {
        width: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    carousel_rec_singer: {
        paddingTop: '5px'
    },
    dot_list: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10px'
    },
    dot_item: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#ccc',
        marginRight: '10px',
        cursor: 'pointer'
    },
    dot_item_active: {
        backgroundColor: '#31c27c'
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
        transform: 'translate(0, -30%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 100,
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
        transform: 'translate(0, -30%)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        ':hover': {
            color: '#31c27c',
            backgroundColor: 'rgba(0,0,0,.4)',
        }
    },
});