import React, { Component, PropTypes } from 'react';
import { TriggerAction } from '../../reactions/utils';
import Modal from 'react-modal';

export default class ConfirmButton extends Component {
  constructor (props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalIsOpen: false
    };
  }

  _onClick () {
    TriggerAction('confirm');
  }

  openModal () {
    this.setState({modalIsOpen: true});
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }

  render () {
    const {canConfirm} = this.props;
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
    return (
      <button
        className='btn btn-danger'
        onClick={this.openModal} >
        <span className='glyphicon glyphicon-ok' />{' '}確定
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div className='modal-header alert alert-success' role='alert'>
            <h4 className='modal-title'>
              <span className='glyphicon glyphicon-warning-sign' />{' '}確認提交
            </h4>
          </div>

          <div className='modal-body'>
            {canConfirm ? (
              <h3 className='text-success text-center'>
                確定遞交後，同學不得更改。
              </h3>
              ) : (
              <h3 className='text-danger page-header text-center'>
                尚未揀選所有選科組合
              </h3>
            )}
          </div>

          <div className='modal-footer'>
              <button
                className='navbar-btn btn btn-success'
                onClick={this.closeModal}>
                取消
              </button>
              {canConfirm ? (
                <button
                  className='btn btn-danger'
                  onClick={this._onClick}>
                  確定遞交
                </button>
              ) : null}
          </div>
        </Modal>
      </button>
    );
  }
}

ConfirmButton.propTypes = {
  canConfirm: PropTypes.bool
};
