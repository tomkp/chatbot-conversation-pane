import React, {Component, PropTypes} from "react";
import {findDOMNode} from "react-dom";
import "./scroll-to-bottom.scss";

export default class ScrollToBottom extends Component {

    componentWillUpdate() {
        const node = findDOMNode(this);
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            const node = findDOMNode(this);
            const intervalId = setInterval(() => {
                node.scrollTop = node.scrollTop + 10;
                if ((node.scrollTop + node.offsetHeight) >= node.scrollHeight) {
                    clearInterval(intervalId);
                }
            }, 50);
        }
    }

    render() {
        return (<div className={`Scroll-To-Bottom ${this.props.className}`}>{this.props.children}</div>);
    }
}

ScrollToBottom.propTypes = {
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

ScrollToBottom.defaultProps = {};
