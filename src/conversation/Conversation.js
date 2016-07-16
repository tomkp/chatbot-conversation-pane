import React, {Component} from 'react';

import './conversation.scss';

import Message from '../message/Message';
import ScrollToBottom from '../scroll-to-bottom/ScrollToBottom';

class Conversation extends Component{

    render() {
        const {chat} = this.props;
        return (
            <ScrollToBottom className="Conversation">
                {
                    chat.map((message, index) => <Message key={index} message={message} />)
                }
            </ScrollToBottom>
        );
    }
}

export default Conversation;