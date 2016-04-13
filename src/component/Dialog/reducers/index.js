import { combineReducers } from 'redux';
import dialogContent from './dialog-content-reducer'; 

const dialog = combineReducers({
  dialogContent
});

export default dialog;
