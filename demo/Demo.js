import React, {Component} from 'react';
import {render} from 'react-dom';

import './demo.scss';

import Conversation from '../src/conversation/Conversation'

const outputAvatar = 'https://avatars3.githubusercontent.com/u/171331?v=3&s=460';
const inputAvatar = 'https://c1.staticflickr.com/9/8512/8370573660_5802630929_n.jpg';


const bodhi = 'http://ia.media-imdb.com/images/M/MV5BMTM2NzA5Njk1OF5BMl5BanBnXkFtZTYwMzkyOTY3._V1_UX100_CR0,0,100,100_AL_.jpg';
const utah = 'http://ia.media-imdb.com/images/M/MV5BMTgwNjkwOTI4NF5BMl5BanBnXkFtZTYwNTkyOTY3._V1_UX100_CR0,0,100,100_AL_.jpg';
const pointBreak = [
    {output: true, message: "I'm not armed.", avatar: utah},
    {output: false, message: "But, you're not alone.", avatar: bodhi},
    {output: true, message: "Good guess. There is a guy on you now.", avatar: utah},
    {output: true, message: "Where is Roach?", avatar: utah},
    {
        output: false,
        message: "He's around somewhere. Listen Johnny, we're in a kind of a hurry; is there anything you need?",
        avatar: bodhi
    },
    {output: true, message: "You gotta tell me where she is.", avatar: utah},
    {output: false, message: "Oh yeah, and let my policy expire. Good idea.", avatar: bodhi},
    {output: true, message: "Look Bodhi, people are dead, the ride is over.", avatar: utah},
    {output: false, message: "Oh, no no no. I say when it's over.", avatar: bodhi},
    {
        output: true,
        message: "They will nail you wherever you land. They'll use something new called radar, maybe you've heard of it.",
        avatar: utah
    },
    {output: false, message: "What is your...", avatar: bodhi},
    {
        output: true,
        message: "Bodhi, I know you man. When they fall on you, you won't back down and they'll have to burn your ass to the ground.",
        avatar: utah
    },
    {output: false, message: "Shit happens.", avatar: bodhi},
    {
        output: true,
        message: "You got a death wish. You want to ride to glory, fine. But, don't take Tyler with you. I'm begging you. Tell me where she is, and I walk away.",
        avatar: utah
    },
    {output: false, message: "You walk away?", avatar: bodhi},
    {output: true, message: "I walk away.", avatar: utah},
    {output: false, message: "That's beautiful Johnny.", avatar: bodhi}
];

class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat: [],
            count: 0
        };
    }

    componentDidMount() {
        const intervalId = setInterval(() => {
            const count = this.state.count;
            const message = pointBreak[count];
            if (message) {
                this.setState({
                    count: count + 1,
                    chat: [...this.state.chat, message]
                });
            }
        }, 1000 + (Math.random() * 2000));
    }

    render() {
        const {chat} = this.state;
        return (
            <div className="application">
                <Conversation chat={chat}/>
            </div>
        );
    }
}

render(<Application />, document.getElementById('root'));
