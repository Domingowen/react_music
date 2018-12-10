import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
import Carousel from "antd/lib/carousel";
import Title from "./Title.js";
import axios from 'axios';
import Player from "../../redux/reducer/player";
export default class RecommendList extends Component {
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
        // console.log(prevProps);
        if (this.props.list.length !== prevProps.list.length) {
            this.setState({
                list: this.props.list
            })
        }
        if (this.props.navList.length !== prevProps.navList.length) {
            this.setState({
                navList: this.props.navList
            })
        }
    }
    handleSelectRecommend (index, item) {
        console.log(index, item);
        let id = item.item_id;
        this.carousel.goTo(0);
        this.setState({
            selectIndex: 0
        });
        if (id === 0 ) {
            axios({
                method: 'post',
                url: 'http://192.168.0.131:20200/v1/music/sing_recommend',
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
                    list: recommend
                })
            }).catch((res) => {
                console.log(res);
            });
        } else {
            axios({
                method: 'post',
                url: 'http://192.168.0.131:20200/v1/music/sing_service',
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
                    list: recommend
                })
            }).catch((res) => {
                console.log(res);
            });
        }
    }
    handleSelectDetail (item) {
        console.log(item);
        console.log(this.props);
        this.props.history.push({
            pathname: '/home/detail',
            state: {
                item: item,
                type: 'recommend'
            }
        })
    }
    render () {
        return (
            <div className={css(styles.rec_container)}>
                <Title title={'歌单推荐'} nav={this.state.navList} handleSelect={this.handleSelectRecommend.bind(this)}/>
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
                                                // console.log(val);
                                                return  <li className={css(styles.carousel_recommend_items)} key={oIndex}
                                                            onClick={this.handleSelectDetail.bind(this, val)}
                                                >
                                                    <div className={css(styles.carousel_rec_img_content)}>
                                                        {   val.cover_url_big ?
                                                            <img className={css(styles.carousel_rec_img) + ' imgActive'} src={val.cover_url_big} alt=""/> :
                                                            <img className={css(styles.carousel_rec_img) + ' imgActive'} src={val.cover} alt=""/>
                                                        }
                                                    </div>
                                                    <span className={css(styles.carousel_rec_txt)}>{val.title}</span>
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
        height: '300px',
        margin: '20px auto 0',
        webkitTapHighlightColor: 'transparent',
        outline: 'none',
    },
    carousel_recommend_container: {
        webkitTapHighlightColor: 'transparent',
        outline: 'none',
        height: '100%'
    },
    carousel_recommend_list: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    carousel_recommend_items: {
        width: '19%',
        height: '260px',
        display: 'flex',
        flexDirection: 'column',
        webkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
        ':hover': {
            color: '#31c27c',
        },
        ':hover .imgActive': {
            transform: 'scale(1.1)'
        }
    },
    carousel_rec_img_content: {
        width: '100%',
        overflow: 'hidden',
    },
    carousel_rec_img: {
        width: '100%',
        transition: '0.5s all',
    },
    carousel_rec_txt: {
        height: '40px',
        paddingTop: '10px',
        lineHeight: '20px',
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