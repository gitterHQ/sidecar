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

export function setSidecarVersion(version) {
  return {
    type: types.SIDECAR_VERSION_SET,
    version
  };
}

export function setDocumentation(text) {
  return {
    type: types.DOCUMENTATION_SET,
    text
  };
}
