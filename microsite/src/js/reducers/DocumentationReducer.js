import types from '../constants/MicrositeConstants';

export default function roomName(state = '', action) {
  switch(action.type) {
  case types.DOCUMENTATION_SET:
    return action.text;
  default:
    return state;
  }
}
