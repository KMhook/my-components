import React from 'react';
import { connect } from 'react-redux';
import { clickButton } from '../actions';
import ButtonMain from '../views/button-main';

const mapStateToProps = (state) => {
  return {
    text: state.button.buttonContent.text
  };
}; 

const mapDispatcherToProps = (dispatch) => {
  return {
    onButtonClick: () => {
      dispatch(clickButton());
    }
  };
};

const ButtonContentContainer = connect(
  mapStateToProps,
  mapDispatcherToProps)(ButtonMain);

export default ButtonContentContainer;
