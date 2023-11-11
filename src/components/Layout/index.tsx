import React from "react";
import { Outlet } from "react-router-dom";

// import { Container } from './styles';

const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
