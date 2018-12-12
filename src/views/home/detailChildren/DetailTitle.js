import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
// import axios from 'axios';
// import Icon from 'antd/lib/icon';
export default class DetailTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        console.log(this.props.data);
        this.setState({
            data: this.props.data
        }, () => {
            console.log(this.state.data);
        })
    }
    componentDidUpdate(prevProps, prevState) {}

    render() {
        if (this.props.type === 'recommend') {
            return (
                <div className={css(styles.container)}>
                    {
                        this.state.data && <div className={css(styles.title_content)}>
                            <div className={css(styles.img_content)}>
                                <img src={this.state.data.logo} alt="" className={css(styles.img_logo)}/>
                            </div>
                            <div className={css(styles.right_content)}>
                                <h1 className={css(styles.title)}>{this.state.data.dissname}</h1>
                                <p className={css(styles.title_nick)}>{this.state.data.nick}</p>
                                <p className={css(styles.title_item)}>标签：{this.state.data.tags.map(val => val.name + ' ')}</p>
                                <p className={css(styles.title_item)}>播放量：{this.state.data.visitnum}</p>
                                <p className={css(styles.title_item)}>简介：{this.state.data.desc}</p>
                            </div>
                        </div>
                    }
                </div>
            )
        } else if (this.props.type === 'album') {
            return (
                <div className={css(styles.container)}>
                    {
                        this.state.data && <div className={css(styles.title_content)}>
                            <div className={css(styles.img_content)}>
                                <img src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${this.state.data.mid}.jpg?max_age=2592000`} alt="" className={css(styles.img_logo)}/>
                            </div>
                            <div className={css(styles.right_content)}>
                                <h1 className={css(styles.title)}>{this.state.data.name}</h1>
                                <p className={css(styles.title_nick)}>{this.state.data.singername}</p>
                                <p className={css(styles.title_item)}>标签：{this.state.data.genre}</p>
                                <p className={css(styles.title_item)}>发行时间：{this.state.data.aDate}</p>
                                <p className={css(styles.title_item)}>简介：{this.state.data.desc}</p>
                            </div>
                        </div>
                    }
                </div>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        margin: '45px 0 30px 0'
    },
    title_content: {
        display: 'flex',
        // alignItems: 'center',
    },
    img_content: {
        width: '250px',
        height: '250px'
    },
    img_logo: {
        width: '100%',
        height: '100%'
    },
    right_content: {
        paddingLeft: '30px',
    },
    title: {
        fontSize: '30px',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        paddingTop: '10px'
    },
    title_nick: {
        fontSize: '16px',
        paddingBottom: '10px',
        paddingTop: '10px'
    },
    title_item: {
        fontSize: '16px',
        height: '30px',
        lineHeight: '30px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '800px'
    }
});