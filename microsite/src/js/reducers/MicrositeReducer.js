import { combineReducers } from 'redux';

import * as reducers from './reducers';



// http://rackt.github.io/redux/docs/basics/Reducers.html
const micrositeApp = combineReducers(reducers);

export default micrositeApp;
