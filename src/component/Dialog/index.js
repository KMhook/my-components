import React from 'react';
require('./index.less');

import DialogMain from './views/dialog-main';

class Dialog extends React.Component {
  constructor() {
    super();
    this.TAG = 'Dialog: ';
  }

  render() {
    return (
      <DialogMain />
    );
  }
}
Dialog.displayName = 'Dialog';
Dialog.propTypes = {

};
Dialog.defaultProps = {

};

export default Dialog;
