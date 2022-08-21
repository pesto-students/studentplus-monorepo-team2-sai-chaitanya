import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {
  Avatar,
  Dropdown,
  Menu,
} from '../../atoms';
import { MENU_ITEMS } from './constants';
import { useHistory } from 'react-router-dom';


const ProfileDropdown = ( PATHS) => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();
  const [activeMenu, setActiveMenu] = useState();
  const handleMenuItemClick = ({ key }) => {
    if (key === 'LOGOUT') {
      logoutHandler();
    }
    if (key === 'PROFILE') {
      history.push(PATHS.PROFILE);
    }
    if (key === 'DASHBOARD') {
      history.push(PATHS.DASHBOARD);
    }
    setActiveMenu(key);
    console.log(key);
    console.log(activeMenu);
  };

  const logoutHandler = () => oktaAuth.signOut('/');
  return (
    <Dropdown
      overlay={
        <Menu
          defaultSelectedKeys={[activeMenu]}
          items={MENU_ITEMS}
          onClick={handleMenuItemClick}
        />
      }
      trigger={['click']}
      arrow={true}
      placement="bottomRight"
    >
      <Avatar size={40} onClick={(e) => e.preventDefault()} />
    </Dropdown>
  );
};

export default ProfileDropdown;
