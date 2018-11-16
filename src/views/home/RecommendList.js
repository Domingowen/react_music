import React, {Component} from 'react';
import {StyleSheet, css} from "aphrodite";
// import Carousel from "antd/lib/carousel";
// import Icon from "antd/lib/icon";
import Title from "./Title.js";
import Carousel from 're-carousel';
import axios from 'axios';
// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_862212_9vv1j1sakel.js'
// });
export default class RecommendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList: [{}]
        }
    }
    recommendCarousel = null;
    componentDidMount () {
        // console.log(this.recommendCarousel);
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
                    recommendList: recommend
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
                    recommendList: recommend
                })
            }).catch((res) => {
                console.log(res);
            });
        }

        this.setState({
            recommendSelect: index
        })
    }
    render () {
        return (
            <div className={css(styles.rec_container)}>
                <Title/>
                <div className={css(styles.carousel_container)}>
                    {this.state.recommendList.length > 0 ?
                        <Carousel
                            ref={(el) => this.recommendCarousel = el}
                            // dots={true}
                            // autoplay={true}
                            // speed={500}
                            // autoplaySpeed={5000}
                            duration={1000}
                            loop={true}
                            auto={true}
                            // widgets={}
                            // className={css(styles.carousel_list)}
                        >

                            {
                                this.state.recommendList.map((val, index) => {
                                    return <div className={css(styles.carousel_recommend_container)} key={index}>
                                        <ul className={css(styles.carousel_recommend_list)}>
                                            {val.map((val, index) => {
                                                return  <li className={css(styles.carousel_recommend_items)} key={index} onClick={this.handleDetailSingRecommend.bind(this, val)}>
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
                            <div style={{backgroundColor: 'tomato', height: '100%'}}>Frame 1</div>
                            <div style={{backgroundColor: 'orange', height: '100%'}}>Frame 2</div>
                            <div style={{backgroundColor: 'orchid', height: '100%'}}>Frame 3</div>
                        </Carousel>: null
                    }
                    <div className={css(styles.carousel_btn_left)}
                         onClick={() => {this.recommendCarousel.prev()}}
                    >
                        <this.props.IconFont type="icon-zuojiantou" />
                    </div>
                    <div className={css(styles.carousel_btn_right)}
                         onClick={() => {this.recommendCarousel.next()}}
                    >
                        <this.props.IconFont type="icon-youjiantou" />
                    </div>
                </div>
            </div>
        )
    }
}
const styles = StyleSheet.create({
    rec_container: {
        position: 'relative',
    },
    carousel_container: {
        width: '1100px',
        height: '500px',
        margin: '0 auto'
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
        transform: 'translate(0, -50%)',
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