import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import idiomdb from './idiomdb.json';
import {findAltWord} from './findAltWord.js';
import styled from 'styled-components';


const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: rgb(255, 165, 0);
  border: 2px solid rgb(255, 165, 0);
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
 
  &:hover {
    background-color: rgb(255, 165, 0);
    color: white;
  }
`;

const H1 = styled.section`
    background: papayawhip;
    border-radius: 20px;
    text-align: center;
    height: 40%;
    width: 83%;
    justify-content: center;
    align-items: center;
    display: flex;
    padding-top: 2.5vh;
    padding-right: 5%;
    padding-bottom: 2.5vh;
    padding-left: 5%;
    margin-top: 2.5vh;
    margin-right: 3.5%;
    margin-bottom: 2.5vh;
    margin-left: 3.5%;
    display: flex;
`;


const Maindiv = styled.div`
    background: orange;
    height: 100vh;
    width: 100%;
`;




var nbIdioms = Object.keys(idiomdb).length

class FindIdiom extends React.Component {

    render() {
        return(    
            
                
                <H1>
                    <Button onClick={() => this.props.findIdiom()}>
                        Find an idiom
                    </Button>
                <h1 className="center">
                {this.props.idiom}
                </h1>    
                </H1>
            
        )
    }
}

class Hijack extends React.Component {


    render() {
        if (this.props.idiom !== "") { return ( 
            <H1> 
                <Button onClick={() => this.props.hijack()}>
                    Hijack idiom!
                </Button>
                <h1 className="center">
                {this.props.altIdiom}
                </h1>
            </H1>
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

    findDiffRandomNum(numArray) {
        var newRandomNum = Math.floor(Math.random() * (idiomdb[this.state.randomNum].alt.length - numArray.length))
        while (numArray.includes(newRandomNum)) {newRandomNum = newRandomNum + 1}
        numArray.push(newRandomNum)
        return numArray
    }

    hijack() {
        if (idiomdb[this.state.randomNum].alt.length === 0) {this.setState({altIdiom: "Nope, this one is too good to be hijacked!"})} else {
            const randomAltNum = Math.floor(Math.random() * idiomdb[this.state.randomNum].alt.length);
            const altWord = idiomdb[this.state.randomNum].alt[randomAltNum];
            findAltWord(altWord).then(response => {
                const altIdiom = this.state.idiom.replace(altWord,response);
                this.setState({altIdiom: altIdiom});
            })
            
            //that part if there are more than 1 simultaneous word changed in an idiom
            /*
            const randomSimAltNum = Math.floor(Math.random() * idiomdb[this.state.randomNum].simultaneousAltNum.length);
            for (i = 1 ; i < idiomdb[this.state.randomNum].simultaneousAltNum[randomSimAltNum]; i++) {
            const altWord = idiomdb[this.state.randomNum].alt[randomAltNumArr];
            findAltWord(altWord).then(response => {
                const altIdiom = this.state.idiom.replace(altWord,response);
                this.setState({altIdiom: altIdiom});
        })}*/
    }}


    render() {
    return( 
        <Maindiv>
            <FindIdiom
            idiom={this.state.idiom}
            findIdiom={() => this.findIdiom()}
            />
            <Hijack
            altIdiom={this.state.altIdiom}
            idiom={this.state.idiom}
            hijack={() => this.hijack()}
            />
        </Maindiv>
    )
    }
}



ReactDOM.render(
    <Main/>,
  document.getElementById('root')
)