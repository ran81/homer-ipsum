import React, { Component } from 'react';
import quotes from './quotes.json';
import donut from './donut.png';
import './App.css';

class App extends Component {
  state = {
    quote: '',
    btnText: 'Copy to clipboard',
    numOfWords: 3
  }

  clearQuote = () => {
    this.setState({
      ...this.state,
      quote: '',
      numOfWords: 3
    });
  }

  getQuote = () => {
    let filteredQuotes = [];
    for (const key in quotes) {
      if (quotes.hasOwnProperty(key) && (key >= parseInt(this.state.numOfWords))) {
        filteredQuotes.push(...quotes[key]);
      }
    }

    const i = Math.floor(Math.random() * (filteredQuotes.length + 1));
    this.setState({
      ...this.state,
      quote: filteredQuotes[i]
    });
  }

  copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = this.state.quote;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.setState({
      ...this.state,
      btnText: 'Copied!'
    }, () => {
      setTimeout(() => {
        this.setState({
          ...this.state,
          btnText: 'Copy to clipboard'
        });
      }, 700)
    })
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>H<img src={donut} alt="donut" className="donut" />mer Ipsum</h1>
          <p className="desc">Lorem Ipsum generator using Homer Simpsons's quotes!</p>
        </header>
        <div className="controls">
          <button className="btn" onClick={this.getQuote}>Get Quote</button>
          <button className="btn" onClick={this.clearQuote}>Clear</button>
          <label htmlFor="words">Show quotes with at least&nbsp;
          <input
              name="words"
              type="number"
              step="3" min="3" max="30"
              value={this.state.numOfWords}
              onChange={(e) => this.setState({
                ...this.state,
                numOfWords: e.target.value
              })}
            /> words.</label>
        </div>
        <div className="balloon">
          {this.state.quote}
        </div>
        <button disabled={!this.state.quote} className="btn btn--wide btn--copy" onClick={this.copyToClipboard}>
          {this.state.btnText}
        </button>
        <footer>
      All rights reserved to the awesome people behind the show &copy;
    </footer>
      </div>
    );
  }
}

export default App;
