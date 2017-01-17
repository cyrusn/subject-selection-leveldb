import React, { Component } from 'react';
import Letter from './letter';
import SubjectCombos from './subjectCombos';
// import OleChoices from './oleChoices';
import SignArea from './letter/signArea';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Main extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <Letter />
        <SubjectCombos />
        <SignArea />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Main);
