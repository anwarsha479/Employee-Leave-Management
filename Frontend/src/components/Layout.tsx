import { useState } from 'react';
import type { ReactNode } from 'react';

import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({
  children,
}: LayoutProps) {
  const [collapsed, setCollapsed] =
    useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="d-flex">
      <Sidebar
        collapsed={collapsed}
      />

      <div
        style={{
          flex: 1,
        }}
      >
        <Topbar
          toggleSidebar={
            toggleSidebar
          }
        />

        <div
          className="p-4"
          style={{
            backgroundColor: '#f5f7fa',
            minHeight: '100vh',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;