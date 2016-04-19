import React from 'react';
require('./index.less');

import ButtonContainer from './containers/button-container';

class Button extends React.Component {
  constructor() {
    super();
    this.TAG = 'Button: ';
  }

  render() {
    return (
      <ButtonContainer />
    );
  }
}
Button.displayName = 'Button';
Button.propTypes = {

};
Button.defaultProps = {

};

export default Button;
