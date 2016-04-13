import React from 'react';
import { connect } from 'react-redux';
import { changeDialogContent } from '../actions';
import DialogContent from '../views/dialog-content';

const mapStateToProps = (state) => {
  return {
    text: state.dialog.dialogContent.content
  };
}; 

const mapDispatcherToProps = (dispatch) => {
  return {
    onDialogContentClick: () => {
      dispatch(changeDialogContent());
    }
  };
};

const DialogContentContainer = connect(
  mapStateToProps,
  mapDispatcherToProps)(DialogContent);

export default DialogContentContainer;
