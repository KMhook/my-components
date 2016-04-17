import { combineReducers } from 'redux';
import dialogContent from './dialog-content-reducer'; 
import dialogButtonList from './dialog-button-list-reducer';

const dialog = combineReducers({
  dialogContent,
  dialogButtonList
});

export default dialog;
