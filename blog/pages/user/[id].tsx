import { observer } from 'mobx-react-lite';
import { Button, Avatar, Divider } from 'antd';
import styles from './index.module.scss';

const UserDetail = () => {
  return (
    <div className={styles.userDetail}>
      <div className={styles.left}>
        <div className={styles.userInfo}>
          <Avatar
            className={styles.avatar}
            src={'https://git.imooc.com/img/favicon.png'}
            size={90}
          />
          <h2>哦哦</h2>
        </div>
      </div>
    </div>
  );
};

export default observer(UserDetail);
