import types from '../constants/MicrositeConstants';

export default function sidecarVersion(state = '', action) {
  switch(action.type) {
  case types.SIDECAR_VERSION_SET:
    return action.version;
  default:
    return state;
  }
}
