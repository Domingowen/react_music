import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import axios from 'axios';
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData: {},
        }
    }
    componentDidMount () {
        // console.log(this.props.location);
        let contentId = this.props.location.state.item.content_id;
        let tId = this.props.location.state.item.tid;
        // console.log(contentId);
        axios({
            method: 'post',
            url: 'http://192.168.254.103:20200/v1/music/detail_rec',
            data: {
                contentId: contentId ? contentId : tId
            }
        }).then(res => {
            console.log(res.data.data.cdlist[0]);
            this.setState({
                itemData: res.data.data.cdlist[0]
            })
        }).catch(err => {
            console.log(err);
        })
    }
    play (item) {
        console.log(item)
    }
    createDec() { return {__html: this.state.itemData.desc}; };
    render () {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.header)}>
                    <img src={this.state.itemData.logo} alt="" className={css(styles.header_img)}/>
                    <div className={css(styles.header_content)}>
                        <h1 className={css(styles.header_title)}>
                            {this.state.itemData.dissname}
                        </h1>
                        {/*<h1 className={css(styles.header_nick)}>*/}
                            {/*{this.state.itemData.nickname}*/}
                        {/*</h1>*/}
                        <h1 className={css(styles.header_tag)}>
                            <span>标签：</span>{this.state.itemData.tags ? this.state.itemData.tags.map((val, index) => {
                                return <span style={{paddingRight: '5px'}} key={index}>{val.name}</span>
                            }) : null}
                        </h1>
                        <h1 className={css(styles.header_tag)}>
                            <span>播放量：</span><span>{this.state.itemData.visitnum}</span>
                        </h1>

                        <h1 className={css(styles.header_info)}>
                            <span>简介：</span><span>{this.state.itemData.desc}</span>
                        </h1>
                    </div>
                </div>
                <div className={css(styles.list)}>
                    <div className={css(styles.list_right)}>
                        <ul className={css(styles.list_title)}>
                            <li className={css(styles.list_sing)}>歌曲</li>
                            <li className={css(styles.list_author)}>歌手</li>
                            <li className={css(styles.list_album)}>专辑</li>
                            <li className={css(styles.list_operate)}>操作</li>
                        </ul>
                        {this.state.itemData.songlist ? this.state.itemData.songlist.map((val, index) => {
                            return <ul className={css(styles.list_content)} key={index} onClick={this.play.bind(this, val)}>
                                <li className={css(styles.list_sing)}>{val.songname}</li>
                                <li className={css(styles.list_author)}>{val.singer.map(val => <span key={val.id}>{val.name}</span>)}</li>
                                <li className={css(styles.list_album)}>{val.albumname}</li>
                                <li className={css(styles.list_operate)}>播放</li>
                            </ul>
                        }) : null}
                    </div>
                </div>
            </div>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        width: '1000px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        // alignItems: 'center',
        margin: '40px 10px'
    },
    header_img: {
        width: '200px',
        height: '200px'
    },
    header_content: {
        paddingLeft: '50px'
    },
    header_title: {
        paddingTop: '10px',
        fontSize: '28px',
        fontWeight: 700
    },
    header_nick: {
        paddingTop: '20px',
        fontSize: '20px',
        fontWeight: 500
    },
    header_tag: {
        paddingTop: '20px',
        fontSize: '20px',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center'
    },
    header_info: {
        paddingTop: '20px',
        fontSize: '20px',
        lineHeight: '24px',
        width: '700px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        // '-webkit-line-clamp': 2,
        // '-webkit-box-orient': 'vertical',
        // webkitLineClamp: 3,
        // webkitBoxOrient: 'vertical',
        // display: '-webkit-box',
    },
    list_title: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        height: '60px',
        fontSize: '20px',
        // borderRadius: '6px',
        fontWeight: 'bold',
        // backgroundColor: '#87e8de',

        // color: '#fff',
        // borderBottom: '1px solid #613400',
        padding: '0 20px',


    },
    list_right: {
        // width: '700px',

    },
    list_sing: {
        width: '300px',
    },
    list_author: {
        width: '300px'
    },
    list_album: {
        width: '250px'
    },
    list_operate: {
        width: '150px',
        textAlign: 'center'
    },
    list_content: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 700,
        padding: '20px 20px',
        ':hover': {
            color: '#31c27c'
        }
    }
});