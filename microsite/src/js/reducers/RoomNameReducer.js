import types from '../constants/MicrositeConstants';

export default function roomName(state = '', action) {
  switch(action.type) {
  case types.ROOM_NAME_SET:
    // `gitterHQ/sidecar`, etc
    return action.name;
  default:
    return state;
  }
}
