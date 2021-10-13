import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavMenu.css";
import "../styles/Fonts.css";
import {
  FiHome,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiTrello,
  FiUser,
} from "react-icons/fi";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavItem,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getInvitations, logout } from "../../redux/slices/memberSlice";
import { Badge } from "@material-ui/core";
import {
  resetAction,
  resetOrganisationSlice,
} from "../../redux/slices/organisationSlice";

export const NavMenu = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const dispatch = useDispatch();
  const { member, loading, invitations } = useSelector(
    (state) => state.members
  );

  const [invitationList, setInvitations] = useState(invitations);

  function handleLogOut() {
    dispatch(logout());
    dispatch(resetOrganisationSlice());
  }

  useEffect(() => {
    // memberService
    //   .getInvitations(props.member.id)
    //   .then((response) => setInvitations(response.data));
    dispatch(getInvitations(member.id));
  }, []);

  useEffect(() => {
    setInvitations(invitations);
  }, [invitations]);

  return (
    <header>
      <nav className="navbar-nb navbar-colors">
        <div className="navbar-container open-sans-font">
          <Link to="/" className="navbar-logo">
            <div className="trello-heading-nav abril-fatface-font">
              <FiTrello />
              Trello
            </div>
          </Link>
          <ul id="items" className="nav-menu">
            <NavItem className="nav-links navbar-font">
              <Link to="/" className="nav-link">
                <FiHome />
              </Link>
            </NavItem>

            <NavItem className="nav-links navbar-font">
              <Link to="/invitations" className="nav-link">
                <Badge color="secondary" badgeContent={invitationList.length}>
                  <FiMessageSquare />
                </Badge>
              </Link>
            </NavItem>

            <Dropdown
              className="nav-links navbar-font"
              nav
              isOpen={dropdownOpen}
              toggle={toggle}
            >
              <DropdownToggle nav caret>
                <FiUser />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>{member.fullName}</DropdownItem>
                <DropdownItem>
                  <FiSettings /> Podesavanja naloga
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogOut}>
                  <FiLogOut /> Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ul>
        </div>
      </nav>
    </header>
  );
};
