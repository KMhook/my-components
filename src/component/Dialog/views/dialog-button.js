import React, { PropTypes } from 'react';

const DialogButton = ({ onClick, content }) => (
  <li
    onClick={onClick}
  >
    {content}
  </li>
);

DialogButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
};

export default DialogButton;

