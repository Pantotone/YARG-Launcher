import React from 'react';
import VersionItem from './VersionItem';

const VersionList: React.FC = () => {
  return <div className="versions">
    <VersionItem version={{
        type: "YARG.NIGHTLY",
        active: true,
        version: "v0.10.5",
        updateAvailable: true
    }} />
  </div>;
}

export default VersionList;