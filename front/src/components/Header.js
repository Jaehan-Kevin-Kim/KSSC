import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaFileAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { css, cx } from "@emotion/css";
import "antd/dist/antd.css";
import { Menu } from "antd";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Logo from "../assets/images/logo.png";

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const NavLabel = styled.span`
  margin-left: 5px;
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    console.log("logout");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <HeaderNav>
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>
      <Menu
        className={css`
          flex: 1;
          justify-content: end;
        `}
        mode="horizontal">
        {user ? (
          <>
            <Menu.Item key="form">
              <NavLink to="/consultForm">
                <FaFileAlt />
                <NavLabel>ConsultForm</NavLabel>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="users">
              <NavLink to="/manageUser">
                <FaUser />
                <NavLabel>Users</NavLabel>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="logout" onClick={onLogout}>
              <MdLogout />
              <NavLabel>Logout</NavLabel>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login">
              <NavLink to="/">
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
            {/* <Menu.Item key="users">
              <NavLink to="/manageUser">
                <FaUser />
                <NavLabel>Users</NavLabel>
              </NavLink>
            </Menu.Item> */}
          </>
        )}
      </Menu>
    </HeaderNav>
  );
};

export default Header;
