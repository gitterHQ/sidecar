import types from '../constants/MicrositeConstants';

/*
 * Action creators
 */
export function setRoomName(name) {
  return {
    type: types.ROOM_NAME_SET,
    name
  };
}

export function setDocumentation(text) {
  return {
    type: types.DOCUMENTATION_SET,
    text
  };
}
