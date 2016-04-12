import React from 'react';
import { connect } from 'react-redux';
import DialogActions from '../actions/dialog-actions';
import DialogContent from '../views/dialog-content';

const mapStateToProps = (state) => {
  return {
    text: state.DialogReducer.DialogContentReducder.content
  }
}; 

const mapDispatcherToProps = (dispatch) => {
  return {
    onDialogContentClick: () => {
      dispatch(DialogActions.changeDialogContent());
    }
  }
}

const DialogContentContainer = connect(
  mapStateToProps,
  mapDispatcherToProps)(DialogContent);

export default DialogContentContainer;
