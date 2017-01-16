import React, { Component } from 'react';
import State from '../state';
import Navbar from './navbar';
import Login from './login';
import Student from './student';
import List from './list';
import Allocate from './allocate';
import Footer from './footer';
import { TriggerAction } from '../reactions/utils';

export default class AppContainer extends Component {
  componentDidMount () {
    TriggerAction('login:check');
    State.on('update', () => this.forceUpdate());
  }
  render () {
    const {isLoading, page} = State.get().ui;
    const pageController = () => {
      switch (page) {
        case 'student':
          return <Student />;
        case 'list':
          return <List />;
        case 'allocate':
          return <Allocate />;
        case 'login':
          return <Login />;
        default:
          return <Login />;
      }
    };

    return (
      <div>
        <Navbar />
        {/* set marginTop for navbar but dont want to print out the marginTop */}
        <div style={{marginTop: '60px'}} className='hidden-print' />
        <div style={{marginBottom: '60px'}}>
          { !isLoading
            ? pageController()
            : null
          }
        </div>
        <Footer />
      </div>
    );
  }
}
