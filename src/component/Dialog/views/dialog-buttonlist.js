import React, { PropTypes } from 'react';
import DialogButton from './dialog-button';

const DialogButtonList = ({ dialogButtons, onDialogButtonClick }) => (
  <ul>
    {
      dialogButtons.map(button => 
        <DialogButton
          key={button.id}
          {...button}
          onClick={() => onDialogButtonClick(button.id)}
        />
      )
    }
  </ul>
);

DialogButtonList.propTypes = {
  dialogButtons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onDialogButtonClick: PropTypes.func.isRequired
};

export default DialogButtonList;


