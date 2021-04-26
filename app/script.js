import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      time: 0,
      timer: null,
    };
  }

  formatTime = (time) => {
    let sec = time % 60;
    let min = Math.floor(time / 60);
    if (sec < 10) sec = '0' + sec;
    if (min < 10) min = '0' + min;
    return min + ':' + sec;
  }

  step = () => {
    this.setState({
      time: this.state.time - 1,
    });
    if (this.state.time === 0) {
      this.playBell();
      if(this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        });
      }
      else if (this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: 1200,
        });
      }  
    }
  }

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  }

  stopTimer = () => {
    this.setState({
      status: 'off',
      time: 0,
    })
    clearInterval(this.state.timer);
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  closeApp = () => {
    window.close();
  }

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(this.state.status === 'off') &&
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        }
        {(this.state.status === 'work') &&
          <img src="./images/work.png" />
        }
        {(this.state.status === 'rest') &&
          <img src="./images/rest.png" />
        }  
        {(this.state.status !== 'off') &&
          <div className="timer">
            {this.formatTime(this.state.time)}
          </div>
        }  
        {(this.state.status === 'off') &&
          <button className="btn" onClick={this.startTimer}>Start</button>
        }
        {(this.state.status !== 'off') &&
          <button className="btn" onClick={this.stopTimer}>Stop</button>
        }  
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
