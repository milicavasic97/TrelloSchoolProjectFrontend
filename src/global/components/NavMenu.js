import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NavMenu.css';
import '../styles/Fonts.css';
import { FiHome, FiLogOut, FiSettings, FiTrello, FiUser } from 'react-icons/fi';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/memberSlice';


export const NavMenu = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const dispatch = useDispatch();

    const {member, loading} = useSelector((state) => state.members);

    function handleLogOut() {
        dispatch(logout());
      }

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
                    <ul id="items" className='nav-menu'>
                        <NavItem className="nav-links navbar-font">
                            <Link to="/" className="nav-link">
                                <FiHome />
                            </Link>
                        </NavItem>

                        <Dropdown className="nav-links navbar-font" nav isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle nav caret>
                                <FiUser />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>{member.fullName}</DropdownItem>
                                <DropdownItem><FiSettings/> Podesavanja naloga</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem  onClick={handleLogOut}><FiLogOut /> Log out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
