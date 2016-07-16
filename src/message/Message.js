import React, {Component} from 'react';

import './message.scss';

import Avatar from '../avatar/Avatar';

class Message extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({loaded: true})
        }, 100)
    }

    render() {
        //console.log(`Message.render ${JSON.stringify(this.props)}`);
        const {message} = this.props;
        return (
            <div className={`Message ${message.output?'output':'input'}`}>

                {message.avatar && message.output &&
                    <Avatar url={message.avatar} />
                }

                <div className={`inner ${this.state.loaded?'loaded':''}`}>
                    <div className="data">{message.message}</div>
                </div>

                {message.avatar && !message.output &&
                    <Avatar url={message.avatar} />
                }
            </div>
        );
    }
}

export default Message;