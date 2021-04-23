import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import idiomdb from './idiomdb.json';
import {findAltWord} from './findAltWord.js';

var nbIdioms = Object.keys(idiomdb).length

class FindIdiom extends React.Component {

    render() {
        return(    
            <div>
                <button onClick={() => this.props.findIdiom()}>
                    Find an idiom
                </button>
                {this.props.idiom}
            </div>
        )
    }
}

class Hijack extends React.Component {


    render() {
        if (this.props.idiom !== "") { return (  
            <div>
                <button onClick={() => this.props.hijack()}>
                    Hijack idiom!
                </button>
                {this.props.altIdiom}
            </div>
        
        )} else {return null}
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          idiom: "",
          altIdiom: "",
          randomNum: 0,
        };
      }

    findIdiom() {
        var randomNum = Math.floor(Math.random() * nbIdioms) + 1;
        this.setState({
            idiom: idiomdb[`${randomNum}`].value,
            altIdiom: "",
            randomNum: randomNum
    });
    }

    hijack() {
        findAltWord(idiomdb[this.state.randomNum].alt.altWord).then(response => {
            this.setState({altIdiom: `${idiomdb[`${this.state.randomNum}`].alt.start}${response}${idiomdb[this.state.randomNum].alt.end}`})
        })
    }


    render() {
    return(    
        <div>
            <FindIdiom
            idiom={this.state.idiom}
            findIdiom={() => this.findIdiom()}
            />
            <Hijack
            altIdiom={this.state.altIdiom}
            idiom={this.state.idiom}
            hijack={() => this.hijack()}
            />
        </div>
        
    )
    }
}

ReactDOM.render(
    <Main />,
  document.getElementById('root')
);