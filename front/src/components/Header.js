import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaFileAlt } from "react-icons/fa";
import "antd/dist/antd.css";
import { Menu } from "antd";
import styled from "@emotion/styled";

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const NavLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLabel = styled.span`
  margin-left: 5px;
`;

const Header = () => {
  return (
    <HeaderNav>
      <Link to="/">
        <img src="" alt="logo" />
      </Link>
      <Menu mode="horizontal">
        <Menu.Item key="form" icon={<FaFileAlt />}>
          <NavLink to="/consultForm">
            <FaFileAlt />
            <NavLabel>ConsultForm</NavLabel>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="login">
          <NavLink to="/login">
            <FaSignInAlt />
            <NavLabel>Login</NavLabel>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="register">
          <NavLink to="/register">
            <FaUser />
            <NavLabel>Register</NavLabel>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="test">
          <NavLink to="/hookFormTest">
            <FaSignOutAlt />
            <NavLabel>HookFormTest</NavLabel>
          </NavLink>
        </Menu.Item>
      </Menu>
    </HeaderNav>
  );
};

export default Header;
