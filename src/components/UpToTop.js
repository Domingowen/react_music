import React, {Component} from 'react';
import {StyleSheet, css}from 'aphrodite';
import Icon from 'antd/lib/icon';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_862212_2lg15kg7nw7.js',
});
export default class UpToTop extends Component {
    constructor(props) {
        super(props);
    }
    timer = null;
    upTop () {
        let osTop = this.props.refEle.scrollTop || this.props.refEle.scrollTop;
        clearInterval(this.timer);
        if (osTop >= 50) {
            this.timer = setInterval(() => {
                this.props.refEle.scrollTop -= 20;
                if (this.props.refEle.scrollTop <=0) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }, 0)
        }
    }
    componentDidMount() {}
    render() {
        return (
            <div className={css(styles.container)}
                onClick={this.upTop.bind(this)}
            >
                <IconFont type={'icon-tubiao02'} style={{fontSize: '30px', color: '#31c27c'}}/>
            </div>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '50px',
        height: '50px',
        // border: '1px solid #999',
        position: 'fixed',
        bottom: '30px',
        right: '50px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000,
        borderRadius: '5px',
        ':hover': {
            backgroundColor: '#f1f1f1'
        }
    }
});