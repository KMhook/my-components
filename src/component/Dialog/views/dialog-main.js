import React from 'react';
import DialogContentContainer from '../containers/dialog-content-container';
import DialogButtonListContainer from '../containers/dialog-button-list-container'; 

require('./dialog-main.css');

const DialogMain = () => (
  <div className="my-component-dialog">
    <DialogContentContainer/>
    <DialogButtonListContainer/>
  </div>
);

export default DialogMain;
