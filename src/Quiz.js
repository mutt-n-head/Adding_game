import React, {Component} from 'react';
import QuizOptions from './QuizOptions';
import classnames from 'classnames';

class Quiz extends Component {
    constructor(props) {
        super(props);
        let riddle = this.playGame();
        
        this.state = {
            riddle,
            correct: false,
            gameOver: false};

        this.renderOptions = this.renderOptions.bind(this);
        this.checkResult = this.checkResult.bind(this);
        this.play = this.play.bind(this);
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    checkResult(val) {
        console.log('Check result called with value ' + val);

        if (this.state.riddle.answer ===  val) {
            console.log('correct answer');
            this.setState({
                correct: true,
                gameOver: true
            });
        } else {
            console.log('wrong answer');
            this.setState({
                correct: false,
                gameOver: true
            });
        }
    }

    generateRandomOptions(sum) {
        let varies = [];

        while (varies.length <= 3) {
            let someNum = this.randomNumber(1, sum - 1);

            if (varies.indexOf(someNum) === -1) {
                varies.push(someNum);
            }
        }

        // Go through and use a number 0 or 1 to determine addition or subtraction.
        let resultsArray = varies.map(function(ele, int) {
            if (this.randomNumber(0, 1) === 1) {
                // We add.
                return sum + ele;
            } else {
                return sum - ele;
            }
        }, this);

        resultsArray.push(sum);

        // Can pass a function here to do the resolution.
        resultsArray.sort(function(x, y) {
            // This will give you a positive or negative number for the most part.
            // This translates into less than or greater than.
            return 0.5 - Math.random();
        });

        // console.log(resultsArray);

        return resultsArray;
    }

    playGame() {
        let firstTerm = this.randomNumber(0, 100);
        let secondTerm = this.randomNumber(0, 100);
        let answer = firstTerm + secondTerm;

        let opts = this.generateRandomOptions(answer);

        let riddle = {
            results: opts,
            firstTerm: firstTerm,
            secondTerm: secondTerm,
            answer: answer
        };

        // console.log(riddle);

        return riddle;
    }

    renderOptions() {
        return (
            <div className="options">
                {
                    // This map function on the array returns an array and that's
                    // what gets displayed.  You don't need to explicitly return
                    // it here.  Remember these are JS expressions, simply having
                    // the value for the expression...expresses it.
                    //
                    // Basically put in a statement or variable that evaluates to something i.e. = ele
                    //
                    this.state.riddle.results.map((ele, index) => {
                        // Can execute MULTIPLE lines of code in braces
                        // It still returns the same JSX value, which is pretty cool.
                        // If you use braces here, you need to return a value
                        //
                        // return (<QuizOptions option={ele} key={index} checkResult={this.checkResult} />);
                        // return <QuizOptions option={ele} key={index} checkResult={this.checkResult} />
                        //
                        // <QuizOptions option={ele} key={index} checkResult={() => this.checkResult(ele)} />
                            return <QuizOptions option={ele} key={index} checkResult={this.checkResult} />

                        // You would need brackets instead of parens to do multiple lines of javascript
                        // to add logic in here.  Really should handle logic about what gets displayed
                        // in a child component.
                        // 
                        // if (true) {
                        //     return (<QuizOptions option={ele} key={index} checkResult={this.checkResult} />)
                        // } else {
                        //     return <span>burp</span>
                        // }
                        //
                        // If you use braces, it's more ES2015 JS and you need return statements.
                        //
                    })
                }
            </div>
        );
    }

    renderMessage() {
        if (this.state.correct) {
            return (<h3>Good choice, you won!  Hit the button to try again.</h3>)
        } else {
            return (<h3>So sorry  Hit the button to try again.</h3>)
        }
    }

    play() {
        let anotherRiddle = this.playGame();
        this.setState({
            riddle: anotherRiddle,
            correct: false,
            gameOver: false
        });
    }

    render() {
        return (
            <div className="quiz">
                <div className="quiz-content">
                    <p className="question">
                        What is the sum of&nbsp;
                        <span className="text-info">{this.state.riddle.firstTerm}</span>
                        &nbsp;and&nbsp;
                        <span className="text-info">{this.state.riddle.secondTerm}</span>&nbsp;?</p>
                    {
                        // Make sure you put the () here.  You aren't just giving the function.
                        // You want what it RETURNS, so you have to call it.
                        this.renderOptions()
                    }
                </div>
                <div className={classnames('after', {'wrong animated zoomInDown': !this.state.correct, 'correct animated zoomInDown': this.state.correct, 'hide': !this.state.gameOver})}>
                    {this.renderMessage()}
                </div>
                <div className="play-again" onClick={this.play}>
                    <a className="button">Play Again</a>
                </div>
            </div>
        );
    }
}

export default Quiz;

/*
 * The call above also works like....
 * Since it's a JS expression and you are returning one value with
 * one line of code you don't need braces.
 * 
 * this.state.riddle.results.map((ele, index, origArr) => 
 *     <QuizOptions option={ele} key={index} />
 * )
 * 
 * Another, slightly different form would be.... The parens still
 * denote a SINGLE value from a SINGLE line.
 * 
 * this.state.riddle.results.map((ele, index, origArr) => 
 *     (<QuizOptions option={ele} key={index} />)
 * )
 * 
 * because it returns ONE value and doesn't execute multiple lines of code.
 * 
 * This call will use braces, so multiple lines can be executed
 * this.state.riddle.results.map((ele, index, origArr) => {
 * 
 *     You would need brackets instead of parens to do multiple lines of javascript
 *     to add logic in here.  Really should handle logic about what gets displayed
 *     in a child component.
 * 
 *     if (true) {
 *         return (<QuizOptions option={ele} key={index} checkResult={this.checkResult} />)
 *     } else {
 *         return <span>burp</span>
 *     }
 *
 *     or just do something like one line....
 *                 // }
 *     return <QuizOptions option={ele} key={index} />
 * })
 * 
 * NOTE: DON'T USE function() { ... } USE () => { ... }
 * 
 * Using the function keyword will obscure the 'this'
 * 
 */
