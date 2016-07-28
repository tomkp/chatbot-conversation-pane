import React, {Component} from 'react';
import {render} from 'react-dom';

import './mathbot.scss';

import Conversation from '../src/conversation/Conversation'


const bodhi = 'http://pointbreak-chatbot.surge.sh/bodhi.jpg';
const keanu = 'http://pointbreak-chatbot.surge.sh/keanu.jpg';
const tom = 'tom.jpg';
const alice = 'alice.png';
const jacob = 'jacob.png';

const out = tom;
const inx= alice;

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
    [200, 99, '+'],
    [200, 99, '+'],
    [300, 99, '+'],
    [399, 1, '+'],
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


const Answer = ({active, onEnter}) => {
    return (
        <div className="Answer">
            <input type="number" readOnly={!active} onKeyUp={(e) => {
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
            // chat: [
            // ],
            chat: [
                {output: true, message: "Hi!", avatar: out},
                {output: true, message: "Lets do MATHS QUIZ!", avatar: out},
                {output: true, message: message, avatar: out}
            ],
            questionIndex: 0,
            wait: true
        };
        //this.addMessage = this.addMessage.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }



    fetchQuestion(index) {
        const data = questions[index];
        return `${data[0]} ${data[2]} ${data[1]} = `;
    }

    check(data, value) {
        let expected;

        //const data = this.props.data;
        if (data) {
            if (data[2] === '+') {
                expected = data[0] + data[1];
            } else {
                expected = data[0] - data[1];
            }
            /*if (value) {
                const correct = expected === +value;
                this.setState({
                    status: correct ? 'correct' : 'incorrect'
                });
            } else {
                this.setState({
                    status: ''
                });
            }*/

            console.log(`${value && expected === +value} ${value} ${expected}`)
            if (value && expected === +value) {
                return true;
            }
        }
        return false;
    }

    onEnter(value) {
        console.log(`on enter ${value}`);
        //this.addMessage({output: false, message: value, avatar: bodhi});
        //validate answer

        // if correct - congratulate
        // and show next question

        const correct = this.check(questions[this.state.questionIndex], value);

        const nextQuestion = questions[this.state.questionIndex + 1];
        const message = `${nextQuestion[0]} ${nextQuestion[2]} ${nextQuestion[1]} = `;

        if (correct) {
            this.setState({
                chat: [
                    ...this.state.chat,
                    {output: false, message: value, avatar: inx, className: 'correct'},
                    //{output: true, message: 'Well done! Let\'s try another...', avatar: out},
                    {output: true, message: message, avatar: out},

                ],
                questionIndex: this.state.questionIndex + 1
            });

        } else {
            this.setState({
                chat: [
                    ...this.state.chat,
                    {output: false, message: value, avatar: inx, className: 'incorrect'}
                    //{output: true, message: 'Wrong! Try again...', avatar: bodhi}
                ],
                //questionIndex: this.state.questionIndex + 1
            });

        }


    }

    render() {
        const {chat} = this.state;
        return (
            <div className="application">
                <Conversation chat={chat}/>
                <Answer active={this.state.wait} onEnter={this.onEnter}/>
            </div>
        );
    }
}

render(<Application />, document.getElementById('root'));
