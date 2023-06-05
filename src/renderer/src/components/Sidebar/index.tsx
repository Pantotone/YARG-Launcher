import React from 'react';
import SidebarFooter from './footer';
import SidebarMenuItem from './menuitem';
import VersionList from './VersionsList';

const Sidebar: React.FC = () => {
  return <div className="sidebar">

    <div className="menu">
        <SidebarMenuItem>News</SidebarMenuItem>
        <SidebarMenuItem>Settings</SidebarMenuItem>
    </div>

    <VersionList />

    <SidebarFooter />
  </div>;
}

export default Sidebar;