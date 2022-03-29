import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Nav,
  Navbar,
  NavLink,
  NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

import { logoutAction } from '../../../actions/auth'
import { Drawer, Button } from 'antd';
import MenuSidebar from '../Sidebar/Sidebar';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const HeaderComponent = ({
  history,
  logoutAction,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClickSignOut = e => {
    logoutAction()
    history.push('/login')
  }

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(!dropdownOpen)

  const showDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <Drawer
        placement="left"
        width={300}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0, paddingTop: 100 }}
      >
        <MenuSidebar />
      </Drawer>
      <Navbar
        id='pdo-navbar'
        color='dark'
        expand='lg'
        sticky='top'
        className='p-0'>
        <NavbarBrand href='#' className='col-sm-3 col-md-10 mr-0'>
          UTC Chat
          <Button className='sidebar_toggler' size='small' style={{ float: 'right' }} ghost icon={visible ? <CloseOutlined /> : <MenuOutlined />} onClick={showDrawer} />
        </NavbarBrand>
        <Nav className='navbar-right mr-auto px-3'>
          <Dropdown
            id='collasible-nav-dropdown'
            nav
            isOpen={dropdownOpen}
            toggle={toggle}>
            <DropdownToggle nav caret>
              <svg
                viewBox='0 0 24 24'
                width='20'
                height='20'
                stroke='currentColor'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='css-i6dzq1'>
                <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'></path>
                <path d='M13.73 21a2 2 0 0 1-3.46 0'></path>
              </svg>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Notification</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavLink onClick={handleClickSignOut} className='text-nowrap' href='#'>
            Sign out
          </NavLink>
        </Nav>
      </Navbar>
    </div >
  )
}

export default withRouter(
  connect(null, {
    logoutAction,
  })(HeaderComponent)
)
