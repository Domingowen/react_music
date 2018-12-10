import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
export default class SingerTitle extends Component {
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
        })
    }

    render() {
        return (
            this.state.data &&
            <div className={css(styles.container)}>
                <div className={css(styles.header)}>
                    <div className={css(styles.avatar)}>
                        <img className={css(styles.avatar_img)} src={`//y.gtimg.cn/music/photo_new/T001R300x300M000${this.state.data.singer.singerMid}.jpg?max_age=2592000`} alt=""/>
                    </div>
                    <div className={css(styles.singer_content)}>
                        <div className={css(styles.singer_title)}>{this.state.data.singer.singerName}</div>
                        <div className={css(styles.singer_info)}>{this.state.data.singer.singerInfo}</div>
                        <div className={css(styles.singer_detail)}>
                            <div className={css(styles.singer_detail_left)}>
                                <span className={css(styles.singer_detail_title)}>单曲</span>
                                <strong className={css(styles.singer_detail_num)}>{this.state.data.songList.total}</strong>
                            </div>
                            <div className={css(styles.singer_detail_right)}>
                                <span className={css(styles.singer_detail_title)}>专辑</span>
                                <strong className={css(styles.singer_detail_num)}>{this.state.data.albumList.total}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '1100px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        marginTop: '40px',
        marginBottom: '30px',
        // alignItems: 'center'
    },
    avatar: {
        width: '200px',
        height: '200px',
    },
    avatar_img: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
    },
    singer_content: {
        marginLeft: '35px',
        paddingTop: '31px',
    },
    singer_title: {
        fontSize: '38px',
        fontWeight: 400,
        height: '50px',
        lineHeight: '50px'
    },
    singer_info: {
        fontSize: '14px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '800px',
        height: '50px',
        lineHeight: '50px'
    },
    singer_detail: {
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
    },
    singer_detail_left: {
        marginRight: '20px',
        paddingRight: '20px',
    },
    singer_detail_title: {
        fontSize: '18px'
    },
    singer_detail_num: {
        fontSize: '25px',
        fontWeight: 300,
        paddingLeft: '10px',
        fontFamily: 'poppin',
    },
    singer_detail_right: {
        marginRight: '20px',
        paddingRight: '20px'
    },
});