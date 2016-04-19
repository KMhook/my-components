import { combineReducers } from 'redux';
import buttonContent from './button-content-reducer'; 

const button = combineReducers({
  buttonContent
});

export default button;
