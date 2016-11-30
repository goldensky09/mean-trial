'use strict';

// Define a component:
var Button = React.createClass({
  displayName: 'Button',

  localHandleClick: function localHandleClick() {
    this.props.localHandleClick(this.props.increment);
  },
  render: function render() {
    return React.createElement(
      'button',
      { onClick: this.localHandleClick },
      '+',
      this.props.increment
    );
  }
});

var Result = React.createClass({
  displayName: 'Result',

  render: function render() {
    return React.createElement(
      'div',
      null,
      this.props.localCounter
    );
  }
});

var Main = React.createClass({
  displayName: 'Main',

  getInitialState: function getInitialState() {
    return { counter: 0 };
  },
  handleClick: function handleClick(increment) {
    this.setState({ counter: this.state.counter + increment });
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(Button, { localHandleClick: this.handleClick, increment: 1 }),
      React.createElement(Button, { localHandleClick: this.handleClick, increment: 5 }),
      React.createElement(Button, { localHandleClick: this.handleClick, increment: 10 }),
      React.createElement(Button, { localHandleClick: this.handleClick, increment: 100 }),
      React.createElement(Result, { localCounter: this.state.counter }),
      React.createElement(
        'h1',
        null,
        'Hello React!'
      )
    );
  }
});

// Render a component to the browser:
ReactDOM.render(React.createElement(Main, null), // What to render (an instance of the Main component)
document.getElementById('container') // Where to render it
);
