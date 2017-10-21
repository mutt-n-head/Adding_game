import React, {Component} from 'react';

class QuizOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    
        this.callParentCheckOptions = this.callParentCheckOptions.bind(this);
        this.someFunction = this.someFunction.bind(this);
    }
    
    callParentCheckOptions() {
        this.props.checkResult(this.props.option);
    }
    
    someFunction(value) {
        console.log('Got the value from ' + value);
        this.callParentCheckOptions();
    }

    render() {
        return (
            <div className="fields animated zoomIn" onClick={this.callParentCheckOptions}><div className="field-block">{this.props.option}</div></div>
        );
    }
}

export default QuizOptions;

// Another way to do this is to pass in a placeholder function that basically calls another function with a value
// that you already know about.  Abhay does it in his example but I didn't know why.  You can more easily
// just use a method in the component since all information should be in state object.
//
// <div className="fields" onClick={() => this.someFunction(this.props.option)}><div className="field-block">{this.props.option}</div></div>