import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import Icon from 'antd/lib/icon';
// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_862212_hnqij5ewxtc.css'
// });
export default class SingerAlbumList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        this.setState({
            data: this.props.list.list
        })
    }
    handleAlbumDetail (item) {
        console.log(item);
        this.props.history.push({
            pathname: '/home/detail',
            state: {
                item: item,
                type: 'album'
            }
        })
    }
    render() {
        return (
            this.state.data &&
                <div className={css(styles.item_container)}>
                    <div className={css(styles.item_title)}>专辑</div>
                    <ul className={css(styles.item_list)}>
                        {
                            this.state.data.map(val => {
                                return <li className={css(styles.item)}
                                           key={val.album_mid}
                                    onClick={this.handleAlbumDetail.bind(this, val)}
                                >
                                    <div className={css(styles.item_img_container)}>
                                        <img
                                            className={css(styles.item_img)}
                                            src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${val.album_mid}.jpg?max_age=2592000`}
                                            alt=""/>
                                    </div>
                                    <p className={css(styles.item_txt)}>{val.album_name}</p>
                                    {/*<p className={css(styles.item_txt)}>{val.singers.map(item => {*/}
                                    {/*return val.singers.length > 1 ? item.singer_name + ' ' : item.singer_name*/}
                                    {/*})}</p>*/}
                                    {/*<p className={css(styles.item_txt)}>{val.singers.length > 1 ? [...val.singers] : null}</p>*/}
                                    <p className={css(styles.item_txt)}>{val.pub_time}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
        );
    }
}
const styles = StyleSheet.create({
    item_container: {
        width: '1100px',
        margin: '30px auto 0'
    },
    item_title: {
        fontSize: '26px',
        marginBottom: '20px',
    },
    item_list: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    item: {
        width: '20%',
        marginBottom: '10px',
    },
    item_img_container: {
        width: '200px',
        height: '200px',
        overflow: 'hidden',
        cursor: 'pointer',
        marginBottom: '10px'
    },
    item_img: {
        width: '100%',
        height: '100%',
        transition: '0.5s all',
        ':hover': {
            transform: 'scale(1.1)'
        }
    },
    item_txt: {
        paddingBottom: '10px'
    }
});