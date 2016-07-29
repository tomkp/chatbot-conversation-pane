import React, {Component} from 'react';
import {render} from 'react-dom';

import './mathbot.scss';

import Conversation from '../src/conversation/Conversation'


const bodhi = 'static/bodhi.jpg';
const keanu = 'static/keanu.jpg';
const tom = 'static/tom.jpg';
const alice = 'static/alice.png';
const jacob = 'static/jacob.png';

const requester = tom;
const responder = alice;

const questions = [
    [100, 1, '+'],
    [100, 7, '+'],
    [100, 9, '+'],
    [100, 10, '+'],
    [100, 11, '+'],
    [100, 17, '+'],
    [200, 1, '+'],
    [200, 4, '+'],
    [200, 10, '+'],
    [200, 17, '+'],
    [200, 77, '+'],
    [100, 99, '+'],
    [200, 99, '+'],
    [300, 99, '+'],
    [99, 1, '+'],
    [299, 1, '+'],
    [499, 1, '+'],
    [10, 10, '+'],
    [20, 10, '+'],
    [50, 10, '+'],
    [90, 10, '+'],
    [100, 10, '+'],
    [100, 11, '+'],
    [110, 1, '+']
    [110, 10, '+']
];


const Score = ({score}) => {
    return (
        <div className="Score">
            <div className="value">{score}</div>
        </div>
    )
};

const Answer = ({onEnter}) => {
    return (
        <div className="Answer">
            <input type="number" onKeyUp={(e) => {
                const value = e.target.value;
                if (e.keyCode === 13 && value.trim().length > 0) {
                    onEnter(value.trim());
                    e.target.value = '';
                }
            }}/>
        </div>
    )
};

class Application extends Component {

    constructor(props) {
        super(props);
        const message = `${questions[0][0]} ${questions[0][2]} ${questions[0][1]} = `;
        this.state = {
            chat: [
                {output: true, message: "Lets do MATHS QUIZ!", avatar: requester},
                {output: true, message: message, avatar: requester}
            ],
            questionIndex: 0,
            score: 0
        };
        this.onEnter = this.onEnter.bind(this);
    }

    check(data, value) {
        let expected;
        if (data) {
            if (data[2] === '+') {
                expected = data[0] + data[1];
            } else {
                expected = data[0] - data[1];
            }
            if (value && expected === +value) {
                return true;
            }
        }
        return false;
    }

    onEnter(value) {
        const correct = this.check(questions[this.state.questionIndex], value);
        const nextQuestion = questions[this.state.questionIndex + 1];
        if (nextQuestion) {

            const message = `${nextQuestion[0]} ${nextQuestion[2]} ${nextQuestion[1]} = `;

            if (correct) {
                this.setState({
                    chat: [
                        ...this.state.chat,
                        {output: false, message: value, avatar: responder, className: 'correct'},
                        {output: true, message: message, avatar: requester},
                    ],
                    questionIndex: this.state.questionIndex + 1,
                    score: this.state.score + 1
                });

            } else {
                this.setState({
                    chat: [
                        ...this.state.chat,
                        {output: false, message: value, avatar: responder, className: 'incorrect'}
                    ]
                });
            }
        }
    }

    render() {
        const {chat, score} = this.state;
        return (
            <div className="application">
                <Score score={score}/>
                <Conversation chat={chat}/>
                <Answer onEnter={this.onEnter}/>
            </div>
        );
    }
}

render(<Application />, document.getElementById('root'));
