import React, { Component } from 'react';
import Moment from 'moment';
import { TriggerAction } from '../reactions/utils';
const defaultTimer = 30 * 60 * 1000;

export default class Timer extends Component {
  constructor (props) {
    super(props);
    this._tick = this._tick.bind(this);
    this.state = {
      timer: defaultTimer
    };
  }
  _tick () {
    this.setState({timer: this.state.timer - 1000});
  }

  componentDidMount () {
    this.interval = setInterval(this._tick, 1000);
    setTimeout(() => {
      TriggerAction('page:set', 'login');
      TriggerAction('logout');
    }, defaultTimer);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    return (
      <span>
        <span className='glyphicon glyphicon-hourglass' /> {' '}
        {Moment(this.state.timer).format('mm:ss')}
      </span>
    );
  }
}
