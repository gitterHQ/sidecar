import semver from 'semver';

import manifest from '../../package.json';

// `0`, `1`, etc
export default function getLatestSidecarVersion() {
  return semver.major(manifest.version);
}
