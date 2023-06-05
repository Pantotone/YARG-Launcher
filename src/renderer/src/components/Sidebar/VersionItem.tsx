import React from 'react';

const types = {
    "YARG.NIGHTLY": {
        name: "YARG",
        type: "Nightly"
    }
}

type Version = {
    active: boolean,
    type: keyof typeof types,
    name?: string,
    version: string,
    updateAvailable: boolean,
}

type Props = {
    version: Version,
}



const VersionItem: React.FC<Props> = ({version}) => {
  return <div className="item" data-active={version.active} data-update-available={version.updateAvailable}>
    <div className="icon"></div>
    <div className="info">
        <div className="type">{types[version.type].type}</div>
        <div className="name">{version.name || types[version.type].name}</div>
    </div>
    <div className="version">{version.version}</div>
  </div>;
}

export default VersionItem;