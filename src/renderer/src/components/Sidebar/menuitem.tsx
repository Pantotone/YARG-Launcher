import React from 'react';

type SidebarMenuItemProps = {
    icon?: React.ReactNode,
    children?: React.ReactNode;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({icon, children}) => {
    return <div className="menu-item">
        <div className="icon">{icon}</div>
        {children}
    </div>;
}

export default SidebarMenuItem;