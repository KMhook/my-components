import React from 'react';
import { connect } from 'react-redux';
import { changeDialogContent } from '../actions';
import DialogButtonList from '../views/dialog-buttonlist';

const mapStateToProps = (state) => {
  return {
    dialogButtons: state.dialog.dialogButtonList.buttons
  };
}; 

const mapDispatcherToProps = (dispatch) => {
  return {
    onDialogButtonClick: () => {
      dispatch(changeDialogContent());
    }
  };
};

const DialogButtonListContainer = connect(
  mapStateToProps,
  mapDispatcherToProps)(DialogButtonList);

export default DialogButtonListContainer;


