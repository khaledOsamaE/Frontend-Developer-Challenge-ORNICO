/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */

// Challenge 1

function addContinent(arrOfCities, continent) {
  arrOfCities.forEach((cityObj) => {
    cityObj.continent = continent;
  });
  return arrOfCities;
}
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */

// Challenge 2

function addNumAtBegin(arrOfElem, number) {
  arrOfElem.unshift(number < 6 ? 0 : number);
  return arrOfElem;
}
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */

// Challenge 3

function getNextQuarter(date) {
  if (date.getMinutes() == 0) return 0;
  else if (date.getMinutes() > 45) return 0;
  else if (date.getMinutes() > 30) return 45;
  else if (date.getMinutes() > 15) return 30;
  else return 15;
}
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */

// Challenge 4 – React Questions

//-Question 1 || Can you identify two problems?

// wrong
class MyComponent extends React.Component {
  constructor(props) {
    // set the default internal state
    this.state = {
      clicks: 0,
    };
  }

  componentDidMount() {
    this.refs.myComponentDiv.addEventListener("click", this.clickHandler);
  }

  componentWillUnmount() {
    this.refs.myComponentDiv.removeEventListener("click", this.clickHandler);
  }

  clickHandler() {
    this.setState({
      clicks: this.clicks + 1,
    });
  }

  render() {
    let children = this.props.children;

    return (
      <div className="my-component" ref="myComponentDiv">
        <h2>My Component ({this.state.clicks} clicks})</h2>
        <h3>{this.props.headerText}</h3>
        {children}
      </div>
    );
  }
}

/*
  First problem ==> That we must call super constructor in derived class 
  before accessing 'this'

  Second problem ==> That we need to change the form of useState to accept 
  a function rather than an object. as we need to access the prevState

  Third problem ==> That we need to bind the clickHandler method to the 
  "this" object
*/
//correct
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // set the default internal state
    this.state = {
      clicks: 0,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.refs.myComponentDiv.addEventListener("click", this.clickHandler);
  }

  componentWillUnmount() {
    this.refs.myComponentDiv.removeEventListener("click", this.clickHandler);
  }

  clickHandler() {
    this.setState(function (state) {
      return {
        clicks: state.clicks + 1,
      };
    });
  }

  render() {
    let children = this.props.children;

    return (
      <div className="my-component" ref="myComponentDiv">
        <h2>My Component ({this.state.clicks} clicks})</h2>
        <h3>{this.props.headerText}</h3>
        {children}
      </div>
    );
  }
}

/************************************************************************************************************** */

// - Question 2 || Can you initialize state from a function? Provide an example
import React, { useState } from "react";

const MyComponent = (props) => {
  const [state, setState] = useState(0);
  return <div>this is my State {state}</div>;
};
/************************************************************************************************************** */

// - Question 3 || What's wrong with this code?
// wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

/*
  we can't update the state using the normal form of useState, as this.props and 
  this.state may be updated asynchronously, so we should not rely on their values 
  for calculating the next state.

  So To fix it,we use a second form of setState() that accepts a function rather 
  than an object. That function will receive the previous state as the first argument, 
  and the props at the time the update is applied as the second argument:
*/

// correct
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));
