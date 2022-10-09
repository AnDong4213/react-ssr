import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Avatar, Dropdown, Menu, message } from 'antd';
import { LoginOutlined, HomeOutlined } from '@ant-design/icons';
import request from 'service/fetch';
import styles from './index.module.scss';
import { navs } from './config';

const Navbar: NextPage = () => {
  const router = useRouter();
  const { pathname, push } = router;
  const [isShowLogin, setIsShowLogin] = useState(false);
  const userId = '';
  const avatar =
    'https://img.mukewang.com/user/545847990001d46402200220-100-100.jpg';

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

  // const handleClose = () => setIsShowLogin(false);

  const handleGotoPersonalPage = () => {
    push(`/user/${userId}`);
  };

  const handleLogout = () => {
    request.post('/api/user/logout').then((res: any) => {
      if (res?.code === 0) {
        // store.user.setUserInfo({});
      }
    });
  };

  const renderDropDownMenu = () => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={handleGotoPersonalPage}>
          <HomeOutlined />
          &nbsp; 个人主页
        </Menu.Item>
        <Menu.Item key="2" onClick={handleLogout}>
          <LoginOutlined />
          &nbsp; 退出系统
        </Menu.Item>
      </Menu>
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
              <Avatar src={avatar} size={32} />
            </Dropdown>
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </section>
    </div>
  );
};

export default Navbar;
