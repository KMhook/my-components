import React, { PropTypes } from 'react';

const ButtonMain = ({ onButtonClick, text }) => (
  <li
    onClick={onButtonClick}
  >
    {text}
  </li>
);

ButtonMain.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default ButtonMain;

