import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Avatar, Dropdown, Menu, message } from 'antd';
import type { MenuProps } from 'antd';
import { LoginOutlined, HomeOutlined } from '@ant-design/icons';
import request from 'service/fetch';
import styles from './index.module.scss';
import { navs } from './config';
import Login from 'components/Login';
import { useStore } from 'store/index';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Navbar: NextPage = () => {
  const store = useStore();
  const router = useRouter();
  const { pathname, push } = router;
  // console.log('store', store);
  const { userId, avatar } = store.user.userInfo;
  const [isShowLogin, setIsShowLogin] = useState(false);
  // const userId = ''; const avatar = 'http://localhost:3000/3.png';

  const handleGotoEditorPage = () => {
    if (userId) {
      push('/editor/new');
    } else {
      message.warning('请先登录');
    }
  };

  const handleLogin = () => {
    setIsShowLogin(true);
  };

  const handleClose = () => setIsShowLogin(false);

  const handleGotoPersonalPage = () => {
    push(`/user/${userId}`);
  };

  const handleLogout = () => {
    request.post('/api/user/logout').then((res: any) => {
      if (res?.code === 0) {
        store.user.setUserInfo({});
        message.success('退出成功');
        push('/');
      }
    });
  };

  const renderDropDownMenu = () => {
    const items: MenuProps['items'] = [
      getItem('个人主页', '1', <HomeOutlined />),
      getItem('退出系统', '2', <LoginOutlined />),
    ];

    const onClick: MenuProps['onClick'] = (e) => {
      // console.log('click ', e);
      if (e.key === '1') {
        handleGotoPersonalPage();
      }
      if (e.key === '2') {
        handleLogout();
      }
    };

    return (
      <Menu items={items} defaultOpenKeys={['1']} onClick={onClick}></Menu>
    );
  };

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav?.label} href={nav?.value}>
            <a className={pathname === nav.value ? styles.active : ''}>
              {nav?.label}
            </a>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>

        {userId ? (
          <>
            <Dropdown overlay={renderDropDownMenu()} placement="bottomLeft">
              <Avatar style={{ cursor: 'pointer' }} src={avatar} size={32} />
            </Dropdown>
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default observer(Navbar);
