import React, { PropTypes } from 'react';
require('./dialog-content.less');

const DialogContent = ({ text, onDialogContentClick }) => (
  <p onClick={() => onDialogContentClick()}> {text} </p>
);

DialogContent.propTypes = {
  text: PropTypes.string.isRequired,
  onDialogContentClick: PropTypes.func.isRequired
};

DialogContent.defaultProps = {
  text: 'hello world'
};

export default DialogContent;
